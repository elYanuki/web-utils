"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wuTime = void 0;
const wuText_1 = require("./wuText");
const wuConstants_1 = require("./wuConstants");
class wuTime {
    static toRelativeTimeString(timestamp) {
        timestamp = this.anyToDate(timestamp);
        let timeElapsed = new Date().valueOf() - timestamp.valueOf();
        if (timeElapsed < wuConstants_1.wuConstants.Time.msPerMinute) {
            return Math.round(timeElapsed / 1000) + ' seconds ago';
        }
        else if (timeElapsed < wuConstants_1.wuConstants.Time.msPerHour) {
            return Math.round(timeElapsed / wuConstants_1.wuConstants.Time.msPerMinute) + ' minutes ago';
        }
        else if (timeElapsed < wuConstants_1.wuConstants.Time.msPerDay) {
            return Math.round(timeElapsed / wuConstants_1.wuConstants.Time.msPerHour) + ' hours ago';
        }
        else if (timeElapsed < wuConstants_1.wuConstants.Time.msPerMonth) {
            return Math.round(timeElapsed / wuConstants_1.wuConstants.Time.msPerDay) + ' days ago';
        }
        else if (timeElapsed < wuConstants_1.wuConstants.Time.msPerYear) {
            return Math.round(timeElapsed / wuConstants_1.wuConstants.Time.msPerMonth) + ' months ago';
        }
        else {
            return Math.round(timeElapsed / wuConstants_1.wuConstants.Time.msPerYear) + ' years ago';
        }
    }
    static toTimeDurationString(timestamp) {
        if (timestamp == null)
            return "unknown";
        let timeDate = this.anyToDate(timestamp);
        let timeMilliseconds = timeDate.valueOf();
        if (timeMilliseconds > wuConstants_1.wuConstants.Time.msPerYear) {
            return timeDate.getFullYear() + ' years ' + Math.floor(timeMilliseconds % wuConstants_1.wuConstants.Time.msPerYear / wuConstants_1.wuConstants.Time.msPerMonth) + ' months';
        }
        else if (timeMilliseconds > wuConstants_1.wuConstants.Time.msPerMonth) {
            return Math.floor(timeMilliseconds / wuConstants_1.wuConstants.Time.msPerMonth) + ' months ' + Math.floor(timeMilliseconds % wuConstants_1.wuConstants.Time.msPerMonth / wuConstants_1.wuConstants.Time.msPerDay) + 'days';
        }
        else if (timeMilliseconds > wuConstants_1.wuConstants.Time.msPerDay) {
            return Math.floor(timeMilliseconds / wuConstants_1.wuConstants.Time.msPerDay) + ' days ' + timeDate.getHours() + 'hours';
        }
        else if (timeMilliseconds > wuConstants_1.wuConstants.Time.msPerHour) {
            return wuText_1.wuText.padNumber(timeDate.getHours(), 2) + ':' + wuText_1.wuText.padNumber(timeDate.getMinutes(), 2) + ':' + wuText_1.wuText.padNumber(timeDate.getSeconds(), 2);
        }
        else /*if (timeMilliseconds > wuConstants.Time.msPerMinute)*/ {
            return wuText_1.wuText.padNumber(timeDate.getMinutes(), 2) + ':' + wuText_1.wuText.padNumber(timeDate.getSeconds(), 2);
        }
        /*else {
          return timeDate.getSeconds() + ' seconds';
        }*/
    }
    static toFullDateTimeString(timestamp, options = { dateSeperator: '.', timeSeperator: ':' }) {
        timestamp = this.anyToDate(timestamp);
        return wuText_1.wuText.padNumber(timestamp.getDate()) + options.dateSeperator +
            wuText_1.wuText.padNumber(timestamp.getMonth() + 1) + options.dateSeperator +
            timestamp.getFullYear().toString().substring(2, 4) + ' ' +
            wuText_1.wuText.padNumber(timestamp.getHours()) + options.timeSeperator +
            wuText_1.wuText.padNumber(timestamp.getMinutes());
    }
    static toFullDateString(timestamp, options = { dateSeperator: '.' }) {
        timestamp = this.anyToDate(timestamp);
        return wuText_1.wuText.padNumber(timestamp.getDate()) + options.dateSeperator +
            wuText_1.wuText.padNumber(timestamp.getMonth() + 1) + options.dateSeperator +
            timestamp.getFullYear().toString().substring(2, 4);
    }
    static anyToDate(timestamp) {
        if (timestamp == null)
            return new Date(0);
        if (typeof timestamp == "string") {
            return new Date(timestamp);
        }
        else if (typeof timestamp == "number") {
            return new Date(timestamp * 1000);
        }
        else
            return timestamp;
    }
}
exports.wuTime = wuTime;
