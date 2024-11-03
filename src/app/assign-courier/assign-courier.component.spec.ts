import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourierComponent } from './assign-courier.component';

describe('AssignCourierComponent', () => {
  let component: AssignCourierComponent;
  let fixture: ComponentFixture<AssignCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCourierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
