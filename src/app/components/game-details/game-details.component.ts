import { Component, input } from '@angular/core';
import { GameDetails } from '../../models/gameDetails';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'tecalis-game-details',
  imports: [ProgressBarComponent],
  template: `
    <div class="game-details">
      <h1>{{ game().name }}</h1>
      <img [src]="game().background_image" alt="Game Background" />
      <div class="description" [innerHTML]="game().description"></div>
      <p><strong>Released:</strong> {{ game().released }}</p>
      <div class="progress">
        <strong>Progress:</strong>
        <tecalis-progress-bar [progress]="game().rating"></tecalis-progress-bar>
      </div>
    </div>
  `,
  styleUrl: './game-details.component.css',
})
export class GameDetailsComponent {
  game = input.required<GameDetails>();
}
