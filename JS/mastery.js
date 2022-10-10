let mysticalFlaskGain = D(0)
let mysticalFlaskBoost = D(1)
function updateMasteryHTML() {
    DOMCacheGetOrSet('masteryButton').classList = !data.mastering ? 'masteryButton' : 'locked'
    DOMCacheGetOrSet('masteryButton').innerText = !data.mastering ? 'Start Mastering' : 'Stop Mastering'
    DOMCacheGetOrSet('masteryGainText').innerText = data.mastering ? `Gaining +${formatSci(mysticalFlaskGain)} Mystical Flasks/s` : 'Start Mastering to gain Mystical Flasks'
}

function updateMastery() {
    mysticalFlaskGain = data.mastering ? Decimal.log(data.greenEnergy.times(0.75),2.5) : D(0)
    data.mysticalFlasks = data.mastering ? data.mysticalFlasks.plus(mysticalFlaskGain.times(diff)) : data.mysticalFlasks
    mysticalFlaskBoost = data.mysticalFlasks.gt(0) && !data.mastering ? D(1).plus(Decimal.ln(data.mysticalFlasks)) : D(1)
}

function mastery() {
    if(!data.mastering) {
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
        data.mastering = true
    }
    else {
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
        data.mastering = false
    }
}