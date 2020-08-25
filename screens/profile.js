import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Gravatar, GravatarApi } from 'react-native-gravatar';

const image = { uri: "https://images.pexels.com/photos/1098662/pexels-photo-1098662.jpeg" }

class Profile extends Component{
    render() {
        return(
            <SafeAreaView style={styles.main}>
                 <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: "center", zIndex: -999}} blurRadius={5}>
                    <View style={styles.profilePhoto}>
                        <Gravatar options={{ 
                            email: 'Ramialhussein98@gmail.com', 
                            parameters: { "size": "450", "d": "mm" }, 
                            secure: true }} 
                            style={styles.roundedProfileImage} 
                        />
                    </View>
                </ImageBackground>
                <View style={styles.info}>
                    <View style={styles.hover} > 
                        <View style={{ flex: 1, flexDirection: 'row', margin: 20, marginBottom: 5}}>
                            <View style={{ width: '50%', height: '100%', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#fb5b5a', width: '80%', borderRadius: 10 }}>
                                    <Text style={{textAlign: 'center', fontSize: 16, margin: 15 }}>Follow</Text>
                                </TouchableOpacity>
                            </View>
                                
                            <View style={{ width: '50%', height: '100%', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#fb5b5a', width: '80%', borderRadius: 10 }}>
                                    <Text style={{textAlign: 'center', fontSize: 16, margin: 15 }}>Message</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', margin: 20}}>
                            <View style={{ width: '25%', height: '50%', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Follwers</Text>
                                <Text style={{ color: 'white', margin: 10 }}>0</Text>
                            </View>
                            <View style={{ width: '25%', height: '50%', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Following</Text>
                                <Text style={{ color: 'white', margin: 10 }}>0</Text>
                            </View>
                            <View style={{ width: '25%', height: '50%', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Cars</Text>
                                <Text style={{ color: 'white', margin: 10 }}>0</Text>
                            </View>
                            <View style={{ width: '25%', height: '50%', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Events</Text>
                                <Text style={{ color: 'white', margin: 10 }}>0</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.container} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: '100%'
    },

    profilePhoto: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    info: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 325,
        width: '100%',
    },

    hover: {
        backgroundColor: '#003f5c',
        height: '100%',
        margin: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 1
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        shadowColor: "#000",
    },

    roundedProfileImage: {
        width: 200, 
        height: 200, 
        borderWidth: 1,
        borderColor: 'white', 
        borderRadius: 100
      }
})

export default Profile;

