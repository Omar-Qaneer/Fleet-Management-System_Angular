import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteHistoryFormComponent } from './add-route-history-form.component';

describe('AddRouteHistoryFormComponent', () => {
  let component: AddRouteHistoryFormComponent;
  let fixture: ComponentFixture<AddRouteHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRouteHistoryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRouteHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
