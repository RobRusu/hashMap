export class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    if (this.head === null) {
      //if head is empty add node
      this.head = new Node(value);
    } else {
      //otherwise add value to the end of list
      let head = this.head;
      while (head.nextNode !== null) {
        head = head.nextNode;
      }
      head.nextNode = new Node(value);
    }
  }

  prepend(value) {
    if (this.head === null) {
      //if head is empty add node
      this.head = new Node(value);
    } else {
      //otherwise add value to the start of the list and make it new head
      let newHead = new Node(value);
      newHead.nextNode = this.head;
      this.head = newHead;
    }
  }

  size() {
    if (this.head === null) {
      //if head is empty return 0
      return "0 nodes";
    } else {
      //otherwise return total number of nodes
      let head = this.head;
      let nodes = 1;
      while (head.nextNode !== null) {
        head = head.nextNode;
        nodes++;
      }
      return nodes;
    }
  }

  headNode() {
    if (this.head === null) {
      //if head is empty return 0
      return 0;
    } else {
      //otherwise return head node
      return this.head;
    }
  }

  tailNode() {
    if (this.head === null) {
      //if head is empty return 0
      return 0;
    } else {
      //otherwise return last node
      let tail = this.head;
      while (tail.nextNode !== null) {
        tail = tail.nextNode;
      }
      return tail;
    }
  }

  at(index) {
    if (this.head === null || index <= 0 || !index) {
      //if head is empty or input is invalid return message
      return "List is empty";
    } else {
      //otherwise return node at index
      let indexNode = this.head;
      let nodes = 0;
      while (indexNode.nextNode !== null) {
        nodes++;
        if (nodes == index) {
          return indexNode;
        }
        indexNode = indexNode.nextNode;
      }
      // return last node
      if (index <= nodes + 1) return indexNode;
      if (index > nodes) return "Out of range";
    }
  }

  pop() {
    if (this.head === null) {
      //if head is empty return 0
      return 0;
    } else {
      //otherwise loop until end of node and remove penultimate next node reference
      let indexNode = this.head;
      let currentNode;
      while (indexNode.nextNode !== null) {
        currentNode = indexNode;
        indexNode = indexNode.nextNode;
      }
      currentNode.nextNode = null;
    }
  }

  contains(value) {
    let headNode = this.head;
    if (this.head === null) {
      //if head is empty return false
      return false;
    } else {
      //otherwise loop and check if value is in the list
      while (headNode.nextNode !== null) {
        if (headNode.value.key === value) {
          return headNode.value.value;
        } else {
          headNode = headNode.nextNode;
        }
      }
    }
    if (headNode.value.key === value) {
      //if last node contains the value return true
      return headNode.value.value;
    }
    //otherwise return false
    return false;
  }

  containsBool(value) {
    let headNode = this.head;
    if (this.head === null) {
      //if head is empty return false
      return false;
    } else {
      //otherwise loop and check if value is in the list
      while (headNode.nextNode !== null) {
        if (headNode.value.key === value) {
          return true;
        } else {
          headNode = headNode.nextNode;
        }
      }
    }
    if (headNode.value.key === value) {
      //if last node contains the value return true
      return true;
    }
    //otherwise return false
    return false;
  }

  find(value) {
    let indexNode = this.head;
    let nodes = 0;

    while (indexNode.nextNode !== null) {
      //loop through the list until value is found
      if (indexNode.value === value) {
        return nodes;
      }
      nodes++;
      indexNode = indexNode.nextNode;
    }
    if (indexNode.value === value) {
      //check last node for value
      return nodes;
    }
    //if value isn't found return null
    return null;
  }

  toString() {
    let listString = "";
    let node = this.head;

    //if head is empty return message
    if (node === null) {
      return "List is empty.";
    }

    while (node.nextNode !== null) {
      //loop through list and update listString
      listString = `${listString}( ${node.value} ) -> `;
      node = node.nextNode;
    }
    //return listString, last node value and null
    return `${listString} ( ${node.value} ) -> ${node.nextNode}`;
  }

  remove(value) {
    const node = this.head;

    // check if value is in the first node, if yes then remove first value and return the new changed node
    if (node.value.key === value) {
      node = node.nextNode;
      return node;
    }

    let currentNode = node;
    let previousNode;

    // loop if currentNode is empty and value doesn't match the key
    while (currentNode !== null && currentNode.value.key !== value) {
      //update the previous node to be the current node
      previousNode = currentNode;
      // and update current node to be next node
      currentNode = currentNode.nextNode;
    }

    // once the while loop condition is no longer true, the key is found in the list
    // make previous node next node point to the current node next node, essentially removing the desired key
    previousNode.nextNode = currentNode.nextNode;

    // return the whole list with the modifications
    return node;
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    (this.value = value), (this.nextNode = nextNode);
  }
}
