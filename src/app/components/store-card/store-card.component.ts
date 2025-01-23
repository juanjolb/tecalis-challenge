import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '../../models/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tecalis-store-card',
  imports: [],
  template: `
    <div class="store-card" (click)="handleRedirect()">
      <div class="store-image">
        <img src="{{ store().image_background }}" alt="{{ store().name }}" />
      </div>
      <aside>
        <h2>{{ store().name }}</h2>
        <a [href]="storeUrl()" target="_blank">{{ store().domain }}</a>
        <p>{{ store().games_count }} games</p>
      </aside>
    </div>
  `,
  styleUrl: './store-card.component.css',
})
export class StoreCardComponent {
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
  private active = inject(ActivatedRoute);

  store = input.required<Store>();
  storeUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustUrl('https://' + this.store().domain)
  );

  handleRedirect() {
    this.router.navigate([this.store().id], {
      relativeTo: this.active,
    });
  }
}
