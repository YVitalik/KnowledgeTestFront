import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertestsComponent } from './usertests.component';

describe('UsertestsComponent', () => {
  let component: UsertestsComponent;
  let fixture: ComponentFixture<UsertestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
