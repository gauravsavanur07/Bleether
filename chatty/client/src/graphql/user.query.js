import MESSAGE_FRAGMENT from './message.fragment';
import gql from 'graphql-tag';
// get the user and all user's groups
export const USER_QUERY = gql`
  query user($id: Int) {
    user(id: $id) {
      id
      email
      username
      groups {
        id
        name
       messages(first: 1) { # we don't need to use variables
          edges {
            cursor
            node {
              ... MessageFragment
	 }
    }
  }
${MESSAGE_FRAGMENT}

`;
export default USER_QUERY;

