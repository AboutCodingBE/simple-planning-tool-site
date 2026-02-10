import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'planning-overview',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './planning.html',
  styleUrl: './planning.css',
})
export class PlanningOverview {
}
