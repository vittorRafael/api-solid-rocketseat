import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsServices } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsServices;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsServices(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -4.334747,
      longitude: -38.4744777,
    });

    await gymsRepository.create({
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -4.334747,
      longitude: -38.4744777,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -4.334747,
        longitude: -38.4744777,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym 21" }),
      expect.objectContaining({ title: "Javascript Gym 22" }),
    ]);
  });
});
