
import { _ } from 'lodash';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { wsClient } from '../app';
import MESSAGE_ADDED_SUBSCRIPTION from '../graphql/message-added.subscription';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageInput from '../components/message-input.component';
import {graphql, compose } from 'react-apollo';
import CREATE_MESSAGE_MUTATION from '../graphql/create-message.mutation';
import randomColor from 'randomcolor';
import Message from '../components/message.component';
import {graphql,compose } from 'react-apollo'
import GROUP_QUERY from '../graphql/group.query';
import update from 'immutability-helper';
import { Buffer } from 'buffer';
import USER_QUERY from '../graphql/user.query';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
  },
loading: {
    justifyContent: 'center',
  },
data:groupData
});
const userData = store.readQuery({
            query: USER_QUERY,
            variables: {
              id: ownProps.auth.id, // faking the user for now
            },
          });

store.writeQuery({
              query: USER_QUERY,
              variables: {
            groupId: message.groupId,
              messageConnection: { first: ITEMS_PER_PAGE },  

            },
              data: userData,
            });





          // check whether the mutation is the latest message and update cache
          const updatedGroup = _.find(userData.user.groups, { id: messge.groupId });
          if (!updatedGroup.messages.edges.length ||
            moment(updatedGroup.messages.edges[0].node.createdAt).isBefore(moment(createMessage.createdAt))) {
            // update the latest message
            updatedGroup.messages.edges[0] = {
              __typename: 'MessageEdge',
              node: createMessage,
              cursor: Buffer.from(createMessage.id.toString()).toString('base64'),
            };
            // Write our data back to the cache.
            store.writeQuery({
              query: USER_QUERY,
              variables: {
                id: 1, // faking the user for now
              },
              data: userData,
            });
          }



const fakeData = () => _.times(100, i => ({
  // every message will have a different color
  color: randomColor(),
  // every 5th message will look like it's from the current user
  isCurrentUser: i % 5 === 0,
  message: {
    id: i,
    createdAt: new Date().toISOString(),
    from: {
      username: `Username ${i}`,
    },
    text: `Message ${i}`,
  },
}));
class Messages extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.title,
    };
  };
