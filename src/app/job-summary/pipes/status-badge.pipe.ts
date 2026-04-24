

// TODO: Transform a status string into the appropriate badge CSS class.
// The badge classes are defined in src/styles.scss.
// @Pipe({
//   name: 'statusBadge',
//   standalone: true
// })
// export class StatusBadgePipe implements PipeTransform {
//   transform(_status: string): string {
//     throw new Error('Not implemented');
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusBadge',
  standalone: true
})
export class StatusBadgePipe implements PipeTransform {
  private readonly classMap: Record<string, string> = {
    active: 'badge--active',
    planned: 'badge--planned',
    complete: 'badge--complete'
  };

  transform(status: string): string {
    if (!status) {
      return 'badge';
    }

    const key = status.trim().toLowerCase();
    const modifier = this.classMap[key];

    return modifier ? `badge ${modifier}` : 'badge';
  }
}
