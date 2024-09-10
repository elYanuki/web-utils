"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wuText = void 0;
class wuText {
    static padNumber(number, length = 2) {
        return String(number).padStart(length, '0');
    }
    static padString(text, length = 2, padChar = ' ') {
        return text.padStart(length, padChar);
    }
    static roundNumber(num, digits) {
        return parseFloat(num.toFixed(digits));
    }
    static truncateText(text, maxLength = 15, suffix = '...') {
        return text.length > maxLength ? text.substring(0, maxLength) + suffix : text;
    }
    static numberToLetter(number, fontCase = "upper") {
        const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
        return fontCase == "lower" ? lettersLower[number % 26] : lettersUpper[number % 26];
    }
    static wrapNumber(number, min, max) {
        let optionCount = max - min + 1;
        if (number < min) {
            let offset = (number - min) % optionCount;
            return offset == 0 ? min : max + offset + 1;
        }
        else if (number > max)
            return min + (number - min) % optionCount;
        else
            return number;
    }
}
exports.wuText = wuText;
