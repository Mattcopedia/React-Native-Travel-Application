import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const AttractionCard = ({ imageSrc, title, subtitle, onPress, style, id }) => {
    return (
        <View key={id}>
        <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
            <Image style={styles.image} source={{ uri: imageSrc }} />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.row}>
                <Image style={styles.icon} source={require('../../assets/location.png')} />
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity> 
        </View>   
    );
};

export default React.memo(AttractionCard);
