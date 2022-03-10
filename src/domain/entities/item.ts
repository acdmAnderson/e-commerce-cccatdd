import Dimension from './dimension';

export default class Item {

    constructor(
        readonly idItem: number,
        readonly category: string,
        readonly description: string,
        readonly price: number,
        readonly dimension?: Dimension,
        readonly weight?: number
    ) { }

    getDensity(): number {
        if (!this.dimension || !this.weight) return 0;
        return (this.weight / this.dimension.getVolume());
    }
}