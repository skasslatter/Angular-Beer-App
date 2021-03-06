import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Brewery} from '../../app/models/brewery/brewery';
import {Beer, Type} from '../../app/models/beer/beer';

interface ApiResponse {
    numberOfPages: number;
    currentPage: number;
}

interface BreweryApiResponse extends ApiResponse {
    data: Brewery[];
}

interface BeersApiResponse extends ApiResponse {
    data: Beer[];
}

interface BeerApiResponse extends ApiResponse {
    data: Beer;
}

interface TypesApiResponse extends ApiResponse {
    data: Type[];
}

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(
        private http: HttpClient
    ) {
    }

    getAllBreweries(): Observable<Brewery[]> {
        let breweries = [];
        return this.http.get('/api/breweries?withLocations=Y')
            .pipe((map((data: BreweryApiResponse) => {
                breweries = data.data;
                return breweries;
            })));
    }

    getAllBeers(page: number): Observable<BeersApiResponse> {
        return this.http.get<BeersApiResponse>(`/api/beers?withBreweries=Y&withLocations=Y&p=${page}`);
    }

    getBreweryInformation(id: number): Observable<Beer[]> {
        let breweryApiData = [];
        return this.http.get(`/api/brewery/${id}/beers?withBreweries=Y`)
            .pipe((map((data: BeersApiResponse) => {
                breweryApiData = data.data;
                return breweryApiData;
            })));
    }

    getBeerInformation(id: number): Observable<Beer> {
        return this.http.get(`/api/beer/${id}?withBreweries=Y`)
            .pipe((map((data: BeerApiResponse) => {
                return data.data;
            })));
    }

    getBeerTypes(): Observable<Type[]> {
        return this.http.get(`/api/styles?withBreweries=Y`)
            .pipe((map((data: TypesApiResponse) => {
                return data.data;
            })));
    }

    getBeerByType(id, page: number): Observable<BeersApiResponse> {
        return this.http.get<BeersApiResponse>(`/api/beers?styleId=${id}&p=${page}`);
    }

    getBeerByName(name: string): Observable<Beer[]> {
        return this.http.get(`/api/beers?name=${name}`)
            .pipe((map((data: BeersApiResponse) => {
                return data.data;
            })));
    }
}
