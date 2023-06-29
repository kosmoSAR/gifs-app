import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private _gifsService:GifsService){}

  //Getter
  get tags(){ return this._gifsService.tagHistory; }

  searchTag(tag: string){
    this._gifsService.searchTag(tag);
  }

}
