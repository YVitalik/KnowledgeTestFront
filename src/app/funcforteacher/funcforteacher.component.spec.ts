import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncforteacherComponent } from './funcforteacher.component';

describe('FuncforteacherComponent', () => {
  let component: FuncforteacherComponent;
  let fixture: ComponentFixture<FuncforteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncforteacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncforteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
