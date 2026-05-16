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
    set: (key, value) => {
      const hashedKey = hash(key);
      if (!buckets[hashedKey]) {
        const node = Node(key, value);
        const list = LinkedList();
        buckets[hashedKey] = list;
        list.append(node);
        return;
      }

      const list = buckets[hashedKey];
      const update = list.update(key, value);
      if (!update) {
        const node = Node(key, value);
        list.append(node);
      }
    },
    has: (key) => {
      const hashedKey = hash(key);
      if (!buckets[hashedKey]) return false;
      const list = buckets[hashedKey];
      if (list.findValue(key)) {
        return true;
      }
      return false;
    },
    remove: (key) => {
      const hashedKey = hash(key);
      const list = buckets[hashedKey];
      if (!buckets[hashedKey]) return false;
      return list.removeKey(key);
    },
    length: () => {
      return buckets.reduce((acc, list) => {
        if (!list) return acc;
        return acc + list.size();
      }, 0);
    },
    clear: () => {
      buckets = new Array(capacity).fill(null);
    },
    keys: () => {
      let keys = [];
      buckets.forEach((list) => {
        if (list) {
          keys = keys.concat(list.getKeys());
        }
      });
      return keys;
    },
  };
}

export function Node(key = null, value = null, nextNode = null) {
  return {
    value,
    key,
    nextNode,
  };
}

export function LinkedList() {
  let head = null;
  let tail = null;
  let size = 0;
  return {
    append: (node) => {
      if (!head) {
        head = node;
        tail = node;
      } else {
        tail.nextNode = node;
        tail = node;
      }
      size++;
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

    update: (key, value) => {
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

    removeKey: (key) => {
      let cur = head;
      let prev = null;
      let next = cur.nextNode;
      let isDeleted = false;
      while (cur) {
        if (!prev && key === cur.key) {
          head = next;
          isDeleted = true;
          size--;
          break;
        } else if (!next && key === cur.key) {
          prev.nextNode = next;
          tail = prev;
          isDeleted = true;
          size--;
          break;
        } else if (key === cur.key) {
          prev.nextNode = next;
          isDeleted = true;
          size--;
          break;
        }
        prev = cur;
        cur = cur.nextNode;
        if (!cur) break;
        next = cur.nextNode;
      }
      return isDeleted;
    },
    size: () => {
      return size;
    },
  };
}
