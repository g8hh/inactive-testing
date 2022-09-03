let goldenFlaskGain = D(0)
let goldenFlaskBoost = D(1)
let goldenFlaskEffect = D(1)
function updatePrestigeHTML() {
    if(!data.mastering) {
        DOMCacheGetOrSet('goldenFlaskGainText').innerText = data.greenEnergy.lt(2.5e5) ? `${formatSci(data.greenEnergy)}/${formatSci(2.5e5)} Green Energy` : `Gain +${formatSci(goldenFlaskGain)} Golden Flasks on Prestige`
        DOMCacheGetOrSet('prestigeButton').classList = data.greenEnergy.lt(2.5e5) ? 'locked' : 'prestigeButton'
    }
    else {
        DOMCacheGetOrSet('goldenFlaskGainText').innerText = `Can't prestige while mastering`
        DOMCacheGetOrSet('prestigeButton').classList = 'locked'
    }
}

function updatePrestige() {
    goldenFlaskGain = Decimal.sqrt(data.greenEnergy.div(1.25e5))
    goldenFlaskBoost = data.goldenFlasks.gt(0) ? D(1).plus(Decimal.log10(data.goldenFlasks)) : D(1)
    goldenFlaskEffect = D(1).div(goldenFlaskBoost)
}

function prestige() {
    if(data.flaskTested[2] && data.greenEnergy.gte(2.5e5) && !data.mastering) {
        data.goldenFlasks = data.goldenFlasks.plus(goldenFlaskGain)
        for(let i = 0; i < flaskData.length; i++) {
            data.flaskTested[i] = false
            data.flaskAmounts[i] = D(0)
            data.juiceAmounts[i] = D(0)
        }
        data.greenEnergy = D(50)
        data.testing = false
        data.currentUnlockTime = 0
        data.flaskTestIndex = 0
    }
}