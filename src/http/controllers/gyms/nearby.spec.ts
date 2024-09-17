import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-adn-authenticate-user";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, "ADMIN");
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: null,
        phone: null,
        latitude: -4.334747,
        longitude: -38.4744777,
      });
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: null,
        phone: null,
        latitude: -4.9504837,
        longitude: -39.0255109,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: -4.334747, longitude: -38.4744777 })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });
});
