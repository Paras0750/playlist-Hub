export interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  } | null;
  token: string | null;
  loading: boolean;
}