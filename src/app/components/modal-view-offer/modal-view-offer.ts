import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-modal-view-offer',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './modal-view-offer.html',
  styleUrl: './modal-view-offer.css',
})
export class ModalViewOffer {

  @Input({required: true}) opened: boolean = false;
  @Output() close = new EventEmitter<any>();

  public dialogName: string = 'Sign Up via Text for Offers — Vintina';
  public closed: boolean = false;
  public confirmed: boolean = false;

  // Form group
  public viewOfferFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    birthday: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
  });

  constructor() {
  }

  public onCancel(): void {

    this.closed = true;

    setTimeout(() => {
      this.opened = false;
      this.closed = false;
      this.close.emit();
    }, 1000);
  }

  public onOk(e: SubmitEvent): void {
    e.preventDefault();

    if (!this.confirmed) {
      this.confirmed = true;
    }
    else if(this.confirmed) {

      if (this.viewOfferFormGroup.valid) {

        this.viewOfferFormGroup.reset();
        this.confirmed = false;
        this.onCancel();
      }

    }
  }
}
