import {Component, signal, ViewChild, WritableSignal} from '@angular/core';
import {DidOpenEvent, SwalComponent, SwalDirective, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import {SidebarComponent} from '../sidebar.component/sidebar.component';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ModalViewOffer} from '../modal-view-offer/modal-view-offer';
import {CartIndicator} from '../cart-indicator/cart-indicator';

@Component({
  selector: 'app-header',
  imports: [
    SwalDirective,
    SwalComponent,
    SidebarComponent,
    RouterLink,
    RouterLinkActive,
    ModalViewOffer,
    CartIndicator
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  @ViewChild("search")
  public readonly swal!: SwalComponent;

  protected logoSrc: string = '/assets/images/Logo-White@2x.png';
  protected logoMobileSrc: string = '/assets/images/Logo@2x.png';

  //Signals
  public openMenu: WritableSignal<boolean> = signal(false);
  public openSubmenu: WritableSignal<boolean> = signal(false);
  public openSubmenu2: WritableSignal<boolean> = signal(false);

  public viewOfferOpened: boolean = false;

  public constructor(public readonly swalTargets: SwalPortalTargets, private readonly router: Router) {

  }

  public onViewOfferClick(): void {
    this.viewOfferOpened = true;
  }

  public onViewOfferClosed(): void {
    this.viewOfferOpened = false;
  }

  public toTop(e: MouseEvent): void {
    e.preventDefault();

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  public hamburgerOnClick(): void {
    this.openMenu.update(value => !value);
  }

  public submenuOnClick(id: number): void {

    if (id === 0) {
      this.openSubmenu.update(value => !value);
    }
    else {
      this.openSubmenu2.update(value => !value);
    }
  }

  public swalDidOpen(e: DidOpenEvent): void {

    // @ts-ignore
    e.modalElement.parentElement.classList.add('shown');

    let form: HTMLFormElement | null = e.modalElement.querySelector(".jkit-search-group");

    if (form) {
      form.addEventListener('submit', this.onSubmit.bind(this));
    }
  }

  public onSubmit(e: SubmitEvent): void {
    e.preventDefault();

    let form: HTMLFormElement = e.currentTarget as HTMLFormElement;
    let input: HTMLInputElement | null = form.querySelector('input');

    if (input && input.value !== '') {
      switch (input.value) {
        case 'about':
        case 'About':
          this.router.navigate(['/about']).then();
          this.swal.close();
          break;
      }
    }
    else if (input && input.value === '') {
      input.value = 'Oopss...Type something!';

    }
  }
}
