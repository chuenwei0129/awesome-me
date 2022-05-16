const node = element => ({ element, next: null })

const LinkedList = () => {
  let head = null
  let length = 0

  const append = element => {
    const newNode = node(element)
    if (head === null) {
      head = newNode
    } else {
      let current = head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    length++
  }

  const insert = (position, element) => {}
  const remove = position => {}
  const indexOf = element => {}
  const size = () => {}
  const isEmpty = () => {}
  const getHead = () => {
    return head
  }

  return {
    append,
    insert,
    remove,
    indexOf,
    size,
    isEmpty,
    getHead
  }
}

const l = LinkedList()
l.append(1)
l.append(2)
l.append(3)

console.log(l.getHead())
