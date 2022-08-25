const baseBrewCost = [D(10),D(20),D(40),D(60),D(80),D(150),D(200),D(250),D(500)]
const juiceColors = ['Red','Orange','Yellow','Green','Blue','Purple','Pink','White','Black']
function updateBrewHTML() {
    for(let i = 0; i < flaskData.length; i++) {
        if(true) {
            DOMCacheGetOrSet(`brewButton${i}`).innerText = `Brew\n-${formatSci(baseBrewCost[i])} Energy`
            DOMCacheGetOrSet(`brewButton${i}`).classList = data.greenEnergy.gte(baseBrewCost[i]) ? 'unlocked' : 'locked'
            DOMCacheGetOrSet(`brewText${i}`).innerText = `${juiceColors[i]} Juice\n${formatSci(data.juiceAmounts[i])}`
        }
    }
}