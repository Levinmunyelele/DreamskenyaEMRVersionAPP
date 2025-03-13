import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patients',
  standalone: true
})
export class PatientsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
