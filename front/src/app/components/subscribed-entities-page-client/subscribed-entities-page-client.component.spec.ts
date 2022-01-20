import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedEntitiesPageClientComponent } from './subscribed-entities-page-client.component';

describe('SubscribedEntitiesPageClient', () => {
  let component: SubscribedEntitiesPageClientComponent;
  let fixture: ComponentFixture<SubscribedEntitiesPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedEntitiesPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedEntitiesPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
