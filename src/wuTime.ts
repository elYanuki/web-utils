import {wuText} from "./wuText"

export class wuTime{
    static time = {
        msPerSecond: 1000,
        msPerMinute: 1000 * 60,
        msPerHour: 1000 * 60 * 60,
        msPerDay: 1000 * 60 * 60 * 24,
        msPerMonth: 1000 * 60 * 60 * 24 * 30,
        msPerYear: 1000 * 60 * 60 * 24 * 30 * 12
    }

    static toRelativeTimeString(timestamp: Date | string | number): string {
        timestamp = this.anyToDate(timestamp)

        let timeElapsed = new Date().valueOf() - timestamp.valueOf();

        if (timeElapsed < this.time.msPerMinute) {
            return Math.round(timeElapsed / 1000) + ' seconds ago';
        }

        else if (timeElapsed < this.time.msPerHour) {
            return Math.round(timeElapsed / this.time.msPerMinute) + ' minutes ago';
        }

        else if (timeElapsed < this.time.msPerDay) {
            return Math.round(timeElapsed / this.time.msPerHour) + ' hours ago';
        }

        else if (timeElapsed < this.time.msPerMonth) {
            return Math.round(timeElapsed / this.time.msPerDay) + ' days ago';
        }

        else if (timeElapsed < this.time.msPerYear) {
            return Math.round(timeElapsed / this.time.msPerMonth) + ' months ago';
        }

        else {
            return Math.round(timeElapsed / this.time.msPerYear) + ' years ago';
        }
    }

    static toTimeDurationString(timestamp: Date | string | number){
        if(timestamp == null) return "unknown";

        let timeDate = this.anyToDate(timestamp);
        let timeMilliseconds = timeDate.valueOf();

        if(timeMilliseconds > this.time.msPerYear) {
            return timeDate.getFullYear() + ' years ' + Math.floor(timeMilliseconds % this.time.msPerYear / this.time.msPerMonth) + ' months';
        }
        else if (timeMilliseconds > this.time.msPerMonth) {
            return Math.floor(timeMilliseconds / this.time.msPerMonth) + ' months ' + Math.floor(timeMilliseconds % this.time.msPerMonth / this.time.msPerDay) + 'days';
        }
        else if (timeMilliseconds > this.time.msPerDay) {
            return Math.floor(timeMilliseconds / this.time.msPerDay) + ' days ' + timeDate.getHours() + 'hours';
        }
        else if (timeMilliseconds > this.time.msPerHour) {
            return wuText.padNumber(timeDate.getHours(),2) + ':' + wuText.padNumber(timeDate.getMinutes(),2) + ':' + wuText.padNumber(timeDate.getSeconds(),2);
        }
        else /*if (timeMilliseconds > this.time.msPerMinute)*/ {
            return wuText.padNumber(timeDate.getMinutes(),2) + ':' + wuText.padNumber(timeDate.getSeconds(),2);
        }
        /*else {
          return timeDate.getSeconds() + ' seconds';
        }*/
    }

    static toFullDateTimeString(timestamp: Date | string | number, options: {dateSeperator: string, timeSeperator: string} = {dateSeperator: '.', timeSeperator: ':'}){
        timestamp = this.anyToDate(timestamp);

        return wuText.padNumber(timestamp.getDate()) + options.dateSeperator +
            wuText.padNumber(timestamp.getMonth() + 1) + options.dateSeperator +
            timestamp.getFullYear().toString().substring(2,4) + ' ' +

            wuText.padNumber(timestamp.getHours()) + options.timeSeperator +
            wuText.padNumber(timestamp.getMinutes())
    }

    static toFullDateString(timestamp: Date | string | number, options: {dateSeperator: string} = {dateSeperator: '.'}) {
        timestamp = this.anyToDate(timestamp);

        return wuText.padNumber(timestamp.getDate()) + options.dateSeperator +
            wuText.padNumber(timestamp.getMonth() + 1) + options.dateSeperator +
            timestamp.getFullYear().toString().substring(2,4)
    }

    static anyToDate(timestamp: Date | string | number){
        if(timestamp == null) return new Date(0);
        if(typeof timestamp == "string") {
            return new Date(timestamp);
        }
        else if(typeof timestamp == "number") {
            return new Date(timestamp*1000);
        }
        else
            return timestamp;
    }
}