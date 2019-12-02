import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTechComponent } from './delete-tech.component';

describe('DeleteTechComponent', () => {
  let component: DeleteTechComponent;
  let fixture: ComponentFixture<DeleteTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
