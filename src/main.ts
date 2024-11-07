import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import provideHttpClient and withFetch

// Update appConfig to use provideHttpClient with fetch
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(withFetch()), // Enable fetch API for HttpClient
    ...appConfig.providers
  ]
})
.catch((err) => console.error(err));
