import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './shared/material.module';
// import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
  {
    path: 'contactmanager',
    loadChildren: () =>
      import('./contactmanager/contactmanager.module').then(
        (m) => m.ContactmanagerModule
      ),
  },
  { path: '**', redirectTo: 'contactmanager' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    // MaterialModule,
    // FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
