import { Component, inject, input, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { City } from '../../model/City.type';
import { CityService } from '../../services/city-service';
import Swal from 'sweetalert2';
import { CountyService } from '../../services/county-service';

@Component({
  selector: 'app-cities',
  imports: [FormsModule],
  templateUrl: './cities.html',
  styleUrl: './cities.scss'
})
export class Cities implements OnChanges {

  countyId = input.required<number>();
  saved = input.required<number>();

  county: WritableSignal<string> = signal("");
  cities: WritableSignal<City[]> = signal<City[]>([]);

  editingCityId?: number;
  editedCityName: string = '';
  
  cityService: CityService = inject(CityService);
  countyService: CountyService = inject(CountyService);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {console.log(this.countyId());
    if(changes['countyId']){
      const currentValue = changes['countyId'].currentValue;
      if(currentValue !== undefined){
        if(currentValue > 0){
          this.cityService.getByCounty(currentValue).subscribe({
            next: cities => {
              this.cities.set(cities);
            }
          });
          this.countyService.get(currentValue).subscribe({
            next: county => {
              if(county.id && county.id > 0){
                this.county.set(county.name);
              }else{
                this.county.set("");
              }
            }
          });
        }else{
          this.cities.set([]);
        }
      }
    }
    if(changes['saved'] && changes['saved'].currentValue !== undefined){
      if(this.countyId() > 0){
        this.cityService.getByCounty(this.countyId()).subscribe({
          next: cities => {
            this.cities.set(cities);
          }
        });
      }else{
        this.cities.set([]);
      }
    }
  }

  startEditing(city: City): void {
    this.editingCityId = city.id;
    this.editedCityName = city.name;
  }

  save(id: number, newName: string): void {
    this.cityService.update(id, newName).subscribe({
      next: city => {
        if(city.id && city.id > 0){
          this.cityService.getByCounty(this.countyId()).subscribe({
            next: cities => {
              this.cities.set(cities);
            }
          });
          Swal.fire({
            title: 'Sikeres módosítás!',
            text: "",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }else{
          Swal.fire({
            title: 'Sikertelen mentés!',
            text: "",
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      error: err => {
        Swal.fire({
          title: 'Váratlan hiba történt!',
          text: "",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
    this.cancelEditing();
  }

  cancelEditing(): void {
    this.editingCityId = undefined;
    this.editedCityName = '';
  }

  delete(id: number): void {
    this.cityService.delete(id).subscribe({
      next: deleted => {
        if(deleted.id && deleted.id > 0){
          this.cityService.getByCounty(this.countyId()).subscribe({
            next: cities => {
              this.cities.set(cities);
            }
          });
          Swal.fire({
            title: 'Sikeres törlés!',
            text: "",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }else{
          Swal.fire({
          title: 'Sikertelen törlés!',
          text: "",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        }
      },
      error: err => {
        Swal.fire({
          title: 'Váratlan hiba történt!',
          text: err,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
