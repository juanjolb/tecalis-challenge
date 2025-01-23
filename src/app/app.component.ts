import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { delay } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SpinnerOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'tecalis-challenge';

  isLoadingSubject = inject(LoadingService).isLoading$;
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoadingSubject
      .pipe(delay(0))
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }
}
