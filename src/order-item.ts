import Item from "./item";

export default class OrderItem {

    private readonly item: Item;

    private readonly quantity: number;

    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}