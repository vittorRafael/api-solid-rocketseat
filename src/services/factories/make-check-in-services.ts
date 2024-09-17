import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInServices } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInServices() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInServices(checkInsRepository, gymsRepository);

  return useCase;
}
