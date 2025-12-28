import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-modal-text-prompt',
  imports: [
    RouterLink
  ],
  templateUrl: './modal-text-prompt.html',
  styleUrl: './modal-text-prompt.css',
})
export class ModalTextPrompt {
  @Input()
  type!: string;
  @Input()
  opened: boolean = false;
  @Output()
  closed: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
  public close(): void {
    this.closed.emit();
  }
}
