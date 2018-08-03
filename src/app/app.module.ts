import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeRowComponent } from './home/about-me-section/about-me-row/about-me-row.component';
import { AboutMeSectionComponent } from './home/about-me-section/about-me-section.component';
import { HomeComponent } from './home/home.component';
import { NavModule } from './nav/nav.module';
import { SharedModule } from './shared/shared.module';
import { ProjectsSectionComponent } from './home/projects-section/projects-section.component';
import { TechSpecsSectionComponent } from './home/tech-specs-section/tech-specs-section.component';
import { OpenSourceSectionComponent } from './home/open-source-section/open-source-section.component';
import { OpenSourceCardComponent } from './home/open-source-section/open-source-card/open-source-card.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutMeRowComponent,
    AboutMeSectionComponent,
    ProjectsSectionComponent,
    TechSpecsSectionComponent,
    OpenSourceSectionComponent,
    OpenSourceCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'dev-sam-frontend' }), NavModule, BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, NgxJsonLdModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    SharedModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {
}
