import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-workers',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './manage-workers.html',
  styleUrl: './manage-workers.css',
})
export class ManageWorkers {

}
