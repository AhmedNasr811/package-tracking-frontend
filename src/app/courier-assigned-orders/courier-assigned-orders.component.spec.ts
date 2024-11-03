import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierAssignedOrdersComponent } from './courier-assigned-orders.component';

describe('CourierAssignedOrdersComponent', () => {
  let component: CourierAssignedOrdersComponent;
  let fixture: ComponentFixture<CourierAssignedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierAssignedOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierAssignedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
