import { Component, OnInit } from '@angular/core';
import { ImageService, Search, Image } from "app/image.service";

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {

  public hasMore = false;
  public isLoading = false;
  public search : Search<Image[]>;
  constructor(public imageService : ImageService) { }

  ngOnInit() {
    this.imageService.search$.subscribe(newSearch => {
      this.search = newSearch;
      this.next();
    });
  }

  public async next() {
    this.isLoading = true;
    const result = await this.search.next();
    this.hasMore = Boolean(result.length);
    this.isLoading = false;
  }
}
