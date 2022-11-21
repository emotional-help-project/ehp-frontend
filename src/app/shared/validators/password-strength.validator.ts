
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const passwordValid = /^[a-zA-Z0-9]+$/.test(value);

        return !passwordValid ? {passwordStrength:true}: null;
    }
}