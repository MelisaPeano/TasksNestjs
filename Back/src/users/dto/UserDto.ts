import { IsNotEmpty, IsString } from "class-validator";

export class User {
  @IsNotEmpty()
  @IsString()
  email: string;
}
export interface AuthResponse {
  access_token: string;
  user: User;
}
