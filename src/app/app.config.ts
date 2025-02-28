import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Globals } from './global';
import { Http_Interceptor } from './guards/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    Globals,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), { provide: LOCALE_ID, useValue: 'es' },
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()), // Importa interceptores automáticamente
    { provide: HTTP_INTERCEPTORS, useClass: Http_Interceptor, multi: true } // Agrega el interceptor manualmente

  ]
};
