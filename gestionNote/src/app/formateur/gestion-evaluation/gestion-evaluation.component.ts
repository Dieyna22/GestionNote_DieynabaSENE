import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evaluations } from 'src/app/models/evaluation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-evaluation',
  templateUrl: './gestion-evaluation.component.html',
  styleUrls: ['./gestion-evaluation.component.css']
})
export class GestionEvaluationComponent implements OnInit {
  // Déclaration du tableau pour ajouter les evaluations
  evaluations: Evaluations[] = [];

  semester: string='';
  date: string = '';
  type: string='';
  status: string = '';
  subject: string = '';
  classe: string = '';


  db: any;
  dbMatiere: any;
  tabFormateur: any;
  formateurConnect: any;
  tabEvaluationFormateur:any;

  tabEvaluation: any;
  idLastEvaluation: number = 0;

  constructor(private route: ActivatedRoute) { }
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  ngOnInit() {
    if (!localStorage.getItem("Evaluations")) {
      localStorage.setItem("Evaluations", JSON.stringify(this.evaluations));
    }

    this.tabEvaluation = JSON.parse(localStorage.getItem("Evaluations") || "[]");
    console.log(this.tabEvaluation);

    this.tabFormateur = JSON.parse(localStorage.getItem("formateurs") || "[]");
    console.log(this.tabFormateur);
  
    this.formateurConnect = this.tabFormateur.find((element: any) => element.idFormateur == this.idUserConnect);
    this.tabEvaluationFormateur = this.formateurConnect.evaluation;


    this.dbMatiere = JSON.parse(localStorage.getItem("matieres") || "[]");
   

    this.db = JSON.parse(localStorage.getItem("Classes") || "[]");
  }

  // Méthode pour afficher un sweetalert2 apres vérification 
  sweet(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // Methode pour valider l'ajout de l'apprenants
  ajoutEvaluationsValider() {
    if (this.semester == "" || this.date == "" || this.type == "" || this.status == "" || this.subject== "" || this.classe == "") {
      this.sweet("error", "Erreur!", "Vueillez renseigner les champs");
    }else {
      // On vérifie si le tableau n'est pas vide 
      if (this.tabEvaluation.length) {
        console.warn("taille du tab");
        this.idLastEvaluation = this.tabEvaluation[this.tabEvaluation.length - 1].idEvaluation
          ;
        console.log(this.idLastEvaluation)
      }
      else {
        this.idLastEvaluation = 0;
        console.warn("idLastEvaluation = 0")
      }
      // Création de l'objet apprenant
      let evaluation = {
        idEvaluation: this.idLastEvaluation+1,
        semester: this.semester,
        date: this.date,
        type: this.type,
        status: this.status,
        subject: this.subject,
        Classe: this.classe,
      }
      this.tabEvaluation.push(evaluation);
      this.tabEvaluationFormateur.push(evaluation);
      localStorage.setItem("Evaluations", JSON.stringify(this.tabEvaluation));
      this.sweet('success', 'Felicitation!', 'Ajout Evaluation reuissie');
      this.semester ='';
      this.date ='';
      this.type ='';
      this.status ='';
      this.subject ='';
      this.classe = '';
      
      // On met à jour le tableau qui est stocké dans le localStorage 
      localStorage.setItem("formateurs", JSON.stringify(this.tabFormateur));
        console.log(this.tabFormateur);
    }

  }
}
