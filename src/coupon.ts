export default class Coupon {

    private readonly name: string;

    readonly percentage: number

    constructor(name: string, percentage: number) {
        this.name = name;
        this.percentage = percentage;
    }
}