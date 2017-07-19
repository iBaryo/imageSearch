import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageComponent } from './image/image.component';
import { FlickrService, FlickrOptions, IFlickrOptions } from "app/flickr.service";
import { ImageService } from "app/image.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ImagesListComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    {
      provide: ImageService,
      useClass: FlickrService
    },
    {
      provide: FlickrOptions,
      useValue: { apiKey: '13efc9a5ec0de63607ff59200d001452' } as IFlickrOptions 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
