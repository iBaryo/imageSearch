import { Injectable, InjectionToken, Inject } from '@angular/core';
import { ImageService } from "app/image.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import * as Flickr from 'flickr-sdk';

export interface IFlickrOptions {
  apiKey : string;
}
export const FlickrOptions = new InjectionToken<IFlickrOptions>('flickrOptions');

@Injectable()
export class FlickrService extends ImageService {

  private _flickr : any; // todo: type file for flickr api?

  constructor(@Inject(FlickrOptions) options : IFlickrOptions) { 
    super();
    this._flickr = new Flickr(options);
  }

  protected search(text : string, per_page, page) {
    return this._flickr
    .request()
    .media()
    .search(text)
    .get({
      page,
      per_page
    })
    .then(res => {
      if (!res || !res.body || res.body.stat != 'ok')
        throw 'error getting photos from flickr';

      debugger;
      return res.body.photos.photo.map(p => ({
        title: p.title,
        url: `//farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`
      }));
    });
  }
}
