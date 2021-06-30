## Adding a Toolbar Menu

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.scss`

```diff
$iconWidth: 56px;

+.example-spacer {
+   flex: 1 1 auto;
+}
# ....
```

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.html`

```html
<mat-toolbar color="primary">
    
    <button mat-button class="sidenav-toggle" (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
    </button>
    
    <!-- diff -->
    <span class="example-spacer"></span>
    <mat-icon>more_vert</mat-icon>
    <!-- diff -->
</mat-toolbar>
```

Open on browser to see what we have `npm start`, we have the item but is not clickable yet. Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.html`

```html
<mat-toolbar color="primary">
    
    <button mat-button class="sidenav-toggle" (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
    </button>
    
    <span class="example-spacer"></span>
    <!-- diff -->
    <button mat-button [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
        <button mat-menu-item>New contact</button>
    </mat-menu>
    <!-- diff -->
</mat-toolbar>

```

Lets see if this works.


## Dialog Basics

The `MatDialog` service can be used **to open model dialogs** with material design, styling, and animations. 

A dialog is opened by calling the **open method with a component to be loaded and an optional config object**. The open method will return an instance of `MatDialogRef`. The `MatDialogRef` provides a handle to the open dialog. It can be used to close the dialog and to receive notifications when the dialog has been closed. 

Components created via `MatDialog` can inject `MatDialogRef` and use it to close the dialog in which they are contained. When closing, an optional result value can be provided. 

Several directives are available to make it easier to structure our dialog content. The `mat‑dialog‑title` attribute allows us to set the dialog title applied to a heading element, such as H1 or H2. The `mat‑dialog‑content` defines the primary scrollable content of the dialog. The `mat‑dialog‑actions` is a container for action buttons at the bottom of the dialog. And finally, the `mat‑dialog‑close` attribute can optionally be added to a button. It makes the button close the dialog with an optional result from the bound value. 

Let's go ahead and implement our dialog that will allow us to add new users.

## Creating Our First Dialog

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.html`

```html
<mat-toolbar color="primary">
    
    <button mat-button class="sidenav-toggle" (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
    </button>
    
    <span class="example-spacer"></span>
    <button mat-button [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
        <!-- diff -->
        <button mat-menu-item (click)="openAddContactDialog()">New contact</button>
        <!-- diff -->
    </mat-menu>
</mat-toolbar>

```

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.ts`

```ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddContactDialog(): void {
    this.dialog.open();
  }
}

```
> NOTE: We have an error because open expects a component

Now we have to provide a component to this dialog, this is something that we can do inline, but we are going to create a new component:

```bash
ng g c contactmanager/components/new-contact-dialog --skip-tests
```

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.ts`

```diff
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
+import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddContactDialog(): void {
+   this.dialog.open(NewContactDialogComponent, { width: '450px'});
  }
}

```

Lets try on browser `npm start`

## Scaffolding a Form

Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.ts`

```ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddContactDialog(): void {
    /*diff*/
    const dialogRef = this.dialog.open(NewContactDialogComponent, { width: '450px'});
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
    /*diff*/
  }
}

```

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.html`

```html
<h2 mat-dialog-title>Add new contact</h2>

<mat-dialog-content>
  <div class="dialog-content-form">
      <mat-form-field appearance="fill">
        <mat-label>Input</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Select</mat-label>
        <mat-select>
          <mat-option value="one">First option</mat-option>
          <mat-option value="two">Second option</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Textarea</mat-label>
        <textarea matInput></textarea>
      </mat-form-field>
  </div>
</mat-dialog-content>

<mat-dialog-actions>
  <button mat-button color="primary" (click)="save()">
    <mat-icon>save</mat-icon> Save
  </button>
  <button mat-button color="primary" (click)="dismiss()">
    <mat-icon>cancel</mat-icon> Save
  </button>
</mat-dialog-actions>

```

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.scss`

```scss
.dialog-content-form {
    display: flex;
    flex-direction: column;
}

.dialog-content-form > * {
    width: 100%;
}

```

## Customizing the Form

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
  user: User;
  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) {}

  ngOnInit(): void {
    this.user = new User();
  }

  save() {
    this.dialogRef.close(this.user);
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}

```

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.html`

```html
<h2 mat-dialog-title>Add new contact</h2>

<mat-dialog-content>
  <div class="dialog-content-form">
      <mat-form-field appearance="fill">
        <!-- diff -->
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="user.name" required />
        <!-- diff -->
      </mat-form-field>
      <mat-form-field appearance="fill">
        <!-- diff -->  
        <mat-label>Avatar</mat-label>
        <mat-select [(ngModel)]="user.avatar">
          <mat-select-trigger>
              <mat-icon svgIcon="{{user.avatar}}"></mat-icon> {{user.avatar}}
          </mat-select-trigger>  
        <!-- diff -->
          <mat-option value="one">First option</mat-option>
          <mat-option value="two">Second option</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <!-- diff -->  
        <mat-label>Bio</mat-label>
        <textarea matInput [(ngModel)]="user.bio"></textarea>
        <!-- diff -->
      </mat-form-field>
  </div>
</mat-dialog-content>

<mat-dialog-actions>
  <button mat-button color="primary" (click)="save()">
    <mat-icon>save</mat-icon> Save
  </button>
  <button mat-button color="primary" (click)="dismiss()">
    <mat-icon>cancel</mat-icon> Save
  </button>
</mat-dialog-actions>

```

Now we want to iterate over the available avatars. Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.ts`

