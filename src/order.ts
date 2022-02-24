import Coupon from './coupon';
import CPF from './cpf';
import Freight from './freight';
import Item from './item';
import OrderItem from './order-item';

export default class Order {

    readonly cpf: CPF;

    readonly orderItems: OrderItem[];

    private coupon: Coupon | undefined;

    private readonly freight;


    constructor(cpf: string, readonly issueDate: Date = new Date()) {
        this.cpf = new CPF(cpf);
        this.orderItems = [];
        this.freight = new Freight();
    }

    addItem(item: Item, quantity: number): void {
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
        this.freight.addItem(item);
    }

    addCoupon(coupon: Coupon) {
        if (!coupon.isExpired(this.issueDate)) {
            this.coupon = coupon;
        }
    }

    getTotal(): number {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        total += this.freight.getValue();
        if (this.coupon) total -= total * (this.coupon.percentage / 100);
        return total
    }
}