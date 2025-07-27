import { ChangeDetectionStrategy, Component, inject, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CountyService } from '../../services/county-service';
import { County } from '../../model/County.type';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-counties',
  imports: [MatSelectModule, MatFormFieldModule],
  providers: [],
  templateUrl: './counties.html',
  styleUrl: './counties.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counties {

  currentIdOutput: OutputEmitterRef<number> = output<number>();
  selected: WritableSignal<number> = signal<number>(0);
  counties: WritableSignal<County[]> = signal<County[]>([]);
  countyService: CountyService = inject(CountyService);

  constructor() {
    this.countyService.getAll().subscribe({
        next: (counties) => {
            this.counties.set(counties);
        },
        error: err => {
            Swal.fire({
              title: 'Váratlan hiba történt!',
              text: '',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
        },
    });
  }

  sendCountyId(selected: number){
    this.currentIdOutput.emit(selected);
  }
}
