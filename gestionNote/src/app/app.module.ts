import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HeaderAdminComponent } from './header-footer/admin-h-f/header-admin/header-admin.component';
import { FooterAdminComponent } from './header-footer/admin-h-f/footer-admin/footer-admin.component';
import { GestionMatieresComponent } from './administrateur/gestion-matieres/gestion-matieres.component';
import { GestionClassesComponent } from './administrateur/gestion-classes/gestion-classes.component';
import { GestionEtudiantsComponent } from './administrateur/gestion-etudiants/gestion-etudiants.component';
import { GestionProfsComponent } from './administrateur/gestion-profs/gestion-profs.component';
import { AdminComponent } from './administrateur/admin/admin.component';
import { NgModule } from '@angular/core';
import { ProfesseurComponent } from './formateur/professeur/professeur.component';
import { GestionEvaluationComponent } from './formateur/gestion-evaluation/gestion-evaluation.component';
import { GestionNoteComponent } from './formateur/gestion-note/gestion-note.component';
import { EtudiantComponent } from './etudiant/etudiant/etudiant.component';

@NgModule({

  declarations: [
    AppComponent,
    AdminComponent,
    GestionProfsComponent,
    GestionEtudiantsComponent,
    LoginComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    GestionMatieresComponent,
    GestionClassesComponent,
    ProfesseurComponent,
    GestionEvaluationComponent,
    GestionNoteComponent,
    EtudiantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
