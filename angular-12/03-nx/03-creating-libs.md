# Creating Libs

## Generating a Lib

```bash
ng g lib --help
Your global Angular CLI version (11.1.2) is greater than your local version (11.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".

nx generate @nrwl/angular:lib [name] [options,...]

Options:
  --name                  Library name
  --directory             A directory where the lib is placed
  --publishable           Generate a publishable library.
  --buildable             Generate a buildable library.
  --prefix                The prefix to apply to generated selectors.
  --skipFormat            Skip formatting files
  --simpleModuleName      Keep the module name simple (when using --directory)
  --addModuleSpec         Add a module spec file.
  --skipPackageJson       Do not add dependencies to package.json.
  --skipTsConfig          Do not update tsconfig.json for development experience.
  --style                 The file extension to be used for style files. (default: css)
  --routing               Add router configuration. See lazy for more information.
  --lazy                  Add RouterModule.forChild when set to true, and a simple array of routes when set to false.
  --parentModule          Update the router configuration of the parent module using loadChildren or children, depending on what `lazy` is set to.
  --tags                  Add tags to the library (used for linting)
  --unitTestRunner        Test runner to use for unit tests (default: jest)
  --importPath            The library name used to import it, like @myorg/my-awesome-lib. Must be a valid npm name.
  --strict                Creates a library with stricter type checking and build optimization options.
  --linter                The tool to use for running lint checks. (default: eslint)
  --enableIvy             Enable Ivy for library in tsconfig.lib.prod.json. Should not be used with publishable libraries.
  --dryRun                Runs through and reports activity without writing to disk.
  --skip-nx-cache         Skip the use of Nx cache.
  --help                  Show available options for project target.
```

```bash
$ ng g lib auth --routing --lazy --parentModule=apps/customer-portal/src/app/app.module.ts
Your global Angular CLI version (11.1.2) is greater than your local version (11.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".
✔ Packages installed successfully.
CREATE libs/auth/.eslintrc.json
CREATE libs/auth/README.md
CREATE libs/auth/tsconfig.lib.json
CREATE libs/auth/src/index.ts
CREATE libs/auth/src/lib/auth.module.ts
CREATE libs/auth/tsconfig.json
CREATE libs/auth/jest.config.js
CREATE libs/auth/src/test-setup.ts
CREATE libs/auth/tsconfig.spec.json
UPDATE package.json
UPDATE angular.json
UPDATE nx.json
UPDATE tsconfig.base.json
UPDATE .vscode/extensions.json
UPDATE jest.config.js
UPDATE apps/customer-portal/src/app/app.module.ts
```

It creates a new lib foder, inside we can find out `./demo-workspace/libs/auth/src/lib/auth.module.ts`

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class AuthModule {}

```

And updates `./demo-workspace/apps/customer-portal/src/app/app.module.ts`

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('@demo-workspace/auth').then((module) => module.AuthModule),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

## Walking Through the Generated Library

If we have a look into `./demo-workspace/angular.json`, we will notice that has added `auth`, just like another app.

```json
{
    // ...............
    "auth": {
      "projectType": "library",
      "root": "libs/auth",
      "sourceRoot": "libs/auth/src",
      "prefix": "demo-workspace",
      "architect": {
        "lint": {
          "builder": "@nrwl/linter:eslint",
          "options": {
            "lintFilePatterns": [
              "libs/auth/src/**/*.ts",
              "libs/auth/src/**/*.html"
            ]
          }
        },
        "test": {
          "builder": "@nrwl/jest:jest",
          "outputs": ["coverage/libs/auth"],
          "options": {
            "jestConfig": "libs/auth/jest.config.js",
            "passWithNoTests": true
          }
        }
      }
    }
}
```

Updates `./demo-workspace/tsconfig.base.json`

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",
    "module": "esnext",
    "lib": ["es2017", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@demo-workspace/auth": ["libs/auth/src/index.ts"]
    }
  },
  "exclude": ["node_modules", "tmp"]
}

```

Let's run 

