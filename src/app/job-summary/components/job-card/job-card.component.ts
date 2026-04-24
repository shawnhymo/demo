import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { StatusBadgePipe } from '../../pipes/status-badge.pipe';
import { JobSummaryDataModel } from '../../models/job-summary.data.model';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [StatusBadgePipe],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobCardComponent {
  job = input.required<JobSummaryDataModel.Item>();

  viewDetails = output<string>();
}