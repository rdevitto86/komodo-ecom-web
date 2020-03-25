import ValidationUtil from './validation-util';

/**
 * @class MathUtil
 * @description - collection of utlity functions that assists with mathmatical operations
 */
export default class MathUtil {
    /**
     * @public
     * @static
     * @function MathUtil#formatDollars
     * @description - converts a number into a dollar amount
     * @param {Number} sum - currency value
     * @returns {String}
     */
    static formatDollars(sum) {
        if (!ValidationUtil.isNumber(sum)) {
            return '$0.00';
        }
        if (!Number.isInteger(sum)) {
            sum = sum.toFixed(2);
        }
        return `$${sum}`;
    }

    /**
     * @public
     * @static
     * @function MathUtil#convertMillisecToTimeUnits
     * @description - converts milliseconds into various higher time measurements
     * such as: seconds, hours, minutes, hours, days, and weeks.
     * @param {Number} milliseconds
     * @returns {Object}
     */
    static convertMillisecToTimeUnits(milliseconds) {
        if (ValidationUtil.isNumber(milliseconds)) {
            return {};
        }

        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        return {
            seconds: seconds,
            minutes: minutes,
            hours: hours,
            days: days,
            weeks: weeks
        };
    }

    /**
     * @public
     * @static
     * @function MathUtil#getCurrentTimeInMinutes
     * @description - returns the current date in minutes
     * @param {Date} recent - nearest date to current
     * @param {Date} previous - past date
     * @returns {Object}
     */
    static calculateTimeDifference(recent = undefined, previous = undefined) {
        if (!ValidationUtil.isDate(recent) || !ValidationUtil.isDate(previous)) {
            return {};
        }

        const milliseconds = recent - previous;
        const years = recent.getFullYear() - previous.getFullYear();

        const months = Math.floor(
            (years * 12) + (recent.getMonth() - previous.getMonth())
        );

        //ms, sec, min, hr, day, week, month,
        return {
            milliseconds: milliseconds,
            ...(this.convertMillisecToTimeUnits(milliseconds)),
            months: (months > 0) ? months : 0,
            years: years
        };
    }
}
