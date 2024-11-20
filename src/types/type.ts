export interface Empresa {
    id?: number; 
    nome: string;
    cnpj: string;
    estado: string;
    email: string;
    kwh: number;
    tipoEnergia: string;
  }
  
  export interface Login {
    id?: number; 
    cnpj: string;
    senha: string;
    empresa: Empresa;
    status: string;
  }