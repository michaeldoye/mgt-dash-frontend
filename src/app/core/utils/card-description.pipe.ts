import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardDescription'
})
export class CardDescriptionPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) return;
    const symbols = {
      '{B}': '<i class="ms ms-b"></i>',
      '{G}': '<i class="ms ms-g"></i>',
      '{W}': '<i class="ms ms-w"></i>',
      '{U}': '<i class="ms ms-u"></i>',
      '{R}': '<i class="ms ms-u"></i>',
      '{C}': '<i class="ms ms-c"></i>',
      '{X}': '<i class="ms ms-x inline"></i>',
      '{T}': '<i class="ms ms-tap"></i>',
    }
    return value.replace(new RegExp(Object.keys(symbols).join("|"), "g"), (m) => symbols[m] || '')
      .replace(/\{(\d)}/g, '<i class="ms ms-$1 inline"></i>');
  }

}
