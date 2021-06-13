## Understanding Themes

A theme is, a set of colors that will be applied to the Angular material components. It's created by composing multiple palletes in particular, a theme consists of a primary palette. 

These colors are most widely used across all screen and components an `accent palette`. These colors are used for floating action componenst and interactive elements. A `warm palette`, the colors used to convey are state a foreground palette and these colors are used for text and icons and finally a `background palette`, these colors are used for element backgrounds, and Angular material. 

All theme styles are generated statically at build time so that your app doesn't have to spend cycles generating theme styles on startup. Angular material comes pre packed with several pre built theme CSS files and we only have to include a single CSS file for Angular material in our app to apply one. And if you're using `angular cli`, this is as simple as including one line in your `styles.css` file or `style.scss` file. 

We can include a theme file directly into application from Angular material, pre built themes available. Pre built themes are `deep purple`, `amber in the gold`, `pink`, `pink-indigo`, `blue`, `grey` and `purple-green`. 

When we want more customization than a pre built theme offers, we can create our own theme file. A custom theme file does two things it imports the `mat-core()` sass Mixing. This includes all common styles that are used by multiple components. This should only be included ones in our application. That's really important because if the mixing is included multiple times, our application will end up with multiple copies of these common styles, and we typically included once in either `styles.css` or `styles.scss`. Secondly, a custom theme file defines a fiend data structure as the composition of multiple palletes. This object can be created with either the math light theme function or the math dark theme. 

### Theming Angular Material

* Primary palette
    - Widley used

* Accent palette
    - Interactive elements

* Warn palette
    - Error states

* Foreground palette 
    - Text and icons

* Background palette
    - Element backgrounds

### Prebuilt Themes

* Applying a theme
    - styles.css / styles.scss

* @angular/ material/prebuilt-themes
    - deeppurple-amber.css
    - indigo-pink.css
    - pink-bluegrey.css
    - purple-green.css

### Custom Themes

* Imports the mat-core() sass mixin
    - Includes all common styles
    - styles.css / styles.scss

* Defines a theme data structure
    - Composes multiple palettes
    - mat-light-theme or mat-dark-theme


## Creating Custom Themes

Update `code/angularmaterial/src/styles.scss`

```scss
// @import '@angular/material/prebuilt-themes/indigo-pink.css';

@import  '~@angular/material/theming';
@include mat-core();

$candy-app-primary: mat-palette($mat-indigo);
$candy-app-accent: mat-palette($mat-pink, A200, A100, A400);
$candy-app-warn: mat-palette($mat-red);

$candy-app-theme: mat-light-theme(
  $candy-app-primary,
  $candy-app-accent,
  $candy-app-warn
);

@include angular-material-theme($candy-app-theme);

.dark-theme {
  $primary-dark: mat-palette($mat-pink, 700);
  $accent-dark: mat-palette($mat-green);
  $warn-dark: mat-palette($mat-red);

  $theme-dark: mat-dark-theme(
    $primary-dark,
    $accent-dark,
    $warn-dark
  );

  @include angular-material-theme($theme-dark);
}

html,
body {
  height: 100%;
}
body {
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}

```

To test we can update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```diff
-<mat-sidenav-container class="app-sidenav-container">
+<mat-sidenav-container class="app-sidenav-container dark-theme">
# ....
```

Lets visit on browser `npm start` 

## Togging Themes

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.html`

```diff
<mat-toolbar color="primary">
    
    <button mat-button class="sidenav-toggle" (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
    </button>
    
    <span class="example-spacer"></span>
    <button mat-button [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="openAddContactDialog()">New contact</button>
+       <button mat-menu-item (click)="toggleTheme.emit()">Toggle theme</button>
    </mat-menu>
</mat-toolbar>
```

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.ts`

```diff
# ....
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();
+ @Output() toggleTheme: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
```

Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```diff
<mat-sidenav-container class="app-sidenav-container dark-theme">
    <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" [opened]="!isScreenSmall" [mode]="isScreenSmall ? 'over' : 'side'">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-nav-list>
            <mat-list-item *ngFor="let user of users | async">
                <a matLine [routerLink]="['/contactmanager', user.id]" href="">
                    <mat-icon svgIcon="{{user.avatar}}"></mat-icon>
                    {{ user.name }}
                </a>
            </mat-list-item>
        </mat-nav-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
-     <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
+     <app-toolbar (toggleTheme)="toggleTheme()" (toggleSidenav)="sidenav.toggle()"></app-toolbar>
      <div class="wrapper">
          <router-outlet></router-outlet>
      </div>
  </div>
</mat-sidenav-container>


```

Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.ts`

```ts
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isScreenSmall: boolean;
  users: Observable<User[]>;
  isDarkTheme: boolean = false; // Diff
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  /*diff*/
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
  /*diff*/

  constructor(
    private breakPointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakPointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if(this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }
}

```

Update 

```diff
-<mat-sidenav-container class="app-sidenav-container dark-theme">
+<mat-sidenav-container class="app-sidenav-container" [class.dark-theme]="isDarkTheme">
# ....
```
