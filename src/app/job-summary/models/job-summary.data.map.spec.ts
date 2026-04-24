/// <reference types="jasmine" />

import { DtoJobSummaryDataModel } from './dto-job-summary.data.model';
import { mapDtoToJobSummaryItem } from './job-summary.data.map';

describe('mapDtoToJobSummaryItem', () => {
  it('maps every field from snake_case DTO to camelCase domain model', () => {
    const dto: DtoJobSummaryDataModel.Item = {
      job_id: 'job-001',
      pad_name: 'Permian Basin Alpha',
      status_name: 'Active',
      region_name: 'Permian',
      plan_start_date: '2025-03-01',
      days_planned: 45,
      percent_complete: 62
    };

    const result = mapDtoToJobSummaryItem(dto);

    expect(result).toEqual({
      jobId: 'job-001',
      padName: 'Permian Basin Alpha',
      statusName: 'Active',
      regionName: 'Permian',
      planStartDate: '2025-03-01',
      daysPlanned: 45,
      percentComplete: 62
    });
  });
});