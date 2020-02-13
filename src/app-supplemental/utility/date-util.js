/**
 * @class DateUtil
 * @description - builds a utility class that assists with dates/time
 */
export class DateUtil {
    /**
     * @public
     * @function DateUtil#getCurrentTimeUTC
     * @description - returns the current time in UTC 
     * @returns {String}
     * @see convertToUTCString
     */
    getCurrentTimeUTC() {
        return this.convertToUTCString((new Date()));
    }

    /**
     * @public
     * @function DateUtil#getCurrentTimeISO
     * @description - returns the current time in ISO 
     * @returns {String}
     * @see convertToISOString
     */
    getCurrentTimeISO() {
        return this.convertToISOString((new Date()));
    }

    /**
     * @public
     * @function DateUtil#getCurrentUTCTimeInMillisec
     * @description - returns the current date in milliseconds
     * @returns {Number}
     */
    getCurrentUTCTimeInMillisec() {
        return Date.now();
    }

    /**
     * @public
     * @function DateUtil#getUTCTimeZoneOffset
     * @description - calculates the UTC time difference from a local date
     * @param {Date} date - date object to analyze
     * @returns {Number}
     */
    getUTCTimeZoneOffset(date = undefined) {
        return (date instanceof Date) ? date.getTimezoneOffset() : -1;
    }

    /**
     * @public
     * @function DateUtil#getUTCString
     * @description - converts a date object into a UTC string
     * @param {Date} date - date to convert to UTC
     * @returns {String}
     */
    convertToUTCString(date = undefined) {
        return (date instanceof Date) ? date.toUTCString() : null;
    }

    /**
     * @public
     * @function DateUtil#getUTCTimeZoneOffset
     * @description - converts a date object into an ISO string
     * @param {Date} date - date to convert to ISO
     * @returns {String}
     */
    convertToISOString(date = undefined) {
        return (date instanceof Date) ? date.toISOString() : null;
    }

    /**
     * @public
     * @function DateUtil#convertDateToLocalTime
     * @description - returns the current date in minutes
     * @param {Any} date - date to convert
     * @returns {Date} 
     */
    convertDateToLocalTime(date = undefined) {
        switch(typeof date) {
            case 'string':
            case 'number':
                return new Date(date);
            case 'object':
                if(date instanceof Date) {
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
                } else {
                    return null;
                }
            default:
                return null;
        }
    }

    /**
     * @public
     * @function DateUtil#convertDateToUTC
     * @description - converts a local date object into UTC 
     * @param {Any} date - date in local time zone
     * @returns {Date} 
     */
    convertDateToUTC(date = undefined) {
        //convert string/number to local date
        const paramType = typeof date;
        if(paramType === 'string' || paramType === 'number') {
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
     * @function DateUtil#convertMillisecToTimeUnits
     * @description - converts milliseconds into various higher time measurements 
     * such as: seconds, hours, minutes, hours, days, and weeks.
     * @param {Number} milliseconds
     * @returns {Object}
     */
    convertMillisecToTimeUnits(milliseconds = undefined) {
        if(typeof milliseconds !== 'number') {
            return -1;
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
     * @function DateUtil#getCurrentTimeInMinutes
     * @description - returns the current date in minutes
     * @param {Date} recent - nearest date to current
     * @param {Date} previous - past date
     * @returns {Object} 
     * @see convertMillisecToAlternateUnits
     */
    calculateTimeDifference(recent = undefined, previous = undefined) {
        if(!(recent instanceof Date) || !(previous instanceof Date)) {
            return -1;
        }

        const milliseconds = recent - previous;
        const convertedUnits = (this.convertMillisecToTimeUnits(milliseconds));
        const years = recent.getFullYear() - previous.getFullYear();

        //ex. Jan 31st 2019 thru Nov 11th 2020 => 
        const months = Math.floor(
            (years * 12) + (recent.getMonth() - previous.getMonth())
        );

        //ms, sec, min, hr, day, week, month,
        return {
            milliseconds: milliseconds,
            ...convertedUnits,
            months: (months > 0) ? months : 0,
            years: years
        };
    }
}