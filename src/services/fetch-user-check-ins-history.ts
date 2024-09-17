import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInHistoryServicesRequest {
  userId: string;
  page: number;
}
interface FetchUserCheckInHistoryServicesResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryServices {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryServicesRequest): Promise<FetchUserCheckInHistoryServicesResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );
    return { checkIns };
  }
}
