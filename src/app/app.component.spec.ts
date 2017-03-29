import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
      declarations: [ AppComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    de = fixture.debugElement;
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected <h2> of FindEm', () => {
    fixture.detectChanges();
    const h2 = de.query(By.css('h2')).nativeElement;
    expect(h2.innerText).toMatch('FindEm', '<h1> should say something about "FindEm"');
  });

  it('should show button text "Show Everyone" when search is empty', () => {
    fixture.detectChanges();
    const button = de.query(By.css('button')).nativeElement;
    expect(button.innerText).toMatch('Show Everyone', '<button> should say "Show Everyone" when search field is empty');
  });

  it('should show button text "Find Someone" when search is not empty', () => {
    comp.search = 'a';
    fixture.detectChanges();
    const button = de.query(By.css('button')).nativeElement;
    expect(button.innerText).toMatch('Find Someone', '<button> should say "Find Someone" when search field is not empty');
  });

  it ('should have playground ignore click events on first load', () => {
    fixture.detectChanges();
    const playground = de.query(By.css('.playground')).nativeElement;
    playground.dispatchEvent(new Event('click'));
    expect(comp.clicks).toEqual(0, 'this.clicks was incremented when the playground was not displayed');
  });

  it ('should respond to clicks after at least one search is made', () => {
    fixture.detectChanges();
    const button = de.query(By.css('button')).nativeElement;
    button.dispatchEvent(new Event('click'));
    const playground = de.query(By.css('.playground')).nativeElement;
    playground.dispatchEvent(new Event('click'));
    expect(comp.clicks).toEqual(1, 'the playground did not respond to the click after a search was made');
  });
});
