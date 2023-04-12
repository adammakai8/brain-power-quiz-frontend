import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListerComponent } from './entity-lister.component';

describe('EntityListerComponent', () => {
  let component: EntityListerComponent;
  let fixture: ComponentFixture<EntityListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityListerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
