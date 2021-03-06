import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path:'signin', component: SigninComponent },
  { path:'signup', component: SignupComponent},
  {path:'dashboard', canActivate: [AuthGuard], component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
export const routingComponents = [
  SigninComponent,
  SignupComponent,
  DashboardComponent
]