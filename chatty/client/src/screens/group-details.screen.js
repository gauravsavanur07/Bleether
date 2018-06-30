import { graphql, compose } from 'react-apollo';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import GROUP_QUERY from '../graphql/group.query';
import USER_QUERY from '../graphql/user.query';
...
  leaveGroup() {
    this.props.leaveGroup({
      id: this.props.navigation.state.params.id,
    })
      .then(() => {
        this.props.navigation.dispatch(resetAction);
      })
...
        variables: { id },
        update: (store, { data: { deleteGroup } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: USER_QUERY, variables: { id: ownProps.auth.id } });
          // Add our message from the mutation to the end.
          data.user.groups = data.user.groups.filter(g => deleteGroup.id !== g.id);
...
          // Write our data back to the cache.
          store.writeQuery({
            query: USER_QUERY,
            variables: { id: ownProps.auth.id },
            data,
          });
        },
...

const leaveGroupMutation = graphql(LEAVE_GROUP_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    leaveGroup: ({ id }) =>
      mutate({
        variables: { id },
        update: (store, { data: { leaveGroup } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: USER_QUERY, variables: { id: ownProps.auth.id } });
          // Add our message from the mutation to the end.
          data.user.groups = data.user.groups.filter(g => leaveGroup.id !== g.id);
...
          // Write our data back to the cache.
          store.writeQuery({
            query: USER_QUERY,
            variables: { id: ownProps.auth.id },
            data,
          });
        },
...
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  groupQuery,
  deleteGroupMutation,
  leaveGroupMutation,
