import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsServicesRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsServicesResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsServices {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServicesRequest): Promise<FetchNearbyGymsServicesResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
