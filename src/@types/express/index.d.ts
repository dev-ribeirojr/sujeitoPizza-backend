// adicionando user_id na tipagem padrão do Request
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
