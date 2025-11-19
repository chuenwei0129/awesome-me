// BitSet.js
export default class BitSet {
  constructor(size) {
    this.size = size;
    const wordCount = (size + 31) >>> 5; // 向上取整(size / 32)
    this.data = new Uint32Array(wordCount);
  }

  _wordIndexAndMask(index) {
    const wordIndex = index >>> 5; // index / 32
    const bitOffset = index & 31; // index % 32
    const bitMask = 1 << bitOffset;
    return { wordIndex, bitMask };
  }

  set(index) {
    const { wordIndex, bitMask } = this._wordIndexAndMask(index);
    this.data[wordIndex] |= bitMask;
  }

  get(index) {
    const { wordIndex, bitMask } = this._wordIndexAndMask(index);
    return (this.data[wordIndex] & bitMask) !== 0;
  }

  clear(index) {
    const { wordIndex, bitMask } = this._wordIndexAndMask(index);
    this.data[wordIndex] &= ~bitMask;
  }

  // 就地 AND（交集）
  and(other) {
    const len = Math.min(this.data.length, other.data.length);
    for (let i = 0; i < len; i++) {
      this.data[i] &= other.data[i];
    }
  }

  // 就地 OR（并集）
  or(other) {
    const len = Math.min(this.data.length, other.data.length);
    for (let i = 0; i < len; i++) {
      this.data[i] |= other.data[i];
    }
  }

  clone() {
    const bs = new BitSet(this.size);
    bs.data.set(this.data);
    return bs;
  }
}
