export default class CPFError extends Error {
    constructor(readonly cpf: string) {
        super();
        this.name = CPFError.name;
        this.message = `Invalid CPF. Value: ${cpf}`;
    }
}