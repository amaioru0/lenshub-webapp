const lens = (state = {selectedProfile: 0}, action:any) => {
    switch(action.type) {
        case "SELECT_PROFILE":
            return {
                ...state,
                selectedProfile: action.payload.selectedProfile
            }
        default: 
            return state;
    }
}

export default lens;