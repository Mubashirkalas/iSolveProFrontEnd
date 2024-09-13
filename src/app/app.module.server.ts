import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AppModule,
    ReactiveFormsModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
