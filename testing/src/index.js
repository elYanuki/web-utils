import './styles/main.scss'

import {wuColor} from "@yanikkendler/web-utils"

let colorSwatches = []

let randomRGBColor = wuColor.generateRandomColor([0, 360], [50, 100], [50, 100])
let randomHLScolor = wuColor.rgbToHsl(randomRGBColor)

console.log(randomHLScolor)

colorSwatches.push({color: wuColor.anyToString(randomRGBColor), text: "Random rgb"})
colorSwatches.push({color: wuColor.anyToString(randomHLScolor), text: "Random hsl"})
colorSwatches.push({color: wuColor.anyToString(wuColor.calculateContrastColor(randomRGBColor)), text: "contrast"})
colorSwatches.push({color: wuColor.anyToString(wuColor.shiftHue(randomRGBColor, -5)), text: "shifted hue"})
colorSwatches.push({color: wuColor.anyToString(wuColor.correctRgbColor(randomRGBColor)), text: "corrected RGB"})
colorSwatches.push({color: wuColor.anyToString(wuColor.correctHslColor(randomHLScolor)), text: "corrected HSL"})
colorSwatches.push({color: wuColor.anyToString({h: 0, s:100, l: 50}), text: "hsl"})
colorSwatches.push({color: wuColor.anyToString(wuColor.hslToRgb({h: 0, s:100, l: 50})), text: "hsl to rgb"})

renderColorSwatches()
function renderColorSwatches(){
    let swatches = ""
    colorSwatches.forEach((swatch) => {
        swatches += `
            <div class="color-swatch">
                <div class="swatch" style="background-color: ${swatch.color};"></div>
                <div class="text">${swatch.text}</div>
            </div>`
    })

    document.querySelector(".colorSwatches").innerHTML = swatches
}