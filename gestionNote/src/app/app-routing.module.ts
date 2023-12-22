import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// composants importés
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './administrateur/admin/admin.component';
import { ProfesseurComponent } from './formateur/professeur/professeur.component';
import { EtudiantComponent } from './etudiant/etudiant/etudiant.component';


const routes: Routes = [
  { path: '', redirectTo : 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: LoginComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'prof/:id', component: ProfesseurComponent },
  { path: 'etudiant/:id', component: EtudiantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
