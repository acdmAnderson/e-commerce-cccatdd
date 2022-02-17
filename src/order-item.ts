import Item from "./item";

export default class OrderItem {

    readonly item: Item;

    readonly quantity: number;

    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}