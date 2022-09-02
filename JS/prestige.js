let goldenFlaskGain = D(0)

function updatePrestigeHTML() {
    DOMCacheGetOrSet('goldenFlaskGainText').innerText = data.greenEnergy.lt(2.5e5) ? `${formatSci(data.greenEnergy)}/${formatSci(2.5e5)}` : `Gain +${formatSci(goldenFlaskGain)} Golden Flasks on Prestige`
    DOMCacheGetOrSet('prestigeButton').classList = data.greenEnergy.lt(2.5e5) ? 'locked' : 'prestigeButton'
}

function updatePrestige() {
    goldenFlaskGain = Decimal.sqrt(data.greenEnergy.div(1.25e5))
}

function prestige() {
    if(data.flaskTested[2] && data.greenEnergy.gte(2.5e5)) {
        for(let i = 0; i < flaskData.length; i++) {
            data.flaskTested[i] = false
            data.flaskAmounts[i] = D(0)
            data.juiceAmounts[i] = D(0)
        }
        data.greenEnergy = D(50)
        data.flaskTestIndex = 0
    }
}