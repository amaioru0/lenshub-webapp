
export const selectProfile = (id:Number) => (dispatch:any) => {
    console.log("SELECT_PROFILE")
    console.log(id)
    dispatch({type: "SELECT_PROFILE", payload: { selectedProfile: id }})
};



export default {
    selectProfile
}