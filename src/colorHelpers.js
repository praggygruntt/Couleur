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
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ]
}
function getScale(hexColor, numberOfColorsToGenerate) {
    return chroma
        .scale(getRange(hexColor))
        .mode("lab")
        .colors(numberOfColorsToGenerate);
};

export {generateFullPalette};