import { sum } from "../src/sum";

describe("Calculate Sum", () => {
  it("should calculate sum correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
