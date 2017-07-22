import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from "app/image.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchText')
  public searchText : string;

  constructor(public imgService : ImageService) { 
    imgService.search$.subscribe(newSearch => this.searchText = newSearch.text);
  }

  ngOnInit() { 
  }
}
