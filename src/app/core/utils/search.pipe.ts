import { Pipe, PipeTransform } from '@angular/core';
import { BackendService } from '../../core/utils/backend.service';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'serchPipe'})
export class SearchPipe implements PipeTransform {
  transform(values: any[], query: string): any[] {
    if (values && query) {
      return values.filter(value => {
        return JSON.stringify(value).toLowerCase().includes(query.toLowerCase());
      });
    }
    return values;
  }
}
