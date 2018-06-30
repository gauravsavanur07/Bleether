import gql from 'graphql-tag';

import GROUP_FRAGMENT from './group.fragment';

import MESSAGE_FRAGMENT from './message.fragment';
const CREATE_GROUP_MUTATION = gql`
  mutation createGroup($group: CreateGroupInput!, $messageConnection: ConnectionInput = { first: 1 }) {
    createGroup(group: $group) {
      ... GroupFragment.
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
$(GROUP_FRAGMENT)    
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

