import {wuText} from "./wuText"
import {wuConstants} from "./wuConstants"

export class wuTime{
    static toRelativeTimeString(timestamp: Date | string | number): string {
        timestamp = this.anyToDate(timestamp)

        let timeElapsed = new Date().valueOf() - timestamp.valueOf();

        if (timeElapsed < wuConstants.Time.msPerMinute) {
            return Math.round(timeElapsed / 1000) + ' seconds ago';
        }

        else if (timeElapsed < wuConstants.Time.msPerHour) {
            return Math.round(timeElapsed / wuConstants.Time.msPerMinute) + ' minutes ago';
        }

        else if (timeElapsed < wuConstants.Time.msPerDay) {
            return Math.round(timeElapsed / wuConstants.Time.msPerHour) + ' hours ago';
        }

        else if (timeElapsed < wuConstants.Time.msPerMonth) {
            return Math.round(timeElapsed / wuConstants.Time.msPerDay) + ' days ago';
        }

        else if (timeElapsed < wuConstants.Time.msPerYear) {
            return Math.round(timeElapsed / wuConstants.Time.msPerMonth) + ' months ago';
        }

        else {
            return Math.round(timeElapsed / wuConstants.Time.msPerYear) + ' years ago';
        }
    }

    static toTimeDurationString(timestamp: Date | string | number){
        if(timestamp == null) return "unknown";

        let timeDate = this.anyToDate(timestamp);
        let timeMilliseconds = timeDate.valueOf();

        if(timeMilliseconds > wuConstants.Time.msPerYear) {
            return timeDate.getFullYear() + ' years ' + Math.floor(timeMilliseconds % wuConstants.Time.msPerYear / wuConstants.Time.msPerMonth) + ' months';
        }
        else if (timeMilliseconds > wuConstants.Time.msPerMonth) {
            return Math.floor(timeMilliseconds / wuConstants.Time.msPerMonth) + ' months ' + Math.floor(timeMilliseconds % wuConstants.Time.msPerMonth / wuConstants.Time.msPerDay) + 'days';
        }
        else if (timeMilliseconds > wuConstants.Time.msPerDay) {
            return Math.floor(timeMilliseconds / wuConstants.Time.msPerDay) + ' days ' + timeDate.getHours() + 'hours';
        }
        else if (timeMilliseconds > wuConstants.Time.msPerHour) {
            return wuText.padNumber(timeDate.getHours(),2) + ':' + wuText.padNumber(timeDate.getMinutes(),2) + ':' + wuText.padNumber(timeDate.getSeconds(),2);
        }
        else /*if (timeMilliseconds > wuConstants.Time.msPerMinute)*/ {
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