import AlphabetListView from 'react-native-alpha-listview';
import update from 'immutability-helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import SelectedUserList from '../components/selected-user-list.component';
import USER_QUERY from '../graphql/user.query';
...
};
const userQuery = graphql(USER_QUERY, {
  options: ownProps => ({ variables: { id: ownProps.auth.id } }),
  props: ({ data: { loading, user } }) => ({
    loading, user,
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  userQuery,
)(NewGroup);

