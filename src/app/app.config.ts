import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { appRoutes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(appRoutes),
    importProvidersFrom(ReactiveFormsModule) // ✅ Ensure FormsModule is available
  ]
};
