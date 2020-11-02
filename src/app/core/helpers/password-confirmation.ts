import {FormGroup} from '@angular/forms';

export function passwordConfirmation(key: string, confirmationKey: string) {
  return (group: FormGroup) => {
    const input = group.controls[key];
    const confirmationInput = group.controls[confirmationKey];
    return confirmationInput.setErrors(
      input.value !== confirmationInput.value ? {notEquivalent: true} : null
    );
  };
}
