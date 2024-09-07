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
    static shiftHue(color: anyColor, amount: number, wrap: boolean): rgbColor {
        let hsl = this.rgbToHSL(this.anyToRgb(color))

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
    static shiftSaturation(color: anyColor, amount: number, wrap: boolean): rgbColor {
        let hsl = this.rgbToHSL(this.anyToRgb(color))

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
    static shiftLightness(color: anyColor, amount: number, wrap: boolean): rgbColor {
        let hsl = this.rgbToHSL(this.anyToRgb(color))

        hsl.l = hsl.l + amount

        if(wrap) hsl.l = wuText.wrapNumber(hsl.l, 0 ,100)

        return this.hslToRgb(this.correctHslColor(hsl))
    }

    /**
     * returns black or white depending on which color would have the best contrast to the given color
     * @param color
     */
    static calculateContrastColor(color: anyColor): rgbColor {
        let rgb = this.anyToRgb(color)
        let sRGB = this.rgbTosRGB(rgb)

        const luminance = 0.2126 * sRGB.r + 0.7152 * sRGB.g + 0.0722 * sRGB.b

        const contrastWhite = (1.0 + 0.05) / (luminance + 0.05)
        const contrastBlack = (luminance + 0.05) / 0.05

        return contrastWhite > contrastBlack ? {r:255, g:255, b:255} : {r:0, g:0, b:0}
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

    static hslToRgb = (hsl: hslColor) => {
        hsl.s /= 100
        hsl.l /= 100
        const k = (n: number) => (n + hsl.h / 30) % 12
        const a = hsl.s * Math.min(hsl.l, 1 - hsl.l)
        const f = (n: number) =>
            hsl.l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

        return {
            r: Math.round(f(0) * 255),
            g: Math.round(f(8) * 255),
            b: Math.round(f(4) * 255)
        }
    }

    //endregion

    //region from rgb to other

    static rgbTosRGB(rgb: rgbColor): rgbColor {
        let r = rgb.r <= 0.03928 ? rgb.r / 12.92 : Math.pow((rgb.r + 0.055) / 1.055, 2.4)
        let g = rgb.g <= 0.03928 ? rgb.g / 12.92 : Math.pow((rgb.g + 0.055) / 1.055, 2.4)
        let b = rgb.b <= 0.03928 ? rgb.b / 12.92 : Math.pow((rgb.b + 0.055) / 1.055, 2.4)

        return {r: r, g: g, b: b}
    }

    static rgbToHSL(rgb: rgbColor): hslColor {
        let r = rgb.r / 255;
        let g = rgb.b / 255;
        let b = rgb.g / 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let d = max - min;
        let h;
        if (d === 0) h = 0;
        else if (max === r) h = (g - b) / d % 6;
        else if (max === g) h = (b - r) / d + 2;
        else if (max === b) h = (r - g) / d + 4;

        h = h * 60
        let l = (min + max) / 2;
        let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))

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