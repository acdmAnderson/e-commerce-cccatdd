import Dimension from './dimension'

export default class Item {
  constructor (
        readonly idItem: number,
        readonly category: string,
        readonly description: string,
        readonly price: number,
        readonly dimension?: Dimension,
        readonly weight?: number
  ) {
    if (weight && weight < 0) throw new Error('Weight cannot be negative')
  }

  getDensity (): number {
    if (!this.dimension || !this.weight) return 0
    return (this.weight / this.dimension.getVolume())
  }
}
