import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsServicesRequest {
  query: string;
  page: number;
}

interface SearchGymsServicesResponse {
  gyms: Gym[];
}

export class SearchGymsServices {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsServicesRequest): Promise<SearchGymsServicesResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
