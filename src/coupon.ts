export default class Coupon {
    
    constructor(readonly code: string, readonly percentage: number, readonly expiresIn?: Date) { }
    
    isExpired(currentDate: Date = new Date()) {
        if (!this.expiresIn) return false;
        return currentDate.getTime() > this.expiresIn.getTime()
    }

    calculateDiscount(amount: number): number {
        return amount * (this.percentage / 100)
    }
}