export type StatusResponse = {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
};

export type UpdateProfileRequest = Partial<{
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
}>;

export type RegisterRequest = {
  userName: string;
  email: string;
  password: string;
  phone: string;
};

export type RegisterResponse = {
  id: string;
  userName: string;
  email: string;
  phone: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: string;
    userName: string;
    email: string;
  };
};
