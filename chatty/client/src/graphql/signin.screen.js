import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
...
  TouchableOpacity,
  View,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import {
  setCurrentUser,
} from '../actions/auth.actions';
import LOGIN_MUTATION from '../graphql/login.mutation';
import SIGNUP_MUTATION from '../graphql/signup.mutation';
const styles = StyleSheet.create({
  container: {
...
  },
});
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
class Signin extends Component {
  static navigationOptions = {
    title: 'Chatty',
...

  constructor(props) {
    super(props);
    if (props.auth && props.auth.jwt) {
      props.navigation.goBack();
    }
    this.state = {
      view: 'login',
    };
...
    this.switchView = this.switchView.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.jwt) {
      nextProps.navigation.goBack();
    }
  }
  login() {
    const { email, password } = this.state;
    this.setState({
      loading: true,
    });
    this.props.login({ email, password })
      .then(({ data: { login: user } }) => {
        this.props.dispatch(setCurrentUser(user));
        this.setState({
          loading: false,
        });
      }).catch((error) => {
        this.setState({
          loading: false,
        });
        Alert.alert(
          `${capitalizeFirstLetter(this.state.view)} error`,
          error.message,
          [
            { text: 'OK', onPress: () => console.log('OK pressed') }, // eslint-disable-line no-console
            { text: 'Forgot password', onPress: () => console.log('Forgot Pressed'), style: 'cancel' }, // eslint-disable-line no-console
          ],
        );
      });
  }
  signup() {
    this.setState({
      loading: true,
    });
    const { email, password } = this.state;
    this.props.signup({ email, password })
      .then(({ data: { signup: user } }) => {
        this.props.dispatch(setCurrentUser(user));
        this.setState({
          loading: false,
        });
      }).catch((error) => {
        this.setState({
          loading: false,
        });
        Alert.alert(
          `${capitalizeFirstLetter(this.state.view)} error`,
          error.message,
          [{ text: 'OK', onPress: () => console.log('OK pressed') }],  // eslint-disable-line no-console
        );
      });
  }
  switchView() {
...
          onPress={this[view]}
          style={styles.submit}
          title={view === 'signup' ? 'Sign up' : 'Login'}
          disabled={this.state.loading || !!this.props.auth.jwt}
        />
        <View style={styles.switchContainer}>
          <Text>
...
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    jwt: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};
const login = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: ({ email, password }) =>
      mutate({
        variables: { email, password },
      }),
  }),
});
const signup = graphql(SIGNUP_MUTATION, {
  props: ({ mutate }) => ({
    signup: ({ email, password }) =>
      mutate({
        variables: { email, password },
      }),
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  login,
  signup,
  connect(mapStateToProps),
)(Signin);
