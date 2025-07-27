import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
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
  countyId: InputSignal<number> = input.required<number>();
  name?: string;
  saveIndicatorOutput: OutputEmitterRef<number> = output<number>();

  save(name?:string){
    if(name != ""){
      this.cityService.create(this.countyId(), name!).subscribe({
        next: data =>{
          if(data.id && data.id > 0){
            this.saveIndicatorOutput.emit(1);
            Swal.fire({
              title: 'Sikeres mentés!',
              text: '',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }else{
            Swal.fire({
              title: 'Sikertelen mentés!',
              text: '',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        },
        error: err => {
          Swal.fire({
            title: 'Váratlan hiba történt!',
            text: '',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }

}
