import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true
})
export class SalePipe implements PipeTransform {

  transform(firetext:any): any {
    return firetext = `🔥${firetext} EGP🔥`;
  }

}
