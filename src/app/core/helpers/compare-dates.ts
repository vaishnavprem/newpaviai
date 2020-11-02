import {FormGroup} from '@angular/forms';
import * as moment from 'moment';

export function compareDates(start: string, end: string) {
  return (group: FormGroup): { [key: string]: any } => {
    const from = group.controls[start];
    const to = group.controls[end];

    if (from.errors && !from.errors.startDateGreater) {
      return;
    }

    if (moment(from.value, 'YYYY').unix() > moment(to.value, 'YYYY').unix()) {
      from.setErrors({startDateGreater: true});
    } else {
      from.setErrors(null);
    }
  };
}
