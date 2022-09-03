const achievementNames = [
    //Flask Discovery Section
    'Flask I','Flask II','Flask III','Flask IV','Flask V','Flask VI','Flask VII','Flask VIII','Flask IX',
    //Energy Section
    'Energy','Energized','Energetic','Energizer','Power Plant','Unlimited Power',
    //Gold and Mystical
    'Gold','Gilded','Golden','Midas','Mysterious','Mystic','Mastering','Mastered',
    ]
    
    const achievementDescriptions = [
    //Flask Discovery Section
    'Unlock the Red Flask','Unlock the Orange Flask','Unlock the Yellow Flask','Unlock the Green Flask','Unlock the Blue Flask','Unlock the Purple Flask','Unlock the Pink Flask','Unlock the White Flask','Unlock the Black Flask',
    //Energy Section
    'Reach 1,000 Energy','Reach 1.00e6 Energy','Reach 1.00e9 Energy','Reach 1.00e12 Energy','Reach 1.00e15 Energy','Reach 1.00e18 Energy',
    //Gold and Mystical
    'Reach 100 Golden Flasks','Reach 10,000 Golden Flasks','Reach 1.00e6 Golden Flasks','Reach 1.00e8 Golden Flasks',
    'Reach 100 Mystical Flasks','Reach 1,000 Mystical Flasks','Reach 10,000 Mystical Flasks','Reach 100,000 Mystical Flasks',
    ]
    
    function updateAchText(i) {
        DOMCacheGetOrSet('achHoverText').innerText = i < 9 && !data.flaskDiscovered[i] ? `[${i+1}] - ${achievementNames[i]}\n???` : `[${i+1}] - ${achievementNames[i]}\n${achievementDescriptions[i]}`
    }
    
    for(let i = 0; i < achievementNames.length; i++) 
        DOMCacheGetOrSet('ach' + i).addEventListener('mouseover', () => updateAchText(i))
    
    function getAchievement(i) {
        if(data.achievements[i] === true) return
        data.achievements[i] = true
        $.notify(`${achievementNames[i]} Unlocked!`,'success')
        updateAchClass()
    }
    function updateFlaskAchievements() {
        for(let i = 0; i < data.flaskDiscovered.length; i++) {
            DOMCacheGetOrSet(`ach${i}`).src = data.flaskDiscovered[i] ? `${flaskImgPath}${flaskData[i].id}.png` : `${flaskImgPath}questionFlask.png`
        }
    }
    function checkAchievements() {
        //Flasks
        for(let i = 0; i < data.flaskDiscovered.length; i++) {
            if(data.flaskDiscovered[i] === true) getAchievement(i)
        }
        //Energy
        const energyReqs = [1e3,1e6,1e9,1e12,1e15,1e18]
        for(let i = 0; i < energyReqs.length; i++) {
            if(data.greenEnergy.gte(energyReqs[i])) getAchievement(i + 9)
        }
        //Gold
        const goldReqs = [100,1e4,1e6,1e8]
        for(let i = 0; i < goldReqs.length; i++) {
            if(data.goldenFlasks.gte(goldReqs[i])) getAchievement(i + 15)
        }
        //Mystical
        const mysticalReqs = [100,1e3,1e4,1e5]
        for(let i = 0; i < mysticalReqs.length; i++) {
            if(data.mysticalFlasks.gte(mysticalReqs[i])) getAchievement(i + 19)
        }
        updateAchUnlockedCount()
        updateFlaskAchievements()
    }
    
    function updateAchClass() {
        for(let i = 0; i < achievementNames.length; i++) {
                DOMCacheGetOrSet('ach'+i).classList = data.achievements[i] ? 'achUnlock' : 'achLock'
        }
    
    }
    
    function updateAchUnlockedCount() {
        const maxUnlock = data.achievements.length
        let unlocked = 0
        for(let i = 0; i < maxUnlock; i++)
            if(data.achievements[i] === true) unlocked++
        DOMCacheGetOrSet('achPercentText').innerText = `Achievements Unlocked: ${toPlaces(unlocked,0,unlocked+1)}/${toPlaces(maxUnlock,0,maxUnlock+1)} (${formatSci((unlocked / maxUnlock) * 100)}%)`
    }