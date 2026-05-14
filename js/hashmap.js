export function HashMap(loadFactor = 0.75, capacity = 16) {
  let buckets = new Array(capacity).fill(null);

  const hash = (key) => {
    if (typeof key !== "string") throw new Error("key should be string");
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  };
  return {
    hash,
    get: (key) => {
      const hashedKey = hash(key);
      let value = null;
      let list = buckets[hashedKey];
      if (!list) return value;
      let cur = list;
      while (cur.nextNode) {
        if (cur.key === key) {
          value = cur.value;
        } else {
          cur = cur.nextNode;
        }
      }

      return value;
    },
  };
}

export function Node(value = null, key = null, nextNode = null) {
  return {
    value,
    key,
    nextNode,
  };
}
