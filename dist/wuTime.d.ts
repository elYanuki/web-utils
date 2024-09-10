export declare class wuTime {
    static time: {
        msPerSecond: number;
        msPerMinute: number;
        msPerHour: number;
        msPerDay: number;
        msPerMonth: number;
        msPerYear: number;
    };
    static toRelativeTimeString(timestamp: Date | string | number): string;
    static toTimeDurationString(timestamp: Date | string | number): string;
    static toFullDateTimeString(timestamp: Date | string | number, options?: {
        dateSeperator: string;
        timeSeperator: string;
    }): string;
    static toFullDateString(timestamp: Date | string | number, options?: {
        dateSeperator: string;
    }): string;
    static anyToDate(timestamp: Date | string | number): Date;
}
