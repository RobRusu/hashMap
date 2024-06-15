#!/usr/bin/env node

import { LinkedList } from "./linkedList.js";

// Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

class HashMap {
  constructor(size = 16) {
    //set size of array, default is 16
    this.size = size;
    // change each array to a linked list
    this.hashMap = new Array(this.size).fill(null).map(() => new LinkedList());
  }

  // create a hash number for a key by using a prime number, this currently is only set to work on strings
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      // loop key.length times and generate the hash code
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }

    return hashCode;
  }

  set(key, value) {
    // run the key through the hash method
    let index = this.hash(key);
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;

    // run bucket through the size method from the linkedList and do size() times loops
    // this is to update value for an already existing key
    for (let i = 0; i < buckets[index].size(); i++) {
      // if a match is found update the value for the key
      if (buckets[index].at(i + 1).value.key === key) {
        buckets[index].at(i + 1).value.value = value;
        return;
      }
    }
    // otherwise append to the end of linkedList
    buckets[index].append({ key, value });
  }

  get(key) {
    // run the key through the hash method
    let index = this.hash(key);
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;

    // run the bucket through the contains method from the linkedList and return the value assign to the key if found
    if (buckets[index].contains(key)) {
      return buckets[index].contains(key);
    }
    // otherwise return null if key is not found
    return null;
  }

  has(key) {
    // run the key through the hash method
    let index = this.hash(key);
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;

    // run the bucket through containsBool method from the linkedList to determine if the key is in the list or not
    if (buckets[index].containsBool(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    // run the key through the hash method
    let index = this.hash(key);
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;

    // if key index isn't found, return false
    if (!buckets[index].head) return false;

    // if only one key in the bucket then remove it and change bucket to null
    if (buckets[index].head.nextNode === null) {
      buckets[index].head = null;
      return true;
    }

    // use the remove(key) method of the linked list to remove and update the current bucket
    buckets[index].head = buckets[index].remove(key);
    // if key is removed successfully, return true
    return true;
  }

  length() {
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;
    let keys = 0;

    // iterate through the entire hashMap
    for (let i = 0; i < buckets.length; i++) {
      // if the bucket is not empty then use size method to find the amount of keys in the bucket and update keys
      if (buckets[i].head !== null) {
        keys = keys + buckets[i].size();
      }
    }

    // return total number of keys in the hashMap
    return keys;
  }

  clear() {
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;

    // iterate through the entire hashMap and remove all entries in the hashMap
    for (let i = 0; i < buckets.length; i++) {
      buckets[i].head = null;
    }
  }

  keys() {
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;
    let keys = [];

    // iterate through the entire hashMap
    for (let i = 0; i < buckets.length; i++) {
      // if bucket is not null/empty
      if (buckets[i].head !== null) {
        // find out the amount of keys in the bucket and push them to the keys array
        for (let j = 0; j < buckets[i].size(); j++) {
          keys.push(buckets[i].at(j + 1).value.key);
        }
      }
    }
    // return keys array with all the keys
    return keys;
  }
}

// testing in CLI
const map = new HashMap();

map.set("Carlos", "I am the old value");
map.set("Carlos", "I am the new value");
map.set("Kim", "Possible");
map.set("Sam", "Antha");
map.set("Pet", "Pi");
map.set("Core", "Staff");
map.set("Maka", "Baka");
map.set("Aloo", "man");
console.log(map.hashMap);
console.log(map.keys());
