import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicCreateComponent } from './epic-create.component';

describe('EpicCreateComponent', () => {
  let component: EpicCreateComponent;
  let fixture: ComponentFixture<EpicCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicCreateComponent]
    });
    fixture = TestBed.createComponent(EpicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
