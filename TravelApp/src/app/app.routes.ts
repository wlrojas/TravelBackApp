import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'entries',
    loadComponent: () => import('./entries/entries.page').then( m => m.EntriesPage)
  },
  {
    path: 'entry-detail/:id',
    loadComponent: () => import('./entry-detail/entry-detail.page').then( m => m.EntryDetailPage)
  },
  {
    path: 'add-edit-entry',
    loadComponent: () => import('./add-edit-entry/add-edit-entry.page').then( m => m.AddEditEntryPage)
  },
  {
    path: 'add-edit-entry/:id',
    loadComponent: () => import('./add-edit-entry/add-edit-entry.page').then(m => m.AddEditEntryPage)
  },
  {
    path: 'random-memory',
    loadComponent: () => import('./random-memory/random-memory.page').then(m => m.RandomMemoryPage)
  },
];
