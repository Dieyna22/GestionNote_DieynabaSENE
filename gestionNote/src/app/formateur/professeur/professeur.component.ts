import { Component } from '@angular/core';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent {
  // Gestion bouton
  boutonActif = 1;

  // Initialiser le contenu actuel
  currentContent: string = 'gestionEvaluation';

  // Mettre à jour le contenu actuel
  showComponant(contentId: string): void {
    this.currentContent = contentId;
  }
}
