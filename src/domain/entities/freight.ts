import Item from './item'

export default class Freight {
    private readonly MIN_FREIGHT_VALUE = 10;

    private readonly DISTANCE = 1000;

    private value: number;

    constructor () {
      this.value = 0
    }

    addItem (item: Item, quantity: number): void {
      if (item.dimension && item.weight) {
        this.value += (this.DISTANCE * item.dimension.getVolume() * (item.getDensity() / 100)) * quantity
      }
    }

    getValue (): number {
      if (this.value > 0 && this.value < this.MIN_FREIGHT_VALUE) return this.MIN_FREIGHT_VALUE
      return this.value
    }
}
