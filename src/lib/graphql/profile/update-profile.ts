import gql from 'graphql-tag';

const UPDATE_PROFILE = gql`
mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
     id
    }
 }
`

export default UPDATE_PROFILE;