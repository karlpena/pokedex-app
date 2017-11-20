import { Component } from '@angular/core';
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent {

  pokemonDetails;
  abilitiesData: any[] = [];
  abilitiesDetails;
  showHeadings: boolean = false;
  modalFetchMsg: boolean = false;
  disableModalButton: boolean;

  constructor(private _pokemonService: PokemonService) { }

  getAbilities() {
    this.modalFetchMsg = true;
    this.disableModalButton = true;
    this.abilitiesDetails = this.pokemonDetails.abilities;
    this.abilitiesDetails.map((abilityDetail) => {
        return this._pokemonService.getPokemonData(abilityDetail.ability.url).subscribe(
        data => {
              this.abilitiesData.push(data);
            },
        error => {
              console.log('Encountered an error', error); 
            },
        () => {
          this.modalFetchMsg = false;
          this.showHeadings = true;
        }
      )
   })
  }
}
