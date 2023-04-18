## Creating the Workspace

```bash
npx create-nx-workspace@latest
```

```
 >  NX   Let's create a new workspace [https://nx.dev/getting-started/intro]

✔ Choose what to create                 · integrated
✔ What to create in the new workspace   · angular-monorepo
✔ Repository name                       · myorg
✔ Application name                      · store
✔ Would you like to use Standalone Components in your application? · No
✔ Would you like to add routing? · Yes
✔ Default stylesheet format             · css
✔ Enable distributed caching to make your CI faster · Yes

 >  NX   Nx is creating your v15.9.2 workspace.

   To make sure the command works reliably in all environments, and that the preset is applied correctly,
   Nx will run "npm install" several times. Please wait.

```

## Adding Another Application to Your Workspace

```bash
cd myorg
npx nx g @nrwl/angular:app admin
```

## Generating Libraries

To create `common-ui` and `products` libraries you can run as follows:

```bash
npx nx g @nrwl/angular:lib common-ui
```

```bash
npx nx g @nrwl/js:lib products
```