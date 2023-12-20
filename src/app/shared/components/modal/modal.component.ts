import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'calendar-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() openEventModal!: boolean;
  @Output() openEventModalChange = new EventEmitter<boolean>();

  handleAddEvent(): void {
    this.openEventModalChange.emit(false);
  }
}
