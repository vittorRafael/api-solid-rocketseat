import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsServices } from "@/services/factories/make-fetch-user-check-ins-services";

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsServices = makeFetchUserCheckInsServices();
  const { checkIns } = await fetchUserCheckInsServices.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
};
