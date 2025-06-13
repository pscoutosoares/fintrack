import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("PUT /api/v1/status", () => {
  describe("Annonymous user", () => {
    test("Method not allowed", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "PUT",
      });
      expect(response.status).toBe(405);
    });
  });
});
