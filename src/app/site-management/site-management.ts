import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-site-management',
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './site-management.html',
  styleUrl: './site-management.css',
})
export class SiteManagement {

}
