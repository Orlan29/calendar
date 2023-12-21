import {
  Component,
  EventEmitter,
  Input,
  OnInit,
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
export class NavigationComponent implements OnInit {
  @Input({ required: true }) month!: number;
  @Input({ required: true }) year!: number;
  @Input({ required: true }) isToday!: boolean;
  @Output() monthEvent = new EventEmitter<number>();
  @Output() yearEvent = new EventEmitter<number>();
  monthNames!: string[];

  ngOnInit(): void {
    this.monthNames = monthNames;
  }

  handleGoToNextMonth(): void {
    if (this.month < 11) {
      this.monthEvent.emit(this.month + 1);
    } else {
      this.monthEvent.emit(0);
      this.yearEvent.emit(this.year + 1);
    }
  }

  handleGoToPreviousMonth(): void {
    if (this.month > 0) {
      this.monthEvent.emit(this.month - 1);
    } else {
      this.monthEvent.emit(11);
      this.yearEvent.emit(this.year - 1);
    }
  }

  handleGoToday(): void {
    const today = new Date();
    this.monthEvent.emit(today.getMonth());
    this.yearEvent.emit(today.getFullYear());
  }
}
