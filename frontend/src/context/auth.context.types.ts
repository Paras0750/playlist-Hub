export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: { user: User; token: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
