import { graphql, compose } from 'react-apollo';
import { NavigationActions } from 'react-navigation';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { USER_QUERY } from '../graphql/user.query';
import CREATE_GROUP_MUTATION from '../graphql/create-group.mutation';
...

    createGroup({
      name: this.state.name,
      userIds: _.map(this.state.selected, 'id'),
    }).then((res) => {
      this.props.navigation.dispatch(goToNewGroup(res.data.createGroup));
...
};
const createGroupMutation = graphql(CREATE_GROUP_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createGroup: group  =>
      mutate({
        variables: { group },
        update: (store, { data: { createGroup } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: USER_QUERY, variables: { id: ownProps.auth.id } });
          // Add our message from the mutation to the end.
          data.user.groups.push(createGroup);
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
  userQuery,
  createGroupMutation,
)(FinalizeGroup);
