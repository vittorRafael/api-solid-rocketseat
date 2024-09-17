import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInServices } from "../validate-check-in";

export function makeValidateCheckInServices() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInServices(checkInsRepository);

  return useCase;
}
