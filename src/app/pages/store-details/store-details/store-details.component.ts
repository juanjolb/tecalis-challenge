import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from '../../../services/stores.service';
import { Store } from '../../../models/store';
import { first } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { GameDetailsComponent } from '../../../components/game-details/game-details.component';
import { GameDetails } from '../../../models/gameDetails';

@Component({
  selector: 'app-store-details',
  imports: [GameDetailsComponent],
  template: `
    @if (storeData().id) {
    <div class="store-details">
      <h1>{{ storeData().name }}</h1>
      <img [src]="storeData().image_background" alt="Store Background" />
      <div class="description" [innerHTML]="storeData().description"></div>
      <h2>Games</h2>
      <ul>
        @for (game of storeData().games; track $index) {
        <li (click)="openDialog(game.id)">🎮 {{ game.name }}</li>
        }
      </ul>
    </div>

    <dialog #gameDialog>
      <tecalis-game-details [game]="gameData()"></tecalis-game-details>
      <button (click)="closeDialog()">X</button>
    </dialog>
    }
  `,
  styleUrl: './store-details.component.css',
})
export class StoreDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly storesService = inject(StoresService);
  private readonly gameService = inject(GameService);
  storeId: WritableSignal<number> = signal(0);
  storeData: WritableSignal<Store> = signal({} as Store);
  gameData: WritableSignal<GameDetails> = signal({} as GameDetails);

  ngOnInit(): void {
    this.storeId.set(Number(this.route.snapshot.paramMap.get('id')));
    this.fetchStoreDetails();
  }

  private fetchStoreDetails(): void {
    this.storesService
      .fetchStoreDetails(this.storeId())
      .pipe(first())
      .subscribe({
        next: (store) => this.storeData.set(store),
        complete: () => this.updateStoreDataGames(),
      });
  }

  private updateStoreDataGames(): void {
    this.storesService
      .fetchGamesByStore()
      .subscribe((games) =>
        this.storeData.update((store) => ({ ...store, games }))
      );
  }

  public openDialog(gameId: number): void {
    console.log(gameId);
    this.gameService
      .fetchGameDetails(gameId)
      .pipe(first())
      .subscribe({
        next: (game) => this.gameData.set(game),
        complete: () => {
          const trimmedDescription = this.gameData().description.slice(0, 1000);
          this.gameData.update((game) => ({
            ...game,
            description: trimmedDescription + '...',
          }));
          const dialog = document.querySelector('dialog') as HTMLDialogElement;
          dialog.showModal();
        },
      });
  }

  public closeDialog(): void {
    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    dialog.close();
  }
}
