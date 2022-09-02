const flaskColors = ['Red','Orange','Yellow','Green','Blue','Purple','Pink','White','Black']
function updateFillHTML() {
    for(let i = 0; i < flaskData.length; i++) {
        if(data.flaskTested[i]) {
            DOMCacheGetOrSet(`fillButton${i}`).innerText = `Fill Flask\n-1.00 ${flaskColors[i]} Juice\n(${formatSci(data.juiceAmounts[i])})`
            DOMCacheGetOrSet(`fillButton${i}`).classList = data.juiceAmounts[i].gte(1) ? 'unlocked' : 'locked'
            DOMCacheGetOrSet(`fillText${i}`).innerText = `${flaskColors[i]} Flask\n${formatSci(data.flaskAmounts[i])}`
        }
        DOMCacheGetOrSet(`fillHold${i}`).style.display = data.flaskTested[i] ? 'flex' : 'none'
    }
}

function fillFlask(i) {
    if(data.juiceAmounts[i].lt(1)) return
    data.juiceAmounts[i] = data.juiceAmounts[i].sub(1)
    data.flaskAmounts[i] = data.flaskAmounts[i].plus(1)
}