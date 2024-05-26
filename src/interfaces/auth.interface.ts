export interface LoginPayload {
  identity: string;
  password: string;
}

export interface TokenPayload {
  accessToken: string;
}
