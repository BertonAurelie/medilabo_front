import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SignUp } from './sign-up/sign-up'
import { HomePage } from './home-page/home-page';
import { SignIn } from './sign-in/sign-in';

export const routes: Routes = [
    { path:'signUp', component: SignUp },
    { path: '', component: HomePage},
    {path:'signIn', component: SignIn}
];
