import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SssdComponent } from './sssd.component';

describe('SssdComponent', () => {
  let component: SssdComponent;
  let fixture: ComponentFixture<SssdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SssdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SssdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
