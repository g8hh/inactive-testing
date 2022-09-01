const flaskColors = ['Red','Orange','Yellow','Green','Blue','Purple','Pink','White','Black']
function updateFillHTML() {
    for(let i = 0; i < flaskData.length; i++) {
        if(true) {
            DOMCacheGetOrSet(`fillButton${i}`).innerText = `Fill Flask\n-1.00 ${flaskColors[i]} Juice\n(0.00)`
            DOMCacheGetOrSet(`fillButton${i}`).classList = data.juiceAmounts[i].gte(1) ? 'unlocked' : 'locked'
            DOMCacheGetOrSet(`fillText${i}`).innerText = `${flaskColors[i]} Flask\n${formatSci(data.flaskAmounts[i])}`
        }
    }
}