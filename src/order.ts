import Coupon from "./coupon";
import CPF from "./cpf";
import OrderItem from "./order-item";

export default class Order {

    readonly cpf: CPF;

    readonly orderItems: OrderItem[];

    private readonly coupon: Coupon | undefined;

    readonly total: number;

    constructor(cpf: string, orderItems: OrderItem[], coupon: Coupon | undefined = undefined) {
        this.cpf = new CPF(cpf);
        this.orderItems = orderItems;
        this.total = this.calculateTotal(orderItems);
        if (coupon) this.total -= this.total * (coupon.percentage / 100);
    }

    private calculateTotal(orderItems: OrderItem[]): number {
        let total = 0;
        for(const orderItem of orderItems) {
            total += orderItem.item.price * orderItem.quantity;
        }
        return total;
    }
}