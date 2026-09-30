import validator from "validator";

export function isValidEmail(email: string): boolean {
    return validator.isEmail(email);
}

export function isValidPhone(phone: string): boolean {
    const value = phone.trim();

    /*
     * Supported:
     *
     * 123-456-7890
     * 123.456.7890
     * 123 456 7890
     * (123) 456-7890
     *
     * 1-123-456-7890
     * 1.123.456.7890
     * 1 123 456 7890
     * 1 (123) 456-7890
     *
     * Optional extensions:
     * x123
     * x12345
     */

    const phoneRegex =
        /^(?:1[\s.-]?)?(?:\(\d{3}\)[\s.-]?\d{3}[\s.-]?\d{4}|\d{3}[\s.-]\d{3}[\s.-]\d{4})(?:\s+x\d{1,6})?$/i;

    return phoneRegex.test(value);
}

export function isValidName(name: string): boolean {
    return name.trim().length > 0;
}
