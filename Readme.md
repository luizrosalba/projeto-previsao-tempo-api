# Criando projeto para consultar a previsao do tempo via API 

- https://openweathermap.org/
- salvei minha api key 
- salvei a base do projeto 
- npm i 

## parte 2 
mostrou a aplicação 
## parte 3 
- mostrou como editar o tslint.json para  permite criar componentes com sufixo de pagina  ajuda na separacao por nomeclatura das responsabilidades

  "component-class-suffix": [
      true,
      "Component", /// permite criar componentes com sufixo de pagina  ajuda na separacao por nomeclatura das responsabilidades
      "Page"
    ],

- dai adicionaou um modulo dentro de pages/home 

    ng g m pages/home 

  - dai adicionaou um modulo dentro de pages/bookmarks 

    ng g m pages/bookmarks

  - dai adicionaou um componente dentro de pages/home  com typo pagina 

    ng g c pages/home --type page 

    dai sera criado home.page. 


  ng g c pages/bookmarks --type page 

    dai sera criado bookmark.page. 

 - vamos renderiza-los 

 app routing 

 - craimos nova rota 

 ``` Js 
 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home/containers/home/home.page';
import { BookmarksPage } from './pages/bookmarks/containers/bookmarks/bookmarks.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'bookmarks', component: BookmarksPage },
  { path: 'details', loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 ```   
## aula 4 
NGRX é o redux , dispacha acções para mudança da store quando há mudanças para angular 

![](./Capturar.PNG) 


um componente despacha ações que passam por um reducer e atualiza-se a store (um Json que guarda o estado da aplicação ) , teremos múltiplos reducers cada um lidando com ações diferentes . Reducer é uma função pura que retorna sempre um novo estado. 

- effects são side efeccts de uma action geralmente usados para realizar chamadas de serviço 
- Observable , daremos subscribe 

- ng add @ngrx/store  (adiciona o ngrx )

- importamos o storeModeule no app module 

```JS
 StoreModule.forRoot(reducers), /// inicializado o json 
```

- importamos no home o storemodule só que agora forfeature 

```JS 
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    ComponentsModule,
```
- declaramos a interface dentro do state 

src\app\pages\home\state\home.reducer.ts

- pelo dev tools vamos visualizar  o estado da store e as actions disparadas 

- ng add @ngrx/store-devtools 

- fará o bind entre o store da aplicação e o chrome (redux devtools)

- criamos o home.actions que define as ações 

- uma ação é despachada pelo pacote que manipula a store é capturada pelo reducer e dependendo do tipo faz manipulações na store 

-as actions aceitam props 

- entre [] o nome da feature que dispara a ação 

## parte 6 
effects 

iguais ao reducer , reagem as action de forma assincrona usando observables 

ng add @ngrx/effects 

effects module

EffectsModule.forRoot([]),

effect é um serviço injectable 

deve ser declarado no module 

queremos declara-lo separado por feature (dentro de home)

EffectsModule.forFeature([HomeEffects]),


  constructor(private actions$: Actions,
              private store: Store,
              private weatherService: WeatherService) {
  }
  /// action eh uma string de dados 
 
  /// colocamos o $ pois eh um observable 

``` Js 
loadCurrentWeather$ = createEffect(() => this.actions$ /// $ para dizer que é observable 
     .pipe( /// filtro 
      ofType(fromHomeActions.loadCurrentWeather),  
      mergeMap(({ query }) => this.weatherService. getCityWeatherByQuery(query)),
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
        return caught$;
      }),
      map((entity: CityWeather) => fromHomeActions.loadCurrentWeatherSuccess({ entity })),
    ),
  );
```

## parte 7 

vamos criar as actions que o projeto usa 


