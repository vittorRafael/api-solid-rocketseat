import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymServices } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymServices;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymServices(gymsRepository);
  });
  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -4.334747,
      longitude: -38.4744777,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
