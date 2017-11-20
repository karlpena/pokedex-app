import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'; 
import { IPokemon } from "../interfaces/pokemon";


@Injectable()
export class PokemonService {

  constructor(private _http:HttpClient) { }

  getPokemons(API_URL) {
    return this._http.get(API_URL)
  }
  
  getPokemonData(API_URL) {
    return this._http.get(API_URL)
  }

}
