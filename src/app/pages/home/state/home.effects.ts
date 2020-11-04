import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { WeatherService } from 'src/app/shared/services/weather.service';
import { CityWeather } from 'src/app/shared/models/weather.model';
import * as fromHomeActions from './home.actions';

@Injectable()
export class HomeEffects {

  loadCurrentWeather$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromHomeActions.loadCurrentWeather), /// qual action vc esta lidando 
      mergeMap(({ query }) => this.weatherService.getCityWeatherByQuery(query)), /// merge map pois eh um observable na pode ser map 
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
        return caught$;
      }),
      map((entity: CityWeather) => fromHomeActions.loadCurrentWeatherSuccess({ entity })),
    ),
  );

  loadCurrentWeatherById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromHomeActions.loadCurrentWeatherById),
      mergeMap(({ id }: { id: string }) =>
        this.weatherService.getCityWeatherById(id)
      ),
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
        return caught$;
      }),
      map((entity: CityWeather) => fromHomeActions.loadCurrentWeatherSuccess({entity})),
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private weatherService: WeatherService) {
  }
}
