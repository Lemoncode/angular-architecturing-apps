## Getting Started with Nx

[Getting started official docs](https://nx.dev/latest/angular/getting-started/getting-started)

So where do you kick off? Where do you get the information? The best place is go to the Nrwl site. 

You need the `Angular CLI` on your machine. 
You need to go get the `nrwl/schematics`.

## Creating an Nx Workspace

```bash
mkdir code && cd code
npm i nx npx -D
npm init -y
$(npm bin)/nx --help

>  NX  The current directory isn't part of an Nx workspace.

  To create a workspace run:
  npx create-nx-workspace@latest <workspace name>


>  NX   NOTE  For more information please visit https://nx.dev/
```

Let's follow the previous intsractions and create a `workspace`

```bash
npx create-nx-workspace@latest demo-workspace
npx: installed 240 in 21.761s
? What to create in the new workspace angular           [a workspace with a single Angular application]
? Application name                    demo
? Default stylesheet format           CSS
? Default linter                      ESLint [ Modern linting tool ]
? Use Nx Cloud? (It's free and doesn't require registration.) No
Creating a sandbox with Nx...
added 240 packages from 232 contributors and audited 241 packages in 8.436s

29 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

new demo-workspace --no-interactive --preset=angular --appName=demo --style=css --linter=eslint --no-nxCloud --collection=@nrwl/workspace
CREATE demo-workspace/README.md
CREATE demo-workspace/.editorconfig
CREATE demo-workspace/.gitignore
CREATE demo-workspace/.prettierignore
CREATE demo-workspace/.vscode/extensions.json
CREATE demo-workspace/angular.json
CREATE demo-workspace/nx.json
CREATE demo-workspace/package.json
CREATE demo-workspace/tools/generators/.gitkeep
CREATE demo-workspace/tools/tsconfig.tools.json
CREATE demo-workspace/tsconfig.base.json
CREATE demo-workspace/.prettierrc
CREATE demo-workspace/decorate-angular-cli.js
CREATE demo-workspace/apps/.gitkeep
CREATE demo-workspace/libs/.gitkeep
...
```

## Walking Through the Generated Files

> https://nx.dev/latest/angular/tutorial/01-create-application

If we have a look into `code/demo-workspace/package.json` we will see different entries added, related with `nx`

```json
{
    // ......
    "scripts": {
      "ng": "nx",
      "postinstall": "node ./decorate-angular-cli.js && ngcc --properties es2015 browser module main",
      "start": "nx serve",
      "build": "nx build",
      "test": "nx test"
    },
    // ......
}
```


> NOTE: Seems that the command is not working on current version

If we run `npm run help`, we get a sinopsys about what all the related commands are doing:

```bash
Extensible Dev Tools for Monorepos

Commands:
  nx run
  [project][:target][:configuration]        Run a target for a project
  [options, ...]                            (e.g., nx run
                                            myapp:serve:production).

                                            You can also use the infix notation
                                            to run a target:
                                            (e.g., nx serve myapp
                                            --configuration=production)

                                            You can skip the use of Nx cache by
                                            using the --skip-nx-cache option.

  nx generate [collection:][generator]
  [options, ...]                            Generate code
                                            (e.g., nx generate @nrwl/web:app
                                            myapp).

  nx affected                               Run task for affected projects
  nx run-many                               Run task for multiple projects
  nx affected:apps                          Print applications affected by
                                            changes
  nx affected:libs                          Print libraries affected by changes
  nx affected:build                         Build applications and publishable
                                            libraries affected by changes
  nx affected:test                          Test projects affected by changes
  nx affected:e2e                           Run e2e tests for the applications
                                            affected by changes
  nx affected:dep-graph                     Graph dependencies affected by
                                            changes
  nx print-affected                         Graph execution plan
  nx affected:lint                          Lint projects affected by changes
  nx dep-graph                              Graph dependencies within workspace
  nx format:check                           Check for un-formatted files
  nx format:write                           Overwrite un-formatted files
                                                               [aliases: format]
  nx workspace-lint [files..]               Lint workspace or list of files.
                                            Note: To exclude files from this
                                            lint rule, you can add them to the
                                            ".nxignore" file
  nx workspace-generator [name]             Runs a workspace generator from the
                                            tools/generators directory
                                                  [aliases: workspace-schematic]
  nx migrate                                Creates a migrations file or runs
                                            migrations from the migrations file.
                                            - Migrate packages and create
                                            migrations.json (e.g., nx migrate
                                            @nrwl/workspace@latest)
                                            - Run migrations (e.g., nx migrate
                                            --run-migrations=migrations.json)

  nx report                                 Reports useful version numbers to
                                            copy into the Nx issue template
  nx list [plugin]                          Lists installed plugins,
                                            capabilities of installed plugins
                                            and other available plugins.

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```
