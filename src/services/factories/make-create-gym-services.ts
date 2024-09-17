import { CreateGymServices } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymServices() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymServices(gymsRepository);

  return useCase;
}
