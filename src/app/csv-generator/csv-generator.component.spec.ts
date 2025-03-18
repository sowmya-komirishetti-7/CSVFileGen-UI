import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvGeneratorComponent } from './csv-generator.component';

describe('CsvGeneratorComponent', () => {
  let component: CsvGeneratorComponent;
  let fixture: ComponentFixture<CsvGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
