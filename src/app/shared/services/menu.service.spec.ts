import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return menu items', (done) => {
    service.getMenuItems().subscribe(items => {
      expect(items).toBeTruthy();
      expect(items.length).toBeGreaterThan(0);
      done();
    });
  });
}); 