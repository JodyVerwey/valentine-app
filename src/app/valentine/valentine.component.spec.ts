import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValentineComponent } from './valentine.component';

describe('ValentineComponent', () => {
  let component: ValentineComponent;
  let fixture: ComponentFixture<ValentineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValentineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValentineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
