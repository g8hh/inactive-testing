function updateHTML() {
    //Globals
    DOMCacheGetOrSet(`greenEnergyText`).innerText = `${formatSci(data.greenEnergy)} [+${formatSci(greenEnergyGain)}/s]`
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
}
