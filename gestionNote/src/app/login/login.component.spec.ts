import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { timer } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait valider le modèle d’e-mail', () => {
    component.emailLogin = 'invalid-email';
    component.passwordLogin = 'valid-password';
    component.connexion();
    expect(component.alertMessage).toHaveBeenCalledWith('error', 'Attention', 'Veillez revoir votre email', timer);
  });

  it('doit valider la longueur du mot de passe', () => {
    component.emailLogin = 'valid-email@example.com';
    component.passwordLogin = 'short';
    component.connexion();
    expect(component.alertMessage).toHaveBeenCalledWith('error', 'Attention', 'Le mot de passe doit contenir plus de huit caractéres', timer);
  });

  // Add more test cases based on your requirements

  // Mock the alertMessage function
  beforeEach(() => {
    spyOn(component, 'alertMessage');
  });
});

