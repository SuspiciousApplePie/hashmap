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

describe("Set test", () => {
  test("Adding from empty", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    expect(starRail.get("trailblazer")).toBe("caelus");
  });

  test("Add that causes collusion", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("f", "feixiao");
    expect(starRail.get("f")).toBe("feixiao");
  });

  test("Add multiple items", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("dan feng", "dan heng");
    starRail.set("marchie", "march 7th");
    starRail.set("f", "feixiao");
    expect(starRail.get("marchie")).toBe("march 7th");
    expect(starRail.get("dan feng")).toBe("dan heng");
    expect(starRail.get("trailblazer")).toBe("caelus");
    expect(starRail.get("f")).toBe("feixiao");
  });

  test("Similar key", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("trailblazer", "stelle");
    expect(starRail.get("trailblazer")).toBe("stelle");
    expect(starRail.get("f")).toBe(null);
  });
});

describe("Has test", () => {
  test("check existent value", () => {
    const starRail = HashMap();
    starRail.set("babochka", "seele");
    expect(starRail.has("babochka")).toBe(true);
  });

  test("check empty list", () => {
    const starRail = HashMap();
    expect(starRail.has("babochka")).toBe(false);
  });

  test("check non existent value in filled bucket", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    expect(starRail.has("f")).toBe(false);
  });
});

describe("Remove test", () => {
  test("remove one value", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("f", "feixiao");
    expect(starRail.remove("f")).toBe(true);
  });

  test("remove two value", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("f", "feixiao");
    expect(starRail.remove("f")).toBe(true);
    expect(starRail.remove("trailblazer")).toBe(true);
  });

  test("remove non existent value in empty bucket", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("f", "feixiao");
    expect(starRail.remove("g")).toBe(false);
  });

  test("remove non existent value in list", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("f", "feixiao");
    starRail.set("v", "vollerei");
    expect(starRail.remove("F")).toBe(false);
  });
});

describe("Length test", () => {
  test("check size of 6", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "stelle");
    starRail.set("general", "feixiao");
    starRail.set("f", "fu xuan");
    starRail.set("daniel", "dan heng");
    starRail.set("rich woman", "asta");
    starRail.set("marchie", "march 7th");
    expect(starRail.length()).toBe(6);
  });

  test("check size of none", () => {
    const starRail = HashMap();
    expect(starRail.length()).toBe(0);
  });
});

describe("Clear test", () => {
  test("Check if clear works", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "stelle");
    starRail.set("general", "feixiao");
    starRail.set("f", "fu xuan");
    starRail.set("daniel", "dan heng");
    starRail.set("rich woman", "asta");
    starRail.set("marchie", "march 7th");
    starRail.clear();
    expect(starRail.length()).toBe(0);
  });
  test("Check if clear works and add new one", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "stelle");
    starRail.set("general", "feixiao");
    starRail.set("f", "fu xuan");
    starRail.set("daniel", "dan heng");
    starRail.set("rich woman", "asta");
    starRail.clear();
    starRail.set("marchie", "march 7th");
    expect(starRail.length()).toBe(1);
  });
});

describe("Keys test", () => {
  test("Display 3 keys", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("f", "feixiao");
    starRail.set("marchie", "march 7th");
    expect(starRail.keys()).toStrictEqual(["trailblazer", "f", "marchie"]);
  });

  test("Display no keys", () => {
    const starRail = HashMap();
    expect(starRail.keys()).toStrictEqual([]);
  });

  test("Display keys after removing item", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "caelus");
    starRail.set("f", "feixiao");
    starRail.set("marchie", "march 7th");
    starRail.remove("f");
    expect(starRail.keys()).toStrictEqual(["trailblazer", "marchie"]);
  });
});

describe("Values test", () => {
  test("Display 3 values", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "stelle");
    starRail.set("f", "feixiao");
    starRail.set("marchie", "march 7th");
    expect(starRail.values()).toStrictEqual(["stelle", "feixiao", "march 7th"]);
  });
  test("Display 3 values", () => {
    const starRail = HashMap();
    expect(starRail.values()).toStrictEqual([]);
  });
  test("Display keys after removing item", () => {
    const starRail = HashMap();
    starRail.set("trailblazer", "stelle");
    starRail.set("f", "feixiao");
    starRail.set("marchie", "march 7th");
    starRail.remove("f");
    expect(starRail.values()).toStrictEqual(["stelle", "march 7th"]);
  });
});
