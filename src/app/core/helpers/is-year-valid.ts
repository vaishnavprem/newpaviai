import {AbstractControl, ValidatorFn, FormGroup} from '@angular/forms';
import * as moment from 'moment';

export function isYearValid(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const year = control.value;
    if (!year) {
      return null;
    }
    const y = moment(year, 'YYYY');

    return y > moment() || y < moment(1950, 'YYYY') ? {yearInvalid: {year}} : null;
  };
}
