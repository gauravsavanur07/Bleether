import gql from 'graphql-tag';
import MESSAGE_FRAGMENT from './message.fragment';
const CREATE_GROUP_MUTATION = gql`
  mutation createGroup($name: String!, $userIds: [Int!]) {
    createGroup(name: $name, userIds: $userIds) {
...
      users {
        id
      }
      messages(first: 1) { # we don't need to use variables
        edges {
          cursor
          node {
            ... MessageFragment
          }
        }
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;
const LEAVE_GROUP_MUTATION = gql`
  mutation leaveGroup($id: Int!) {
    leaveGroup(id: $id) {
      id
    }
  }

export default CREATE_GROUP_MUTATION;

