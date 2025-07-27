import { ChangeDetectionStrategy, Component, inject, output, signal, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CountyService } from '../../services/county-service';
import { County } from '../../model/County.type';


@Component({
  selector: 'app-counties',
  imports: [MatSelectModule, MatFormFieldModule],
  providers: [],
  templateUrl: './counties.html',
  styleUrl: './counties.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counties {

  currentIdOutput = output<number>();
  selected = signal<number>(0);
  counties: WritableSignal<County[]> = signal<County[]>([]);
  countyService: CountyService = inject(CountyService);

  constructor() {
    this.countyService.getAll().subscribe({
        next: (data) => {
            this.counties.set(data);
        },
        error: (error) => {
            console.error('Error fetching user:', error);
        },
    });
  }

  sendCountyId(selected: number){
    this.currentIdOutput.emit(selected);
  }
}
