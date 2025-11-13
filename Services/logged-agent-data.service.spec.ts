import { TestBed } from '@angular/core/testing';

import { LoggedAgentDataService } from './logged-agent-data.service';

describe('LoggedAgentDataService', () => {
  let service: LoggedAgentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedAgentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
