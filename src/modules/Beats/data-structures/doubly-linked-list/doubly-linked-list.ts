import { BeatInfo } from "../../store"

class Node {
  data: BeatInfo
  prev: Node | null
  next: Node | null

  constructor(data: BeatInfo) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

export class DoublyLinkedList {
  head: Node | null
  tail: Node | null
  length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  insertAtBeginning(data: BeatInfo) {
    const newNode = new Node(data)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }

    this.length++
  }

  insertAtEnd(data: BeatInfo) {
    const newNode = new Node(data)

    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }

    this.length++
  }

  searchById(id: string) {
    let current = this.head
    let index = 0

    while (current) {
      if (current.data.id === id) {
        return current.data
      }
      current = current.next
      index++
    }
    return -1
  }
}
