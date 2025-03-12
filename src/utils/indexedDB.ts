import { Empresa, Login } from "@/types/type";

// Database configuration
const DB_NAME = "localTestDB";
const DB_VERSION = 1;
const STORES = {
  empresas: "empresas",
  login: "login",
};

// Sample data for testing - at least 3 companies per state
const sampleEmpresas: Empresa[] = [
  // SP companies
  {
    id: 1,
    nome: "SP Solar Energy",
    cnpj: "12345678901234",
    email: "solar@spenergia.com",
    estado: "SP",
    kwh: 0.52,
    tipoEnergia: "Solar",
  },
  {
    id: 2,
    nome: "SP Eólica Power",
    cnpj: "12345678901235",
    email: "eolica@spenergia.com",
    estado: "SP",
    kwh: 0.48,
    tipoEnergia: "Eólica",
  },
  {
    id: 3,
    nome: "SP Hidro Energy",
    cnpj: "12345678901236",
    email: "hidro@spenergia.com",
    estado: "SP",
    kwh: 0.45,
    tipoEnergia: "Hidrelétrica",
  },
  {
    id: 4,
    nome: "SP Fossil Energia",
    cnpj: "12345678901237",
    email: "fossil@spenergia.com",
    estado: "SP",
    kwh: 0.58,
    tipoEnergia: "Fóssil",
  },

  // RJ companies
  {
    id: 5,
    nome: "RJ Solar Energy",
    cnpj: "23456789012345",
    email: "solar@rjenergia.com",
    estado: "RJ",
    kwh: 0.51,
    tipoEnergia: "Solar",
  },
  {
    id: 6,
    nome: "RJ Eólica Power",
    cnpj: "23456789012346",
    email: "eolica@rjenergia.com",
    estado: "RJ",
    kwh: 0.47,
    tipoEnergia: "Eólica",
  },
  {
    id: 7,
    nome: "RJ Hidro Energy",
    cnpj: "23456789012347",
    email: "hidro@rjenergia.com",
    estado: "RJ",
    kwh: 0.43,
    tipoEnergia: "Hidrelétrica",
  },
  {
    id: 8,
    nome: "RJ Fossil Energia",
    cnpj: "23456789012348",
    email: "fossil@rjenergia.com",
    estado: "RJ",
    kwh: 0.57,
    tipoEnergia: "Fóssil",
  },

  // MG companies
  {
    id: 9,
    nome: "MG Solar Energy",
    cnpj: "34567890123456",
    email: "solar@mgenergia.com",
    estado: "MG",
    kwh: 0.50,
    tipoEnergia: "Solar",
  },
  {
    id: 10,
    nome: "MG Eólica Power",
    cnpj: "34567890123457",
    email: "eolica@mgenergia.com",
    estado: "MG",
    kwh: 0.46,
    tipoEnergia: "Eólica",
  },
  {
    id: 11,
    nome: "MG Hidro Energy",
    cnpj: "34567890123458",
    email: "hidro@mgenergia.com",
    estado: "MG",
    kwh: 0.42,
    tipoEnergia: "Hidrelétrica",
  },
  {
    id: 12,
    nome: "MG Fossil Energia",
    cnpj: "34567890123459",
    email: "fossil@mgenergia.com",
    estado: "MG",
    kwh: 0.56,
    tipoEnergia: "Fóssil",
  },

  // BA companies
  {
    id: 13,
    nome: "BA Solar Energy",
    cnpj: "45678901234567",
    email: "solar@baenergia.com",
    estado: "BA",
    kwh: 0.53,
    tipoEnergia: "Solar",
  },
  {
    id: 14,
    nome: "BA Eólica Power",
    cnpj: "45678901234568",
    email: "eolica@baenergia.com",
    estado: "BA",
    kwh: 0.49,
    tipoEnergia: "Eólica",
  },
  {
    id: 15,
    nome: "BA Hidro Energy",
    cnpj: "45678901234569",
    email: "hidro@baenergia.com",
    estado: "BA",
    kwh: 0.44,
    tipoEnergia: "Hidrelétrica",
  },
  {
    id: 16,
    nome: "BA Fossil Energia",
    cnpj: "45678901234570",
    email: "fossil@baenergia.com",
    estado: "BA",
    kwh: 0.59,
    tipoEnergia: "Fóssil",
  }
];

