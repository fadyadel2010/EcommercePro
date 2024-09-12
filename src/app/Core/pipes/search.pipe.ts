import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(ArrayOfProduct:any[] , word:string): any[] {
    return ArrayOfProduct.filter((item)=> item.title.toLowerCase().includes(word.toLocaleLowerCase()) );
  }

}
