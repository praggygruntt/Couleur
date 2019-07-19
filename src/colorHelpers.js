import chroma from 'chroma-js';

// Hue Levels
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generateFullPalette(starterPalette) {
    let newFullPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };
    for(let level of levels) {
        newFullPalette.colors[level] = [];
    };
    for(let color of starterPalette.colors) {
        let scale = getScale(color.color, 10)
            // makes it go from dark to light
            .reverse();
        for (let i in scale) {
            newFullPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                // returns a rgba value instead of hex
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)")
            })
        }
    };
    return newFullPalette;
};

// returns [darkerHexColor, hexColor, white] (the range of colors to be used in generateScale())
function getRange(hexColor) {
    const end = "#fff";
    return [
        // darkens the hex color by 1.4 ratio, i.e. "dark blue"
        chroma(hexColor).darken(1.4).hex(),
        // blue
        hexColor,
        // white
        end
    ]
}
function getScale(hexColor, numberOfColorsToGenerate) {
    return chroma
        // returns the full gradient (i.e. smooth gradient from dark blue, to blue, to white)
        .scale(getRange(hexColor))
        // changes mode of color mixing to help decrease grayness in the gradient
        .mode("lab")
        // grabs equidistant colors in the scale made above in a given amount
        .colors(numberOfColorsToGenerate);
        // finishes with X amount of colors equidistant
};

export {generateFullPalette};