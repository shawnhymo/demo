import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { DtoJobSummaryDataModel } from './models/dto-job-summary.data.model';
import { JOB_SUMMARY_MOCK } from '../mock/job-summary.mock';

/**
 * Provided data service — do not modify.
 *
 * Simulates a real API: includes network latency and will randomly fail
 * ~40% of the time to reflect real-world service instability.
 */
@Injectable({ providedIn: 'root' })
export class JobSummaryDataService {
  getJobs(): Observable<DtoJobSummaryDataModel.Item[]> {
    return of(null).pipe(
      delay(400),
      mergeMap(() =>
        Math.random() < 0.25
          ? throwError(() => new Error('Failed to load jobs. Please try again.'))
          : of(JOB_SUMMARY_MOCK)
      )
    );
  }

  getJobById(jobId: string): Observable<DtoJobSummaryDataModel.Item> {
    return of(null).pipe(
      delay(200),
      mergeMap(() => {
        if (Math.random() < 0.25) {
          return throwError(() => new Error('Failed to load job details. Please try again.'));
        }
        const item = JOB_SUMMARY_MOCK.find(j => j.job_id === jobId);
        return item ? of(item) : throwError(() => new Error(`Job '${jobId}' not found.`));
      })
    );
  }
}
