import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SearchComponent } from './search.component';
import { ImageService } from "app/image.service";
import { MockImageService } from "app/mock.image.service";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchComponent],
      providers: [
        { provide: ImageService, useClass: MockImageService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke a new search according to input text', () => {
    // Arrange
    const searchText = 'the north remembers';
    component.searchText = searchText;
    spyOn(component.imgService, 'newSearch').and.callThrough();

    // Act
    const searchBtn = fixture.debugElement.query(By.css('#newSearchBtn')).nativeElement;
    searchBtn.click();

    // Assert
    expect(component.imgService.newSearch).toHaveBeenCalledWith(searchText);
  });
});
