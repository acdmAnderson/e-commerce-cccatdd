export default class Dimension {
  constructor (readonly height: number, readonly width: number, readonly depth: number) {
    if (height < 0) throw new Error('Height cannot be negative')

    if (width < 0) throw new Error('Width cannot be negative')

    if (depth < 0) throw new Error('Depth cannot be negative')
  }

  getVolume (): number {
    return ((this.height / 100) * (this.width / 100) * (this.depth / 100))
  }
}
