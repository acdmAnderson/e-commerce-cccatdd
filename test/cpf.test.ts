import CPF from "../src/cpf";
import * as StringHelper from '../src/string.helper'

test('Should return false when CPF is null', () => {
    const fakeCpf: any = null;
    expect(() => new CPF(fakeCpf)).toThrow('Invalid CPF');
})

test('Should return false when CPF is undefined', () => {
    const fakeCpf: any = undefined;
    expect(() => new CPF(fakeCpf)).toThrow('Invalid CPF');
})

test('Should return false when CPF is NaN', () => {
    const fakeCpf: any = NaN;
    expect(() => new CPF(fakeCpf)).toThrow('Invalid CPF');
})

test('Should return false when CPF is empty string', () => {
    expect(() => new CPF('')).toThrow('Invalid CPF');
})

test('Should return false when CPF is Zero', () => {
    const fakeCpf: any = 0;
    expect(() => new CPF(fakeCpf)).toThrow('Invalid CPF');
})

test('Should return false when CPF is false', () => {
    const fakeCpf: any = false;
    expect(() => new CPF(fakeCpf)).toThrow('Invalid CPF');
})

test('Should return false when CPF has less than 11 characters', () => {
    const invalidCPF = '00000';
    expect(() => new CPF(invalidCPF)).toThrow('Invalid CPF');
})

test('Should return false when CPF has more than 14 characters', () => {
    const invalidCPF = '000000000000000';
    expect(() => new CPF(invalidCPF)).toThrow('Invalid CPF');
})

test('Should return false when CPF has all same characters', () => {
    const invalidCPF = '00000000000';
    expect(() => new CPF(invalidCPF)).toThrow('Invalid CPF');
})

test('Should return true when CPF is valid', () => {
    const fakeCpf = '11144477735'
    const validCPF = new CPF(fakeCpf);
    expect(validCPF.getValue()).toBe(fakeCpf);
})

test('Should return true when CPF has valid special characters', () => {
    const fakeCpf = '493.290.230-10'
    const validCPF = new CPF(fakeCpf);
    expect(validCPF.getValue()).toBe('493.290.230-10');
})

test('Should return false when CPF has only first digit valid', () => {
    const invalidCPF = '111.444.777-30';
    expect(() => new CPF(invalidCPF)).toThrow('Invalid CPF');
})

test('Should return false when CPF has only second digit valid', () => {
    const invalidCPF = '111.444.777-05';
    expect(() => new CPF(invalidCPF)).toThrow('Invalid CPF');
})

test('Should return false when CPF has only special characters', () => {
    const invalidCPF = '!@#$%ˆ&*()*__';
    expect(() => new CPF(invalidCPF)).toThrow('Invalid CPF');
})

test('Should call StringHelper.getOnlyDigits with correct params', () => {
    const validCPF = '493.290.230-10';
    const getOnlyDigitsSpy = jest.spyOn(StringHelper, 'getOnlyDigits')
    new CPF(validCPF)
    expect(getOnlyDigitsSpy).toHaveBeenCalledWith(validCPF)
})

test('Should call StringHelper.hasAllSameCharacters with correct params', () => {
    const validCPF = '49329023010';
    const hasAllSameCharactersSpy = jest.spyOn(StringHelper, 'hasAllSameCharacters')
    new CPF(validCPF)
    expect(hasAllSameCharactersSpy).toHaveBeenCalledWith(validCPF)
})