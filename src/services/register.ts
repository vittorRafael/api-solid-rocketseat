import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/users-already-exists-error";
import { User } from "@prisma/client";
import bcryptjs from "bcryptjs";

interface RegisterServicesRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterServicesResponse {
  user: User;
}

export class RegisterServices {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterServicesRequest): Promise<RegisterServicesResponse> {
    const password_hash = await bcryptjs.hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) throw new UserAlreadyExistsError();

    //const prismaUsersRepository = new PrismaUsersRepository();
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
