import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryComponent, MaxHistroyEntries } from './search-history.component';
import { ImageService } from "app/image.service";
import { MockImageService } from "app/mock.image.service";
import { By } from "@angular/platform-browser";

require('jasmine-co').install();

describe('SearchHistoryComponent', () => {
  const searchText = 'ruler of the three kingdoms';

  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;
  let service: MockImageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchHistoryComponent],
      providers: [
        {
          provide: ImageService,
          useClass: MockImageService
        },
        {
          provide: MaxHistroyEntries,
          useValue: 5
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ImageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a new entry for each new search', async () => {
    for (let searchCalls = 1; searchCalls <= 5; searchCalls++) {
      await service.newSearch(`${searchText} ${searchCalls}`);
      fixture.detectChanges();
      const histroyEntries = fixture.debugElement.queryAll(By.css('.search-text'));
      expect(histroyEntries.length).toBe(searchCalls);
    }
  });

  it('should not create a new entry for an existing entry', async () => {
    for (let searchCalls = 1; searchCalls <= 5; searchCalls++) {
      await service.newSearch(searchText);
      fixture.detectChanges();
      const histroyEntries = fixture.debugElement.queryAll(By.css('.search-text'));
      expect(histroyEntries.length).toBe(1);
    }
  });

  it('should create a new search when clicking an entry', async () => {
    await service.newSearch(searchText);
    fixture.detectChanges();
    spyOn(service, 'newSearch');
    const historyEntry = fixture.debugElement.query(By.css('.search-text')).nativeElement;
    historyEntry.click();
    await fixture.whenStable();
    expect(service.newSearch).toHaveBeenCalledWith(historyEntry.innerText);
  });
});