import Coupon from "./coupon";
import CPF from "./cpf";
import Item from "./item";
import OrderItem from "./order-item";

export default class Order {

    readonly cpf: CPF;

    readonly orderItems: OrderItem[];

    private readonly coupon: Coupon | undefined;


    constructor(cpf: string, coupon: Coupon | undefined = undefined) {
        this.cpf = new CPF(cpf);
        this.orderItems = [];
        if (coupon) {
            if (coupon.expiresIn.getTime() >= new Date().getTime()) {
                this.coupon = coupon;
            }
        }
    }

    addItem(item: Item, quantity: number): void {
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    }

    getTotal(): number {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) total -= total * (this.coupon.percentage / 100);
        return total
    }
}