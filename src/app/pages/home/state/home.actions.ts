import { createAction, props } from '@ngrx/store';

import { Bookmark } from 'src/app/shared/models/bookmark.model';

/// quem dispara eh a home
export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',
  props<{ query: string }>(),
);


export const loadCurrentWeatherById = createAction(
  '[Home] Load Current Weather By Id',
  props<{ id: string }>(),
);

/// quem dispara eh a wheater api 
export const loadCurrentWeatherSuccess = createAction(
  '[Weather API] Load Current Weather Success',
  props<{ entity: any }>(),
);

/// quem dispara eh a wheater api 
export const loadCurrentWeatherFailed = createAction(
  '[Weather API] Load Current Weather Failed',
);

export const toggleBookmark = createAction(
  '[Home] Toggle Bookmark',
  props<{ entity: Bookmark }>(),
);

export const clearHomeState = createAction('[Home] Clear Home State');
