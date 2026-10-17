export interface UserRecord {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  provider: 'email' | 'google';
  createdAt: string;
  updatedAt: string;
}