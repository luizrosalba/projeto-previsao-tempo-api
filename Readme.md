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

    dai adicionaou um modulo dentro de pages/home 

    ng g m pages/home 

        dai adicionaou um modulo dentro de pages/bookmarks 

    ng g m pages/bookmarks

       dai adicionaou um componente dentro de pages/home  com typo pagina 

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
