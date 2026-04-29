import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, finalize, map, of, switchMap, tap } from 'rxjs';

import { JobSummaryDataService } from '../job-summary.data.service';
import { JobSummaryDataModel } from '../models/job-summary.data.model';
import { mapDtoToJobSummaryItem } from '../models/job-summary.data.map';

@Injectable({ providedIn: 'root' })
export class JobStateService {
  private readonly api = inject(JobSummaryDataService);

  private readonly reloadCount = signal(0);
  private readonly busy = signal(false);
  private readonly loadError = signal<string | null>(null);

  private readonly activeRegion = signal<string | null>(null);
  private readonly activeStatus = signal<string | null>(null);

  private readonly selectedJob = signal<JobSummaryDataModel.Item | null>(null);
  private readonly selectedJobLoading = signal(false);
  private readonly selectedJobError = signal<string | null>(null);

  readonly loading = this.busy.asReadonly();
  readonly error = this.loadError.asReadonly();

  readonly selectedRegion = this.activeRegion.asReadonly();
  readonly selectedStatus = this.activeStatus.asReadonly();

  readonly jobDetail = this.selectedJob.asReadonly();
  readonly jobDetailLoading = this.selectedJobLoading.asReadonly();
  readonly jobDetailError = this.selectedJobError.asReadonly();

  readonly jobs = toSignal(
    toObservable(this.reloadCount).pipe(
      delay(400),
      tap(() => {
        this.busy.set(true);
        this.loadError.set(null);
      }),
      switchMap(() =>
        this.api.getJobs().pipe(
          map(response => response.map(mapDtoToJobSummaryItem)),
          catchError(error => {
            this.loadError.set(this.readErrorMessage(error));
            return of([] as JobSummaryDataModel.Item[]);
          }),
          finalize(() => this.busy.set(false))
        )
      )
    ),
    { initialValue: [] as JobSummaryDataModel.Item[] }
  );

  readonly availableRegions = computed(() =>
    [...new Set(this.jobs().map(job => job.regionName))].sort()
  );

  readonly availableStatuses = computed(() =>
    [...new Set(this.jobs().map(job => job.statusName))].sort()
  );

  readonly filteredJobs = computed(() => {
    const region = this.activeRegion();
    const status = this.activeStatus();

    return this.jobs().filter(job =>
      (!region || job.regionName === region) &&
      (!status || job.statusName === status)
    );
  });

  loadJobs(): void {
    this.reloadCount.update(value => value + 1);
  }

  retryLoad(): void {
    this.loadJobs();
  }

  updateRegion(region: string | null): void {
    this.activeRegion.set(region);
  }

  updateStatus(status: string | null): void {
    this.activeStatus.set(status);
  }

  resetFilters(): void {
    this.activeRegion.set(null);
    this.activeStatus.set(null);
  }

  loadJobById(jobId: string): void {
    this.selectedJobLoading.set(true);
    this.selectedJobError.set(null);
    this.selectedJob.set(null);

    this.api.getJobById(jobId)
      .pipe(finalize(() => this.selectedJobLoading.set(false)))
      .subscribe({
        next: dto => {
          this.selectedJob.set(mapDtoToJobSummaryItem(dto));
        },
        error: error => {
          this.selectedJobError.set(this.readErrorMessage(error));
        }
      });
  }

  retryJobById(jobId: string): void {
    this.loadJobById(jobId);
  }

  private readErrorMessage(error: unknown): string {
    return error instanceof Error
      ? error.message
      : 'Failed to load jobs. Please try again.';
  }
}