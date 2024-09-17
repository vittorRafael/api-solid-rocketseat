import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsServices } from "@/services/factories/make-get-user-metrics-services";

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserMetricsServices = makeGetUserMetricsServices();
  const { checkInsCount } = await getUserMetricsServices.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
};
