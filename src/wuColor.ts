import {wuText} from "./wuText"

export type anyColor = string | rgbColor | hslColor

export interface rgbColor {
    r: number,
    g: number,
    b: number
}

export interface hslColor {
    h: number,
    s: number,
    l: number
}

//TODO blend modes

/**
 * Functions for converting, manipulating and generating colors
 *
 * The class supports hex, rgb and hsl colors. For hex and rgb, interfaces are provided that represent a json with r, g, b and h, s, l respectively
 * All the functions accept the type "anyColor" which can be a string, rgbColor or hslColor and will return a rgbColor
 */
export class wuColor{
    /**
     * shifts the hue of a given color by a given amount
     * enter a negative number to decrease the hue
     * this function works in hsl so the maximum hue is 360 and the minimum is 0
     *
     * @param color any color
     * @param amount any number
     * @param wrap whether to wrap the hue around once the maximum is reached (361 -> 0 and -1 -> 360, -2 -> 359 etc.)
     */
    static shiftHue(color: anyColor, amount: number, wrap: boolean = false): rgbColor {
        let hsl = this.rgbToHsl(this.anyToRgb(color))

        hsl.h = hsl.h + amount

        if(wrap) hsl.h = wuText.wrapNumber(hsl.h, 0 ,360)

        return this.hslToRgb(this.correctHslColor(hsl))
    }

    /**
     * shifts the saturation of a given color by a given amount
     * enter a negative number to decrease the saturation
     * this function works in hsl so the maximum saturation is 100 and the minimum is 0
     *
     * @param color
     * @param amount
     * @param wrap whether to wrap the saturation around once the maximum is reached (101 -> 0 and -1 -> 100)
     */
    static shiftSaturation(color: anyColor, amount: number, wrap: boolean = false): rgbColor {
        let hsl = this.rgbToHsl(this.anyToRgb(color))

        hsl.s = hsl.s + amount

        if(wrap) hsl.l = wuText.wrapNumber(hsl.l, 0 ,100)

        return this.hslToRgb(this.correctHslColor(hsl))
    }

    /**
     * shifts the lightness of a given color by a given amount
     * enter a negative number to decrease the lightness
     * this function works in hsl so the maximum lightness is 100 and the minimum is 0
     *
     * @param color any color
     * @param amount any number
     * @param wrap whether to wrap the lightness around once the maximum is reached (101 -> 0 and -1 -> 100)
     */
    static shiftLightness(color: anyColor, amount: number, wrap: boolean = false): rgbColor {
        let hsl = this.rgbToHsl(this.anyToRgb(color))

        hsl.l = hsl.l + amount

        if(wrap) hsl.l = wuText.wrapNumber(hsl.l, 0 ,100)

        return this.hslToRgb(this.correctHslColor(hsl))
    }

    /**
     * returns black or white depending on which color would have the best contrast to the given color
     * @param color
     */
    static calculateContrastColor(color: anyColor): rgbColor {
        let luminance = this.calculateLuminance(this.anyToRgb(color))

        return luminance < 0.5 ? {r:255, g:255, b:255} : {r:0, g:0, b:0}
    }

