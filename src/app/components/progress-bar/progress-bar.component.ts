import { Component, Input } from '@angular/core';

@Component({
  selector: 'tecalis-progress-bar',
  standalone: true,
  template: `
    <div class="progress-container">
      <div
        class="progress-bar"
        [style.width.%]="progress"
        [class.complete]="progress === 100"
      >
        {{ progress }}%
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        flex: 1;
      }
      .progress-container {
        width: 100%;
        height: 20px;
        background-color: #e9ecef;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      .progress-bar {
        height: 100%;
        background-color: #0d6efd; /* Bootstrap primary color */
        text-align: center;
        color: white;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        transition: width 0.3s ease;
      }

      .progress-bar.complete {
        background-color: #198754; /* Success color */
      }
    `,
  ],
})
export class ProgressBarComponent {
  @Input() progress: number = 0;
}
