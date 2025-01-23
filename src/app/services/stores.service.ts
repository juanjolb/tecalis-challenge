import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  private url = 'https://api.rawg.io/api';
  private key = '?key=c13d9de91ed24b13abd23ec72a84ddbe';
  private http = inject(HttpClient);

  constructor() {}

  fetchStores(): Observable<any> {
    return this.http.get(`${this.url}/stores${this.key}`);
  }

  fetchStoreDetails(id: number): Observable<any> {
    return this.http.get(`${this.url}/stores/${id}${this.key}`);
  }

  /* This method is mocked because somehow the API doesn't provide the games for each store */
  fetchGamesByStore(): Observable<Game[]> {
    const games = [
      {
        id: 3498,
        slug: 'grand-theft-auto-v',
        name: 'Grand Theft Auto V',
        added: 21761,
      },
      {
        id: 3328,
        slug: 'the-witcher-3-wild-hunt',
        name: 'The Witcher 3: Wild Hunt',
        added: 21378,
      },
      {
        id: 4291,
        slug: 'counter-strike-global-offensive',
        name: 'Counter-Strike: Global Offensive',
        added: 18144,
      },
      {
        id: 5286,
        slug: 'tomb-raider',
        name: 'Tomb Raider (2013)',
        added: 17457,
      },
      {
        id: 13536,
        slug: 'portal',
        name: 'Portal',
        added: 17336,
      },
      {
        id: 4200,
        slug: 'portal-2',
        name: 'Portal 2',
        added: 20344,
      },
      {
        id: 4291,
        slug: 'counter-strike-global-offensive',
        name: 'Counter-Strike: Global Offensive',
        added: 18144,
      },
      {
        id: 5679,
        slug: 'the-elder-scrolls-v-skyrim',
        name: 'The Elder Scrolls V: Skyrim',
        added: 16371,
      },
      {
        id: 4062,
        slug: 'bioshock-infinite',
        name: 'BioShock Infinite',
        added: 15820,
      },
      {
        id: 3939,
        slug: 'payday-2',
        name: 'PAYDAY 2',
        added: 13986,
      },
      {
        id: 1030,
        slug: 'limbo',
        name: 'Limbo',
        added: 13871,
      },
      {
        id: 2454,
        slug: 'doom',
        name: 'DOOM (2016)',
        added: 13718,
      },
    ];

    // return random games
    const shuffled = [...games].sort(() => Math.random() - 0.5).slice(0, 6);

    return new Observable((subscriber) => {
      subscriber.next(shuffled);
      subscriber.complete();
    });
  }
}
