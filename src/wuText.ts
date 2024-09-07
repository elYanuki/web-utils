export class wuText{
    static padNumber(number: number, length: number = 2){
        return String(number).padStart(length, '0')
    }

    static padString(text: string, length: number = 2, padChar: string = ' '){
        return text.padStart(length, padChar)
    }

    static roundNumber(num: number, digits:number): number {
        return parseFloat(num.toFixed(digits));
    }

    static truncateText(text: string, maxLength: number = 15, suffix: string = '...'): string {
        return text.length > maxLength ? text.substring(0, maxLength) + suffix : text;
    }

    static numberToLetter(number: number, fontCase: "upper" |"lower" = "upper"): string {
        const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
        return fontCase == "lower" ? lettersLower[number % 26] : lettersUpper[number % 26]
    }

    static wrapNumber(number: number, min: number, max: number): number {
        let optionCount = max - min + 1

        if(number < min) {
            let offset = (number - min) % optionCount
            return offset == 0 ? min : max + offset + 1
        }
        else if(number > max) return min + (number-min) % optionCount
        else return number
    }

    /*static wrapNumberRecursive(number: number, min: number, max: number): number {
        if(number < min) return this.wrapNumberRecursive(number + (max - min) + 1, min, max)
        else if(number > max) return this.wrapNumberRecursive(min + (number % max) -1, min, max)
        else return number
    }*/
}