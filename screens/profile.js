import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { Gravatar, GravatarApi } from 'react-native-gravatar';

const image = { uri: "https://images.pexels.com/photos/1098662/pexels-photo-1098662.jpeg" }

class Profile extends Component{
    render() {
        return(
            <SafeAreaView style={styles.main}>
                
                <View style={styles.info}>
                    <View style={styles.hover} > 
                        <Text>Test</Text>
                    </View>
                </View>
                 <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: "center"}} blurRadius={5}>
                    <View style={styles.profilePhoto}>
                        <Gravatar options={{ 
                            email: 'Ramialhussein98@gmail.com', 
                            parameters: { "size": "450", "d": "mm" }, 
                            secure: true }} 
                            style={styles.roundedProfileImage} 
                        />
                    </View>
                </ImageBackground>
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
        height: 150,
        zIndex: 1,
        marginTop: 375,
        width: '100%',
        justifyContent: 'center',
    },

    hover: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center',
        margin: 15,
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

