/// <reference types="jasmine" />

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { JOB_SUMMARY_MOCK } from '../../mock/job-summary.mock';
import { JobSummaryDataService } from '../job-summary.data.service';
import { JobStateService } from './job-state.service';

describe('JobStateService', () => {
  let service: JobStateService;
  let dataService: jasmine.SpyObj<JobSummaryDataService>;

  beforeEach(() => {
    dataService = jasmine.createSpyObj<JobSummaryDataService>(
      'JobSummaryDataService',
      ['getJobs', 'getJobById']
    );

    dataService.getJobs.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        JobStateService,
        {
          provide: JobSummaryDataService,
          useValue: dataService
        }
      ]
    });

    service = TestBed.inject(JobStateService);
  });

  function loadJobs(): void {
    service.loadJobs();
    TestBed.flushEffects();
    tick();
  }

  it('loads jobs and maps DTOs to the domain model', fakeAsync(() => {
    dataService.getJobs.and.returnValue(of(JOB_SUMMARY_MOCK));

    loadJobs();

    expect(service.jobs().length).toBe(8);
    expect(service.jobs()[0]).toEqual({
      jobId: 'job-001',
      padName: 'Permian Basin Alpha',
      statusName: 'Active',
      regionName: 'Permian',
      planStartDate: '2025-03-01',
      daysPlanned: 45,
      percentComplete: 62
    });
    expect(service.error()).toBeNull();
    expect(service.loading()).toBeFalse();
  }));

  it('filters jobs by selected region', fakeAsync(() => {
    dataService.getJobs.and.returnValue(of(JOB_SUMMARY_MOCK));

    loadJobs();

    service.updateRegion('Permian');

    expect(service.filteredJobs().length).toBe(2);
    expect(service.filteredJobs().every(job => job.regionName === 'Permian')).toBeTrue();
  }));

  it('filters jobs by selected status', fakeAsync(() => {
    dataService.getJobs.and.returnValue(of(JOB_SUMMARY_MOCK));

    loadJobs();

    service.updateStatus('Planned');

    expect(service.filteredJobs().length).toBe(2);
    expect(service.filteredJobs().every(job => job.statusName === 'Planned')).toBeTrue();
  }));

  it('filters jobs by region and status together', fakeAsync(() => {
    dataService.getJobs.and.returnValue(of(JOB_SUMMARY_MOCK));

    loadJobs();

    service.updateRegion('Permian');
    service.updateStatus('Active');

    expect(service.filteredJobs().length).toBe(2);
    expect(
      service.filteredJobs().every(
        job => job.regionName === 'Permian' && job.statusName === 'Active'
      )
    ).toBeTrue();
  }));

  it('clears selected filters', fakeAsync(() => {
    dataService.getJobs.and.returnValue(of(JOB_SUMMARY_MOCK));

    loadJobs();

    service.updateRegion('Permian');
    service.updateStatus('Active');

    expect(service.filteredJobs().length).toBe(2);

    service.resetFilters();

    expect(service.selectedRegion()).toBeNull();
    expect(service.selectedStatus()).toBeNull();
    expect(service.filteredJobs().length).toBe(8);
  }));

  it('exposes available regions and statuses', fakeAsync(() => {
    dataService.getJobs.and.returnValue(of(JOB_SUMMARY_MOCK));

    loadJobs();

    expect(service.availableRegions()).toEqual([
      'Eagle Ford',
      'Haynesville',
      'Marcellus',
      'Permian'
    ]);

    expect(service.availableStatuses()).toEqual([
      'Active',
      'Complete',
      'On Hold',
      'Planned'
    ]);
  }));

  it('stores an error message when loading jobs fails', fakeAsync(() => {
    dataService.getJobs.and.returnValue(
      throwError(() => new Error('Failed to load jobs. Please try again.'))
    );

    loadJobs();

    expect(service.error()).toBe('Failed to load jobs. Please try again.');
    expect(service.jobs()).toEqual([]);
    expect(service.loading()).toBeFalse();
  }));

  it('retries loading jobs after an error', fakeAsync(() => {
    dataService.getJobs.and.returnValues(
      throwError(() => new Error('Failed to load jobs. Please try again.')),
      of(JOB_SUMMARY_MOCK)
    );

    loadJobs();

    expect(service.error()).toBe('Failed to load jobs. Please try again.');
    expect(service.jobs()).toEqual([]);

    loadJobs();

    expect(dataService.getJobs).toHaveBeenCalledTimes(2);
    expect(service.error()).toBeNull();
    expect(service.jobs().length).toBe(8);
  }));
});