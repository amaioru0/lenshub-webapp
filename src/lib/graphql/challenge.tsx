import gql from 'graphql-tag';

const GET_CHALLENGE = gql`
     query($request: ChallengeRequest!) {
      challenge(request: $request) { text }
    }
`

export default GET_CHALLENGE;