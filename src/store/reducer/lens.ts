const lens = (state = {selectedProfile: 0, isSignedIn: (typeof window !== undefined ? false : localStorage.getItem('jid') ? true : false) }, action:any) => {
    switch(action.type) {
        case "SELECT_PROFILE":
            return {
                ...state,
                selectedProfile: action.payload.selectedProfile
            }
        case "SET_IS_SIGNED_IN":
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn
            }
        default: 
            return state;
    }
}

export default lens;