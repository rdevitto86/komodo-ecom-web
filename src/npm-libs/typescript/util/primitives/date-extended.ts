/**
 * @typedef {TimeUnit}
 * @type {Number | String}
 * @description units used to measure time
 */
type TimeUnit = number | string;

/**
 * @typedef {DateType}
 * @type {Date | Number | String}
 * @description units to measure dates/time periods
 */
type DateType = Date | TimeUnit;

/**
 * @class
 * @version 1.0
 * @description utility class that extends JavScript Date functions
 */
export default class DateExtended {
    /**
     * @public
     * @static
     * @function DateExtended.convertDateToLocalTime
     * @description returns the current date in minutes
     * @param {DateType} date date to convert
     * @returns {Date}
     */
    static convertDateToLocalTime(date: DateType) {
        switch (typeof date) {
            case 'string':
            case 'number':
                return new Date(date);
            case 'object':
                if (date instanceof Date) {
                    return new Date(
                        Date.UTC(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate(),
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds()
                        )
                    );
                }
                return new Date();
            default:
                return undefined;
        }
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertDateToUTC
     * @description converts a local date object into UTC
     * @param {DateType} date date in local time zone
     * @returns {Date}
     */
    static convertDateToUTC(date: DateType) {
        // convert string/number to local date
        if (typeof date === 'string' || typeof date === 'number') {
            date = new Date(date);
        }

        return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
        );
    }

    /**
     * @public
     * @static
     * @function DateExtended.calculateTimeDifference
     * @description calculates the time difference between two dates
     * @param {Date} recent most recent date
     * @param {Date} previous past date
     * @returns {Object} difference between dates
     */
     static calculateTimeDifference(recent: Date, previous: Date) {
        if (!(recent instanceof Date) || !(previous instanceof Date)) {
            return {};
        }

        const milliseconds = recent.getTime() - previous.getTime();
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;

        // ms, sec, min, hr, day, week, month,
        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertMilliseconds
     * @description converts milliseconds into equivalent time units
     * @param {TimeUnit} milliseconds number of milliseconds
     * @returns {Object} calculated time units
     */
     static convertMilliseconds(milliseconds: TimeUnit) {
        if (typeof milliseconds !== 'number') {
            if (typeof milliseconds === 'string') {
                milliseconds = Number.parseFloat(milliseconds);
            } else {
                return {};
            }
        }

        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertSeconds
     * @description converts seconds into equivalent time units
     * @param {TimeUnit} seconds number of seconds
     * @returns {Object} calculated time units
     */
    static convertSeconds(seconds: TimeUnit) {
        if (typeof seconds !== 'number') {
            if (typeof seconds === 'string') {
                seconds = Number.parseFloat(seconds);
            } else {
                return {};
            }
        }

        const milliseconds = seconds * 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertSeconds
     * @description converts minutes into equivalent time units
     * @param {TimeUnit} minutes number of milliseconds
     * @returns {Object} calculated time units
     */
    static convertMinutes(minutes: TimeUnit) {
        if (typeof minutes !== 'number') {
            if (typeof minutes === 'string') {
                minutes = Number.parseFloat(minutes);
            } else {
                return {};
            }
        }

        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;
        const hours = minutes * 60;
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertHours
     * @description converts hours into equivalent time units
     * @param {TimeUnit} hours number of hours
     * @returns {Object} calculated time units
     */
    static convertHours(hours: TimeUnit) {
        if (typeof hours !== 'number') {
            if (typeof hours === 'string') {
                hours = Number.parseFloat(hours);
            } else {
                return {};
            }
        }

        const minutes = hours * 60;
        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;
        const days = hours / 24;
        const weeks = days / 7;
        const years = weeks / 52;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertDays
     * @description converts days into equivalent time units
     * @param {TimeUnit} days number of days
     * @returns {Object} calculated time units
     */
    static convertDays(days: TimeUnit) {
        if (typeof days !== 'number') {
            if (typeof days === 'string') {
                days = Number.parseFloat(days);
            } else {
                return {};
            }
        }

        const hours = days * 24;
        const minutes = hours * 60;
        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertWeeks
     * @description converts weeks into equivalent time units
     * @param {TimeUnit} weeks number of weeks
     * @returns {Object} calculated time units
     */
     static convertWeeks(weeks: TimeUnit) {
        if (typeof weeks !== 'number') {
            if (typeof weeks === 'string') {
                weeks = Number.parseFloat(weeks);
            } else {
                return {};
            }
        }

        const days = weeks * 7;
        const hours = days * 24;
        const minutes = hours * 60;
        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;
        const months = weeks / 4;
        const years = months / 12;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertMonths
     * @description converts months into equivalent time units
     * @param {TimeUnit} days number of months
     * @returns {Object} calculated time units
     */
     static convertMonths(months: TimeUnit) {
        if (typeof months !== 'number') {
            if (typeof months === 'string') {
                months = Number.parseFloat(months);
            } else {
                return {};
            }
        }

        const weeks = months * 4;
        const days = weeks * 7;
        const hours = days * 24;
        const minutes = hours * 60;
        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;
        const years = months / 12;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    /**
     * @public
     * @static
     * @function DateExtended.convertYears
     * @description converts years into equivalent time units
     * @param {TimeUnit} years number of years
     * @returns {Object} calculated time units
     */
     static convertYears(years: TimeUnit) {
        if (typeof years !== 'number') {
            if (typeof years === 'string') {
                years = Number.parseFloat(years);
            } else {
                return {};
            }
        }

        const months = years * 12;
        const weeks = months * 4;
        const days = weeks * 7;
        const hours = days * 24;
        const minutes = hours * 60;
        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {Number} SECOND_IN_MS
     * @description number of milliseconds in 1 second
     */
    static get SECOND_IN_MS() {
        return 1000;
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {Number} MINUTE_IN_MS
     * @description number of milliseconds in 1 minute
     */
    static get MINUTE_IN_MS() {
        return 60000;
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {Number} MINUTE_IN_MS
     * @description number of milliseconds in 1 hour
     */
    static get HOUR_IN_MS() {
        return 3600000;
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {Number} DAY_IN_MS
     * @description number of milliseconds in day
     */
    static get DAY_IN_MS() {
        return 86400000;
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {Number} MINUTE_IN_MS
     * @description number of milliseconds in 1 week
     */
    static get WEEK_IN_MS() {
        return 604800000;
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {Number} MINUTE_IN_MS
     * @description number of milliseconds in 1 month
     */
    static get MONTH_IN_MS() {
        return 2419200000;
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {Number} YEAR_IN_MS
     * @description number of milliseconds in 1 year
     */
    static get YEAR_IN_MS() {
        return 31556952000;
    }
}
