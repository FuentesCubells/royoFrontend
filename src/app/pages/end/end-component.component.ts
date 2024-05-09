import { Component } from '@angular/core';
import { HermesService } from '../../services/hermes/hermes-service.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-end-component',
  standalone: true,
  imports: [],
  templateUrl: './end-component.component.html',
  styleUrl: './end-component.component.css'
})
export class EndComponentComponent {

  name?: string = 'Santiago Nasar'
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['key'];
    });
  }
  
}
