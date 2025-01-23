import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const isLoading = inject(LoadingService).isLoading;
  isLoading.next(true);

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        isLoading.next(false);
      }
      return event;
    })
  );
};
