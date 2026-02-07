import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateWorkerRequest } from './dto';
import { Worker } from '../domain';

@Component({
  selector: 'app-manage',
  imports: [ReactiveFormsModule],
  templateUrl: './manage.html',
  styleUrl: './manage.css',
})
export class Manage {

   private http = inject(HttpClient);
   private router = inject(Router);
   workers = signal<Worker[]>([]);

   workerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
   });

   onSubmit() {
      if ( this.workerForm.valid ) {
        const workerValue = this.workerForm.value;
        const request: CreateWorkerRequest = {
          first_name: workerValue.firstName!,
          last_name: workerValue.lastName!
        }

        this.http.post('http://localhost:8080/workers', request).subscribe({
            next: (response) => {
              console.log(response);
              this.workerForm.reset();
              this.getAllWorkers();
            },
            error: (error) => {
              console.log(error);
            }
        });
      }
   }

   getAllWorkers() {
     this.http.get<Worker[]>('http://localhost:8080/workers').subscribe( result => {
       console.log(result);
       this.workers.set(result);
     });
   }

   deleteWorker(workerId: number) {
     this.http.delete(`http://localhost:8080/workers/${workerId}`)
      .subscribe({
        next: () => {
          console.log("worker with id ${workerId} deleted successfully");
          this.getAllWorkers();
        }
      });
   }

   ngOnInit() {
     this.getAllWorkers();
   }

}
