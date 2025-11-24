import { Component } from '@angular/core';
import {ObserveElementDirective} from '../../directives/scroll-observer';
import {NgClass} from '@angular/common';
import {Collection} from '../../components/collection/collection';
import {Router, RouterLink} from '@angular/router';
import {FavoritesComponent} from '../../components/favorites.component/favorites.component';

@Component({
  selector: 'ng-app-home',
  imports: [
    ObserveElementDirective,
    NgClass,
    Collection,
    RouterLink,
    FavoritesComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private readonly router: Router) {
  }
  isIntersecting (status: boolean, element: HTMLElement) {
    if (status) {
      element.classList.remove('app-invisible');
    }
  }
}
