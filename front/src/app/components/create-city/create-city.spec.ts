import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCity } from './create-city';

describe('CreateCity', () => {
  let component: CreateCity;
  let fixture: ComponentFixture<CreateCity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
