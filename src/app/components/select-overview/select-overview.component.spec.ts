import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOverviewComponent } from './select-overview.component';

describe('SelectOverviewComponent', () => {
  let component: SelectOverviewComponent;
  let fixture: ComponentFixture<SelectOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
