import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import { Path, Svg, SvgXml } from 'react-native-svg';
import { storage } from '../utils/storage';



const CustomHeader = (title) => {
    const navigation = useNavigation();
   
    const [showModal, setShowModal] = useState(false);
    const handleLogout = () => {
        setShowModal(false)
        storage.clearAll()
        navigation.dispatch();
        navigation.navigate('Login')
    };

    return (
        <View style={styles.header}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <Button onPress={() => { setShowModal(false) }} title="Cancel" color="#999" />
                        <Button onPress={handleLogout} title="Logout" />
                    </View>

                </View>
            </Modal>
            
            <TouchableOpacity onPress={() => { setShowModal(true) }} style={styles.logoutButton}>

                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <Path fill-rule="evenodd" d="M4 5a3 3 0 013-3h10a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5zm10 1V4H7v2h7zm-5 9v6h2v-6H9zm4 0v6h2v-6h-2z" clip-rule="evenodd" fill="#FFFFFF" />
                </Svg>

            </TouchableOpacity>
        </View>);

};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        padding: 10,
        width: '100%',
    },
    logoutButton: {
        padding: 5,
    },
    modalView: {
        marginTop: 'auto',
        borderRadius: 20,
        backgroundColor: 'black',
        padding: 35,
        flexDirection: 'column',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


export default CustomHeader;
