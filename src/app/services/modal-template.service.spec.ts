import { TestBed } from '@angular/core/testing';

import { ModalTemplateService } from './modal-template.service';

describe('ModalTemplateService', () => {
  let service: ModalTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
