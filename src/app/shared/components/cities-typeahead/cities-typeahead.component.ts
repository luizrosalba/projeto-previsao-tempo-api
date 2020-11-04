import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';

import { CityTypeaheadItem } from '../../models/city-typeahead-item.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'jv-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss'],
})
export class CitiesTypeaheadComponent implements OnInit, ControlValueAccessor {

  dataSource$: Observable<CityTypeaheadItem[]>;
  search: string;

  loading: boolean;
  disabled: boolean;
  private onChange: (value: CityTypeaheadItem) => void;
  private onTouched: () => void;

  constructor(private citiesService: CitiesService,
              @Optional() @Self() public control: NgControl) {
    control.valueAccessor = this;  /// bindando 
  }

  ngOnInit() {
    this.dataSource$ = new Observable(
      (subscriber: Subscriber<string>) => subscriber.next(this.search)
    )
      .pipe(
        switchMap((query: string) => this.citiesService.getCities(query)) //// recebe a query e faz a request http 
        /// switchmap interrompe a informação e faz a request , se antes da requisicao terminar ele reeber mais informações ele faz outra requisicao com a nova informacao 
        
      );
  }

  onSelected(match: TypeaheadMatch) {
    this.onTouched();
    this.onChange(match.item);
  }
 
  registerOnChange(fn: (value: CityTypeaheadItem) => void) {   /// fn = function 
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue() {  /// o componente pai nao injeta nada no form control 
  }
}
