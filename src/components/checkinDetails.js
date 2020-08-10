import React from 'react'
import {ScrollView,ImageBackground,Text, View, Image , StyleSheet} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';


export default checkinDetails =({route})=>{
    const {entry} = route.params
    return(
<View style = {styles.format}>
    <ImageBackground source={require('../../assets/splash_panel.png')} style = {styles.background}>
    <View style = {styles.main}>
        <View style = {styles.calendar}>
            <View style = {styles.toggle}><Text style = {styles.text}>{entry.date}</Text></View>
            <View style = {styles.container}>
                <View style = {styles.upper}>
                    <Text style = {styles.title}>Today I'm Feeling {entry.mood}</Text>
                    <Image source = {require('../../assets/Scared.png')}/>
                    <Text numberOfLines = {40} style = {styles.journal}>{entry.journal}</Text>
                </View>

                <View style = {styles.lower}>
                    <Image source = {require('../../assets/banner.png')}/>
                    <View style = {styles.activities}>
                        <TouchableOpacity style = {styles.option}>
                            <Text>Activity 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.option}>
                            <Text>Activity 2</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    </View>
    </ImageBackground>
</View>


    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    upper:{
        display:'flex',
        width: '90%',
        //borderWidth: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    journal:{
        width:320,
        height:180,
        borderWidth:1,
        marginTop:20,
        fontSize:14,
        borderColor:'#C5C5C5',
        borderRadius: 6,
        padding: 10,
        fontWeight:'500',

    },
    title: {
        fontSize:18,
        fontWeight:'500',
        marginBottom:20
    },
    lower:{
        //borderWidth:1,
        marginTop:30,
        width:'100%'
    },
    activities:{
        marginTop:20,
        //borderWidth:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    option:{
        width:155,
        height:118,
        borderWidth:1,

    },
    format:{
        padding: 0,
    },

    background:{
        width: '100%',
        height: '100%'
    },
    main: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
      },
    calendar:{
        width:'90%',
        height:'100%',
        marginTop:'10%',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    toggle:{
        height: '12%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#873E25',
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    text: {
        fontSize: 20,
        color: 'white'
    },

})