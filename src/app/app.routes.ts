import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenGuard } from '../../Services/TokenGuard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SampleViewComponent } from './sample-view/sample-view.component';

export const routes: Routes = [
    {path:'', component:DashboardComponent, canActivate: [TokenGuard]},
    {path:'Login', component:LoginComponent},
    {path:'Register', component:RegisterComponent},
    {path:'Guest', component:SampleViewComponent}
    ];
