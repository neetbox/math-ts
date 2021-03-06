import { Prod,Sum, Tex } from "../_interfaces";

export class Event implements Sum<Event>, Prod<Event>, Tex {
  constructor (
    readonly probability: number,
    readonly experiment = () => Math.random() <= probability,
  ) {
    if (probability < 0 || 1 < probability) {
      throw new RangeError('Probability must be g.e. to zero or l.e. to 1');
    }
  }

  add(that: Event) {
    return new Event(Math.max(0, Math.min(1, this.probability + that.probability)));
  }

  subtract(that: Event) {
    return new Event(Math.max(0, Math.min(1, this.probability - that.probability)));
  }

  multiply(that: Event) {
    return new Event(Math.max(0, Math.min(1, this.probability * that.probability)));
  }

  divide(that: Event) {
    return new Event(Math.max(0, Math.min(1, this.probability / that.probability)));
  }

  isEmpty() {
    return this.probability === 0;
  }

  isUniversal() {
    return this.probability === 1;
  }

  toTexString() {
    return `P(A)=${this.probability > 0 ? this.probability : '\\varnothing'}`;
  }
}
