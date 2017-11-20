import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ItemListComponent } from './components/item-list/item-list.component';

import { HttpClientModule } from '@angular/common/http';

import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemDetailsComponent,
    PaginationComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
