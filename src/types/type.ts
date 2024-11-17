export interface Empresa {
    id?: number; // Opcional, pois é gerado pelo banco de dados
    nome: string;
    cnpj: string;
    estado: string;
    email: string;
    kwh: number;
    tipoEnergia: string;
  }
  
  export interface Login {
    id?: number; // Opcional, pois é gerado pelo banco de dados
    cnpj: string;
    senha: string;
    empresa: Empresa;
    status: string;
  }