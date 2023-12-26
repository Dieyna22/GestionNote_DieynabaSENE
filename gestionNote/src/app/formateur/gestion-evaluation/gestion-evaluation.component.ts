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
        etat:1,
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
  deleteEvaluation(index: number) {
    // alert('test delete')
    if (this.tabEvaluationFormateur[index].status === 'faite') {
      // Ne supprimez pas une évaluation faite
      this.sweet("warning", "Attention!", "Impossible de supprimer une évaluation déjà faite.");
    } else {
      Swal.fire({
        title: "Etes-vous sur???",
        text: "voulez-vous Supprimer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD99BB",
        cancelButtonColor: "#F2D4CC",
        confirmButtonText: "Oui !"
      }).then((result) => {
        if (result.isConfirmed) {
          this.tabEvaluationFormateur[index].etat = 0;
          localStorage.setItem("formateurs", JSON.stringify(this.tabFormateur));
          this.sweet("success", "Suppresion", "Evaluation Supprimer")
        }
      });
      
    }
  }

  // variable qui stock l'evaluation selectionner
  currentEvaluation: any;
  // Methode pour charger les infos de l'evaluation à modifier
  chargerInfosEvaluation(paramEvaluation: any) {
    this.currentEvaluation = paramEvaluation;
    this.type = paramEvaluation.type;
    this.semester = paramEvaluation.semester;
    this.classe = paramEvaluation.Classe;
    this.status = paramEvaluation.status;
    this.date = paramEvaluation.date;
    this.subject = paramEvaluation.subject;
  }

  modierEvaluation() {
    this.currentEvaluation.type = this.type;
    this.currentEvaluation.semester = this.semester;
    this.currentEvaluation.Classe = this.classe;
    this.currentEvaluation.status = this.status;
    this.currentEvaluation.date = this.date;
    this.currentEvaluation.subject = this.subject;
    localStorage.setItem("formateurs", JSON.stringify(this.tabFormateur));
  }
}
