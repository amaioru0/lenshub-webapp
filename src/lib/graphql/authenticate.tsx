import gql from 'graphql-tag';

const AUTHENTICATE = gql`
    mutation($request: SignedAuthChallenge!) { 
      authenticate(request: $request) {
        accessToken
        refreshToken
      }
   }
`

export default AUTHENTICATE;