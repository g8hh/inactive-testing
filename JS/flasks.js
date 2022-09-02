const flaskData = [
    {
        name: 'Red Flask',
        id: 'redFlask',
        requirement: D(50),
        unlockTime: 10
    },
    {
        name: 'Orange Flask',
        id: 'orangeFlask',
        requirement: D(25),
        unlockTime: 60
    },
    {
        name: 'Yellow Flask',
        id: 'yellowFlask',
        requirement: D(50),
        unlockTime: 180
    },
    {
        name: 'Green Flask',
        id: 'greenFlask',
        requirement: D(100),
        unlockTime: 360
    },
    {
        name: 'Blue Flask',
        id: 'blueFlask',
        requirement: D(250),
        unlockTime: 900
    },
    {
        name: 'Purple Flask',
        id: 'purpleFlask',
        requirement: D(500),
        unlockTime: 1800
    },
    {
        name: 'Pink Flask',
        id: 'pinkFlask',
        requirement: D(1e3),
        unlockTime: 3600
    },
    {
        name: 'White Flask',
        id: 'whiteFlask',
        requirement: D(1e4),
        unlockTime: 43200
    },
    {
        name: 'Black Flask',
        id: 'blackFlask',
        requirement: D(1e5),
        unlockTime: 86400
    },
]
let greenEnergyGain = D(0)
let flaskBoosts = new Array(8).fill(D(1))
function updateTestHTML() {
    //Current Test UI
    if(data.flaskTestIndex < flaskData.length) {
        if((DOMCacheGetOrSet('currentTestImg').getAttribute('src') !== `${flaskImgPath}${flaskData[data.flaskTestIndex].id}.png` && data.flaskDiscovered[data.flaskTestIndex] === true)
        || (DOMCacheGetOrSet('currentTestImg').getAttribute('src') !== `${flaskImgPath}questionFlask.png` && data.flaskDiscovered[data.flaskTestIndex] === false))
            DOMCacheGetOrSet('currentTestImg').setAttribute('src', data.flaskDiscovered[data.flaskTestIndex] ? `${flaskImgPath}${flaskData[data.flaskTestIndex].id}.png` : `${flaskImgPath}questionFlask.png`)
        DOMCacheGetOrSet('currentTestText').innerText = data.flaskDiscovered[data.flaskTestIndex] ? 
        `-=${flaskData[data.flaskTestIndex].name}=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex].requirement)} ${data.flaskTestIndex !== 0 ? `${flaskData[data.flaskTestIndex-1].name}` : 'Green Energy'}` :
        `-=???=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex].requirement)} ${data.flaskTestIndex !== 0 ? `${flaskData[data.flaskTestIndex-1].name}` : 'Green Energy'}`
    }
    else {
        if((DOMCacheGetOrSet('currentTestImg').getAttribute('src') !== `${flaskImgPath}maxFlask.png`))
        DOMCacheGetOrSet('currentTestImg').setAttribute('src', `${flaskImgPath}maxFlask.png`)
        DOMCacheGetOrSet('currentTestText').innerText = ''
    }
    if(data.flaskTestIndex < flaskData.length-1) {
        if((DOMCacheGetOrSet('nextTestImg').getAttribute('src') !== `${flaskImgPath}${flaskData[data.flaskTestIndex+1].id}.png` && data.flaskDiscovered[data.flaskTestIndex+1] === true)
        || (DOMCacheGetOrSet('nextTestImg').getAttribute('src') !== `${flaskImgPath}questionFlask.png` && data.flaskDiscovered[data.flaskTestIndex+1] === false))
            DOMCacheGetOrSet('nextTestImg').setAttribute('src', data.flaskDiscovered[data.flaskTestIndex+1] ? `${flaskImgPath}${flaskData[data.flaskTestIndex+1].id}.png` : `${flaskImgPath}questionFlask.png`)
        DOMCacheGetOrSet('nextTestText').innerText = data.flaskDiscovered[data.flaskTestIndex+1] ? 
        `-=${flaskData[data.flaskTestIndex+1].name}=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex+1].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex+1].requirement)} ${flaskData[data.flaskTestIndex].name}` :
        `-=???=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex+1].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex+1].requirement)} ${data.flaskDiscovered[data.flaskTestIndex] ? flaskData[data.flaskTestIndex].name : '??? Flask'}`
    }
    else {
        if((DOMCacheGetOrSet('nextTestImg').getAttribute('src') !== `${flaskImgPath}maxFlask.png`))
        DOMCacheGetOrSet('nextTestImg').setAttribute('src', `${flaskImgPath}maxFlask.png`)
        DOMCacheGetOrSet('nextTestText').innerText = ''
    }
    DOMCacheGetOrSet('progress').style.width = `${((data.currentUnlockTime / flaskData[data.flaskTestIndex].unlockTime) * 100).toString()}%`
    DOMCacheGetOrSet('progressText').innerText = `${formatSci(D((data.currentUnlockTime / flaskData[data.flaskTestIndex].unlockTime) * 100))}%`
    DOMCacheGetOrSet('currentTestButton').style.display = data.flaskTestIndex >= flaskData.length-1 ? 'none' : 'block'
    if(data.flaskTestIndex < flaskData.length) {
        DOMCacheGetOrSet('currentTestButton').innerText = data.flaskDiscovered[data.flaskTestIndex] ? `Test ${flaskColors[data.flaskTestIndex]} Flask` : `Test ??? Flask`
        if(data.flaskTestIndex === 0)
            DOMCacheGetOrSet('currentTestButton').classList = data.greenEnergy.gte(flaskData[0].requirement) ? 'unlocked' : 'locked'
        else
            DOMCacheGetOrSet('currentTestButton').classList = data.flaskAmounts[data.flaskTestIndex-1].gte(flaskData[data.flaskTestIndex].requirement) ? 'unlocked' : 'locked'
    }
}

