import { FetchNearbyGymsServices } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyServices() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsServices(gymsRepository);

  return useCase;
}
