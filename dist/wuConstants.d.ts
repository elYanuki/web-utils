export declare class wuConstants {
    static readonly Regex: {
        anyThingButNumbers: RegExp;
        empty: RegExp;
        onlySpecialChars: RegExp;
        onlyNumbersOrLetters: RegExp;
    };
    static readonly Time: {
        msPerSecond: number;
        msPerMinute: number;
        msPerHour: number;
        msPerDay: number;
        msPerMonth: number;
        msPerYear: number;
    };
    static readonly ImperialUnits: {
        length: {
            inchesPerTwip: number;
            inchesPerMil: number;
            inchesPerPoint: number;
            inchesPerPica: number;
            inchesPerFoot: number;
            inchesPerYard: number;
            inchesPerMile: number;
            inchesPerLeague: number;
        };
        weight: {
            poundsPerGrain: number;
            poundsPerDram: number;
            poundsPerOunce: number;
            poundsPerShortHundredWeight: number;
            poundsPerLongHundredWeight: number;
            poundsPerShortTon: number;
            poundsPerLongTon: number;
        };
    };
    static readonly ImperialToMetric: {
        millimetersPerInch: number;
        centimetersPerInch: number;
        gramsPerPound: number;
        kilogramPerPound: number;
    };
    static readonly MetricToImperial: {
        inchesPerMillimeter: number;
        inchesPerCentimeter: number;
        poundsPerGram: number;
        poundsPerKilogram: number;
    };
    static readonly Trivia: {
        unMemberCount: number;
        whoMemberCount: number;
        isoMemberCount: number;
    };
}
