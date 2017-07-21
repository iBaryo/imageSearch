import { TestBed, inject } from '@angular/core/testing';
import { ImageService, Search, Image } from './image.service';
import { Observable } from "rxjs/Observable";
import { MockImageService, imgPerPage } from "app/mock.image.service";

describe('ImageService', () => {
  let service: MockImageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ImageService, useClass: MockImageService }
      ]
    });

    service = TestBed.get(ImageService);
  });

  it('should init', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the new search observable', () => {
    expect(service.search$).toEqual(jasmine.any(Observable));
  });

  describe('newSearch', () => {
    const searchText = 'shall we begin';

    it('new search should next observable', (done) => {
      service.search$.subscribe(search => {
        expect(search.text).toBe(searchText);
        expect(search.data$).toEqual(jasmine.any(Observable));
        expect(search.next).toEqual(jasmine.any(Function));
        done();
      });

      service.newSearch(searchText);
    });

    describe('search object', () => {
      let search: Search<Image>;

      beforeEach(() => {
        search = service.newSearch(searchText);
      });

      it('should also return search object sync', () => {
        expect(search).toEqual(jasmine.any(Object));
        expect(search.data$).toEqual(jasmine.any(Observable));
        expect(search.text).toBe(searchText);
      });

      it('should return extend data with each `next`', async () => {
        for (let calls = 1; calls < 5; calls++) {
          let images = await search.next();
          expect(images.length).toBe(imgPerPage);
        }
      });

      it('should next observable with extended data for each `next`', async (done) => {
        let calls = 0;
        const maxCalls = 5;
        search.data$.subscribe(images => {
          expect(images.length).toBe(calls * imgPerPage);
          if (calls == maxCalls) done();
        });

        for (calls = 1; calls <= 5; calls++) {
          await search.next();
        }
      });
    });
  });
});
