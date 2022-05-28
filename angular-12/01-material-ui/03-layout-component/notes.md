# Layout component

## Flexbox Basics

### Flex Layout Box Model and Teminology

A flex container is the box generated by an element with a computed display of `flex` or `inline flex`. Inflow children of a flex container are called flex items and are laid out using the flex layout model. The main access of a flex container is the primary access along which flex items are laid out. The flex items are placed within the container starting on the main start side and going towards the main end side. And width or height of a flex container or flex item, whichever is in the main dimension, is the box's main size. It's main size property is thus either its width or height property, whichever is in the main dimension. 

The axis perpendicular to the main axis is called the cross axis. It extends the cross dimension. Flex lines are filled with items and placed into the container starting on the cross side of the flex container and going towards the cross end side. The width or height of a flex container or flex item, whichever is in the cross dimension, is that box's cross size. Its cross size property is thus either its width or height property, whichever is in the cross dimension. 

> TODO: Add slide

### Angular Flex Layout

Angular flex layout provides a layout API using flexbox CSS and mediaQuery. This module provides Angular developers from version 4. 1 and higher with component layout features using a custom layout API.

* FlexBox CSS + mediaQuery
* Angular version 4.1 or higher

## Application Routes

We're going to create two modules in the application

* Demo Module
* Contact Manager Module

## Creating a Demo Module

```bash
ng g m demo --routing
```

```bash
ng g c demo/button --skip-tests --inline-style --inline-template 
```

Update `code/angularmaterial/src/app/demo/button/button.component.ts`

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button mat-button>
      <mat-icon>face</mat-icon>
    </button>

    <mat-checkbox>Check me!</mat-checkbox>
  `,
  styles: [
  ]
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

```

## Setting up the Routes

Update `app.component.html`

```diff
-<button mat-button>
-   <mat-icon>face</mat-icon>
-</button>
-
-<mat-checkbox>Check me!</mat-checkbox>
+<router-outlet></router-outlet>
```

Update `app.module.ts`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  { path: '**', redirectTo: 'demo' }  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Now we have to define the routes for our demo module. Update `code/angularmaterial/src/app/demo/demo-routing.module.ts`

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonComponent },
  { path: '**', redirectTo: 'buttons' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }

```

In order to make this work, the module needs to know about Material Module

Update `app.module.ts`

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
-import { MaterialModule } from './shared/material.module';
-import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  { path: '**', redirectTo: 'demo' }  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
-   MaterialModule,
-   FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

And update `code/angularmaterial/src/app/demo/demo.module.ts`

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { ButtonComponent } from './button/button.component';
+import { MaterialModule } from '../shared/material.module';
+import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
+   MaterialModule,
+   FormsModule
  ]
})
export class DemoModule { }

```

Lets create a new component for our FlexBox demo

```bash
ng g c demo/flexbox --skip-tests
```

And update with a new route for our component, update `./frontend-app/src/app/demo/demo-routing.module.ts`

```diff
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';
+import { FlexboxComponent } from './flexbox/flexbox.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonComponent },
+ { path: 'flexbox', component: FlexboxComponent },
  { path: '**', redirectTo: 'buttons' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }

```

## Flexbox Demo

Lets start by installing [@angular/flex-layout](https://github.com/angular/flex-layout)

```bash
npm i -s @angular/flex-layout@11.0.0-beta.33
```

Update `code/angularmaterial/src/app/demo/demo.module.ts`

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { ButtonComponent } from './button/button.component';
import { MaterialModule } from '../shared/material.module';

import { FormsModule } from '@angular/forms';
import { FlexboxComponent } from './flexbox/flexbox.component';
+import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ButtonComponent, FlexboxComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
+   FlexLayoutModule,
    FormsModule
  ]
})
export class DemoModule { }

```

Lets start by centering content

Update `code/angularmaterial/src/app/demo/flexbox/flexbox.component.html`

```html
<div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
    <div class="flex-item">4</div>
    <div class="flex-item">5</div>
    <div class="flex-item">6</div>
</div>

```

Update `code/angularmaterial/src/app/demo/flexbox/flexbox.component.scss`

```scss
.flex-container {
    display: flex;
}

.flex-item {
    width: 200px;
    height: 150px;

    background: tomato;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
    line-height: 150px;
}

```

Start the application `npm start`, to have a look on what we have. Lets define the flow direction and let items wrap.

Update `./frontend-app/src/app/demo/flexbox/flexbox.component.scss`

```diff
.flex-container {
    display: flex;
+   flex-flow: row wrap;
}

.flex-item {
    width: 200px;
    height: 150px;

    background: tomato;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
    line-height: 150px;
}

```

This is the same as if we have done:

```scss
.flex-container {
    display: flex;
    // flex-flow: row wrap;
    flex-direction: row;
    flex-wrap: wrap;
}
```

We can also defined how to distribute the ramaining space

```scss
.flex-container {
    display: flex;
    // flex-flow: row wrap;
    flex-direction: row;
    flex-wrap: wrap;

    justify-content: space-around;
}

