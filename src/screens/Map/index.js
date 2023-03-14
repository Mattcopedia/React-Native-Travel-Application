import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';


const tokenmapbox = "pk.eyJ1Ijoib2ZlaW11biIsImEiOiJjbDdocDBia2cwZ2xuM3dzYWI2OGFyZmp1In0.rr7Z0vJJRAA6Wund5yDKdw"
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(tokenmapbox);


const Map = ({ navigation, route }) => {
    const { item } = route?.params || {};


    const onBack = () => {
        navigation.goBack();
    };
  
    const coordinateExample = [item?.coordinates?.lon,item?.coordinates?.lat] 

    return (
        <View style={styles.container}>
           
           <MapboxGL.MapView style={styles.map}  showUserLocation={true}
        userTrackingMode={1}>
            <MapboxGL.Camera zoomLevel={8} centerCoordinate={coordinateExample} />
            <MapboxGL.PointAnnotation id="point" title='Test' coordinate={coordinateExample} />
           </MapboxGL.MapView> 
           
         


            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Image source={require('../../assets/back.png')} style={styles.back} />
                </TouchableOpacity>

                <Text style={styles.title}>{`${item?.name}, ${item?.city}`}</Text>
            </View>
        </View>
    );
};

export default React.memo(Map);



