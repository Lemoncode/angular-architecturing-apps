# Displaying Real Data

## Introducing the Data Service

Lets add some data into our application. 

We will have a service, compound of `Internal Store`, `Behavior Subject` and this one will be exposed throw a public property. Components will be able to receive new updates but not push new values.

And we will have two entities, the `User` entity and the `Note` entity.

Start backend by opening a new terminal and run the following commands:

```bash
cd ./code/backend-app
npm start
```

Nou we can fetch data by `curl localhost:3000/users`

## Fetching Data

```bash
ng g s contactmanager/services/user --skip-tests
```

Update `code/angularmaterial/src/app/contactmanager/contactmanager.module.ts`

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
+import { UserService } from './services/user.service';

const routes: Routes = [
  {
    path: '',
    component: ContactmanagerAppComponent,
    children: [{ path: '', component: MainContentComponent }],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
+ providers: [
+   UserService
+ ]
})
export class ContactmanagerModule {}

```

Now lets create the models

```bash
ng g class contactmanager/models/user --skip-tests
```

```bash
ng g class contactmanager/models/note --skip-tests
```

Update `code/angularmaterial/src/app/contactmanager/models/user.ts`

```ts
import { Note } from './note';

export class User {
  id: number;
  birthDate: Date;
  name: string;
  avatar: string;
  bio: string;

  notes: Note[];
}

```

Update `code/angularmaterial/src/app/contactmanager/models/note.ts`

```ts
export class Note {
    id: number;
    title: string;
    date: Date;
}

```

Update `code/angularmaterial/src/app/contactmanager/contactmanager.module.ts`

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserService } from './services/user.service';
+import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ContactmanagerAppComponent,
    children: [{ path: '', component: MainContentComponent }],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
+   HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    UserService
  ]
})
export class ContactmanagerModule {}

```

Lets update the service, and start by creating the internal store data. Update `code/angularmaterial/src/app/contactmanager/services/user.service.ts`

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadAll() {
    const usersUrl = 'http://localhost:3000/users';

    return this.http.get<User[]>(usersUrl).subscribe(
      (data) => {
        this.dataStore.users = data;
        this._users.next([...this.dataStore.users]);
      },
      (error) => {
        console.log('Failed to fetch users');
      }
    );
  }
}

```

Lets test the new service, we are going to start to use it on the `sidenav`, update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.ts`

```ts
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private breakPointObserver: BreakpointObserver,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.breakPointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.users = this.userService.users;
    this.userService.loadAll();
    this.users.subscribe(console.log, console.error);
  }
}

```

Now if we run this on the browser we will must see the users print out on console.

## Navigation Lists

Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`


```diff
<mat-sidenav-container class="app-sidenav-container">
    <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" [opened]="!isScreenSmall" [mode]="isScreenSmall ? 'over' : 'side'">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
-       <mat-list>
-           <mat-list-item>1</mat-list-item>
-           <mat-list-item>2</mat-list-item>
-           <mat-list-item>3</mat-list-item>
-       </mat-list>
+       <mat-nav-list>
+           <mat-list-item *ngFor="let user of users | async">
+               <a matLine href="">{{ user.name }}</a>
+           </mat-list-item>
+       </mat-nav-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
      <div class="wrapper">
          <router-outlet></router-outlet>
      </div>
  </div>
</mat-sidenav-container>


```

Lets see this on the browser.

## Loading SVG Avatars

### SVG Icons

Here are the ofifcial docs of [mat-icons](https://material.angular.io/components/icon/overview)

MatIconRegistry is an injectable service that allows you to associate icon names with SVG URLs and define aliases for CSS font classes. And we usually want to register and load up our icons once, and an excellent place to do so is in the app.component.ts. And in order to prevent cross‑site scripting vulnerabilities, any SVG URLs passed to the MatIconRegistry must be marked as a trusted resource URL by using Angular's DomSanitizer service. 

* Register with MatIconRegistry
* Register once
    - app.components.ts
* XSS vulnerabilities
    - DomSanitizer

* Create `assets/avatars.svg`

We want to load this once, so update `code/angularmaterial/src/app/contactmanager/contactmanager-app.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: [
  ]
})
export class ContactmanagerAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));
  }

  ngOnInit(): void {
  }

}

```

Now we can move `sidenav` and use it. Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```html
<mat-sidenav-container class="app-sidenav-container">
    <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" [opened]="!isScreenSmall" [mode]="isScreenSmall ? 'over' : 'side'">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-nav-list>
            <mat-list-item *ngFor="let user of users | async">
                <a matLine href="">
                    <!-- diff -->
                    <mat-icon svgIcon="{{user.avatar}}"></mat-icon>
                    <!-- diff -->
                    {{ user.name }}
                </a>
            </mat-list-item>
        </mat-nav-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
      <div class="wrapper">
          <router-outlet></router-outlet>
      </div>
  </div>
</mat-sidenav-container>


```

For last to make this work go to `app.module.ts` and update it as well:

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
+import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  { path: 'contactmanager', loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule) },
  { path: '**', redirectTo: 'contactmanager' }  
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
+   HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Now we can test this on the browser

## Routing to Users

Update `code/frontend-app/src/app/contactmanager/components/sidenav/sidenav.component.html`

```diff
<mat-sidenav-container class="app-sidenav-container">
    <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" [opened]="!isScreenSmall" [mode]="isScreenSmall ? 'over' : 'side'">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-nav-list>
            <mat-list-item *ngFor="let user of users | async">
