let mysticalFlaskGain = D(0)

function updateMasteryHTML() {
    DOMCacheGetOrSet('masteryButton').classList = !data.mastering ? 'masteryButton' : 'locked'
    DOMCacheGetOrSet('masteryButton').innerText = !data.mastering ? 'Start Mastering' : 'Stop Mastering'
    DOMCacheGetOrSet('masteryGainText').innerText = data.mastering ? `Gaining +${formatSci(mysticalFlaskGain)} Mystical Flasks/s` : 'Start Mastering to gain Mystical Flasks'
}

function updateMastery() {
    mysticalFlaskGain = data.mastering ? Decimal.log(data.greenEnergy.times(0.75),2.5) : D(0)
}

function mastery() {
    
}