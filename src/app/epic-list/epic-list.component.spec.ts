import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicListComponent } from './epic-list.component';

describe('EpicListComponent', () => {
  let component: EpicListComponent;
  let fixture: ComponentFixture<EpicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicListComponent]
    });
    fixture = TestBed.createComponent(EpicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
