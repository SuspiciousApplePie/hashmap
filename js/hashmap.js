export function HashMap(loadFactor = 0.75, capacity = 16) {
  let buckets = ([].length = capacity);
  return {
    hash: (key) => {
      if (typeof key !== "string") throw new Error("key should be string");
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      }

      return hashCode;
    },
  };
}
