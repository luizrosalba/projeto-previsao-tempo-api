import { createReducer, Action, on } from '@ngrx/store'

import * as fromHomeActions from './home.actions';

export interface HomeState {
  entity: any;
  loading: boolean;
  error: boolean;
}

export const homeInitialState: HomeState = {
  entity: undefined,
  loading: false,
  error: false,
}

///on = quando 
/// lidando com as ações da aplicação 
/// 
const reducer = createReducer(
  homeInitialState,
  on(fromHomeActions.clearHomeState, () => homeInitialState),
  on(
    fromHomeActions.loadCurrentWeather,  /// quando mudar 
    fromHomeActions.loadCurrentWeatherById, /// quando mudar ir 
    state => ({
      ...state, /// clonando estado anterior 
      loading: true,
      error: false,
    }),
  ),
  on(fromHomeActions.loadCurrentWeatherSuccess, (state, { entity }) => ({
    ...state,
    entity,
    loading: false,
  })),
  on(fromHomeActions.loadCurrentWeatherFailed, state => ({
    ...state,
    loading: false,
    error: true,
  })),
);

/// recebe um estado e uma action e retorna um HomeState novo 
export function homeReducer(state: HomeState | undefined, action: Action): HomeState {
  return reducer(state, action);
}
