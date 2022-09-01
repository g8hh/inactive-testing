function updateHTML() {
    //Globals
   
    if(data.currentTab === 0) {
        updateTestHTML()
    }
    else if(data.currentTab === 1) {
        updateBrewHTML()
    }
    else if(data.currentTab === 2) {
        updateFillHTML()
    }
}
