import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@calendar/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'custom-calendar';
}
