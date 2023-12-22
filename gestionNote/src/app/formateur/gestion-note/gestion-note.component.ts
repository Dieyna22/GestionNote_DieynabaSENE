import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notes } from 'src/app/models/notes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-note',
  templateUrl: './gestion-note.component.html',
  styleUrls: ['./gestion-note.component.css']
})
export class GestionNoteComponent {
  // Déclaration du tableau pour ajouter les Notes
  notes: Notes[] = [];

  semester: string = '';
  date: string = '';
  type: string = '';
  student: string = '';
  subject: string = '';
  classe: string = '';
  note: string = '';

  db: any;
  dbMatiere: any;
  tabFormateur: any;
  formateurConnect: any;
  tabNoteFormateur: any;
  tabApprenants: any;
  tabNotes:any;

  tabEvaluation: any;
  idLastNote: number = 0;

  constructor(private route: ActivatedRoute) { }
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  ngOnInit() {
    if (!localStorage.getItem("Notes")) {
      localStorage.setItem("Notes", JSON.stringify(this.notes));
    }

    this.tabNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
    console.log(this.tabNotes);

    this.tabFormateur = JSON.parse(localStorage.getItem("formateurs") || "[]");
    console.log(this.tabFormateur);

    this.formateurConnect = this.tabFormateur.find((element: any) => element.idFormateur == this.idUserConnect);
    this.tabNoteFormateur = this.formateurConnect.note;


    this.dbMatiere = JSON.parse(localStorage.getItem("matieres") || "[]");

    this.tabApprenants = JSON.parse(localStorage.getItem("Apprenants") || "[]");


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
  ajoutNotesValider() {
    if (this.semester == "" || this.date == "" || this.type == "" || this.student == "" || this.note == "" || this.classe == "") {
      this.sweet("error", "Erreur!", "Vueillez renseigner les champs");
    } else {
      // On vérifie si le tableau n'est pas vide 
      if (this.tabNotes.length) {
        console.warn("taille du tab");
        this.idLastNote = this.tabNotes[this.tabNotes.length - 1].idNote
          ;
        console.log(this.idLastNote)
      }
      else {
        this.idLastNote = 0;
        console.warn("idLastNote = 0")
      }
      // Création de l'objet apprenant
      let note = {
        idNote: this.idLastNote + 1,
        semester: this.semester,
        date: this.date,
        type: this.type,
        notes: this.note,
        apprenants: this.student,
        evaluation: this.subject,
        Classe: this.classe,
      }
      this.tabNotes.push(note);
      this.tabNoteFormateur.push(note);
      localStorage.setItem("Notes", JSON.stringify(this.tabNotes));
      localStorage.setItem("Evaluations", JSON.stringify(this.tabEvaluation));
      this.sweet('success', 'Felicitation!', 'Ajout Evaluation reuissie');
      this.semester = '';
      this.date = '';
      this.type = '';
      this.student = '';
      this.note = '';
      this.classe = '';

      // On met à jour le tableau qui est stocké dans le localStorage 
      localStorage.setItem("formateurs", JSON.stringify(this.tabFormateur));
      console.log(this.tabFormateur);
    }

  }
}