```

Lets change our layout to distribute raimaining space if the screen is smaller than 800px

```scss
@media screen and (max-width: 800px) {
    .flex-container {
        justify-content: flex-start;
    }
}
```

We have done everything from `scss`, but we can also define the behavior on `html`

```html
<div class="flex-container" fxLayout.xs="column">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
    <div class="flex-item">4</div>
    <div class="flex-item">5</div>
    <div class="flex-item">6</div>
</div>
```

> Reference: https://tburleson-layouts-demos.firebaseapp.com/#/docs

## Scaffolding the App

```bash
ng g m contactmanager
```

We want a new component in this module that will be the root component,

```bash
ng g c contactmanager/contactmanager-app --flat --skip-tests --inline-style --inline-template
```

This component will act as a host for other components, we want a tookbar, a side bar and main area, lets create all of them.

```bash
ng g c contactmanager/components/toolbar --skip-tests
```

```bash
ng g c contactmanager/components/main-content --skip-tests
```

```bash
ng g c contactmanager/components/sidenav --skip-tests
```

Lets wired up the contactmanager module on our app, update `app.module.ts`

```diff
const routes: Routes = [
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
+ { path: 'contactmanager', loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule) },
- { path: '**', redirectTo: 'demo' }  
+ { path: '**', redirectTo: 'contactmanager' }  
];

```

Update `contactmanager.module.ts`

```ts
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
})
export class ContactmanagerModule {}

```

Update `code/angularmaterial/src/app/contactmanager/contactmanager-app.component.ts`

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactmanager-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: [
  ]
})
export class ContactmanagerAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

We're loading the `sidenav` component, now we're going to update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```html
<app-toolbar></app-toolbar>
<router-outlet></router-outlet>
```

Lets check that everything is wired correctly `npm start`.

## The Sidenav Component

* Modes
  - Over - Floats over primary content
  - Push - Pushes primary content
  - Side - Side-by-side primary content

We'll be using side on large-screen devices and over on small-screen devices. Lets start with a simple example, update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```html
<mat-sidenav-container class="example-container">
    <mat-sidenav #sidenav class="example-sidenav">
        Jolly good!
    </mat-sidenav>
    
    <div class="example-sidenav-content">
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
      <button type="button" mat-button (click)="sidenav.open()">
          Open sidenav
      </button>
  </div>
</mat-sidenav-container>


```

Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.scss`

```scss
.example-container {
    width: 500px;
    height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.5);
}

.example-sidenav-content {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.example-sidenav {
    padding: 20px;
}

```

If we open the browser, we find that is not the layout that we want, but it works. Update the name of the `css classes`

Update `code/frontend-app/src/app/contactmanager/components/sidenav/sidenav.component.html`

```html
<mat-sidenav-container class="app-sidenav-container">
    <mat-sidenav #sidenav class="app-sidenav">
        Jolly good!
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
      <button type="button" mat-button (click)="sidenav.open()">
          Open sidenav
      </button>
  </div>
</mat-sidenav-container>


```

And do the same on the `scss` file

```scss
.app-sidenav-container {
    flex: 1;
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
}

.app-sidenav-content {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.app-sidenav {
    width: 240px;
}
```

Lets take a look on how this looks in our browser.

## Styling the Sidenav

Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```html
<mat-sidenav-container class="app-sidenav-container">
    <mat-sidenav #sidenav class="app-sidenav">
        <!-- diff -->
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-list>
            <mat-list-item>1</mat-list-item>
            <mat-list-item>2</mat-list-item>
            <mat-list-item>3</mat-list-item>
        </mat-list>
        <!-- diff -->
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
      <button type="button" mat-button (click)="sidenav.open()">
          Open sidenav
      </button>
  </div>
</mat-sidenav-container>


```

Lets have a look into the browser. Now lets move the button that open and close the sidenav. Lets move that functionality to the toolbar component.

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.html`

```html
<mat-toolbar color="primary">
    <span>Contact Manager</span>
</mat-toolbar>
```

If we open the browser, we will find that is in the middle of the page, lets solve this.


Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.scss`

```diff
.app-sidenav-container {
    flex: 1;
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
}

.app-sidenav-content {
    display: flex;
    height: 100%;
-   align-items: center;
-   justify-content: center;
+   flex-direction: column;
}

.app-sidenav {
    width: 240px;
}

```

## Configuring the Sidenav

We want out `sidenav` open on big resolutions. Lets start by assigning static values, that we will change later to react with media queries. Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```diff
<mat-sidenav-container class="app-sidenav-container">
-   <mat-sidenav #sidenav class="app-sidenav">
+   <mat-sidenav #sidenav class="app-sidenav" opened="true" mode="side">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-list>
            <mat-list-item>1</mat-list-item>
            <mat-list-item>2</mat-list-item>
            <mat-list-item>3</mat-list-item>
        </mat-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
      <button type="button" mat-button (click)="sidenav.open()">
          Open sidenav
      </button>
  </div>
</mat-sidenav-container>
```

Lets see how this looks on the browser. Lets add some elavation to notice better the sidenav element. Add the class `mat-elavation-z10`

