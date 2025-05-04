import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from './core/services/theme.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './shared/components/button/button.component';
import {TranslateService} from '@ngx-translate/core';
import {SelectorComponent} from './shared/components/selector/selector.component';
import {InputComponent} from './shared/components/input/input.component';
import {PaymentCardComponent} from './features/billing/payment-card/payment-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    ButtonComponent,
    SelectorComponent,
    InputComponent,
    PaymentCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swiftport-frontend';
  isDarkTheme = false;

  constructor(private themeService: ThemeService, private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.themeService.theme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onClickPersonalizado(): void {
    console.log('¡Click en el botón personalizado!');
  }

  options: string[] = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
  selectedOption: string = '';

  onSelectionChange(selected: string) {
    this.selectedOption = selected;
    console.log('Opción seleccionada:', selected);
  }

  card = {
    title: 'Plan Básico',
    items: [
      'Hasta 50 tareas/mes',
      'Reportes limitados',
      '1 usuario supervisor',
      'Soporte'
    ],
    price: '$50'
  };

  // Método que maneja el clic en el botón y guarda el título
  onTitleSaved(title: string): void {
    console.log('Título guardado:', title);
  }
}
