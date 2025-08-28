
import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { AddUserComponent } from "./features/users/add-user/add-user.component";
import { UserDetailComponent } from "./features/users/user-detail/user-detail.component";
import { UserEditComponent } from "./features/users/user-edit/user-edit.component";
import { UserListComponent } from "./features/users/user-list/user-list.component";
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
{ path: '', component: HomeComponent, title: 'Home' },
{ path: 'users', component: UserListComponent, title: 'Usuarios' },
{
path: 'users/:id',
component: UserDetailComponent,
title: 'Detalle de usuario',
children: [
{ path: 'edit', component: UserEditComponent, title: 'Editar usuario' },
],
},
{ path: 'add-user', component: AddUserComponent, canActivate: [authGuard], title: 'Añadir usuario' },
{ path: '**', redirectTo: '' },
];