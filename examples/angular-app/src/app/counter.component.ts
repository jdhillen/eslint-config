import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <h1>Counter: {{ count }}</h1>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
    </div>
  `,
})
export class CounterComponent {
  count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }
}
