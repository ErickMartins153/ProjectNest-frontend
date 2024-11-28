export interface Token {
  valid: boolean;
  token: string;
  tokenType: string;
  subject: string;
  expiration: string;
}
