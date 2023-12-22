import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent {
  // Gestion bouton
  boutonActif = 1;

  showDevoir: boolean = true;
  showSemestre: boolean = true;
  Semestre1!: string;
  buttontext!: string;
  Afficher() {
    this.showDevoir = !this.showDevoir
  }

  tabClasse: any;
  tabApprenant: any;
  tabNotes: any;
  ApprenantConnect: any;
  notes: any;
  noteForm: any;
  // Définition du constructeur 


  constructor(private route: ActivatedRoute) { }
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];


  ngOnInit(): void {
    this.buttontext = "Semestre1"

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabClasse = JSON.parse(localStorage.getItem("Classes") || "[]");
    console.log(this.tabClasse);

    this.tabApprenant = JSON.parse(localStorage.getItem("Apprenants") || "[]");
    this.tabNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
    console.log(this.tabApprenant);

    // On récupère l'objet qui s'est connecté 
    this.ApprenantConnect = this.tabApprenant.find((element: any) => element.idApprenant == this.idUserConnect);
    console.log(this.ApprenantConnect);
  }

  affichesem() {
    this.showSemestre = !this.showSemestre;
    if (this.buttontext == "Semestre1") {
      this.buttontext = "Semestre2"
    }
    else {
      this.buttontext = "Semestre1"
    }
  }
}
