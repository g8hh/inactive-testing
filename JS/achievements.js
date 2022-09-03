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
        updateFlaskAchievements()
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
        
        updateAchUnlockedCount()
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
        DOMCacheGetOrSet('achPercentText').innerText = `Achievements Unlocked: ${toPlaces(unlocked,0,unlocked+1)}/${toPlaces(maxUnlock,0,maxUnlock+1)} (${format((unlocked / maxUnlock) * 100)}%)`
    }