import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CrosInterceptor } from './cros-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CrosInterceptor, multi: true },
];