function startTest() {
    if(data.flaskTestIndex === 0 && data.greenEnergy.lt(flaskData[0].requirement)) return
    else if(data.flaskTestIndex < flaskData.length && data.flaskTestIndex !== 0 && data.flaskAmounts[data.flaskTestIndex-1].lt(flaskData[data.flaskTestIndex].requirement)) return
    else if(data.testing) return
    data.currentUnlockTime = 0
    data.testing = true;
}

function updateTest() {
    data.currentUnlockTime += diff;
    if(data.currentUnlockTime >= flaskData[data.flaskTestIndex].unlockTime) {
        if(!data.flaskDiscovered[data.flaskTestIndex]) data.flaskDiscovered[data.flaskTestIndex] = true
        data.flaskTested[data.flaskTestIndex] = true
        $.notify(`${flaskData[data.flaskTestIndex].name} Tested!`,'success')
        data.testing = false
        data.currentUnlockTime = 0
        data.flaskTestIndex++
    }
}

function updateGreenEnergyGain() {
    greenEnergyGain = (data.flaskAmounts[0].times(0.5)).times(flaskBoosts[0]).times(flaskBoosts[1]).times(flaskBoosts[2]).times(flaskBoosts[3]).times(flaskBoosts[4]).times(flaskBoosts[5]).times(flaskBoosts[6]).times(flaskBoosts[7])
}

function updateLabHTML() {
    for(let i = 0; i < flaskData.length; i++) {
        if(data.flaskTested[i]) {
            DOMCacheGetOrSet(`labText${i}`).innerText = i === 0 ? `${flaskColors[i]} Flask - ${formatSci(data.flaskAmounts[i])}\n+${formatSci(greenEnergyGain)} Green Energy` : 
            `${flaskColors[i]} Flask - ${formatSci(data.flaskAmounts[i])}\n${flaskData[i-1].name} is ${formatSci(flaskBoosts[i-1])}x Stronger`
        }
        DOMCacheGetOrSet(`labHold${i}`).style.display = data.flaskTested[i] ? 'flex' : 'none'
    }
}

function updateFlaskBoosts() {
    for(let i = 0; i < flaskBoosts.length; i++)
        flaskBoosts[i] = data.flaskAmounts[i+1].gt(0) ? D(1).plus(Decimal.sqrt(data.flaskAmounts[i+1].div(5))) : D(1)
}