```diff
<mat-sidenav-container class="app-sidenav-container">
-   <mat-sidenav #sidenav class="app-sidenav" opened="true" mode="side">
+   <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" opened="true" mode="side">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-list>
            <mat-list-item>1</mat-list-item>
            <mat-list-item>2</mat-list-item>
            <mat-list-item>3</mat-list-item>
        </mat-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
      <button type="button" mat-button (click)="sidenav.open()">
          Open sidenav
      </button>
  </div>
</mat-sidenav-container>


```

## Adding Responsiveness

Lets add responsiveness to our `sidenav`, update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```diff
<mat-sidenav-container class="app-sidenav-container">
-   <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" opened="true" mode="side">
+   <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" [opened]="!isScreenSmall" [mode]="isScreenSmall ? 'over' : 'side'">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-list>
            <mat-list-item>1</mat-list-item>
            <mat-list-item>2</mat-list-item>
            <mat-list-item>3</mat-list-item>
        </mat-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
-     <button type="button" mat-button (click)="sidenav.open()">
+     <button type="button" mat-button (click)="sidenav.toggle()">
          Open sidenav
      </button>
  </div>
</mat-sidenav-container>


```

Lets implement `isScreenSmall` in `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.ts`

### Breakpoint Observer

* Evaluates media queries
  - Current viewport
  - Changes to the viewport

```ts
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isScreenSmall: boolean;

  constructor(private breakPointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakPointObserver
      // .observe([ Breakpoints.XSmall])
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }

}

```

Open the browser to see the changes.

## Creating a Toggle Button

Lets move the toggle button to the toolbar, update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```diff
<mat-sidenav-container class="app-sidenav-container">
    <!-- <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" opened="true" mode="side"> -->
    <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" [opened]="!isScreenSmall" [mode]="isScreenSmall ? 'over' : 'side'">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-list>
            <mat-list-item>1</mat-list-item>
            <mat-list-item>2</mat-list-item>
            <mat-list-item>3</mat-list-item>
        </mat-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
+     <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
      <router-outlet></router-outlet>
-     <button type="button" mat-button (click)="sidenav.toggle()">
-         Open sidenav
-     </button>
  </div>
</mat-sidenav-container>

```

Lets move to toolbar component and add a new button, update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.html`

```html
<mat-toolbar color="primary">
    
    <button mat-button (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
    </button>
    
    <span>Contact Manager</span>
</mat-toolbar>


```

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.ts`

```ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();
  
  constructor() {}

  ngOnInit(): void {}
}

```


Lets see how this looks like on the browser. We can notice that the button is always visible, even on large resolution, lets change this behaviour, adding some styles.

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.html`

```diff
<mat-toolbar color="primary">
    
-   <button mat-button (click)="toggleSidenav.emit()">
+   <button mat-button class="sidenav-toggle" (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
    </button>
    
    <span>Contact Manager</span>
</mat-toolbar>
```

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.scss`

```scss
.sidenav-toggle {
    display: none;

    @media screen and (max-width: 720px) {
        display: flex;
    }
}

```

Lets make this look nicer:

```diff
+$iconWidth: 56px;

.sidenav-toggle {
    display: none;

+   padding: 0;
+   margin: 8px;
+   min-width: $iconWidth;

    @media screen and (max-width: 720px) {
        display: flex;
+       align-items: center;
+       justify-content: center;
    }

+   mat-icon {
+       font-size: 30px;
+       height: $iconWidth;
+       width: $iconWidth;
+       line-height: $iconWidth;
+       color: white;
+   }
}
```

Lets see in the browser. Now lets change our main content to include a card. Update `code/angularmaterial/src/app/contactmanager/components/main-content/main-content.component.html`

```html
<mat-card>
    <h1>Main Content</h1>
</mat-card>
```

We want some margin to all the content displayed on the main area.

Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.html`

```html
<mat-sidenav-container class="app-sidenav-container">
    <!-- <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" opened="true" mode="side"> -->
    <mat-sidenav #sidenav class="app-sidenav mat-elevation-z10" [opened]="!isScreenSmall" [mode]="isScreenSmall ? 'over' : 'side'">
        <mat-toolbar color="primary">
            Contacts
        </mat-toolbar>
        <mat-list>
            <mat-list-item>1</mat-list-item>
            <mat-list-item>2</mat-list-item>
            <mat-list-item>3</mat-list-item>
        </mat-list>
    </mat-sidenav>
    
    <div class="app-sidenav-content">
      <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
      <!-- diff -->
      <div class="wrapper">
          <router-outlet></router-outlet>
      </div>
      <!-- diff -->
  </div>
</mat-sidenav-container>


```

Update `code/angularmaterial/src/app/contactmanager/components/sidenav/sidenav.component.scss`

```scss
.app-sidenav-container {
    flex: 1;
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
}

.app-sidenav-content {
    display: flex;
    height: 100%;
    flex-direction: column;
}

.app-sidenav {
    width: 240px;
}
/*diff*/
.wrapper {
    margin: 50px;
}
/*diff*/

```

## Summary

* Flexbox
  - Fexbox CSS + mediaQuery

* Sidenav
  - Modes: over, push and side

* Toolbar
  - Container for headers, titles or actions

* Media queries
  - BreakpointObserver