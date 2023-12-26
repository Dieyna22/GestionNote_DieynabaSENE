export class Evaluations {
  idEvaluation: number = 0;
  semester: string = '';
  date: Date = new Date();
  type: string = '';
  status: string = '';
  subject: string = '';
  Classe: string = ''; 
  etat: number = 0;
}

export interface Evaluation {
  id: number;
  nom: string;
}

