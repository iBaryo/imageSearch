import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs";


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
  protected _newSearchEmitter: EventEmitter<Search<Image[]>>;
  public get search$() { return this._newSearchEmitter.asObservable() };

  constructor() {
    this._newSearchEmitter = new EventEmitter<Search<Image[]>>();
  }

  public newSearch(text: string, per_page = 20) {
    let images: Image[] = [];
    let page = 1;
    let imgSubject = new BehaviorSubject<Image[]>([]);
    
    const search: Search<Image[]> = {
      text,
      data$: imgSubject.asObservable(),
      next: async () => {
        const newImages = await this.search(text, per_page, page++);
        images = images.concat(newImages);
        imgSubject.next(images);
        return newImages;
      }
    };

    this._newSearchEmitter.next(search);

    return search;
  }

  protected abstract search(text: string, per_page: number, page: number): Promise<Image[]>;
}
