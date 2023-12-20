import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { monthNames } from '@calendar/core/constants';

@Component({
  selector: 'calendar-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Input({ required: true }) month!: WritableSignal<number>;
  @Input({ required: true }) year!: number;
  @Output() monthEvent = new EventEmitter<number>();
  @Output() yearEvent = new EventEmitter<number>();
  monthNames = monthNames;

  handleGoToNextMonth(): void {
    if (this.month() < 11) {
      this.monthEvent.emit(this.month() + 1);
    } else {
      this.monthEvent.emit(0);
      this.yearEvent.emit(this.year + 1);
    }
  }

  handleGoToPreviousMonth(): void {
    if (this.month() > 0) {
      this.monthEvent.emit(this.month() - 1);
    } else {
      this.monthEvent.emit(11);
      this.yearEvent.emit(this.year - 1);
    }
  }
}
