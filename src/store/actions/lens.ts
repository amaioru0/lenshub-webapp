
export const selectProfile = (id:Number) => (dispatch:any) => {
    dispatch({type: "SELECT_PROFILE", payload: { selectProfile: id }})
};



export default {
    selectProfile
}