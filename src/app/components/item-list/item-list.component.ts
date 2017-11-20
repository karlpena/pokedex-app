import { Component, OnInit, ViewChild } from '@angular/core';
import { IPokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { ItemDetailsComponent } from "../item-details/item-details.component";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  pokeman_API_URL: string= "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";
  pokemons: any[];
  loadingPokemons: boolean = false;
  message: string;
  fetchMsg: string;
  pageNavigation: IPokemon;
  pokemonStream: any[];
  pokemonsData: any[];  
  showButtons: boolean;
  checkButtons:boolean;

  @ViewChild(ItemDetailsComponent) itemDetails: ItemDetailsComponent;

  constructor(private _pokemonService: PokemonService,
              private _http: HttpClient) { }

  ngOnInit() {
    this.getPokemons();
  }

   // Getting pokemons from the API which returns 20 pokemons.
  getPokemons() { 
    this.loadingPokemons=true;
    this.fetchMsg = "Fetching Pokemons...";
    setTimeout(() => {
      this.fetchMsg = "Fetching pokemons is taking longer than expected. Please wait..."
    }, 3000);
    return this._pokemonService.getPokemons(this.pokeman_API_URL).subscribe(
      data => {
        this.handlePokemons(data);
      },
      error => {
        this.loadingPokemons= false;
        this.message = "Encountered an error. Please reload the page.";
        console.log('Encountered an error', error);
      }
    )
  }
  
  // To handle the data of 20 pokemons returned by the API
  handlePokemons(data) {
    this.pageNavigation = data;
    this.pokemons = data.results;
    this.getPokemonsData();
  }
  // To get the data of each of the pokemons 
  getPokemonsData() {
    this.pokemonStream = this.pokemons.map((pokemon) => {
        return this._http.get(pokemon.url);
    })
    Observable.forkJoin(this.pokemonStream).subscribe(
      data => {
        this.pokemonsData = data;
      },
      error => {
      this.message = "Encountered an error. Please reload the page.";
      console.log('Encountered an error', error);
      },
      () => {
      this.loadingPokemons= false;
      this.message = "Click on pokemon to view more details";
      this.showButtons= true;
      this.checkButtons = true;
      }
    )
  }

  onButtonClick(button) {
    if(button) {
    this.pokeman_API_URL = this.pageNavigation.previous;
    } else {
    this.pokeman_API_URL = this.pageNavigation.next;
    }
    this.showButtons = false;
    this.pokemonsData = [];
    this.getPokemons();
  }

  openModal(pokemon):void {
    this.itemDetails.pokemonDetails = pokemon;
    this.itemDetails.abilitiesData = [];
    this.itemDetails.showHeadings = false;
    this.itemDetails.disableModalButton = false;
  }
}
