import { GetUserMetricsServices } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsServices() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsServices(checkInsRepository);

  return useCase;
}
