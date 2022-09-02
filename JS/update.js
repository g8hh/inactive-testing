function updateHTML() {
    //Globals
    DOMCacheGetOrSet(`greenEnergyText`).innerText = `${formatSci(data.greenEnergy)} [+${formatSci(greenEnergyGain)}/s]`
    DOMCacheGetOrSet('goldenFlaskText').innerText = `${formatSci(data.goldenFlasks)} [0.00x Research Speed]`
    DOMCacheGetOrSet('tabButton4').style.display = data.flaskTested[2] ? 'block' : 'none'
    if(data.currentTab === 0) {
        updateTestHTML()
    }
    else if(data.currentTab === 1) {
        updateBrewHTML()
    }
    else if(data.currentTab === 2) {
        updateFillHTML()
    }
    else if(data.currentTab === 3) {
        updateLabHTML()
    }
    else if(data.currentTab === 4) {
        updatePrestigeHTML()
    }
}
