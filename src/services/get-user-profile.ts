import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileServicesResquest {
  userId: string;
}
interface GetUserProfileServicesResponse {
  user: User;
}

export class GetUserProfileServices {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServicesResquest): Promise<GetUserProfileServicesResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}
