export default class Coupon {

    private readonly name: string;

    readonly percentage: number;

    readonly expiresIn: Date;

    constructor(name: string, percentage: number, expiresIn: Date) {
        this.name = name;
        this.expiresIn = expiresIn;
        this.percentage = this.alreadyExpired(expiresIn) ? 0 : percentage;
    }

    private alreadyExpired(expiresIn: Date): boolean {
        return new Date().getTime() >= expiresIn.getTime();
    }
}