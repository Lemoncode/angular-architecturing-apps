import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: ContactmanagerAppComponent,
    children: [{ path: '', component: MainContentComponent }],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [ContactmanagerAppComponent, ToolbarComponent, MainContentComponent, SidenavComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ]
})
export class ContactmanagerModule { }
