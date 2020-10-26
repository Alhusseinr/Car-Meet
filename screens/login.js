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
import {AsyncStorage} from "react-native-web";
import axios from 'axios';
import { Button } from 'react-native-paper';


export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: {},
            token: ''
        }
    }

    handleEmailChnage = (email) => {
        this.setState({ email:email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password: password });
    };

    _storeToken = async (token) => {
        try{
            await AsyncStorage.setItem('token', token);
        } catch (e) {
            console.log(e)
        }
    };

    _retrieveToken = async () => {
        try{
            const value = await AsyncStorage.getItem('token');
            if(value !== null){
                console.log('token in localStorage: ', value);
                return value;
            }
            return value;
        } catch (e) {
          console.log(e)
        }
    };

    handleLogin = async () => {
        const { email, password } = this.state;
        const errors = this.isEmpty(email, password);
        this.setState({ errors });

        console.log(email, password);

        if(Object.keys(errors).length === 0) {
            axios.post('http://127.0.0.1:5000/api/user/login', { email, password })
                .then(response => {
                    console.log(response);
                })
                .catch(e => console.log(e))
        }
    };

    isEmpty = (email, password) => {
        const errors = {};
        if(!email) errors.email = "Email can't be blank";
        if(!password) errors.password = "Password can't be blank";
        return errors;
    };

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
                                value={this.state.email}
                                placeholder='Email'
                                placeholderTextColor='#003f5c'
                                onChangeText={text => this.setState({ email: text })}
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
                        <Button title="LOGIN" onPress={this.handleLogin} mode="contained" style={{ marginTop: 15, padding: 5 }} color="#E9190F" >
                            Login
                        </Button>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => {this.handleLogin}}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signupBtn}>
                            <Text style={styles.loginText}>Register</Text>
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
