import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[] = [];
  private apiKey: string = "MjA3F6WiYK4Af5LKqEcDrxP1XqdD6zZJ"
  private serviceUrl: string ="https://api.giphy.com/v1/gifs"

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
  }

  //Getter
  // (...) Para generar una copia, y no romper la lista
  get tagHistory() { return [...this._tagsHistory]; }

  private organizeHistory( tag: string){
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes(tag)) {
      this._tagsHistory = this.tagHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,11);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this.tagHistory))
  }

  private loadLocalStorage(): void{
    if ( !localStorage.getItem('history') ) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }

  public searchTag( tag: string): void{
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', tag)
    .set('limit', '10')

    //Observable
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe( (respuesta) => {
      this.gifList = respuesta.data;
    })
  }
}
