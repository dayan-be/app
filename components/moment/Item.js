
import React from 'react';
import {
    Image,
	StyleSheet,
	Text,
	View
} from 'react-native';

export default class MomentItem extends React.Component{
    
    constructor(props) {
        super(props);
    }

    render() {
        const {item} = this.props;
        return (<View style={styles.feed}>
            <View style={styles.avatar} >
                <Image 
                style={{width: 42, height: 42, }}
                source={{uri: item.avatar}}/>
            </View>
            <View style={styles.right}>
                <Text style={styles.username}>{item.user}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <Image style={styles.contentImage} source={{uri: item.image}}></Image>
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    feed: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 10, 
    },
    avatar: {
        backgroundColor: 'white', 
        flex: 1, 
        borderRadius: 10, 
        marginRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    right: {
        flex: 8,
        textAlign: 'left',
    },
    username: {
        color: '#4B9FC0',
        fontSize: 15,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    content: {
        color: '#666666',
        fontSize: 15,
        lineHeight: 24,
    },
    contentImage: {
        width: 170,
        height: 170,
    },

});
