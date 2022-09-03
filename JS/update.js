function updateHTML() {
    //Globals
    DOMCacheGetOrSet(`greenEnergyText`).innerText = `${formatSci(data.greenEnergy)} [+${formatSci(greenEnergyGain)}/s]`
    DOMCacheGetOrSet('goldenFlaskText').innerText = `${formatSci(data.goldenFlasks)} [${formatSci(goldenFlaskBoost)}x Research Speed]`
    DOMCacheGetOrSet('tabButton4').style.display = data.flaskDiscovered[2] ? 'block' : 'none'
    DOMCacheGetOrSet('tabButton5').style.display = data.flaskDiscovered[5] ? 'block' : 'none'
    if(data.currentTab === 0) {
        updateTestHTML()
    }
    else if(data.currentTab === 1) {
        updateBrewHTML()
        DOMCacheGetOrSet(`buyAmount${0}`).innerText = `Buy Amount: ${formatSci(buyAmounts[data.buyAmounts[0]])}`
    }
    else if(data.currentTab === 2) {
        updateFillHTML()
        DOMCacheGetOrSet(`buyAmount${1}`).innerText = `Buy Amount: ${formatSci(buyAmounts[data.buyAmounts[1]])}`
    }
    else if(data.currentTab === 3) {
        updateLabHTML()
    }
    else if(data.currentTab === 4) {
        updatePrestigeHTML()
    }
    else if(data.currentTab === 5) {
        updateMasteryHTML()
    }
    else if(data.currentTab === 7) {
        DOMCacheGetOrSet('setTog0').innerText = data.settingsToggles[0] ? 'Prestige Confirm: ON' : 'Prestige Confirm: OFF'
        DOMCacheGetOrSet('setTog1').innerText = data.settingsToggles[1] ? 'Mastery Confirm: ON' : 'Mastery Confirm: OFF'
    }
}
