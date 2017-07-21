import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryComponent, MaxHistroyEntries } from './search-history.component';
import { ImageService } from "app/image.service";
import { MockImageService } from "app/mock.image.service";

describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHistoryComponent ],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
