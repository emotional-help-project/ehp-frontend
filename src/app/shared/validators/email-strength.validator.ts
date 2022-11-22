
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createEmailStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const emailValid = /^[^-\W][\w.-]+@\w+\.\w+$/.test(value);

        return !emailValid ? {emailStrength:true}: null;
    }
}