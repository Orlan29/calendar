import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { NavigationComponent } from '@calendar/core/components/navigation/navigation.component';
import { days } from '@calendar/core/constants';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [NavigationComponent, NgStyle, NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  days!: string[];
  blankDays = signal<number[]>([]);
  nextMonthDays = signal(0);
  month = signal(0);
  year!: number;
  numberOfDays = signal<number[]>([]);
  isToDay!: boolean;

  ngOnInit(): void {
    this.days = days;
    this.initDate();
    this.getNoOfDays();
  }

  private getNoOfDays(): void {
    let daysInMonth = new Date(this.year, this.month() + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month()).getDay();
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
    this.year = value;
  }

  private initDate(): void {
    let today = new Date();
    this.month.set(today.getMonth());
    this.year = today.getFullYear();
  }

  isToday(date: number): boolean {
    const today = new Date();
    const d = new Date(this.year, this.month(), date);

    return today.toDateString() === d.toDateString();
  }

  private getNextMonthDays(): void {}
}
