import {Component, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'ng-app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  protected logoMobileSrc: string = '/assets/images/Logo@2x.png';
  public sidebarOpened: WritableSignal<boolean> = signal(false);

  public toggleSidebar(e: MouseEvent): void {
    e.preventDefault();
    this.sidebarOpened.update(value => !value);
  }

}
