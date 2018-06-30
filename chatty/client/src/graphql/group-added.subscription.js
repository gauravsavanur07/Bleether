import GROUP_FRAGMENT from './group.fragment';
import gql from 'graphql-tag';
import MESSAGE_FRAGMENT from './message.fragment';
const GROUP_ADDED_SUBSCRIPTION = gql`
subscription onGroupAdded($userId: Int, $first: Int = 1, $after: String, $last: Int, $before: String){    
groupAdded(userId: $userId){
 ...GroupFragment     
 id
      name
      messages(first: 1) {
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
export default GROUP_ADDED_SUBSCRIPTION;
