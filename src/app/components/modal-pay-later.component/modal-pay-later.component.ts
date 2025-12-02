import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-pay-later',
  imports: [],
  templateUrl: './modal-pay-later.component.html',
  styleUrl: './modal-pay-later.component.css',
})
export class ModalPayLaterComponent {

  @Input({ required: true }) opened: boolean = false;
  @Output() payLaterClosed = new EventEmitter<void>();

  public close(): void {
    this.payLaterClosed.emit();
  }

}
