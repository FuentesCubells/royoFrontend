import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EndComponentComponent } from './pages/end/end-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'submited', component: EndComponentComponent },
    { path: '**', redirectTo: '/home' }
];
