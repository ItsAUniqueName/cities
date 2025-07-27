import { Component, signal } from '@angular/core';
import { Cities } from "../components/cities/cities";
import { Counties } from "../components/counties/counties";
import { CreateCity } from "../components/create-city/create-city";

@Component({
  selector: 'app-homepage',
  imports: [Cities, Counties, CreateCity],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {

  selected = signal<number>(0);
  saved = signal<any>(0);
  
  setCurrentId(id: number){
    this.selected.set(id);
  }

  indicateSave(val: number){
    this.saved.set(val);
  }
}
