import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../app/login/login.component";
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { HistoryComponent } from './pages/presentation/history/history.component';
import { PresentationComponent } from './pages/presentation/presentation/presentation.component';
import { HomeComponent } from './pages/home/home/home.component';

// Auth Guard
import { AuthGuard } from './services/auth.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
      
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children:[
          {path: 'dashboard', component: DashboardComponent},
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },

//   { path: 'main', component: MainComponent, canActivate: [AuthGuard],
//   children:[
//     {path: 'dashboard', component: DashboardComponent},
//     {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   ]
//   },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children:[
      {path: 'dashboard', component: DashboardComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]

  },
  
{path: 'presentation', component: PresentationComponent, canActivate: [AuthGuard]},
{path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }