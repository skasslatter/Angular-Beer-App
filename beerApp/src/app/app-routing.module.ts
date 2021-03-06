import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {BreweryListComponent} from './pages/brewery/brewery-list/brewery-list.component';
import {BreweryDetailComponent} from './pages/brewery/brewery-detail/brewery-detail.component';
import {BeerDetailComponent} from './pages/beer/beer-detail/beer-detail.component';
import {BeerListComponent} from './pages/beer/beer-list/beer-list.component';

const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,
    },
    {
        path: 'breweries',
        component: BreweryListComponent,
    },
    {
        path: 'brewery-detail/:id',
        component: BreweryDetailComponent,
    },
    {
        path: 'beer-detail/:id',
        component: BeerDetailComponent,
    },
    {
        path: 'beers',
        component: BeerListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
