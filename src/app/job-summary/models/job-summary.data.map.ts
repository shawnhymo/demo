import { DtoJobSummaryDataModel } from './dto-job-summary.data.model';
// TODO: Import JobSummaryDataModel once you've defined it.
// import { JobSummaryDataModel } from './job-summary.data.model';

/**
 * TODO: Implement the mapper function.
 *
 * Transform a raw DTO item into the camelCase domain model.
 * Keep this function pure — no side effects, no service injection.
 *
 * Signature (fill in the return type once your model is defined):
 *
 *   export function mapDtoToJobSummaryItem(
 *     dto: DtoJobSummaryDataModel.Item
 *   ): JobSummaryDataModel.Item { ... }
 */



import { JobSummaryDataModel } from './job-summary.data.model';

export function mapDtoToJobSummaryItem(
  dto: DtoJobSummaryDataModel.Item
): JobSummaryDataModel.Item {
  return {
    jobId: dto.job_id,
    padName: dto.pad_name,
    statusName: dto.status_name,
    regionName: dto.region_name,
    planStartDate: dto.plan_start_date,
    daysPlanned: dto.days_planned,
    percentComplete: dto.percent_complete
  };
}