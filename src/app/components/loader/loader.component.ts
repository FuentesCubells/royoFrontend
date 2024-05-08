import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true, 
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements AfterViewInit {

  numDivs: number = 28;
  width: number = 0;
  divsHeight: number = 0;
  deviceHeight: number = 0;
  backgroundColor: string = '#252525';

  @ViewChild('loader') loader?: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.deviceHeight = window.innerHeight;
    if (this.loader) { 
      this.createDivs(this.loader.nativeElement);
    }
  }

  createDivs(container: HTMLElement) { 
    for (let i = this.numDivs; i >= 1; i--) { // Iterar en reversa desde 8 hasta 1
      this.divsHeight = this.deviceHeight / this.numDivs;

      this.width = this.loader?.nativeElement.offsetWidth 
      const newDiv = this.renderer.createElement('div');
      this.renderer.setStyle(newDiv, 'width', `${this.width}px`); // Establecer el ancho inicial en el máximo (390)
      this.renderer.setStyle(newDiv, 'height', `${this.divsHeight}px`);
      this.renderer.setStyle(newDiv, 'background-color', `${this.backgroundColor}`);

      this.renderer.appendChild(container, newDiv);

      setTimeout(() => { // Iniciar la animación después de un retraso
        this.animateDiv(newDiv);
      }, 200 * (this.numDivs - i)); // Ajustar el retraso para que cada animación comience después de la anterior
    }
  }

  animateDiv(newDiv: HTMLElement) { 
    let width = this.width;
    const intervalId = setInterval(() => {
      width = Math.max(0, width - 48); // Decrementar el ancho en 48 (390 / 8)
      this.renderer.setStyle(newDiv, 'width', `${width}px`);

      if (width <= 0) { // Si el ancho llega a 0, detener la animación
        clearInterval(intervalId);
      }
    }, 10);
  }
}
