import { TestBed, inject } from '@angular/core/testing';

import { FlickrService, FlickrOptions, IFlickrOptions } from './flickr.service';
  require('jasmine-co').install();

describe('FlickrService', () => {
  let service: FlickrService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlickrService,
        {
          provide: FlickrOptions,
          useValue: { apiKey: '13efc9a5ec0de63607ff59200d001452' } as IFlickrOptions
        }
      ]
    });

    service = TestBed.get(FlickrService);
  });

  it('should init', () => {
    expect(service).toBeTruthy();
  });

  it('should search', async () => {
    const res = await service.search('puppies');
    // expect().toBeTruthy();
    // fail();
  });
});
