import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateServices } from "../authenticate";

export function makeAuthenticateServices() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateServices(usersRepository);

  return useCase;
}
