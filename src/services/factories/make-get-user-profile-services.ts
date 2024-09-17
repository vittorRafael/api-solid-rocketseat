import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileServices } from "../get-user-profile";

export function makeGetUserProfileServices() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileServices(usersRepository);

  return useCase;
}
