import CPF from "./cpf";
import Item from "./item";

export default class Order {

    readonly cpf: CPF;

    readonly items: Item[];

    readonly quantity: number;

    constructor(cpf: string, items: Item[], quantity: number) {
        this.cpf = new CPF(cpf);
        this.items = items;
        this.quantity = quantity;
    }
}