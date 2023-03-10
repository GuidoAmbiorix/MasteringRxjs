import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Import angular material
import { MaterialModule } from './shared/material/material.module';

import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HomeComponent } from './pages/home/home.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { AltPostsComponent } from './pages/alt-posts/alt-posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { RegistroPreIndexComponent } from './pages/registro-pre-index/registro-pre-index.component';
import { AsignarCargosComponent } from './components/asignar-cargos/asignar-cargos.component';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    HomeComponent,
    DeclarativePostsComponent,
    AltPostsComponent,
    SinglePostComponent,
    LoadingComponent,
    AddPostComponent,
    RegistroPreIndexComponent,
    AsignarCargosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