-               <a matLine href="">
+               <a matLine [routerLink]="['/contactmanager', user.id]" href="">
                    <mat-icon svgIcon="{{user.avatar}}"></mat-icon>
                    {{ user.name }}
                </a>
            </mat-list-item>
        </mat-nav-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
      <div class="wrapper">
          <router-outlet></router-outlet>
      </div>
  </div>
</mat-sidenav-container>


```

Update `code/angularmaterial/src/app/contactmanager/contactmanager.module.ts`

```diff
# .......
const routes: Routes = [
  {
    path: '',
    component: ContactmanagerAppComponent,
    children: [
+     { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
# .......
```

Update `code/angularmaterial/src/app/contactmanager/components/main-content/main-content.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.user = this.service.userById(id);
    });
  }

}

```

Now we have to create `userById` in `code/angularmaterial/src/app/contactmanager/services/user.service.ts`

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  /*diff*/ 
  userById(id: number) {
    return this.dataStore.users.find(x => x.id === +id);
  }
  /*diff*/

  loadAll() {
    const usersUrl = 'http://localhost:3000/users';

    return this.http.get<User[]>(usersUrl).subscribe(
      (data) => {
        this.dataStore.users = data;
        this._users.next([...this.dataStore.users]);
      },
      (error) => {
        console.log('Failed to fetch users');
      }
    );
  }
}

```

## User Cards

Update `code/angularmaterial/src/app/contactmanager/components/main-content/main-content.component.html`

```html
<div *ngIf="!user">
    <mat-spinner></mat-spinner>
</div>
<mat-card *ngIf="user">
    <mat-card-header>
        <mat-icon mat-card-avatar svgIcon="{{user.avatar}}"></mat-icon>
        <mat-card-title>
            <h2>{{ user.name }}</h2>
        </mat-card-title>
        <mat-card-subtitle>Birthday {{ user.birthDate | date: 'd LLLL' }}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
        <p>{{user.bio}}</p>
    </mat-card-content>
</mat-card>


```

If we have a look into the browser, we will find out that we have a couple of problems. First we haven't selected any user and the spinner appears, even when we don't have try to select a user from the list.

If we select a user works, but if we refresh the page we have the same problem.

## Refactoring Routing Issues

We're going to update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.ts` to move to the first user to avoid spinner running.

```ts
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private breakPointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router // diff
  ) {}

  ngOnInit(): void {
    this.breakPointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.users = this.userService.users;
    this.userService.loadAll();
    /*diff*/
    this.users.subscribe((data) => {
      if (data.length > 0) {
        this.router.navigate(['/contactmanager', data[0].id]);
      }
    });
    /*diff*/
  }
}

```

But what happen when we refresh the browser, well there's a race condition between the sidenav component and the main component. We can use the users obeservable to deal with this sitution, update `code/angularmaterial/src/app/contactmanager/components/main-content/main-content.component.ts`:

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  constructor(private route: ActivatedRoute, private service: UserService) { }

  /*diff*/
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.users.subscribe((users) => {
        if (users.length === 0) {
          return;
        }
        this.user = this.service.userById(id);
      })
    });
  }
  /*diff*/
}

```

Lets see on browser `npm start`. Now if we go to small resolution, and we select different users, we find that are changing on the back, but the menu doesn't close when we are changing our selection. Lets fix that.

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
  @ViewChild(MatSidenav) sidenav: MatSidenav; // diff

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
    this.users.subscribe((data) => {
      if (data.length > 0) {
        this.router.navigate(['/contactmanager', data[0].id]);
      }
    });

    /*diff*/
    this.router.events.subscribe(() => {
      if(this.isScreenSmall) {
        this.sidenav.close();
      }
    });
    /*diff*/
  }
}

```

For last, lets avoid being susbscribed in two different components, on `main-content` and `sidenav`. Update `code/angularmaterial/src/app/contactmanager/components/main-content/main-content.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
-     const id = params['id'];
+     let id = params['id'];
+     if (!id) {
+       id = 1;
+     }
      this.service.users.subscribe((users) => {
        if (users.length === 0) {
          return;
        }
        this.user = this.service.userById(id);
      })
    });
  }

}

```

And remove code from `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.ts`

```diff
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
  @ViewChild(MatSidenav) sidenav: MatSidenav;

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
-   this.users.subscribe((data) => {
-     if (data.length > 0) {
-       this.router.navigate(['/contactmanager', data[0].id]);
-     }
-   });

    this.router.events.subscribe(() => {
      if(this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }
}

```

## Introducing Tabs

Update `code/angularmaterial/src/app/contactmanager/components/main-content/main-content.component.html`

```html
<div *ngIf="!user">
    <mat-spinner></mat-spinner>
</div>
<mat-card *ngIf="user">
    <mat-card-header>
        <mat-icon mat-card-avatar svgIcon="{{user.avatar}}"></mat-icon>
        <mat-card-title>
            <h2>{{ user.name }}</h2>
        </mat-card-title>
        <mat-card-subtitle>Birthday {{ user.birthDate | date: 'd LLLL' }}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
        <!-- diff -->
        <mat-tab-group>
            <mat-tab label="Bio">
                <p>{{user.bio}}</p>
            </mat-tab>
            <mat-tab label="Notes">
                Notes
            </mat-tab>
        </mat-tab-group>
        <!-- diff -->
    </mat-card-content>
</mat-card>

```

Lets see this on the browser.
