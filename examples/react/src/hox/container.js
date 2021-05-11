class Container {
  constructor(hook) {
    this.hook = hook
    this.subs = new Set()
    this.data = null
  }

  notify() {
    for (const sub of this.subs) {
      sub(this.data)
    }
  }
}

export default Container
