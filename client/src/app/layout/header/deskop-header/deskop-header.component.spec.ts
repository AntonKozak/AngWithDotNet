import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskopHeaderComponent } from './deskop-header.component';

describe('DeskopHeaderComponent', () => {
  let component: DeskopHeaderComponent;
  let fixture: ComponentFixture<DeskopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeskopHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
