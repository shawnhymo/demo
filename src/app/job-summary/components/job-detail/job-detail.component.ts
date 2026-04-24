import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobStateService } from '../../store/job-state.service';

// TODO: Detail view for a single job, routed via /jobs/:id.
@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobDetailComponent {
  protected stateService = inject(JobStateService);
  private readonly route = inject(ActivatedRoute);

  protected jobId: string | null = null;

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');

    if (this.jobId) {
      this.stateService.loadJobById(this.jobId);
    }
  }

  protected retry(): void {
    if (this.jobId) {
      this.stateService.loadJobById(this.jobId);
    }
  }
}
