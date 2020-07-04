/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Blurhash} from 'react-native-blurhash';

export default class App extends Component {
  state = {
    blurhash: 'LGFFaXYk^6#M@-5c,1J5@[or[Q6.',
    decodeAsync: true,
    encodingImageUri: 'https://blurha.sh/assets/images/img4.jpg',
    isEncoding: false,
  };
  componentDidMount() {}

  async startEncoding() {
    try {
      if (this.state.encodingImageUri.length < 5) {
        return;
      }
      this.setState({
        isEncoding: true,
      });
      const blurhash = await Blurhash.encode(this.state.encodingImageUri, 4, 3);
      this.setState({
        blurhash: blurhash,
        isEncoding: false,
      });
    } catch (e) {
      this.setState({
        isEncoding: false,
      });
      Alert.alert('Encoding error', e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Blurhash
          blurhash={this.state.blurhash}
          decodeWidth={32}
          decodeHeight={32}
          decodePunch={1}
          decodeAsync={this.state.decodeAsync}
          style={styles.blurhashImage}
          resizeMode="cover"
        />
        <TextInput
          value={this.state.blurhash}
          placeholder="Blurhash"
          onChangeText={(text) => {
            this.setState({
              blurhash: text,
            });
          }}
          style={styles.textInput}
        />
        {/* To test if `decodeAsync` really doesn't block the UI thread, you can press this Touchable and see it reacting. */}
        <View style={styles.row}>
          <Text style={styles.text}>Decode Async:</Text>
          <Switch
            value={this.state.decodeAsync}
            onValueChange={(v) => this.setState({decodeAsync: v})}
          />
        </View>
        <TextInput
          value={this.state.encodingImageUri}
          placeholder="Image URL to encode"
          onChangeText={(text) => {
            this.setState({
              encodingImageUri: text,
            });
          }}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={[
            styles.encodeButton,
            {opacity: this.state.encodingImageUri < 5 ? 0.5 : 1},
          ]}
          disabled={this.state.encodingImageUri < 5}
          onPress={this.startEncoding.bind(this)}>
          {!this.state.isEncoding && <Text>Encode</Text>}
          {this.state.isEncoding && <ActivityIndicator />}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  blurhashImage: {
    width: 300,
    height: 200,
    // Custom styling for width, height, scaling etc here
  },
  textInput: {
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'purple',
    width: '70%',
    height: 35,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  row: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginRight: 15,
  },
  encodeButton: {
    marginTop: 30,
    backgroundColor: 'rgba(200, 0, 100, 0.4)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
});
