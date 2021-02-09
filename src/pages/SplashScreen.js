import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const SplashScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.pageArea}>
            <Text style={styles.title} >Santri Kita</Text>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    pageArea: {
        height: '100%', width: '100%',
        backgroundColor: '#10B981',
        justifyContent:'center'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 43,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 64,
        color: '#FAFAFA',
    },
})
