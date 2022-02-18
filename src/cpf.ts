import { getOnlyDigits, hasAllSameCharacters } from './string.helper'
import CPFError from './errors/cpf.error';

export default class CPF {

    private readonly CPF_LENGTH = 11;

    private readonly FIRST_VERIFIER_POSITION = 10;

    private readonly SECOND_VERIFIER_POSITION = 11;

    private readonly value: string;

    constructor(cpf: string) {
        if (!this.validate(cpf)) throw new CPFError(cpf);
        this.value = cpf;
    }

    public getValue(): string {
        return this.value;
    }

    private validate(cpf: string): boolean {
        if (!cpf) return false;
        cpf = getOnlyDigits(cpf);
        if (!this.hasValidLength(cpf)) return false;
        if (hasAllSameCharacters(cpf)) return false;
        return this.verifyCPF(cpf);
    }

    private hasValidLength(cpf: string): boolean {
        return cpf.length === this.CPF_LENGTH;
    }

    private verifyCPF(cpf: string): boolean {
        const firstVerifier = this.calculateVerifierDigit(cpf, this.FIRST_VERIFIER_POSITION);
        const secondVerifier = this.calculateVerifierDigit(cpf, this.SECOND_VERIFIER_POSITION);
        return this.hasVerifierDigitValid(cpf, firstVerifier.concat(secondVerifier));
    }

    private calculateVerifierDigit(cpf: string, position: number): string {
        const amount = this.calculateAmount(cpf, position);
        return this.calculateDigit(this.calculateRest(amount)).toString();
    }

    private calculateAmount(cpf: string, position: number): number {
        let verifierAmount = 0;
        for (const digit of cpf) {
            if (position > 1) verifierAmount += +digit * position--;
        }
        return verifierAmount
    }

    private calculateRest(amount: number): number {
        return amount % this.CPF_LENGTH;
    }

    private calculateDigit(rest: number): number {
        return (rest < 2) ? 0 : this.CPF_LENGTH - rest;
    }

    private hasVerifierDigitValid(cpf: string, verifier: string): boolean {
        return this.getVerifierDigit(cpf) === verifier;
    }

    private getVerifierDigit(cpf: string): string {
        return cpf.slice(-2)
    }
}