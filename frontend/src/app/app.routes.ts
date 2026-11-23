import { Routes } from '@angular/router';
import { HabitoLista } from './habito-lista/habito-lista';
import { HabitoForm } from './habito-form/habito-form';

export const routes: Routes = [
  { path: '', redirectTo: 'habitos', pathMatch: 'full' },
  { path: 'habitos', component: HabitoLista },
  { path: 'habitos/novo', component: HabitoForm },
  { path: 'habitos/:id/editar', component: HabitoForm }
];
