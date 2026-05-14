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
      let list = buckets[hashedKey];
      let value = null;
      if (buckets[hashedKey]) {
        value = list.findValue(key);
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

export function LinkedList() {
  let head = null;
  let tail = null;
  return {
    append: (node) => {
      if (!head) {
        head = node;
        tail = node;
      } else {
        tail.nextNode = node;
        tail = node;
      }
    },

    findValue: (key) => {
      let cur = head;
      let value = null;
      while (cur) {
        if (cur.key === key) {
          value = cur.value;
          break;
        } else {
          cur = cur.nextNode;
        }
      }

      return value;
    },

    update(key, value) {
      let cur = head;
      let isDuplicate = false;
      while (cur) {
        if (key === cur.key) {
          cur.value = value;
          isDuplicate = true;
          break;
        } else {
          cur = cur.nextNode;
        }
      }
      return isDuplicate;
    },
  };
}
