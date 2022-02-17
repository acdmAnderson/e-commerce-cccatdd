export default class Item {

    readonly idItem: number;

    readonly category: string;

    readonly description: string;

    readonly price: number;

    constructor(idItem: number, category: string, description: string, price: number) {
        this.idItem = idItem;
        this.category = category;
        this.description = description;
        this.price = price;
    }
}