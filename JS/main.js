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
    DOMCacheGetOrSet('masteryButton').addEventListener('click',() => createConfirmation('mastery'))

    for(let i = 0; i < data.autoActive.length; i++)
        DOMCacheGetOrSet(`auto${i}`).addEventListener('click', () => auto(i))
    
    for(let i = 0; i < 2; i++)
        DOMCacheGetOrSet(`buyAmount${i}`).addEventListener('click', () => updateBuyAmount(i))
    for(let i = 0; i < data.settingsToggles.length; i++)
        DOMCacheGetOrSet(`setTog${i}`).addEventListener('click', () => settingsToggle(i))
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
    updateMastery()
    if(data.bestGoldenFlasks.lt(data.goldenFlasks))
        data.bestGoldenFlasks = data.goldenFlasks
    data.greenEnergy = !data.mastering ? data.greenEnergy.plus(greenEnergyGain.times(diff)) : data.greenEnergy.plus((greenEnergyGain.times(diff)).times(0.25))
    if(data.testing) 
        updateTest()
    runAuto()
    checkAchievements()
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
    if((!data.flaskTested[2] || data.greenEnergy.lt(2.5e5) || data.mastering) && a === 'prestige') return
    if(a === 'prestige' && !data.settingsToggles[0]) {prestige(); return}
    if(a === 'mastery' && !data.settingsToggles[1]) {mastery(); return}
    
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
        case 'mastery': 
            document.getElementById('confirmContainer').style.border = `4px solid var(--mastery-color)`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to begin mastering?'
            document.getElementById('confirmContent').innerText = 'This will trigger a prestige reset and start mastery.'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {mastery();closeModal(2)})
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
    //b = base, s = scale, a = buyAmount, i = index
    //get the multiplier for bulk buying
    let bulkMult = Decimal.pow(s, a).minus(1).div(s.minus(1));
    //base cost * 1.01^owned * bulk mult
    let cost = b.times(Decimal.pow(s, data.juiceAmounts[i].plus(data.flaskAmounts[i]))).times(bulkMult);
    
    return cost;
}

function settingsToggle(i) {
    data.settingsToggles[i] = !data.settingsToggles[i]
}

window.setInterval(function() {
    mainLoop()
},50)
