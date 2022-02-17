export default class Coupon {

    private readonly name: string;

    readonly percentage: number;

    readonly expiresIn: Date;

    constructor(name: string, percentage: number, expiresIn: Date) {
        this.name = name;
        this.percentage = percentage;
        this.expiresIn = expiresIn;
    }
}