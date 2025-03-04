import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSpecialtiesComponent } from './user-specialties/user-specialties.component';
import { ManagementSpecialtiesComponent } from './management-specialties/management-specialties.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'home',
        component: LayoutComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'user-specialties',
                component: UserSpecialtiesComponent
            },
            {
                path: 'management-specialties',
                component: ManagementSpecialtiesComponent
            },
            {
                path: 'users',
                component: UsersComponent
            }
        ]
    }
];
