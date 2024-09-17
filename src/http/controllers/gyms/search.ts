import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymsServices } from "@/services/factories/make-search-gyms-services";

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymQuerySchema.parse(request.query);

  const searchGymsServices = makeSearchGymsServices();
  const { gyms } = await searchGymsServices.execute({
    query: q,
    page,
  });

  return reply.status(200).send({ gyms });
};
