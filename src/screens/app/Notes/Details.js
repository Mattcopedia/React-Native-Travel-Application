import { View, Text, SafeAreaView, ScrollView, Alert, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { setToUpdate } from '../../../store/tasks';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import styles from './styles';
import Input from '../../../components/Input';

const Details = ({ route }) => {

    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [noteText, setNoteText] = useState(route.params.item?.note);
    const [noteTitle, setNoteTitle] = useState(route.params.item?.title);

    useEffect(() => {
        if (isFocused) {
            // Update the state with new route params
            setNoteText(route.params.item?.note);
            setNoteTitle(route.params.item?.title);
        }
    }, [isFocused, route.params]);



    const handleBack = () => {
        navigation.navigate("Notes");
    };



    const handleUpdate = () => {
        if (noteText.length > 0 && noteTitle.length > 0) {
            firestore()
                .collection('Notes')
                .doc(route.params.item?.uid)
                .update({
                    title: noteTitle,
                    note: noteText,
                })
                .then(() => {
                    dispatch(setToUpdate());
                    navigation.navigate("Notes")
                }).catch((error) => {
                    Alert.alert(error)
                })
        }
    };


    const handleDelete = () => {
        firestore()
            .collection('Notes')
            .doc(route.params.item?.uid)
            .delete()
            .then(() => {
                console.log("Note Deleted!")
                dispatch(setToUpdate());
                navigation.navigate("Notes")
            });
    }


    return (
        <SafeAreaView>
            <Header title="Edit Notes" />

            <ScrollView>
                <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
                    <Image
                        style={styles.backIcon}
                        source={require('../../../assets/back.png')}
                    />
                </Pressable>

                <View>
                    <Input
                        value={noteTitle}
                        onChangeText={(text) => setNoteTitle(text)}
                        outlined
                        placeholder="Title"
                    />
                    <Input
                        value={noteText}
                        onChangeText={(text) => setNoteText(text)}
                        outlined
                        placeholder="Note"
                        multiline={true}
                        numberOfLines={15}

                    />
                </View>
                <View>
                    <Button style={styles.button} type="blue" onPress={handleUpdate}>
                        Update
                    </Button>
                    <Button style={styles.button} del="red" onPress={handleDelete}>
                        Delete
                    </Button>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Details