import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SharedMaterialUiModule } from '@ng-mf/ui';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NxWelcomeComponent,
    CommonModule,
    SharedMaterialUiModule,
  ],
  selector: 'app-table-entry',
  // template: `<app-nx-welcome></app-nx-welcome>`,
  template: `<div class="grid-container">
    <h1 class="mat-h1">Dashboard</h1>
    <mat-grid-list cols="2" rowHeight="350px">
      @for (card of cards | async; track card) {
      <mat-grid-tile [colspan]="card.cols" [rowspan]="card.rows">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              {{ card.title }}
              <button
                mat-icon-button
                class="more-button"
                [matMenuTriggerFor]="menu"
                aria-label="Toggle menu"
              >
                <mat-icon inline>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu" xPosition="before">
                <button mat-menu-item>Expand</button>
                <button mat-menu-item>Remove</button>
              </mat-menu>
            </mat-card-title>
          </mat-card-header>
          <mat-card-content class="dashboard-card-content">
            <div>Card Content Here</div>
          </mat-card-content>
        </mat-card>
      </mat-grid-tile>
      }
    </mat-grid-list>
  </div> `,
  styles: [
    `
      .grid-container {
        margin: 20px;
      }

      .dashboard-card {
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
      }

      .more-button {
        position: absolute;
        top: 5px;
        right: 10px;
      }

      .dashboard-card-content {
        text-align: center;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
}
