import { Component, signal } from '@angular/core';
import { Homepage } from "./homepage/homepage";

@Component({
  selector: 'app-root',
  imports: [Homepage],
  template: `
    <app-homepage/>
  `,
  styles: [],
})
export class App {
  protected readonly title = "Városok";
}
