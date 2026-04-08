import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contratar } from './contratar';

describe('Contratar', () => {
  let component: Contratar;
  let fixture: ComponentFixture<Contratar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contratar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contratar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
