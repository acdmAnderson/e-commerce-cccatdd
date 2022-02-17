export default class Item {

    readonly description: string;

    readonly price: number;

    constructor(description: string, price: number) {
        this.description = description;
        this.price = price;
    }
}