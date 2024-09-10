export declare class wuText {
    static padNumber(number: number, length?: number): string;
    static padString(text: string, length?: number, padChar?: string): string;
    static roundNumber(num: number, digits: number): number;
    static truncateText(text: string, maxLength?: number, suffix?: string): string;
    static numberToLetter(number: number, fontCase?: "upper" | "lower"): string;
    static wrapNumber(number: number, min: number, max: number): number;
}
