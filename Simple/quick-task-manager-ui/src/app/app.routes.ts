import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component'; // Import the RegisterComponent

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // Add the register route
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task-form', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];