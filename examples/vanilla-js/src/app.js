/**
 * Counter class demonstrating modern JavaScript patterns
 */
export class Counter {
  constructor(initialCount = 0) {
    this.count = initialCount;
    this.listeners = [];
  }

  /**
   * Increment the counter by a given amount
   * @param {number} amount - Amount to increment (default: 1)
   * @returns {number} The new count value
   */
  increment(amount = 1) {
    this.count += amount;
    this.notify();
    return this.count;
  }

  /**
   * Decrement the counter by a given amount
   * @param {number} amount - Amount to decrement (default: 1)
   * @returns {number} The new count value
   */
  decrement(amount = 1) {
    this.count -= amount;
    this.notify();
    return this.count;
  }

  /**
   * Reset the counter to zero
   */
  reset() {
    this.count = 0;
    this.notify();
  }

  /**
   * Subscribe to counter changes
   * @param {Function} listener - Callback function
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notify all listeners of counter change
   */
  notify() {
    for (const listener of this.listeners) {
      listener(this.count);
    }
  }
}

// Example usage
const counter = new Counter(0);
counter.subscribe((count) => {
  console.log(`Count changed: ${count}`);
});

counter.increment();
counter.decrement();
