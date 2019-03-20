export default {
  path: {
    last: '/', current: '/'
  },
  storage: null,
  setAs(data = null) {
    this.storage = data
  },
  set(value = {}) {
    if (!this.storage) this.storage = {}
    Object.assign(this.storage, value)
  },
  get(key = '') {
    return this.storage
        ? this.storage[key]
        : undefined
  },
  remove(key = '') {
    if (this.storage && this.storage[key]) {
      this.storage[key] = undefined
    }
  },
  auto(reset = true) {
    this.path = {
      last: this.path.current,
      current: location.hash.split('/').slice(1, 3).join('/')
    }
    if (reset) this.notSame(() => {this.setAs()})
  },
  ifSame(fn = new Function()) {
    if (this.path.last === this.path.current) {
      fn(this.storage)
    }
  },
  notSame(fn = new Function()) {
    if (this.path.last !== this.path.current) {
      fn(this.storage)
    }
  }
}