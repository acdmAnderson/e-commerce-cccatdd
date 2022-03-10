export default class OrderCode {

    private readonly MAX_SEQUENCE_DIGITS = 8;

    private readonly code: string;

    constructor(issueDate: Date = new Date(), sequence: number = 1) {
        this.code = this.generateCode(issueDate, sequence);
    }

    private generateCode(issueDate: Date, sequence: number): string {
        const year = issueDate.getFullYear();
        return `${year}${new String(sequence).padStart(this.MAX_SEQUENCE_DIGITS, '0')}`
    }

    getCode(): string { return this.code }
}