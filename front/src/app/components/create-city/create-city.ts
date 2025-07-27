import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CityService } from '../../services/city-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-city',
  imports: [MatFormField, MatInputModule, FormsModule],
  templateUrl: './create-city.html',
  styleUrl: './create-city.scss'
})
export class CreateCity {

  cityService: CityService = inject(CityService);
  countyId = input.required<number>();
  name?: string;

  save(name?:string){
    if(name != ""){
      this.cityService.create(this.countyId(), name!).subscribe({
        next: data =>{
          if(data.id && data.id > 0){
            Swal.fire({
              title: 'Sikeres mentés!',
              //text: 'Something went wrong!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }else{
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        }
      });
    }
  }

}
