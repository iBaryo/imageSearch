import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { ImageService } from "app/image.service";

export const MaxHistroyEntries = new InjectionToken('max history');

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  public history: string[] = [];
  constructor( @Inject(MaxHistroyEntries) private _maxEntries, public imgService: ImageService) { }

  ngOnInit() {
    this.imgService.search$.subscribe(newSearch => {
      if (!this.history.includes(newSearch.text)) {
        this.history.splice(0, 0, newSearch.text);
        if (this.history.length > this._maxEntries)
          this.history.pop();
      }
    });
  }
}
