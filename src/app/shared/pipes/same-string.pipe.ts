import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sameString'
})
export class SameStringPipe implements PipeTransform {

  transform(type: string): string {
    return type;
  }

}