```bash
$ $(npm bin)/nx run customer-portal:serve


> nx run customer-portal:serve 
✔ Browser application bundle generation complete.

Initial Chunk Files    | Names               |      Size
vendor.js              | vendor              |   2.88 MB
polyfills.js           | polyfills           | 141.53 kB
main.js                | main                |  28.52 kB
runtime.js             | runtime             |   9.01 kB
styles.css             | styles              | 119 bytes

                       | Initial Total       |   3.05 MB

Lazy Chunk Files       | Names               |      Size
demo-workspace-auth.js | demo-workspace-auth |   2.98 kB

Build at: 2021-02-04T21:26:42.775Z - Hash: f14f5f1150d2f0cbad17 - Time: 5964ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```

Notice that now we have `demo-workspace-auth` a tiny chunk that is lazy loaded.

## Namespacing the Lib

Let's say that we want our libs to be segreated on different namespaces (directories), we can achive this by running

```bash
$ ng g lib auth --routing --lazy --parentModule=apps/customer-portal/src/app/app.module.ts --directory=shared
```

## Adding NgRx to the lib

```bash
$ ng g ngrx auth --module=libs/auth/src/lib/auth.module.ts
Your global Angular CLI version (11.1.2) is greater than your local version (11.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".
? Is this the root state of the application? No
? Would you like to use a Facade with your NgRx state? No
CREATE libs/auth/src/lib/+state/auth.actions.ts
CREATE libs/auth/src/lib/+state/auth.effects.spec.ts
CREATE libs/auth/src/lib/+state/auth.effects.ts
CREATE libs/auth/src/lib/+state/auth.models.ts
CREATE libs/auth/src/lib/+state/auth.reducer.spec.ts
CREATE libs/auth/src/lib/+state/auth.reducer.ts
CREATE libs/auth/src/lib/+state/auth.selectors.spec.ts
CREATE libs/auth/src/lib/+state/auth.selectors.ts
UPDATE libs/auth/src/lib/auth.module.ts
UPDATE libs/auth/src/index.ts
```

Now if we open `./demo-workspace/libs/auth/src/lib/auth.module.ts`

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}

```

## Using the NgRx Developer Tools

> Install Redux Dev Tools 

If we run our app now we must see some default state

```bash
$ $(npm bin)/nx run customer-portal:serve
```

## Building a Container Component

```bash
$ ng g c containers/login --project=auth
Your global Angular CLI version (11.1.2) is greater than your local version (11.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".
CREATE libs/auth/src/lib/containers/login/login.component.css
CREATE libs/auth/src/lib/containers/login/login.component.html
CREATE libs/auth/src/lib/containers/login/login.component.spec.ts
CREATE libs/auth/src/lib/containers/login/login.component.ts
UPDATE libs/auth/src/lib/auth.module.ts
```

Now we can update `./demo-workspace/libs/auth/src/lib/auth.module.ts` to load `LoginComponent`

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { LoginComponent } from './containers/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}

```

We can run the application again

```bash
$ $(npm bin)/nx run customer-portal:serve
```

And visit `http://localhost:4200/auth` we can see on bottom `login works!`

## Creating a Service

```bash
$ ng g s --help
Your global Angular CLI version (11.1.2) is greater than your local version (11.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".

nx generate @nrwl/angular:s [name] [options,...]

Options:
  --name                  The name of the service.
  --path                  The path at which to create the service, relative to the workspace root.
  --project               The name of the project.
  --flat                  When true (the default), creates files at the top level of the project. (default: true)
  --skipTests             Do not create "spec.ts" test files for the new service.
  --lintFix               Apply lint fixes after generating the service.
  --dryRun                Runs through and reports activity without writing to disk.
  --skip-nx-cache         Skip the use of Nx cache.
  --help                  Show available options for project target.
```

We are going to create the `auth service` on `auth project`

```bash
$ ng g s services/auth --project=auth
Your global Angular CLI version (11.1.2) is greater than your local version (11.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".
CREATE libs/auth/src/lib/services/auth.service.spec.ts
CREATE libs/auth/src/lib/services/auth.service.ts
```

Update `./demo-workspace/libs/auth/src/lib/services/auth.service.ts`

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }
}
```

Update `./demo-workspace/libs/auth/src/lib/auth.module.ts`

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { LoginComponent } from './containers/login/login.component';
+import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LoginComponent}
    ]),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
+ providers:[AuthService], 
  declarations: [LoginComponent],
})
export class AuthModule {}

```