const sampleLogin: Login[] = [
  // SP logins
  {
    id: 1,
    cnpj: "12345678901234",
    senha: "senha123",
    empresa: sampleEmpresas[0],
    status: "APROVADO",
  },
  {
    id: 2,
    cnpj: "12345678901235",
    senha: "senha123",
    empresa: sampleEmpresas[1],
    status: "APROVADO",
  },
  {
    id: 3,
    cnpj: "12345678901236",
    senha: "senha123",
    empresa: sampleEmpresas[2],
    status: "APROVADO",
  },
  {
    id: 4,
    cnpj: "12345678901237",
    senha: "senha123",
    empresa: sampleEmpresas[3],
    status: "APROVADO",
  },

  // RJ logins
  {
    id: 5,
    cnpj: "23456789012345",
    senha: "senha123",
    empresa: sampleEmpresas[4],
    status: "APROVADO",
  },
  {
    id: 6,
    cnpj: "23456789012346",
    senha: "senha123",
    empresa: sampleEmpresas[5],
    status: "APROVADO",
  },
  {
    id: 7,
    cnpj: "23456789012347",
    senha: "senha123",
    empresa: sampleEmpresas[6],
    status: "APROVADO",
  },
  {
    id: 8,
    cnpj: "23456789012348",
    senha: "senha123",
    empresa: sampleEmpresas[7],
    status: "PENDENTE",
  },

  // MG logins
  {
    id: 9,
    cnpj: "34567890123456",
    senha: "senha123",
    empresa: sampleEmpresas[8],
    status: "APROVADO",
  },
  {
    id: 10,
    cnpj: "34567890123457",
    senha: "senha123",
    empresa: sampleEmpresas[9],
    status: "APROVADO",
  },
  {
    id: 11,
    cnpj: "34567890123458",
    senha: "senha123",
    empresa: sampleEmpresas[10],
    status: "PENDENTE",
  },
  {
    id: 12,
    cnpj: "34567890123459",
    senha: "senha123",
    empresa: sampleEmpresas[11],
    status: "APROVADO",
  },

  // BA logins
  {
    id: 13,
    cnpj: "45678901234567",
    senha: "senha123",
    empresa: sampleEmpresas[12],
    status: "APROVADO",
  },
  {
    id: 14,
    cnpj: "45678901234568",
    senha: "senha123",
    empresa: sampleEmpresas[13],
    status: "PENDENTE",
  },
  {
    id: 15,
    cnpj: "45678901234569",
    senha: "senha123",
    empresa: sampleEmpresas[14],
    status: "APROVADO",
  },
  {
    id: 16,
    cnpj: "45678901234570",
    senha: "senha123",
    empresa: sampleEmpresas[15],
    status: "APROVADO",
  }
];

// Open database connection
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(STORES.empresas)) {
        const empresasStore = db.createObjectStore(STORES.empresas, { keyPath: "id", autoIncrement: true });
        empresasStore.createIndex("cnpj", "cnpj", { unique: true });
        empresasStore.createIndex("estado", "estado", { unique: false });
      }
      
      if (!db.objectStoreNames.contains(STORES.login)) {
        const loginStore = db.createObjectStore(STORES.login, { keyPath: "id", autoIncrement: true });
        loginStore.createIndex("cnpj", "cnpj", { unique: true });
      }

      // Add sample data only during database creation
      const eventWithTarget = event as IDBVersionChangeEvent;
      const transaction = request.transaction;
      
      if (transaction) {
        const empresasStore = transaction.objectStore(STORES.empresas);
        const loginStore = transaction.objectStore(STORES.login);
        
        if (empresasStore && loginStore) {
          sampleEmpresas.forEach(empresa => {
            empresasStore.add(empresa);
          });
          
          sampleLogin.forEach(login => {
            loginStore.add(login);
          });
        }
      }
    };
  });
};

// Generic function to get all items from a store
export const getAllItems = async <T>(storeName: string): Promise<T[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

// Function to get a single item by id
export const getItemById = async <T>(storeName: string, id: number): Promise<T> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result as T);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

// Function to add an item
export const addItem = async <T>(storeName: string, item: T): Promise<T> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(item);

    request.onsuccess = () => resolve({ ...item, id: request.result } as T);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

// Function to update an item
export const updateItem = async <T>(storeName: string, item: T): Promise<T> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);

    request.onsuccess = () => resolve(item);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

// Function to delete an item
export const deleteItem = async (storeName: string, id: number): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

// Get empresas by estado
export const getEmpresasByEstado = async (estado: string): Promise<Empresa[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.empresas, "readonly");
    const store = transaction.objectStore(STORES.empresas);
    const index = store.index("estado");
    const request = index.getAll(estado);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

// Get login by cnpj
export const getLoginByCnpj = async (cnpj: string): Promise<Login | undefined> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.login, "readonly");
    const store = transaction.objectStore(STORES.login);
    const index = store.index("cnpj");
    const request = index.get(cnpj);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

// Get pending empresas (status PENDENTE)
export const getPendingEmpresas = async (): Promise<Empresa[]> => {
  const allLogins = await getAllItems<Login>(STORES.login);
  return allLogins
    .filter(login => login.status === "PENDENTE")
    .map(login => login.empresa);
}; 