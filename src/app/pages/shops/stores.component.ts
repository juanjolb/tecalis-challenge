import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { Store } from '../../models/store';
import { firstValueFrom } from 'rxjs';
import { StoreCardComponent } from '../../components/store-card/store-card.component';

@Component({
  selector: 'tecalis-stores',
  imports: [StoreCardComponent],
  template: `
    <h1>Stores List</h1>
    <div class="stores-grid">
      @for (store of stores(); track $index) {
      <tecalis-store-card [store]="store"></tecalis-store-card>
      }
    </div>
  `,
  styleUrl: './stores.component.css',
})
export class StoresComponent implements OnInit {
  private storesService = inject(StoresService);
  public stores: Signal<Store[]> = signal([]);

  ngOnInit(): void {
    // fetch stores
    firstValueFrom(this.storesService.fetchStores()).then(
      (stores) => (this.stores = signal(stores.results))
    );
  }
}
