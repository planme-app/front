export interface SignUpRequest {
  email: string;
  passwd: string;
  name: string;
}

export interface SignInRequest {
  email: string;
  passwd: string;
}

export interface User extends SignUpRequest {
  user_id: string;
  created_at: Date;
}
