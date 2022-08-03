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
        requirement: D(0),
        unlockTime: 10
    },
    {
        name: 'Yellow Flask',
        id: 'yellowFlask',
        requirement: D(0),
        unlockTime: 10
    },
    {
        name: 'Green Flask',
        id: 'greenFlask',
        requirement: D(0),
        unlockTime: 10
    },
    {
        name: 'Blue Flask',
        id: 'blueFlask',
        requirement: D(0),
        unlockTime: 10
    },
    {
        name: 'Purple Flask',
        id: 'purpleFlask',
        requirement: D(0),
        unlockTime: 10
    },
    {
        name: 'Pink Flask',
        id: 'pinkFlask',
        requirement: D(0),
        unlockTime: 10
    },
    {
        name: 'White Flask',
        id: 'whiteFlask',
        requirement: D(0),
        unlockTime: 10
    },
    {
        name: 'Black Flask',
        id: 'blackFlask',
        requirement: D(0),
        unlockTime: 10
    },
]

function updateTestHTML() {
    //Current Test UI
    if(data.flaskTestIndex < flaskData.length) {
        if((DOMCacheGetOrSet('currentTestImg').getAttribute('src') !== `${flaskImgPath}${flaskData[data.flaskTestIndex].id}.png` && data.flaskTested[data.flaskTestIndex] === true)
        || (DOMCacheGetOrSet('currentTestImg').getAttribute('src') !== `${flaskImgPath}questionFlask.png` && data.flaskTested[data.flaskTestIndex] === false))
            DOMCacheGetOrSet('currentTestImg').setAttribute('src', data.flaskTested[data.flaskTestIndex] ? `${flaskImgPath}${flaskData[data.flaskTestIndex].id}.png` : `${flaskImgPath}questionFlask.png`)
        DOMCacheGetOrSet('currentTestText').innerText = data.flaskTested[data.flaskTestIndex] ? 
        `-=${flaskData[data.flaskTestIndex].name}=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex].requirement)} ${data.flaskTestIndex !== 0 ? `${flaskData[data.flaskTestIndex-1]}` : 'Green Energy'}` :
        `-=???=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex].requirement)} ${data.flaskTestIndex !== 0 ? `${flaskData[data.flaskTestIndex-1]}` : 'Green Energy'}`
    }
    else {
        if((DOMCacheGetOrSet('currentTestImg').getAttribute('src') !== `${flaskImgPath}maxFlask.png`))
        DOMCacheGetOrSet('currentTestImg').setAttribute('src', `${flaskImgPath}maxFlask.png`)
        DOMCacheGetOrSet('currentTestText').innerText = ''
    }
    if(data.flaskTestIndex < flaskData.length-1) {
        if((DOMCacheGetOrSet('nextTestImg').getAttribute('src') !== `${flaskImgPath}${flaskData[data.flaskTestIndex+1].id}.png` && data.flaskTested[data.flaskTestIndex+1] === true)
        || (DOMCacheGetOrSet('nextTestImg').getAttribute('src') !== `${flaskImgPath}questionFlask.png` && data.flaskTested[data.flaskTestIndex+1] === false))
            DOMCacheGetOrSet('nextTestImg').setAttribute('src', data.flaskTested[data.flaskTestIndex+1] ? `${flaskImgPath}${flaskData[data.flaskTestIndex+1].id}.png` : `${flaskImgPath}questionFlask.png`)
        DOMCacheGetOrSet('nextTestText').innerText = data.flaskTested[data.flaskTestIndex+1] ? 
        `-=${flaskData[data.flaskTestIndex+1].name}=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex+1].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex+1].requirement)} ${flaskData[data.flaskTestIndex]}` :
        `-=???=-\nTime To Test: ${formatTime(flaskData[data.flaskTestIndex+1].unlockTime)}\nReq: ${formatSci(flaskData[data.flaskTestIndex+1].requirement)} ${data.flaskTested[data.flaskTestIndex] ? flaskData[data.flaskTestIndex].name : '??? Flask'}`
    }
    else {
        if((DOMCacheGetOrSet('nextTestImg').getAttribute('src') !== `${flaskImgPath}maxFlask.png`))
        DOMCacheGetOrSet('nextTestImg').setAttribute('src', `${flaskImgPath}maxFlask.png`)
        DOMCacheGetOrSet('nextTestText').innerText = ''
    }
    DOMCacheGetOrSet('progress').style.width = `${((flaskData[data.currentUnlockTime] / flaskData[data.flaskTestIndex].unlockTime) * 100).toString()}%`
    DOMCacheGetOrSet('progressText').innerText = `${formatSci(D((data.currentUnlockTime / flaskData[data.flaskTestIndex].unlockTime) * 100))}%`
}