import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from "app/image.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public imgService : ImageService) { }

  ngOnInit() { 
  }
}
