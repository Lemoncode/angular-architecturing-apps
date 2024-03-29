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
