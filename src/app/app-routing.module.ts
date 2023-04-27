import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { VarifyEmailComponent } from './core/varify-email/varify-email.component';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "varify-email", component: VarifyEmailComponent},
  {path: "forgot-password", component: ForgotPasswordComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
