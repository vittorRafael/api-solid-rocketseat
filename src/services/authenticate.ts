import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcryptjs from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServicesRequest {
  email: string;
  password: string;
}
interface AuthenticateServicesResponse {
  user: User;
}

export class AuthenticateServices {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServicesRequest): Promise<AuthenticateServicesResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await bcryptjs.compare(
      password,
      user.password_hash
    );
    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return { user };
  }
}
