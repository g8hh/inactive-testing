let goldenFlaskGain = D(0)
let goldenFlaskBoost = D(1)
let goldenFlaskEffect = D(1)
const autoCosts = [D(1e3),D(5e3),D(1e4),D(5e4),D(1e5),D(5e5),D(1e6),D(5e7),D(1e8)]
function updatePrestigeHTML() {
    if(!data.mastering) {
        DOMCacheGetOrSet('goldenFlaskGainText').innerText = data.greenEnergy.lt(2.5e5) ? `${formatSci(data.greenEnergy)}/${formatSci(2.5e5)} Green Energy` : `Gain +${formatSci(goldenFlaskGain)} Golden Flasks on Prestige`
        DOMCacheGetOrSet('prestigeButton').classList = data.greenEnergy.lt(2.5e5) ? 'locked' : 'prestigeButton'
    }
    else {
        DOMCacheGetOrSet('goldenFlaskGainText').innerText = `Can't prestige while mastering`
        DOMCacheGetOrSet('prestigeButton').classList = 'locked'
    }
    for(let i = 0; i < data.autoActive.length; i++) {
        if(data.flaskDiscovered[i]) {
            if(!data.autoPurchased[i]) {
                DOMCacheGetOrSet(`auto${i}`).innerText = `Automatic ${juiceColors[i]}\nCost: ${formatSci(autoCosts[i])} Golden Flasks`
                DOMCacheGetOrSet(`auto${i}`).classList = data.goldenFlasks.lt(autoCosts[i]) ? 'locked' : 'unlocked'
            }
            else {
                DOMCacheGetOrSet(`auto${i}`).innerText = data.autoActive[i] ? `Automatic ${juiceColors[i]}\n[ON]` : `Automatic ${juiceColors[i]}\n[OFF]`
                DOMCacheGetOrSet(`auto${i}`).classList = data.autoActive[i] ? 'unlocked' : 'locked'
            }
        }
        DOMCacheGetOrSet(`auto${i}`).style.display = data.flaskDiscovered[i] ? 'block' : 'none'
    }
}

function updatePrestige() {
    goldenFlaskGain = Decimal.sqrt(data.greenEnergy.div(1.25e5))
    goldenFlaskBoost = data.bestGoldenFlasks.gt(0) ? D(1).plus(Decimal.log10(data.bestGoldenFlasks)) : D(1)
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

function auto(i) {
    if(!data.autoPurchased[i] && data.goldenFlasks.gte(autoCosts[i])) {
        data.autoPurchased[i] = true
        data.goldenFlasks = data.goldenFlasks.sub(autoCosts[i])
    }
    else {
        data.autoActive[i] = !data.autoActive[i]
    }
}

function runAuto() {
    for(let i = 0; i < data.autoActive.length; i++) {
        if(data.autoActive[i] && data.flaskTested[i] && data.autoPurchased[i]) {
            if(data.greenEnergy.gte(getTotalCost(baseBrewCost[i],D(1.01),buyAmounts[data.buyAmounts[0]],i)))
                brewJuice(i)
            if(data.juiceAmounts[i].gte(D(1).times(buyAmounts[data.buyAmounts[1]])))
                fillFlask(i)
        }
    }
}