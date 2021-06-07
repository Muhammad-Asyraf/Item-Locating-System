import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'


export default function Separator() {

    let stylesheet = StyleSheet.create({
        separator: {
            opacity: 0.5,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginVertical: 36
        }
    })

    return(
        <View style={stylesheet.separator}></View>
    )

}