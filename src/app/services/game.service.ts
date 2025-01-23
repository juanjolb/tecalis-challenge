import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs';
import { GameDetails } from '../models/gameDetails';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private url = 'https://api.rawg.io/api';
  private key = '?key=c13d9de91ed24b13abd23ec72a84ddbe';
  private http = inject(HttpClient);

  fetchGameDetails(id: number): Observable<GameDetails> {
    return this.http.get<GameDetails>(`${this.url}/games/${id}${this.key}`);
  }
}
