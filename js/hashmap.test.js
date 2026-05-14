import { HashMap } from "./hashmap";
describe("hash test", () => {
  const map = HashMap();
  test("Test with one letter", () => {
    expect(map.hash("A")).toBe(1);
  });
  test("Test with two letters", () => {
    expect(map.hash("Aa")).toBe(0);
  });
  test("Test with two letters", () => {
    expect(map.hash("Aether")).toBe(5);
  });
  test("Test with non string", () => {
    expect(() => map.hash(123)).toThrow("key should be string");
  });
});
