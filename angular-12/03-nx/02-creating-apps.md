# Creating Apps

## Generating an App

From inside the workspace directory `./code/demo-workspace`, run

```bash
ng g app customer-portal --style css --routing
```

## Adding NgRx to the App

```bash
ng g ngrx app --module=apps/customer-portal/src/app/app.module.ts
Your global Angular CLI version (11.1.2) is greater than your local version (11.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".
? Is this the root state of the application? Yes
? Would you like to use a Facade with your NgRx state? No
UPDATE apps/customer-portal/src/app/app.module.ts
```

## Generating Additional Apps

Now we want to generate more apps we can do the same thing

```bash
ng g app admin-portal --style css --routing
```

## Serving an App

```bash
$(npm bin)/nx run customer-portal:serve
```

```bash
$(npm bin)/nx run admin-portal:serve
```
