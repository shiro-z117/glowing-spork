import validator from "validator";

export function isValidEmail(email: string): boolean {
    return validator.isEmail(email);
}

export function isValidPhone(phone: string): boolean {
    return validator.isMobilePhone(phone, "en-US");
}