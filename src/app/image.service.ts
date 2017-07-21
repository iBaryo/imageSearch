import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";


export interface Image {
  title: string;
  url: string;
}

export interface Search<T> {
  text: string,
  data$: Observable<Image[]>,
  next: () => Promise<Image[]>
}

@Injectable()
export abstract class ImageService {
  protected _searchObserver: Observer<Search<Image[]>>;
  public search$: Observable<Search<Image[]>>;

  constructor() {
    this.search$ = new Observable<Search<Image[]>>(o => this._searchObserver = o);
  }

  public newSearch(text: string, per_page = 20) {
    let images: Image[] = [];
    let page = 1;
    let imgObserver: Observer<Image[]>;

    const search: Search<Image[]> = {
      text,
      data$: new Observable<Image[]>(o => imgObserver = o),
      next: async () => {
        const newImages = await this.search(text, per_page, page++);
        images = images.concat(newImages);
        if (imgObserver)
          imgObserver.next(images);
        return newImages;
      }
    };

    if (this._searchObserver)
      this._searchObserver.next(search);

    return search;
  }

  protected abstract search(text: string, per_page: number, page: number) : Promise<Image[]>;
}
