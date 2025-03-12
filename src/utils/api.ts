import { Empresa, Login } from '@/types/type';
import {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  getEmpresasByEstado,
  getLoginByCnpj,
  getPendingEmpresas
} from './indexedDB';

// Configuration
const API_URL = "http://localhost:8080/api";
const USE_LOCAL_DB = true; // Toggle this to use local DB or remote API

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching data");
  }
  return response.json();
};

// Empresas API
export const empresasAPI = {
  // Get all empresas
  getAll: async (): Promise<Empresa[]> => {
    if (USE_LOCAL_DB) {
      return getAllItems<Empresa>('empresas');
    } else {
      const response = await fetch(`${API_URL}/empresas`);
      return handleResponse<Empresa[]>(response);
    }
  },

  // Get empresa by ID
  getById: async (id: number): Promise<Empresa> => {
    if (USE_LOCAL_DB) {
      const empresa = await getItemById<Empresa>('empresas', id);
      if (!empresa) throw new Error("Empresa não encontrada");
      return empresa;
    } else {
      const response = await fetch(`${API_URL}/empresas/${id}`);
      return handleResponse<Empresa>(response);
    }
  },

  // Get empresas by estado
  getByEstado: async (estado: string): Promise<Empresa[]> => {
    if (USE_LOCAL_DB) {
      return getEmpresasByEstado(estado);
    } else {
      const response = await fetch(`${API_URL}/empresas/estado/${estado}`);
      return handleResponse<Empresa[]>(response);
    }
  },

  // Get pending empresas
  getPendentes: async (): Promise<Empresa[]> => {
    if (USE_LOCAL_DB) {
      return getPendingEmpresas();
    } else {
      const response = await fetch(`${API_URL}/empresas/pendentes`);
      return handleResponse<Empresa[]>(response);
    }
  },

  // Create empresa
  create: async (data: { empresa: Empresa, login: { senha: string } }): Promise<Empresa> => {
    if (USE_LOCAL_DB) {
      const newEmpresa = await addItem<Empresa>('empresas', data.empresa);
      
      // Create login for the empresa
      const newLogin: Login = {
        cnpj: data.empresa.cnpj,
        senha: data.login.senha,
        empresa: newEmpresa,
        status: "PENDENTE"
      };
      
      await addItem<Login>('login', newLogin);
      return newEmpresa;
    } else {
      const response = await fetch(`${API_URL}/empresas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse<Empresa>(response);
    }
  },

  // Update empresa
  update: async (id: number, data: Partial<Empresa>): Promise<Empresa> => {
    if (USE_LOCAL_DB) {
      const empresa = await getItemById<Empresa>('empresas', id);
      if (!empresa) throw new Error("Empresa não encontrada");
      
      const updatedEmpresa = { ...empresa, ...data };
      await updateItem<Empresa>('empresas', updatedEmpresa);
      
      // Update empresa in login object if it exists
      const allLogins = await getAllItems<Login>('login');
      const loginToUpdate = allLogins.find(login => login.empresa.id === id);
      
      if (loginToUpdate) {
        loginToUpdate.empresa = updatedEmpresa;
        await updateItem<Login>('login', loginToUpdate);
      }
      
      return updatedEmpresa;
    } else {
      const response = await fetch(`${API_URL}/empresas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse<Empresa>(response);
    }
  },

  // Delete empresa
  delete: async (id: number): Promise<void> => {
    if (USE_LOCAL_DB) {
      // Delete empresa
      await deleteItem('empresas', id);
      
      // Delete related login if exists
      const allLogins = await getAllItems<Login>('login');
      const loginToDelete = allLogins.find(login => login.empresa.id === id);
      
      if (loginToDelete) {
        await deleteItem('login', loginToDelete.id as number);
      }
    } else {
      const response = await fetch(`${API_URL}/empresas/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error deleting empresa");
      }
    }
  }
};

// Login API
export const loginAPI = {
  // Login
  login: async (credentials: { cnpj: string, senha: string }): Promise<{ empresa: Empresa }> => {
    if (USE_LOCAL_DB) {
      const login = await getLoginByCnpj(credentials.cnpj);
      
      if (!login) {
        throw new Error("CNPJ não encontrado");
      }
      
      if (login.senha !== credentials.senha) {
        throw new Error("Senha incorreta");
      }
      
      if (login.status !== "APROVADO") {
        throw new Error("Esta empresa ainda não foi aprovada pelo administrador");
      }
      
      return { empresa: login.empresa };
    } else {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return handleResponse<{ empresa: Empresa }>(response);
    }
  },

  // Update login status
  updateStatus: async (id: number, status: string): Promise<void> => {
    if (USE_LOCAL_DB) {
      const login = await getItemById<Login>('login', id);
      if (!login) throw new Error("Login não encontrado");
      
      login.status = status;
      await updateItem<Login>('login', login);
    } else {
      const response = await fetch(`${API_URL}/login/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating login status");
      }
    }
  }
}; 