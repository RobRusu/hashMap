#!/usr/bin/env node

import { LinkedList } from "./linkedList.js";

class HashMap {
  constructor(size = 16, loadFactor = 0.75) {
    //set size of array, default is 16
    this.size = size;
    //set load factor to 0.8 by default, this is to determine when the number of buckets need to grow
    this.loadFactor = loadFactor;
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

    // determine if number of buckets need to grow
    let maxBuckets = this.size * this.loadFactor;
    if (maxBuckets < this.lengthBuckets()) {
      // if number of occupied buckets exceeds the threshold create new empty linked lists and double the size of the hashmap
      for (let i = 0; i < this.size; i++) {
        buckets.push(new LinkedList());
      }
      this.size = this.size * 2;
    }

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

  lengthBuckets() {
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;
    let occupiedBuckets = 0;

    // iterate through the entire hashMap
    for (let i = 0; i < buckets.length; i++) {
      // if the bucket is not empty then add 1 to occupiedBuckets
      if (buckets[i].head !== null) {
        occupiedBuckets++;
      }
    }

    // return total number of keys in the hashMap
    return occupiedBuckets;
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

  values() {
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;
    let values = [];

    // iterate through the entire hashMap
    for (let i = 0; i < buckets.length; i++) {
      // if bucket is not null/empty
      if (buckets[i].head !== null) {
        // find out the amount of values in the bucket and push them to the values array
        for (let j = 0; j < buckets[i].size(); j++) {
          values.push(buckets[i].at(j + 1).value.value);
        }
      }
    }
    // return values array with all the values
    return values;
  }

  entries() {
    // assign the hashmap to buckets variable
    let buckets = this.hashMap;
    let entries = [];

    // iterate through the entire hashMap
    for (let i = 0; i < buckets.length; i++) {
      // if bucket is not null/empty
      if (buckets[i].head !== null) {
        // find out the amount of entries in the bucket and push them to the entries array
        for (let j = 0; j < buckets[i].size(); j++) {
          let entry = [];
          entry.push(buckets[i].at(j + 1).value.key);
          entry.push(buckets[i].at(j + 1).value.value);
          entries.push(entry);
        }
      }
    }
    // return entries array with all the entries
    return entries;
  }
}
