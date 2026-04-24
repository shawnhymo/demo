import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobStateService } from '../../store/job-state.service';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobFilterBarComponent } from '../job-filter-bar/job-filter-bar.component';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [JobFilterBarComponent, JobCardComponent],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit {
  protected readonly stateService = inject(JobStateService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.stateService.loadJobs();
  }

  protected openDetails(jobId: string): void {
    this.router.navigate(['/jobs', jobId]);
  }
}