    /**
     * calculates the luminance of a given color this is different from the lightness in hsl as it takes into account how the human eye perceives brightness
     * @param color
     */
    static calculateLuminance(color: anyColor): number {
        let rgb = this.anyToRgb(color)

        let a = [rgb.r, rgb.g, rgb.b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow( (v + 0.055) / 1.055, 2.4 );
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    /**
     * generates a random color within the given ranges, each range is a array with a minimum and maximum value
     * if only a single value is supplied it will be used as a fixed value
     * if no value is supplied the full range will be used
     * @param hueRange
     * @param saturationRange
     * @param lightnessRange
     */
    static generateRandomColor(hueRange: number[], saturationRange: number[], lightnessRange: number[]): rgbColor {
        if(hueRange.length == 0) hueRange = [0, 360]
        else if(hueRange.length == 1) hueRange.push(hueRange[0])

        if(saturationRange.length == 0) saturationRange = [0, 100]
        else if(saturationRange.length == 1) saturationRange.push(saturationRange[0])

        if(lightnessRange.length == 0) lightnessRange = [0, 100]
        else if(lightnessRange.length == 1) lightnessRange.push(lightnessRange[0])

        const hue = Math.floor(Math.random() * hueRange[1] - hueRange[0]) + hueRange[0]

        const saturation = Math.floor(Math.random() * saturationRange[1] - saturationRange[0]) + saturationRange[0]

        const lightness = Math.floor(Math.random() * lightnessRange[1] - lightnessRange[0]) + lightnessRange[0]

        return this.hslToRgb(this.correctHslColor({h: hue, s: saturation, l: lightness}))
    }

    /**
     * Corrects the values of an hsl color to be within the valid range
     * if for example a hue would be negative or above 360 it will be corrected to be within the range
     */
    static correctHslColor(hsl: hslColor): hslColor {
        return {
            h: Math.floor(Math.max(0, Math.min(360, hsl.h))),
            s: Math.floor(Math.max(0, Math.min(100, hsl.s))),
            l: Math.floor(Math.max(0, Math.min(100, hsl.l)))
        }
    }

    /**
     * Corrects the values of an rgb color to be within the valid range
     * if any part is below 0 or above 255 it will be corrected to be within the range
     */
    static correctRgbColor(rgb: rgbColor): rgbColor {
        return {
            r: Math.floor(Math.max(0, Math.min(255, rgb.r))),
            g: Math.floor(Math.max(0, Math.min(255, rgb.g))),
            b: Math.floor(Math.max(0, Math.min(255, rgb.b)))
        }
    }

    /**
     * Corrects the values of a hex color to be within the valid range
     * if the color is below 000000 or above FFFFFF it will be corrected to be within the range
     * @param hex
     */
    static correctHexColor(hex: string): string {
        return this.rgbToHex(this.correctRgbColor(this.hexToRgb(hex)))
    }

    //region other to rgb

    static anyToRgb(color: anyColor): rgbColor {
        if(typeof color === 'string') return this.hexToRgb(color)
        else if('h' in color) return this.hslToRgb(color)
        else return color
    }

    static hexToRgb(hex: string): rgbColor {
        hex = hex.replace(/^#/, '')

        // Parse the hex string into its RGB components
        let r = parseInt(hex.substring(0, 2), 16) / 255
        let g = parseInt(hex.substring(2, 4), 16) / 255
        let b = parseInt(hex.substring(4, 6), 16) / 255

        return {r: r, g: g, b: b}
    }

    static hslToRgb(hsl: hslColor): rgbColor {
        let c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s,
            x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1)),
            m = hsl.l - c/2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= hsl.h && hsl.h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= hsl.h && hsl.h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= hsl.h && hsl.h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= hsl.h && hsl.h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= hsl.h && hsl.h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= hsl.h && hsl.h < 360) {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);


        return {r: r, g: g, b: b}
    }

    //endregion

    //region from rgb to other

    static rgbToHsl(rgb: rgbColor): hslColor {
        // convert %s to 0–255
        for (let R in rgb) {
            let r = rgb[R];
            if (r.indexOf("%") > -1)
                rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
        }

        // make r, g, and b fractions of 1
        let r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,

            // find greatest and smallest channel values
            cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        // calculate hue
        // no difference
        if (delta == 0)
            h = 0;
        // red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // blue is max
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // calculate lightness
        l = (cmax + cmin) / 2;

        // calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return {h: h, s: s, l: l}
    }

    static rgbToHex(rgb: rgbColor): string {
        return `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1).toUpperCase()}`
    }

    //endregion

    static anyToString(color: anyColor):string {
        if(typeof color === 'string') return color
        else if('h' in color) return `hsl(${color.h},${color.s}%,${color.l}%)`
        else return `rgb(${color.r},${color.g},${color.b})`
    }
}