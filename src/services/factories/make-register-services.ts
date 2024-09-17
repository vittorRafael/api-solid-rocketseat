import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterServices } from "../register";

export function makeRegisterServices() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterServices(usersRepository);

  return useCase;
}
