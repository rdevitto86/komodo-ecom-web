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
     * @param {Number || String} sum - currency value
     * @returns {String}
     */
    public static formatDollars(sum: number | string): string {
        const paramType = typeof sum;
        return (paramType === 'number' || paramType === 'string')
            ? `$${Number(sum).toFixed(2)}` : '$0.00';
    }

    /**
     * @public
     * @static
     * @function MathUtil#convertMillisecToTimeUnits
     * @description - converts milliseconds into various higher time measurements
     * such as: seconds, hours, minutes, hours, days, and weeks.
     * @param {Number || String} milliseconds
     * @returns {Object}
     */
    public static convertMillisecToTimeUnits(milliseconds: number | string): object {
        if (typeof milliseconds !== 'number') {
            if (typeof milliseconds === 'string') {
                milliseconds = Number.parseFloat(milliseconds);
            } else {
                return {};
            }
        }

        //TODO - see if generic number can be calculated into units
        //i.e 60000 can be converted to MS then converted into other units

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
    public static calculateTimeDifference(
        recent: Date = undefined, previous: Date = undefined
    ): object {
        if (!(recent instanceof Date) || !(previous instanceof Date)) {
            return {};
        }

        const milliseconds = recent.getTime() - previous.getTime();
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
