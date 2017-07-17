import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordTempComponent } from './password-temp.component';

describe('PasswordTempComponent', () => {
  let component: PasswordTempComponent;
  let fixture: ComponentFixture<PasswordTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
