import { Routes } from '@angular/router';

import { JobsListComponent } from './job-summary/components/jobs-list/jobs-list.component';
import { JobDetailComponent } from './job-summary/components/job-detail/job-detail.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'jobs'
  },
  {
    path: 'jobs',
    component: JobsListComponent
  },
  {
    path: 'jobs/:id',
    component: JobDetailComponent
  },
  {
    path: '**',
    redirectTo: 'jobs'
  }
];
