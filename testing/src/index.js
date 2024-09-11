import './styles/main.scss'

import {wuColor, wuAnimate, wuGeneral, wuText} from '../../dist/index.js'

let colorSwatches = []

let randomRGBColor = wuColor.generateRandomColor([0, 360], [50, 100], [50, 100])

console.log("random rgb", randomRGBColor)

colorSwatches.push({color: randomRGBColor, text: "Random rgb"})
/*colorSwatches.push({color: randomHLScolor, text: "Random hsl"})*/
colorSwatches.push({color: wuColor.calculateContrastColor(randomRGBColor), text: "contrast"})
colorSwatches.push({color: wuColor.shiftHue(randomRGBColor, 50), text: "shifted hue"})
/*colorSwatches.push({color: wuColor.correctRgbColor(randomRGBColor), text: "corrected RGB"})
colorSwatches.push({color: wuColor.correctHslColor(randomHLScolor), text: "corrected HSL"})*/
colorSwatches.push({color: {h: 0, s:100, l: 50}, text: "hsl"})
colorSwatches.push({color: wuColor.hslToRgb({h: 0, s:100, l: 50}), text: "hsl to rgb"})
colorSwatches.push({color: {r: 150, g:50, b: 250}, text: "rgb"})
colorSwatches.push({color: wuColor.rgbToHsl({r: 150, g:50, b: 250}), text: "rgb to hsl"})

renderColorSwatches()
function renderColorSwatches(){
    let swatches = ""
    colorSwatches.forEach((swatch) => {
        console.log("swatch color", swatch.color)

        swatches += `
            <div class="color-swatch">
                <div class="swatch" style="background-color: ${wuColor.anyToString(swatch.color)};"></div>
                <div class="text">${swatch.text}</div>
            </div>`
    })

    document.querySelector(".colorSwatches").innerHTML = swatches
}