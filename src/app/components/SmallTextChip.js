import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

// Theme import
import { Theme } from '../styles/theme'

export default function SmallTextChip({text, color}) {

    let bgColor = Theme.colors.primary
    if(color){
        bgColor = color
    }

    return(
        <Text style={[styles.text, styles.chip,{borderColor:bgColor, color:bgColor}]}>{text}</Text>
    )
}

// Dedicated styling
const styles = StyleSheet.create({
    chip: {
        paddingVertical: 2,
        paddingHorizontal: 4,
        marginVertical: 2,
        marginEnd: 4,
        borderRadius: 2,
        borderWidth: 1
    },
    text: {
        fontSize: 10,
        fontFamily: 'interSemiBold',
        textTransform: 'uppercase',
        overflow: 'hidden',
    }
})