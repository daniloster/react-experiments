import {
  observable,
  computed,
  action,
} from 'mobx';
import { getMoment, isValidTextDate } from './datePickerUtils';

class DatePickerModel {
  @observable format
  @observable isUtc
  @observable value
  @observable textDate
  @observable isValid

  constructor(model = {}) {
    this.isUtc = model.isUtc || false;
    this.format = model.format || 'DD MMM YYYY';
    const date = model.date
      ? this.moment(model.date.format(this.format), this.format)
      : this.moment(model.value);
    this.value = date.valueOf();
    this.textDate = date.format(this.format);
    this.isValid = date.isValid();
  }

  @computed get date() {
    return this.moment(this.value);
  }

  @computed get moment() {
    return getMoment(this.isUtc);
  }

  /**
   * Changes dates according to the arguments provided
   * @param {number} value - the timestamp
   * @param {boolean} isActive - the flag that defines if the event
   * is dispatched by an active calendar cell
   */
  @action.bound onChange({ value, isActive }) {
    const date = this.moment(value);
    if (isActive && Number.isInteger(value) && date.isValid()) {
      this.value = value;
      this.textDate = date.format(this.format);
      this.isValid = date.isValid()
        && isValidTextDate(this.textDate, this.format, this.isUtc);
    }
  }

  /**
   * Changes dates according to the arguments provided
   * @param {string} textDate - the date text
   * @param {boolean} isSubmitting - the flag that identifies
   * when is an attempt to commit new values
   */
  @action.bound onTextChange({ textDate, isSubmitting }) {
    const date = this.moment(textDate, this.format);
    this.textDate = textDate;
    this.isValid = date.isValid()
      && isValidTextDate(textDate, this.format, this.isUtc);
    if (isSubmitting && date.isValid()) {
      this.textDate = date.format(this.format);
      this.value = date.valueOf();
    }
  }

  /**
   * Restore the last selected date
   */
  @action.bound onRestore() {
    const date = this.moment(this.value);
    this.isValid = date.isValid();
    this.textDate = date.format(this.format);
  }
}

export default DatePickerModel;
