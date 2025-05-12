import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// Comentamos temporalmente hasta resolver problemas con angular-calendar
// import { DateAdapter, CalendarModule } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const httpLoaderFactory: (http: HttpClient) =>
  TranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    // Comentamos temporalmente hasta resolver problemas con angular-calendar
    // {
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // },
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
    })],
};
