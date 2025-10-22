import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SignUp } from './sign-up/sign-up'
import { HomePage } from './home-page/home-page';
import { SignIn } from './sign-in/sign-in';
import { PatientList } from './patient-list/patient-list';
import { PatientPage } from './patient-page/patient-page';


export const routes: Routes = [
    { path:'signUp', component: SignUp },
    { path: '', component: HomePage},
    {path:'signIn', component: SignIn},
    {path:'patientsList', component: PatientList},
    {path:'patient/:id', component: PatientPage}
];
