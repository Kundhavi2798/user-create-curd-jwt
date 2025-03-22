import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {DashboardComponent} from "./dashboard/dashboard.component";

export const appRoutes: Routes = [  // ✅ Ensure this is a valid array
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    {path : 'dashboard', component : DashboardComponent},
    { path: '**', redirectTo: '/login' }
];
