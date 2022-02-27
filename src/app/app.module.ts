import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './pages/home/main/main.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { SidebarComponent } from './pages/home/sidebar/sidebar.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { PresentationComponent } from './pages/presentation/presentation/presentation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HistoryComponent } from './pages/presentation/history/history.component';

//Material Carousel
import { MatCarouselModule } from '@ngbmodule/material-carousel';



const config: SocketIoConfig = { url: 'http://localhost:3001', options: { autoConnect: false} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    PresentationComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot()
  ],
  providers: [    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
