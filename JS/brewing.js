const baseBrewCost = [D(10),D(25),D(100),D(250),D(500),D(1e3),D(2.5e3),D(5e3),D(1e4)]
const juiceColors = ['Red','Orange','Yellow','Green','Blue','Purple','Pink','White','Black']
function updateBrewHTML() {
    for(let i = 0; i < flaskData.length; i++) {
        if(data.flaskTested[i]) {
            DOMCacheGetOrSet(`brewButton${i}`).innerText = `Brew\n-${formatSci(getTotalCost(baseBrewCost[i],D(1.025),buyAmounts[data.buyAmounts[0]],i))} Energy`
            DOMCacheGetOrSet(`brewButton${i}`).classList = data.greenEnergy.gte(getTotalCost(baseBrewCost[i],D(1.025),buyAmounts[data.buyAmounts[0]],i)) ? 'unlocked' : 'locked'
            DOMCacheGetOrSet(`brewText${i}`).innerText = `${juiceColors[i]} Juice\n${formatSci(data.juiceAmounts[i])}`
        }
        DOMCacheGetOrSet(`brewHold${i}`).style.display = data.flaskTested[i] ? 'flex' : 'none'
    }
}

function brewJuice(i) {
    if(data.greenEnergy.lt(getTotalCost(baseBrewCost[i],D(1.025),buyAmounts[data.buyAmounts[0]],i))) return
    data.greenEnergy = data.greenEnergy.sub(getTotalCost(baseBrewCost[i],D(1.025),buyAmounts[data.buyAmounts[0]],i))
    data.juiceAmounts[i] = data.juiceAmounts[i].plus(buyAmounts[data.buyAmounts[0]])
}