constructor(props) {
    super(props);
    const usernameColors = {};
    if (props.group && props.group.users) {
      props.group.users.forEach((user) => {
        usernameColors[user.username] = randomColor();
      });
    }
    this.state = {
      usernameColors,
      refreshing:false,   
 };
    this.renderItem = this.renderItem.bind(this);
    this.send=this.send.bind(this);
    this.onEndReached = this.onEndReached.bind(this);	 
})
}
 keyExtractor = item => item.node.id.toString();
  renderItem = ({ item: edge }) => {
    const message = edge.node;
    return (
      <Message
        color={this.state.usernameColors[message.from.username]}
	isCurrentUser={message.from.id === this.props.auth.id}

        isCurrentUser={message.from.id === 1} // for now until we implement auth
        message={message}
      />
    );
  }

  componentWillReceiveProps(nextProps) {
    const usernameColors = {};
    // check for new messages
    if (nextProps.group) {
      if (nextProps.group.users) {
        // apply a color to each user
        nextProps.group.users.forEach((user) => {
          usernameColors[user.username] = this.state.usernameColors[user.username] || randomColor();
        });
      }
	const mapStateToProps = ({ auth }) => ({
 	 auth,
	});

// we don't resubscribe on changed props
      // because it never happens in our app
      if (!this.subscription) {
        this.subscription = nextProps.subscribeToMore({
          document: MESSAGE_ADDED_SUBSCRIPTION,
          variables: {
            userId: 1, // fake the user for now
            groupIds: [nextProps.navigation.state.params.groupId],
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            const newMessage = subscriptionData.data.messageAdded;
            return update(previousResult, {
              group: {
                messages: {
                  edges: {
                    $unshift: [{
                      __typename: 'MessageEdge',
                      node: newMessage,
                      cursor: Buffer.from(newMessage.id.toString()).toString('base64'),
                    }],
                  },
                },
              },
            });
          },
        });
      }









      if (!this.reconnected) {
        this.reconnected = wsClient.onReconnected(() => {
          this.props.refetch(); // check for any data lost during disconnect
        }, this);
      }






      this.setState({
        usernameColors,
      });
    }

else if (this.reconnected) {
      // remove event subscription
      this.reconnected();
  }
onEndReached() {
 if (!this.state.loadingMoreEntries &&
      this.props.group.messages.pageInfo.hasNextPage) {
      this.setState({
        loadingMoreEntries: true,
      });
      this.props.loadMoreEntries().then(() => {
        this.setState({
          loadingMoreEntries: false,
        });
      });
    }
  

}

send(text) {
this.props.createMessage({
      groupId: this.props.navigation.state.params.groupId,
      userId: 1, // faking the user for now
      text,

}).then(() => {
this.flatList.scrollToIndex({ index: 0, animated : true });
});
}


  keyExtractor = item => item.id.toString();
  renderItem = ({ item: message }) => (
    <Message
      color={this.state.usernameColors[message.from.username]}
      isCurrentUser={message.from.id === 1} // for now until we implement auth
      message={message}
    />
<MessageInput send {this.send} />
 
 )

  keyExtractor = item => item.message.id.toString();
  renderItem = ({ item: { isCurrentUser, message, color } }) => (
    <Message
      color={color}
      isCurrentUser={isCurrentUser}
      message={message}
    />
  )
  render() {
  const { loading, group } = this.props;
    // render loading placeholder while we fetch messages
    if (loading || !group) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    } 
 // render list of messages for group
    return (
 <KeyboardAvoidingView
        behavior={'position'}
        contentContainerStyle={styles.container}
        keyboardVerticalOffset={64}
        style={styles.container}
      >

      <View style={styles.container}>
        <FlatList
          ref={(ref) => {this.flatList = ref; }} 
	  data={groups.messages.edges}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
	  onEndReached={this.onEndReached}
	/>
       <MessageInput send={this.send} />
      </KeyboardAvoidingView>
    );
  }
}
Messages.propTypes = {
 auth: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }), 


 createMessage: PropTypes.func,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        groupId: PropTypes.number,
      }),
    }),
  }),),
  loading: PropTypes.bool,
};
const createMessageMutation = graphql(CREATE_MESSAGE_MUTATION, {
  props: ({ mutate,ownProps }) => ({
    createMessage: message =>      
mutate({
        variables: { message },
_typename: 'Mutation',
          createMessage: {{ text, groupId}) =>
	 mutate({
         variables: { text, groupId },

            __typename: 'Message',
            id: -1, // don't know id yet, but it doesn't matt
            text: message.text, // we know what the text will be
 
	    createdAt: new Date().toISOString(), // the time is now!
            from: {
              __typename: 'User',
              id: ownProps.auth.id, // still faking the user
              username: ownProps.auth.username, // still faking the user
            },
            to: {
              __typename: 'Group',
              id: groupId,
            },
          },
        },
	update: (store, { data: { createMessage } }) => {
          // Read the data from our cache for this query.
          const groupData = store.readQuery({
            query: GROUP_QUERY,
            variables: {
              groupId,
            },
          });
          // Add our message from the mutation to the end.
          groupData.group.messages.unshift(createMessage);
          // Write our data back to the cache.
          store.writeQuery({
            query: GROUP_QUERY,
            variables: {
              groupId,
            },
            data: groupData,
          });
        },
     group: PropTypes.shape({
    messages: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        cursor: PropTypes.string,
        node: PropTypes.object,




 })),
pageInfo:PropTypes.shape({
hasNextPage:PropTypes.bool,
hasPreviousPage:Proptypes.bool,
loading: PropTypes.bool,
  loadMoreEntries: PropTypes.func,
  subscribeToMore: PropTypes.func, 

 }),
});
const ITEMS_PER_PAGE =10;
const groupQuery = graphql(GROUP_QUERY, {
  options: ownProps => ({
    variables: {
      groupId: ownProps.navigation.state.params.groupId,
 messageConnection: {
        first: ITEMS_PER_PAGE,
      },    
},
  }),
 props: ({ data: { fetchMore, loading, group,subscribeToMore } }) => ({
    loading,
    group,
subscribeToMore,
    loadMoreEntries() {
      return fetchMore({
        // query: ... (you can specify a different query.
        // GROUP_QUERY is used by default)
        variables: {
          // load more queries starting from the cursor of the last (oldest) message
          after: group.messages.edges[group.messages.edges.length - 1].cursor,
     messageConnection: {
            first: ITEMS_PER_PAGE,
            after: group.messages.edges[group.messages.edges.length - 1].cursor,
          },
        

},
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) { return previousResult; }
          // push results (older messages) to end of messages list
          return update(previousResult, {
            group: {
              messages: {
                edges: { $push: fetchMoreResult.group.messages.edges },
                pageInfo: { $set: fetchMoreResult.group.messages.pageInfo },
              },
            },
          });
        },
      });
    },
  

}),
});

groupData.group.messages.edges.unshift({
            __typename: 'MessageEdge',
            node: createMessage,
            cursor: Buffer.from(createMessage.id.toString()).toString('base64'),
          });

export default compose(
  connect(mapStateToProps),
  groupQuery,createMessageMutation,
)(Messages)
export default Messages;
