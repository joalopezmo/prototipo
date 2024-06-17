import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@ng-mf/data-access-user';
import { distinctUntilChanged } from 'rxjs/operators';
import { SharedMaterialUiModule } from '@ng-mf/ui';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SharedMaterialUiModule],
  providers: [],
  selector: 'ng-mf-root',
  template: `
    <div class="dashboard-nav">Admin Dashboard</div>
    <mat-drawer-container class="example-container">
      <mat-drawer mode="side" opened
        ><nav>
          <a routerLink="home">Home</a>
          <a routerLink="profile">Profile</a>
          <a routerLink="logout">Logout</a>
        </nav>
      </mat-drawer>
      <mat-drawer-content>
        <div>Main content</div>
        <div *ngIf="isLoggedIn$ | async; else signIn">
          You are authenticated so you can see this content.
          <router-outlet></router-outlet>
        </div>
        <ng-template #signIn>
          <router-outlet></router-outlet>
        </ng-template>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('table');
          }
        });
      });
  }
}
