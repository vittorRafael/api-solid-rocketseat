import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsServicesRequest {
  userId: string;
}
interface GetUserMetricsServicesResponse {
  checkInsCount: number;
}

export class GetUserMetricsServices {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServicesRequest): Promise<GetUserMetricsServicesResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    return { checkInsCount };
  }
}
