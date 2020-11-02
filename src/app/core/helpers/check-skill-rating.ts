import {AbstractControl, ValidatorFn, FormGroup} from '@angular/forms';
import * as moment from 'moment';

export function checkSkillRating(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const rating = control.value;
    if (!rating) {
      return null;
    }


    return rating > 100 ? {ratingInvalid: {rating}} : null;
  };
}
