import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router';

import { routes } from './app.routes';
import {provideSweetAlert2} from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideSweetAlert2({
      fireOnInit: false,
      dismissOnDestroy: true,
    }),
    provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'always'}), withInMemoryScrolling({
      anchorScrolling: 'enabled',
    }))
  ]
};
