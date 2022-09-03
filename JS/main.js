const flaskImgPath = 'Imgs/flasks/'
const dropImgPath = 'Imgs/drops/'
let diff = 0;
const buyAmounts = [D(1),D(10),D(100),D(1e3)]

function generateEventHandlers() {
    for(let i = 0; i < tabIDs.length; i++)
        DOMCacheGetOrSet(`tabButton${i}`).addEventListener('click', () => changeTab(i))
    DOMCacheGetOrSet('currentTestButton').addEventListener('click', () => startTest())
    for(let i = 0; i < data.juiceAmounts.length; i++) {
        DOMCacheGetOrSet(`brewButton${i}`).addEventListener('click', () => brewJuice(i))
        DOMCacheGetOrSet(`fillButton${i}`).addEventListener('click', () => fillFlask(i))
    }
    DOMCacheGetOrSet('prestigeButton').addEventListener('click',() => createConfirmation('prestige'))
    for(let i = 0; i < 2; i++)
        DOMCacheGetOrSet(`buyAmount${i}`).addEventListener('click', () => updateBuyAmount(i))
    console.log('Event Handlers Init...')
}

function updateBuyAmount(i) {
    if(data.buyAmounts[i] < 4) data.buyAmounts[i]++
    if(data.buyAmounts[i] >= 4) data.buyAmounts[i] = 0
}

function mainLoop() {
    diff = (Date.now()-data.time)*data.devSpeed/1000
    updateGreenEnergyGain()
    updateFlaskBoosts()
    updatePrestige()
    data.greenEnergy = data.greenEnergy.plus(greenEnergyGain.times(diff))
    if(data.testing) 
        updateTest()
    updateHTML()
    /*
    if(DOMCacheGetOrSet('faviconLink').getAttribute('href') !== `${eggImgPath}${eggData[data.currentEgg].id}.png`)
        DOMCacheGetOrSet('faviconLink').href = `${eggImgPath}${eggData[data.currentEgg].id}.png`
        */
    data.time = Date.now()
}
const tabIDs = ['testing','brewing','filling','lab','prestige','mastery','achievements','settings']
function changeTab(i) {
    
    data.currentTab = i
    for(let i = 0; i < tabIDs.length; i++) {
        DOMCacheGetOrSet(`${tabIDs[i]}Tab`).style.display = i === data.currentTab ? 'flex' : 'none'
    }
}

function changeSubTab(a,b) {
    const subAmts = [2,2]
    const subIDs = ['set','asc']
    data.currentSubTab[a] = b
    for(let i = 0; i <= subAmts[a]; i++) {
        DOMCacheGetOrSet(`${subIDs[a]}Sub${i}`).style.display = i === data.currentSubTab[a] ? 'flex' : 'none'
    }
}

function toggle(i) {data.settingsToggles[i] = !data.settingsToggles[i]}
function toggleBA(i) {
    const numString = ['1','5','10','20']
    data.buyAmounts[i] = data.buyAmounts[i] + 1 === 4 ? 0 : data.buyAmounts[i] + 1
    DOMCacheGetOrSet(`ba${i}`).innerText = `Buy Amount: ${numString[data.buyAmounts[i]]}`
}

 function createAlert(a,b,c) {
    DOMCacheGetOrSet('alertContainer').style.border = `4px solid #${c}`
    DOMCacheGetOrSet('alertTitle').innerText = a
    DOMCacheGetOrSet('alertContent').innerText = b
    DOMCacheGetOrSet('alert').style.display = 'block'
    DOMCacheGetOrSet('alertContainer').style.display = 'block'
}

function createPrompt(a,b) {
    let old_element = document.getElementById("promptButton");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    DOMCacheGetOrSet('promptInput').value = ''
    DOMCacheGetOrSet('promptContainer').style.border = "4px solid whitesmoke"
    DOMCacheGetOrSet('promptTitle').innerText = a
    DOMCacheGetOrSet('prompt').style.display = 'block'
    DOMCacheGetOrSet('promptContainer').style.display = 'block'
    switch(b) {
        case 0:
            document.getElementById('promptButton').addEventListener('click', () => { importSave() })
            break
    }
}
function createConfirmation(a) {
    let old_element = document.getElementById("yesConfirm");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    old_element = document.getElementById("noConfirm");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    switch(a) {
        case 'reset':
            document.getElementById('confirmContainer').style.border = `4px solid var(--locked-color)`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to reset your game?'
            document.getElementById('confirmContent').innerText = 'This will export your savefile to the clipboard but delete your save game in local storage.'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {fullReset();closeModal(2)})
            break
        case 'prestige':
            document.getElementById('confirmContainer').style.border = `4px solid var(--prestige-color)`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to prestige?'
            document.getElementById('confirmContent').innerText = 'This will reset all progress in exchange for Golden Flasks'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {prestige();closeModal(2)})
            break
    }
}
function closeModal(i) {
    switch(i) {
        case 0:
            document.getElementById('alertContainer').style.display = 'none'
            document.getElementById('alert').style.display = 'none'
            break
        case 1:
            document.getElementById('promptContainer').style.display = 'none'
            document.getElementById('prompt').style.display = 'none'
            break
        case 2:
            document.getElementById('confirm').style.display = 'none'
            document.getElementById('confirmContainer').style.display = 'none'
            break
    }
    
}

function getTotalCost(b,s,a,i) {
    let cost = b
    cost = cost.times(Decimal.pow(s,data.juiceAmounts[i].plus(data.flaskAmounts[i]).plus(a)))
    return cost
}
window.setInterval(function() {
    mainLoop()
},50)
