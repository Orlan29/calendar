import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  signal,
} from '@angular/core';
import { DayComponent } from '@calendar/core/components/day/day.component';
import { NavigationComponent } from '@calendar/core/components/navigation/navigation.component';
import { days } from '@calendar/core/constants';
import { ModalComponent } from '@calendar/ui/components/modal/modal.component';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [NavigationComponent, DayComponent, ModalComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  days!: string[];
  blankDays = signal<number[]>([]);
  nextMonthDays = signal(0);
  month = signal(0);
  year = signal(0);
  numberOfDays = signal<number[]>([]);
  isToDay!: boolean;
  openEventModal!: boolean;
  private readonly _today = new Date();

  constructor() {
    effect(() => {
      const day = this._today.getDate();
      this.isToDay = this.isToday(day);
    });
  }

  ngOnInit(): void {
    this.days = days;
    this.openEventModal = false;
    this.initDate();
    this.getNoOfDays();
    this.isToDay = true;
  }

  private getNoOfDays(): void {
    let daysInMonth = new Date(this.year(), this.month() + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year(), this.month()).getDay();
    let blankDaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankDaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankDays.set(blankDaysArray);
    this.numberOfDays.set(daysArray);
  }

  handleChangeMonth(value: number): void {
    this.month.set(value);
    this.getNoOfDays();
  }

  handleChangeYear(value: number): void {
    this.year.set(value);
    this.getNoOfDays();
  }

  private initDate(): void {
    this.month.set(this._today.getMonth());
    this.year.set(this._today.getFullYear());
  }

  isToday(date: number): boolean {
    const d = new Date(this.year(), this.month(), date);
    return this._today.toDateString() === d.toDateString();
  }

  private getNextMonthDays(): void {}
}
