import { TestBed, inject } from '@angular/core/testing';

import { ImageService } from './image.service';

let id = 0;

class MockImageService extends ImageService {
  protected async search(text, per_page, page) {
    return [{
      title: `${++id}`,
      url: `http://${id}`
    }];
  }
}

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ImageService, useClass: MockImageService }
      ]
    });
  });

  it('should ...', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));
});
