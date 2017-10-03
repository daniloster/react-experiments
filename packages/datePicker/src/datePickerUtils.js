import defaultMoment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(defaultMoment);

function ExtendableBuiltin(cls) {
  function Extendable() {
    /* eslint-disable */
    cls.apply(this, arguments);
    /* eslint-enable */
  }
  Extendable.prototype = Object.create(cls.prototype);
  Object.setPrototypeOf(Extendable, cls);

  return Extendable;
}

export class DatePickerError extends ExtendableBuiltin(Error) {
  static is = e => e instanceof DatePickerError;
}

/**
 * Gets the constructor for correct moment object.
 * @param {boolean} isUtc represents the type of date as UTC/LocalTime
 */
export function getMoment(isUtc) {
  return (isUtc ? moment.utc : moment);
}

/**
 * Validates text date based on format as a date.
 * @param {string} textDate represents the date in the input
 * @param {string} format represents the date format
 * @param {boolean} isUtc represents the type of date as UTC/LocalTime
 *
 * @returns {boolean}
 */
export function isValidTextDate(textDate, format, isUtc) {
  const date = getMoment(isUtc)(textDate, format);
  return textDate.trim().toLowerCase() === date.format(format).trim().toLowerCase();
}

/**
 * Converts timestamp into object with { value, date, text, isValid }
 * @param {number} value represents the date in UTC timestamp
 * @param {string} format represents the date format
 * @param {boolean} isUtc represents the type of date as UTC/LocalTime
 *
 * @returns {object} as {
 *  {moment} date,
 *  {number} value,
 *  {string} textDate,
 *  {boolean} isValid,
 * }
 */
export function parseTimestamp(value, format, isUtc) {
  const date = getMoment(isUtc)(value);

  return {
    value,
    date,
    textDate: date.format(format),
    isValid: date.isValid(),
  };
}

/**
 * Extract formatted text and status from DatePicker props.
 * @param {object} props represents the valid properties for DatePicker
 *
 * @returns {object} as {
 *  {moment} date,
 *  {number} value,
 *  {string} textDate,
 *  {boolean} isValid,
 * }
 */
export function parseDatePickerProps(props) {
  return parseTimestamp(props.value, props.format, props.isUtc);
}

/**
 * Converts text date based on format into object with { textDate, isValid }
 * not regenerating the text date based on date and format.
 * @param {string} textDate represents the date in the input
 * @param {string} format represents the date format
 * @param {boolean} isUtc represents the type of date as UTC/LocalTime
 *
 * @returns {object} as { {string} textDate, {boolean} isValid, }
 */
export function parsePartiallyTextDate(textDate, format, isUtc) {
  return {
    textDate,
    isValid: isValidTextDate(textDate, format, isUtc),
  };
}

/**
 * Converts text date based on format into object with { date, textDate, isValid }.
 * This method differs from parsePartiallyTextDate, because here text date is regenerated.
 * Whereas on parsePartiallyTextDate is assigned the text date provided.
 * @param {string} textDate represents the date in the input
 * @param {string} format represents the date format
 * @param {boolean} isUtc represents the type of date as UTC/LocalTime
 *
 * @returns {object} as {
 *  {moment} date,
 *  {number} value,
 *  {string} textDate,
 *  {boolean} isValid,
 * }
 */
export function parseTextDate(textDate, format, isUtc) {
  if (!isValidTextDate(textDate, format, isUtc)) {
    throw new DatePickerError(`Date "${textDate}" is not a valid date!`);
  }

  const date = getMoment(isUtc)(textDate, format);

  return {
    date,
    value: date.valueOf(),
    textDate: date.format(format),
    isValid: date.isValid(),
  };
}

const eng = {
  weekdays: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ],
  weekdaysShort: [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  ],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
const ptBR = {

  weekdays: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
  ],
  weekdaysShort: [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab',
  ],
  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
};

const locales = {
  en: () => moment.updateLocale('en', eng),
  'pt-BR': () => moment.updateLocale('pt-BR', ptBR),
  pt: () => moment.updateLocale('pt', ptBR),
};

export function updateLocale(locale) {
  locales[locale]();
}


/**
 * Generates a calendar which is a list of week that is composed
 * by start and end properties
 * @param {number} year represents the year provided
 * @param {number} month represents the month provided (0 - 11)
 * @param {boolean} isUtc represents the type of date as UTC/LocalTime
 */
export function getCalendar({ year, month, isUtc }) {
  const m = getMoment(isUtc);
  const currentDate = m([year, month]);
  const firstDay = currentDate.clone().startOf('month');
  const endDay = currentDate.clone().endOf('month');

  const isoWeekDiff = endDay.isoWeek() - firstDay.isoWeek();
  const weekDiff = endDay.week() - firstDay.week();
  const weekMethod =
    (isoWeekDiff > 0 && isoWeekDiff > weekDiff)
      ? 'isoWeek'
      : 'week';

  const startWeek = firstDay[weekMethod]();
  const endWeek = endDay[weekMethod]();

  const weeks = Array((endWeek - startWeek) + 1)
    .fill(startWeek)
    .map((v, idx) => v + idx)
    .concat(
      endDay.week() < startWeek
        ? [1] : [],
    );

  const calendar = weeks.map((week, idx) => {
    const currentIteration = m([year, month])
      .add((idx > 0 && week < weeks[0]) ? 1 : 0, 'year');
    const [firstWeekDay, lastWeekDay] = [
      m(currentIteration)[weekMethod](week).day(0),
      m(currentIteration)[weekMethod](week).day(6),
    ];
    const weekRange = moment.range(firstWeekDay, lastWeekDay);
    return weekRange;
  });

  return calendar.filter(({ start, end }) =>
    !(start.month() === end.month() && month !== start.month()),
  );
}

export default {
  DatePickerError,
  getMoment,
  isValidTextDate,
  parseTimestamp,
  parsePartiallyTextDate,
  parseTextDate,
  updateLocale,
  getCalendar,
};
