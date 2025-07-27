import { Component, inject, input, NgModule, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { City } from '../../model/City.type';
import { CityService } from '../../services/city-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cities',
  imports: [FormsModule],
  templateUrl: './cities.html',
  styleUrl: './cities.scss'
})
export class Cities {

  countyId = input.required<number>();
  cities: WritableSignal<City[]> = signal<City[]>([]);
  editingCityId?: number;
  editedCityName: string = '';
  cityService: CityService = inject(CityService);

  constructor() { }

  ngOnInit(): void {
    this.cityService.getByCounty(this.countyId()).subscribe({
      next: data => {
        if(data.length > 0){
          this.cities.set(data);
        }
      }
    });
  }

  startEditing(city: City): void {
    this.editingCityId = city.id;
    this.editedCityName = city.name;
  }

  // Function to save changes
  save(id: number, newName: string): void {
    this.cityService.update(id, newName).subscribe({
      next: data => {
        if(data.id && data.id > 0){
          this.cities.update(cities => {
            const idx = cities.findIndex(city => city.id == data.id);
            if(idx !== -1){
                cities[idx] = data;
              return  cities;
            }else{
              Swal.fire({
                title: 'Error!',
                text: "",
                icon: 'error',
                confirmButtonText: 'Ok'
              });
              return cities;
            }
          });
          Swal.fire({
            title: 'Sikeres törlés!',
            text: "",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }
      }
    });
    this.cancelEditing();
  }

  // Function to cancel editing
  cancelEditing(): void {
    this.editingCityId = undefined;
    this.editedCityName = '';
  }

  // Function to delete a city
  delete(id: number): void {
    this.cityService.delete(id).subscribe({
      next: data => {
        if(data.id && data.id > 0){
          Swal.fire({
            title: 'Sikeres törlés!',
            text: "",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }else{
          Swal.fire({
          title: 'Error!',
          text: "",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        }
      },
      error: err => {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
