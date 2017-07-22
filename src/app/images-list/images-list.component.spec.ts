import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ImagesListComponent } from './images-list.component';
import { MockImageService, imgPerPage } from "app/mock.image.service";
import { ImageService, Image } from "app/image.service";
import { Input, Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  selector: 'app-image',
  template: `<div></div>`
})
class MockImageComponent {
  @Input('image')
  public image: Image;
}


describe('ImagesListComponent', () => {
  let component: ImagesListComponent;
  let fixture: ComponentFixture<ImagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesListComponent, MockImageComponent],
      providers: [
        { provide: ImageService, useClass: MockImageService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesListComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display label', async () => {
    const labelEl = fixture.debugElement.query(By.css('#results-label')).nativeElement;
    expect(
      labelEl.attributes['hidden']
    ).toBeTruthy();
  });

  describe('new search', () => {
    beforeEach(async () => {
      const searchText = 'everything before `but` is shit';
      const service = TestBed.get(ImageService) as ImageService;
      const imgs = await service.newSearch(searchText);
      fixture.detectChanges();
    });

    it('should display label', async () => {
      expect(
        fixture.debugElement.query(By.css('#results-label')).nativeElement.attributes['hidden']
      ).toBeFalsy();
    });

    it('should display images', async () => {
      const imageCmps = fixture.debugElement.queryAll(By.directive(MockImageComponent));
      expect(imageCmps.length).toBe(imgPerPage)
    });
  });
});