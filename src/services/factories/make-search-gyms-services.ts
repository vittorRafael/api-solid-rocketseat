import { SearchGymsServices } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsServices() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsServices(gymsRepository);

  return useCase;
}
