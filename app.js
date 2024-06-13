#!/usr/bin/env node

import { LinkedList } from "./linkedList.js";

// Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

class HashMap {
  constructor(size = 16) {
    this.size = size;
    this.hashMap = new Array(this.size).fill(null).map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    let buckets = this.hashMap;

    for (let i = 0; i < buckets[index].size(); i++) {
      if (buckets[index].at(i + 1).value.key === key) {
        buckets[index].at(i + 1).value.value = value;
        return;
      }
    }
    buckets[index].append({ key, value });
  }

  get(key) {
    let index = this.hash(key);
    let buckets = this.hashMap;

    if (buckets[index].contains(key)) {
      return buckets[index].contains(key);
    }
    return null;
  }
}

const map = new HashMap();

map.set("Carlos", "I am the old value");
map.set("Carlos", "I am the new value");
map.set("Kim", "Possible");
map.set("Sam", "Antha");
console.log(map.get("Kim"));
