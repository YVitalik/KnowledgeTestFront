import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindtestComponent } from './findtest.component';

describe('FindtestComponent', () => {
  let component: FindtestComponent;
  let fixture: ComponentFixture<FindtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
