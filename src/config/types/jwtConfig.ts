
export interface IJWTPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface IGenerateTokenOptions {
  expiresIn?: string | number;
  audience?: string;
  issuer?: string;
}
