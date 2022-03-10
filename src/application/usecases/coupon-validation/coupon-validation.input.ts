export default class CouponValidationInput {

    constructor(readonly code: string, readonly currentDate: Date = new Date()) { }
}