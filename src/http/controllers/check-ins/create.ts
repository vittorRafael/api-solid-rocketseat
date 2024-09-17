import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInServices } from "@/services/factories/make-check-in-services";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const checkInServices = makeCheckInServices();
  await checkInServices.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId: request.user.sub,
  });

  return reply.status(201).send();
};
