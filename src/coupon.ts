export default class Coupon {
   
    constructor(readonly code: string, readonly percentage: number, readonly expiresIn: Date) { }

    isExpired(currentDate: Date = new Date()) {
        return currentDate.getTime() > this.expiresIn.getTime()
    }
}