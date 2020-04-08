/**
 * @class DateUtil
 * @description - collection of utlity functions that assists with dates/time
 */
export default class DateUtil {
    /**
     * @public
     * @static
     * @function DateUtil#getCurrentTimeUTC
     * @description - returns the current time in UTC
     * @returns {String}
     * @see convertToUTCString
     */
    public static getCurrentTimeUTC(): string {
        return this.convertToUTCString((new Date()));
    }

    /**
     * @public
     * @static
     * @function DateUtil#getCurrentTimeISO
     * @description - returns the current time in ISO
     * @returns {String}
     * @see convertToISOString
     */
    public static getCurrentTimeISO(): string {
        return this.convertToISOString((new Date()));
    }

    /**
     * @public
     * @static
     * @function DateUtil#getCurrentUTCTimeInMillisec
     * @description - returns the current date in milliseconds
     * @returns {Number}
     */
    public static getCurrentUTCTimeInMillisec(): number {
        return Date.now();
    }

    /**
     * @public
     * @static
     * @function DateUtil#getUTCTimeZoneOffset
     * @description - calculates the UTC time difference from a local date
     * @param {Date} date - date object to analyze
     * @returns {Number}
     */
    public static getUTCTimeZoneOffset(date: Date = undefined): number {
        return (date instanceof Date) ? date.getTimezoneOffset() : -1;
    }

    /**
     * @public
     * @static
     * @function DateUtil#getUTCString
     * @description - converts a date object into a UTC string
     * @param {Date} date - date to convert to UTC
     * @returns {String}
     */
    public static convertToUTCString(date: Date = undefined): string {
        return (date instanceof Date) ? date.toUTCString() : '';
    }

    /**
     * @public
     * @static
     * @function DateUtil#getUTCTimeZoneOffset
     * @description - converts a date object into an ISO string
     * @param {Date} date - date to convert to ISO
     * @returns {String}
     */
    public static convertToISOString(date: Date = undefined): string {
        return (date instanceof Date) ? date.toISOString() : '';
    }

    /**
     * @public
     * @static
     * @function DateUtil#convertDateToLocalTime
     * @description - returns the current date in minutes
     * @param {Any} date - date to convert
     * @returns {Date}
     */
    static convertDateToLocalTime(date = undefined): Date {
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
                return new Date();
        }
    }

    /**
     * @public
     * @static
     * @function DateUtil#convertDateToUTC
     * @description - converts a local date object into UTC
     * @param {Any} date - date in local time zone
     * @returns {Date}
     */
    public static convertDateToUTC(date: Date | number | string = undefined): Date {
        //convert string/number to local date
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
}
