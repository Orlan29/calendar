import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'calendar-day',
  standalone: true,
  imports: [NgClass, EventComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent {
  @Input({ required: true }) date!: number;
  @Input({ required: true }) isToday!: boolean;
  @Input() year!: number;
  @Input() openEventModal!: boolean;
  @Output() openEventModalChange = new EventEmitter<boolean>();

  handleAddEvent(): void {
    this.openEventModalChange.emit(true);
    console.log(this.year);
  }
}
