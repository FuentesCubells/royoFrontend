import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { HeaderFormComponent } from '../../components/header/header-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderFormComponent, FormComponent, FooterComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
