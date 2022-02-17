const EMPTY = '';

export const hasAllSameCharacters = (stringValue: string): boolean => {
    const [firstChar] = stringValue;
    return [...stringValue].every(char => char === firstChar);
}

export const getOnlyDigits = (stringValue: string): string => {
    return stringValue.replace(/[.-]/g, EMPTY);
}