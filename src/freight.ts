import Item from "./item";

export default class Freight {

    private value: number;

    constructor() {
        this.value = 0;
    }

    addItem(item: Item): void {
        if (item.dimension && item.weight) {
            this.value += 1000 * item.dimension.getVolume() * (item.getDensity() / 100)
        }
    }

    getValue(): number {
        return this.value
    }
}