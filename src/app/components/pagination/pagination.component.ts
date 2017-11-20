import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() checkButtonsOnLoad: boolean;
  @Input() showButtons: boolean;
  disablePrevious: boolean = false;
  disableNext: boolean = false;
  displayButtons: boolean = false;
  @Input() navigate;
  @Output() buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  
  constructor() { }

  ngOnChanges():void {
    this.displayButtons = this.showButtons;
    if(this.checkButtonsOnLoad) {
      this.checkButtons();
    }
  }

  // To navigate to the previous page
  previousPage():void {
    this.buttonClicked.emit(true); //emitting true if previous button is clicked

    }
    // To navigate to next page
    nextPage():void {
      this.buttonClicked.emit(false); //emitting true if next button is clicked

    }

    // Checking buttons to disable them if the previous url or next url is null otherwise enable buttons.
    checkButtons():void {
    if(!this.navigate.previous) {
      this.disablePrevious = true;
    } else {
      this.disablePrevious = false;
    }

    if(!this.navigate.next) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }
}
