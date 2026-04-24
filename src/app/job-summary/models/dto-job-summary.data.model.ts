/**
 * Raw API response shapes — provided, do not modify.
 *
 * These interfaces represent the snake_case JSON returned by the backend.
 * Your task is to define a camelCase domain model and a mapper in the
 * adjacent files.
 */
export namespace DtoJobSummaryDataModel {
  export interface Item {
    job_id: string;
    pad_name: string;
    status_name: string;
    region_name: string;
    plan_start_date: string;
    days_planned: number;
    percent_complete: number;
  }
}
