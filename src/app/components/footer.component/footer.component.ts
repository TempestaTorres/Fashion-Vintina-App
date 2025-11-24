import {Component, signal, WritableSignal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  protected logoSrc: string = '/assets/images/Logo@2x.png';
  public mailchimpMessage: string = '';

  public formSignupGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public listed: WritableSignal<boolean> = signal(false);
  public wrong: WritableSignal<boolean> = signal(false);


  constructor(private readonly router: Router) {}

  get email() { return this.formSignupGroup.get('email'); };

  public onSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (this.formSignupGroup.valid) {
      console.log(this.formSignupGroup.value);

      this.formSignupGroup.reset();

      this.sendMessage('Successfully listed this email');
    }
    else {

      this.sendMessage('Something went wrong', true);

    }

  }

  private sendMessage(message: string, error: boolean = false): void {

    if (!error) {
      this.listed.set(true);
    }
    else {
      this.wrong.set(true);
    }

    this.mailchimpMessage = message;

    setTimeout(() => {

      this.listed.set(false);
      this.wrong.set(false);

    }, 2000);
  }
}
