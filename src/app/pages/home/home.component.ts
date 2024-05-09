import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { HeaderFormComponent } from '../../components/header/header-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderFormComponent, FormComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
