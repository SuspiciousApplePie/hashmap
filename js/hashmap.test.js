import { HashMap, Node } from "./hashmap";

describe("Node test", () => {
  test("Test node with no value", () => {
    expect(Node()).toStrictEqual({ key: null, value: null, nextNode: null });
  });
});
describe("Hash test", () => {
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

describe("Get test", () => {
  test("Test with non existent key", () => {
    const map = HashMap();
    expect(map.get("Aether")).toBe(null);
  });
});
