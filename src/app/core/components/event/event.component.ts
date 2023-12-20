import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'calendar-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {
  @Input() date!: { day: number; month: number; year: number };
  @Input() title!: string;
  @Input() color!: string;
}
