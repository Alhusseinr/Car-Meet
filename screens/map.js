import React from "react";
import MapView, {Callout} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import MapMarker from "react-native-maps/lib/components/MapMarker";
import Alert from "shards-react";
import axios from 'axios';

export default class Map extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            lat: 0,
            log: 0
        }
    }

    componentWillMount() {
        axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?address=5601+blvd+east&key=AIzaSyAVQYj4wyF5NkHrbbMqtRz1UFdz_zWt840')
            .then(response => {
                this.setState({ lat: response.data.results[0].geometry.location.lat, log: response.data.results[0].geometry.location.lng });
                console.log('lat: ', this.state.lat, 'lng: ', this.state.log);
            })
            .catch(e => console.log(e))
    }

    render() {
        return(
            <View style={{ height: '100%', width: '100%' }}>
                <MapView
                    style={{
                        ...StyleSheet.absoluteFillObject
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={true}

                >
                    <MapMarker
                        coordinate={{ latitude: this.state.lat, longitude: this.state.log }}
                        title='First Car Meet'
                        description='This is when it all starts'
                    >
                        <Callout onPress={() => {console.log('hello from map')}}>
                            <Text>hello</Text>
                        </Callout>
                    </MapMarker>
                </MapView>
            </View>
        )
    }
}