```diff
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
+ avatars = ['svg-4', 'svg-5', 'svg-6', 'svg-7']
  user: User;
  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) {}

  ngOnInit(): void {
    this.user = new User();
  }

  save() {
    this.dialogRef.close(this.user);
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}

```

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.html`

```diff
<h2 mat-dialog-title>Add new contact</h2>

<mat-dialog-content>
  <div class="dialog-content-form">
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="user.name" required />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Avatar</mat-label>
        <mat-select [(ngModel)]="user.avatar">
          <mat-select-trigger>
              <mat-icon svgIcon="{{user.avatar}}"></mat-icon> {{user.avatar}}
          </mat-select-trigger>  
-         <mat-option value="one">First option</mat-option>
-         <mat-option value="two">Second option</mat-option>
+         <mat-option *ngFor="let avatar of avatars" [value]="avatar">
+           <mat-icon svgIcon="{{avatar}}"></mat-icon> {{avatar}}
+         </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Bio</mat-label>
        <textarea matInput [(ngModel)]="user.bio"></textarea>
      </mat-form-field>
  </div>
</mat-dialog-content>

<mat-dialog-actions>
  <button mat-button color="primary" (click)="save()">
    <mat-icon>save</mat-icon> Save
  </button>
  <button mat-button color="primary" (click)="dismiss()">
    <mat-icon>cancel</mat-icon> Save
  </button>
</mat-dialog-actions>

```

Lets try the new dialog and see if it logs to the console.

## Adding Form Validation

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.html`

```diff
<mat-dialog-content>
  <div class="dialog-content-form">
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
-       <input matInput [(ngModel)]="user.name" required />
+       <input matInput [formControl]="name" required />
+       <mat-error *ngIf="name.invalid">{{getErrorMessage()}}</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Avatar</mat-label>
        <mat-select [(ngModel)]="user.avatar">
          <mat-select-trigger>
              <mat-icon svgIcon="{{user.avatar}}"></mat-icon> {{user.avatar}}
          </mat-select-trigger>
          <mat-option *ngFor="let avatar of avatars" [value]="avatar">
            <mat-icon svgIcon="{{avatar}}"></mat-icon> {{avatar}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Bio</mat-label>
        <textarea matInput [(ngModel)]="user.bio"></textarea>
      </mat-form-field>
  </div>
</mat-dialog-content>
```

To use `formControl` we need Reactive Forms, update `code/angularmaterial/src/app/contactmanager/contactmanager.module.ts`

```diff
@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent,
    NewContactDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
+   ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  providers: [UserService],
})
```

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  user: User;
  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) {}

  /*diff*/
  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
  /*diff*/

  ngOnInit(): void {
    this.user = new User();
  }

  save() {
    this.dialogRef.close(this.user);
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}

```

Lets check if the validation is working. Because we rid off `ngModel`, we need to assign the name, update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.ts`

```diff
# ....
save() {
+   this.user.name = this.name.value;
    this.dialogRef.close(this.user);
}
# ....
```

## Using the DatePicker


```html
<h2 mat-dialog-title>Add new contact</h2>

<mat-dialog-content>
  <div class="dialog-content-form">

      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput [formControl]="name" required />
        <mat-error *ngIf="name.invalid">{{getErrorMessage()}}</mat-error>
      </mat-form-field>

      <!-- diff -->
      <mat-form-field appearance="fill">
        <mat-label>Born</mat-label>
        <input matInput [matDatepicker]="picker" [(ngModel)]="user.birthDate">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <!-- diff -->

      <mat-form-field appearance="fill">
        <mat-label>Avatar</mat-label>
        <mat-select [(ngModel)]="user.avatar">
          <mat-select-trigger>
              <mat-icon svgIcon="{{user.avatar}}"></mat-icon> {{user.avatar}}
          </mat-select-trigger>
          <mat-option *ngFor="let avatar of avatars" [value]="avatar">
            <mat-icon svgIcon="{{avatar}}"></mat-icon> {{avatar}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      
      <mat-form-field appearance="fill">
        <mat-label>Bio</mat-label>
        <textarea matInput [(ngModel)]="user.bio"></textarea>
      </mat-form-field>

  </div>
</mat-dialog-content>

<mat-dialog-actions>
  <button mat-button color="primary" (click)="save()">
    <mat-icon>save</mat-icon> Save
  </button>
  <button mat-button color="primary" (click)="dismiss()">
    <mat-icon>cancel</mat-icon> Save
  </button>
</mat-dialog-actions>

```

Lets check on the browser

## Saving the User

Update `code/angularmaterial/src/app/contactmanager/components/new-contact-dialog/new-contact-dialog.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  user: User;
  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService // diff
    ) {}

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnInit(): void {
    this.user = new User();
  }

  /*diff*/
  save() {
    this.user.name = this.name.value;
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(this.user);
    });
  }
  /*diff*/

  dismiss() {
    this.dialogRef.close(null);
  }
}

```

Update `code/angularmaterial/src/app/contactmanager/services/user.service.ts`

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
  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next([...this.dataStore.users]);
      resolve(user);
    });
  }
  /*diff*/

  userById(id: number) {
    return this.dataStore.users.find(x => x.id === +id);
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

Now we can test it on the browser.

## Snackbar Notifications


Update `code/angularmaterial/src/app/contactmanager/components/toolbar/toolbar.component.ts`

```ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar, // diff
    private router: Router // diff
  ) {}

  ngOnInit(): void {}

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      /*diff*/  
      if (result) {
        this.openSnackBar('Contact added', 'Navigate')
          .onAction()
          .subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
      /*diff*/
    });
  }

  /*diff*/
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5_000,
    });
  }
  /*diff*/
}

```

