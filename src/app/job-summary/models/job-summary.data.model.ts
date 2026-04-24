/**
 * TODO: Define the domain model for a job summary item.
 *
 * This should be a camelCase representation of DtoJobSummaryDataModel.Item.
 * Use a namespace to match the convention used throughout this codebase.
 *
 * Example structure:
 *
 *   export namespace JobSummaryDataModel {
 *     export interface Item {
 *       // your fields here
 *     }
 *   }
 * 
 * 
 */
export namespace JobSummaryDataModel {
    export interface Item {
        jobId: string;
        padName: string;
        statusName: string;
        regionName: string;
        planStartDate: string;
        daysPlanned: number;
        percentComplete: number;
    }
}