import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncforadminComponent } from './funcforadmin.component';

describe('FuncforadminComponent', () => {
  let component: FuncforadminComponent;
  let fixture: ComponentFixture<FuncforadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncforadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncforadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
