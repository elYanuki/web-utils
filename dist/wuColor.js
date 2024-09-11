"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wuColor = void 0;
const wuText_1 = require("./wuText");
const wuGeneral_1 = require("./wuGeneral");
//TODO blend modes
/**
 * Functions for converting, manipulating and generating colors
 *
 * The class supports hex, rgb and hsl colors. For hex and rgb, interfaces are provided that represent a json with r, g, b and h, s, l respectively
 * All the functions accept the type "anyColor" which can be a string, rgbColor or hslColor and will return a rgbColor
 */
class wuColor {
    /**
     * shifts the hue of a given color by a given amount
     * enter a negative number to decrease the hue
     * this function works in hsl so the maximum hue is 360 and the minimum is 0
     *
     * @param color any color
     * @param amount any number
     * @param wrap whether to wrap the hue around once the maximum is reached (361 -> 0 and -1 -> 360, -2 -> 359 etc.)
     */
    static shiftHue(color, amount, wrap = false) {
        let hsl = this.rgbToHsl(this.anyToRgb(color));
        hsl.h = hsl.h + amount;
        if (wrap)
            hsl.h = wuText_1.wuText.wrapNumber(hsl.h, 0, 360);
        return this.hslToRgb(this.correctHslColor(hsl));
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
    static shiftSaturation(color, amount, wrap = false) {
        let hsl = this.rgbToHsl(this.anyToRgb(color));
        hsl.s = hsl.s + amount;
        if (wrap)
            hsl.l = wuText_1.wuText.wrapNumber(hsl.l, 0, 100);
        return this.hslToRgb(this.correctHslColor(hsl));
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
    static shiftLightness(color, amount, wrap = false) {
        let hsl = this.rgbToHsl(this.anyToRgb(color));
        hsl.l = hsl.l + amount;
        if (wrap)
            hsl.l = wuText_1.wuText.wrapNumber(hsl.l, 0, 100);
        return this.hslToRgb(this.correctHslColor(hsl));
    }
    /**
     * returns black or white depending on which color would have the best contrast to the given color
     * @param color
     */
    static calculateContrastColor(color) {
        let luminance = this.calculateLuminance(this.anyToRgb(color));
        return luminance < 0.5 ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 };
    }
    /**
     * calculates the luminance of a given color this is different from the lightness in hsl as it takes into account how the human eye perceives brightness
     * @param color
     */
    static calculateLuminance(color) {
        let rgb = this.anyToRgb(color);
        let a = [rgb.r, rgb.g, rgb.b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow((v + 0.055) / 1.055, 2.4);
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
    static generateRandomColor(hueRange, saturationRange, lightnessRange) {
        if (hueRange.length == 0)
            hueRange = [0, 360];
        else if (hueRange.length == 1)
            hueRange.push(hueRange[0]);
        if (saturationRange.length == 0)
            saturationRange = [0, 100];
        else if (saturationRange.length == 1)
            saturationRange.push(saturationRange[0]);
        if (lightnessRange.length == 0)
            lightnessRange = [0, 100];
        else if (lightnessRange.length == 1)
            lightnessRange.push(lightnessRange[0]);
        const hue = Math.floor(Math.random() * hueRange[1] - hueRange[0]) + hueRange[0];
        const saturation = Math.floor(Math.random() * saturationRange[1] - saturationRange[0]) + saturationRange[0];
        const lightness = Math.floor(Math.random() * lightnessRange[1] - lightnessRange[0]) + lightnessRange[0];
        console.log(hue, saturation, lightness);
        return this.hslToRgb(this.correctHslColor({ h: hue, s: saturation, l: lightness }));
    }
    /**
     * Corrects the values of an hsl color to be within the valid range
     * if for example a hue would be negative or above 360 it will be corrected to be within the range
     */
    static correctHslColor(hsl) {
        return {
            h: Math.floor(Math.max(0, Math.min(360, hsl.h))),
            s: Math.floor(Math.max(0, Math.min(100, hsl.s))),
            l: Math.floor(Math.max(0, Math.min(100, hsl.l)))
        };
    }
    /**
     * Corrects the values of an rgb color to be within the valid range
     * if any part is below 0 or above 255 it will be corrected to be within the range
     */
    static correctRgbColor(rgb) {
        return {
            r: Math.floor(Math.max(0, Math.min(255, rgb.r))),
            g: Math.floor(Math.max(0, Math.min(255, rgb.g))),
            b: Math.floor(Math.max(0, Math.min(255, rgb.b)))
        };
    }
    /**
     * Corrects the values of a hex color to be within the valid range
     * if the color is below 000000 or above FFFFFF it will be corrected to be within the range
     * @param hex
     */
    static correctHexColor(hex) {
        return this.rgbToHex(this.correctRgbColor(this.hexToRgb(hex)));
    }
    //region other to rgb
    static anyToRgb(color) {
        if (typeof color === 'string')
            return this.hexToRgb(color);
        else if ('h' in color)
            return this.hslToRgb(color);
        else
            return color;
    }
    static hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        // Parse the hex string into its RGB components
        let r = parseInt(hex.substring(0, 2), 16) / 255;
        let g = parseInt(hex.substring(2, 4), 16) / 255;
        let b = parseInt(hex.substring(4, 6), 16) / 255;
        return { r: r, g: g, b: b };
    }
    static hslToRgb(hsl) {
        let { h, s, l } = wuGeneral_1.wuGeneral.deepCopy(hsl);
        s /= 100;
        l /= 100;
        const k = (n) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return {
            r: Math.round(255 * f(0)),
            g: Math.round(255 * f(8)),
            b: Math.round(255 * f(4)),
        };
    }
    //endregion
    //region from rgb to other
    static rgbToHsl(rgb) {
        rgb = wuGeneral_1.wuGeneral.deepCopy(rgb);
        r /= 255;
        g /= 255;
        b /= 255;
        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s
            ? l === r
                ? (g - b) / s
                : l === g
                    ? 2 + (b - r) / s
                    : 4 + (r - g) / s
            : 0;
        return [
            60 * h < 0 ? 60 * h + 360 : 60 * h,
            100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
            (100 * (2 * l - s)) / 2,
        ];
        return { h: h, s: s, l: l };
    }
    static rgbToHex(rgb) {
        return `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1).toUpperCase()}`;
    }
    //endregion
    static anyToString(color) {
        if (typeof color === 'string')
            return color;
        else if ('h' in color)
            return `hsl(${color.h},${color.s}%,${color.l}%)`;
        else
            return `rgb(${color.r},${color.g},${color.b})`;
    }
}
exports.wuColor = wuColor;
