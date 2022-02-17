import CPF from "./cpf";
import OrderItem from "./order-item";

export default class Order {

    readonly cpf: CPF;

    readonly orderItems: OrderItem[];

    constructor(cpf: string, orderItems: OrderItem[]) {
        this.cpf = new CPF(cpf);
        this.orderItems = orderItems;
    }
}