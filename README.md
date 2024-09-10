# web-utils
A collection of utility classes and functions I have written over the years of creating websites. Now bundled together.

These cannot and are not indented to replace libraries specific to one task like time management or advanced color conversion. The web-utils library aims to provide simple solutions for common tasks in a web project without needing to use many different more complex libraries.


## wuColor

Functions for converting, manipulating and generating colors

The class supports hex, rgb and hsl colors. For hex and rgb, interfaces are provided that represent a json with r, g, b and h, s, l respectively.
All the functions accept the type `anyColor` which can be a string, rgbColor or hslColor and will return a rgbColor.

### manipulate color

- `shiftHue(color: anyColor, amount: number, wrap: boolean = false): rgbColor`
- `shiftSaturation(color: anyColor, amount: number, wrap: boolean) = false: rgbColor`
- `shiftLightness(color: anyColor, amount: number, wrap: boolean = false): rgbColor`
- `correctHslColor(hsl: hslColor): hslColor`
- `correctRgbColor(rgb: rgbColor): rgbColor`
- `correctHexColor(hex: string): string`

### generate color

- `generateRandomColor(hueRange: number[], saturationRange: number[], lightnessRange: number[]): rgbColor`
- `calculateContrastColor(color: anyColor): rgbColor`

### convert color

- `anyToRgb(color: anyColor): rgbColor`
- `hexToRgb(hex: string): rgbColor`
- `hslToRgb(hsl: hslColor): rgbColor`
- `rgbToHex(rgb: rgbColor): string`
- `rgbToHSL(rgb: rgbColor): hslColor`
- `rgbToSrgb(rgb: rgbColor): rgbColor`
- `anyToString(color: anyColor):string`

## example

  ```typescript
  import { wuColor } from 'web-utils';

  let accentColor = wuColor.generateRandomColor()
  ```