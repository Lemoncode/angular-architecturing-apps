```bash
npx nx graph
```

## common-ui

```bash
cd myorg
npx nx g @nrwl/angular:component banner --project=common-ui --export
```

- Create a simple banner `myorg/libs/common-ui/src/lib/banner/banner.component.ts`

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'myorg-banner',
  template: `<header>{{ title }}</header>`,
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  @Input() title = '';
}
```

## admin

- Add the `Banner` component to the admiin app:

- Update `myorg/apps/admin/src/app/app.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'myorg-root',
  template: `
    <myorg-banner title="Welcome to our admin app."> </myorg-banner>
  `,
})
export class AppComponent {}
```

- Update `myorg/apps/admin/src/app/app.module.ts`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonUiModule } from '@myorg/common-ui';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, CommonUiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## products

- Create `myorg/libs/products/src/lib/products.ts`

```ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

export const exampleProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 200,
  },
];
```

## store

Use both the `Banner` component from `common-ui` lib, and the `exampleProducts` from your `products` lib:

- Update `myorg/apps/store/src/app/app.component.ts`

```ts
import { exampleProducts } from '@myorg/products';
import { Component } from '@angular/core';

@Component({
  selector: 'myorg-root',
  template: `
    <myorg-banner title="Welcome to the store!"> </myorg-banner>
    <ul>
      <li *ngFor="let product of products">
        <strong>{{ product.name }}</strong> Price: {{ product.price }}
      </li>
    </ul>
  `,
})
export class AppComponent {
  products = exampleProducts;
}
```

- Update `myorg/apps/store/src/app/app.module.ts`

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonUiModule } from '@myorg/common-ui';

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { NxWelcomeComponent } from "./nx-welcome.component";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    CommonUiModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: "enabledBlocking" }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

```bash
npx nx graph
```