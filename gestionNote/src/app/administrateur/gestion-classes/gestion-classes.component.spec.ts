import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GestionClassesComponent } from './gestion-classes.component';

describe('GestionClassesComponent', () => {
  let component: GestionClassesComponent;
  let fixture: ComponentFixture<GestionClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionClassesComponent],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(GestionClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('doit ajouter une classe lorsque ajoutClassesValider est appelé avec un nom valide', () => {
    component.nomClasse = 'New Class';
    const previousLength = component.tabClasses.length;
    component.ajoutClassesValider();
    expect(component.tabClasses.length).toEqual(previousLength + 1);
  });

  it('ne doit pas ajouter de classe lorsque ajoutClassesValider est appelé avec un nom vide', () => {
    component.nomClasse = '';
    const previousLength = component.tabClasses.length;
    component.ajoutClassesValider();
    expect(component.tabClasses.length).toEqual(previousLength);
  });

  it('doit mettre à jour le nom de la classe lorsque modierClasse est appelé', () => {
    const originalName = 'Original Class';
    component.currentClasse = { idClasse: 1, nom: originalName };
    component.nom = 'Updated Class';
    component.modierClasse();
    expect(component.currentClasse.nom).toEqual('Updated Class');
  });
});
