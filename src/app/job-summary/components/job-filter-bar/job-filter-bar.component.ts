import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-job-filter-bar',
  standalone: true,
  imports: [],
  templateUrl: './job-filter-bar.component.html',
  styleUrl: './job-filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobFilterBarComponent {
  regions = input.required<string[]>();
  statuses = input.required<string[]>();

  selectedRegion = input<string | null>(null);
  selectedStatus = input<string | null>(null);

  regionChanged = output<string | null>();
  statusChanged = output<string | null>();
  filtersCleared = output<void>();

  protected onRegionChange(value: string): void {
    this.regionChanged.emit(value || null);
  }

  protected onStatusChange(value: string): void {
    this.statusChanged.emit(value || null);
  }
}
