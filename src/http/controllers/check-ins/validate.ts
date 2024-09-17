import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInServices } from "@/services/factories/make-check-in-services";
import { makeValidateCheckInServices } from "@/services/factories/make-validate-check-in-services";

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInServices = makeValidateCheckInServices();

  await validateCheckInServices.execute({
    checkInId,
  });

  return reply.status(204).send();
};
