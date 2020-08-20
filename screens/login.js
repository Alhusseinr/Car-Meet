import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

    }
    render() {

        return(
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <Text style={styles.logo}>Car Meets</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={ styles.inputText }
                                value={this.state.username}
                                placeholder='Username'
                                placeholderTextColor='#003f5c'
                                onChangeText={text => this.setState({ username: text })}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={ styles.inputText }
                                value={this.state.password}
                                placeholder='Password'
                                placeholderTextColor='#003f5c'
                                onChangeText={text => this.setState({ password: text })}
                                secureTextEntry={true}
                            />
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forgot}>Forgot Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => {console.log('hello')}}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signupBtn}>
                            <Text style={styles.loginText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#fb5b5a',
        marginBottom: 40
    },

    inputView: {
        width: '80%',
        backgroundColor: '#465881',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20
    },

    inputText: {
        height: 50,
        color: 'white'
    },

    forgot: {
        color: 'white',
        fontSize: 11
    },

    input: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        height: 55,
        marginBottom: 20,
        padding: 10,
        fontSize: 20,
    },

    loginBtn: {
        width: '80%',
        backgroundColor: '#fb5b5a',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10
    },

    loginText: {
        color: 'white',
        fontSize: 14
    },

    signupBtn: {
        marginTop: 10
    }
});