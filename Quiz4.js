import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View, FlatList, StyleSheet, StatusBar } from "react-native";

const Quiz4 = (props) => {
  const [loading,setLoading] = useState(true)
  const [username, setState] = useState('tjhickey724');
  const [text, setText] = useState('');
  const [data,setData] = useState([]);

  const getRepoData = async (username) => {
    try{
      let result = await fetch('https://api.github.com/users/'+ username +'/repos')
      let gdata = await result.json()
      setData(gdata)
      setLoading(false)
    }catch(e){
      console.log(`error in getRepoData: ${JSON.stringify(e)}`)
    }

  }

  useEffect(() => {
    getRepoData(username)
  }, [username]);

  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection:'column'}}>
        <Text style={{flex:1,backgroundColor:'#a3a3a3', fontSize: 32, textAlign:'center'}}>{item['name'].slice(0,10)}
        </Text>
     </View>
  )}

  return (
    <View style={{flexDirection:'column'}}>
      <View style={{flex:2, flexDirection:'column',
      alignItems:'center',justifyContent:'space-around',backgroundColor:'black',}}>
        <Text style={{fontSize:32, color:"red"}}> Github Viewer</Text>
      </View>

      <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:32}}> github Id:</Text>
        <TextInput
          style={{height: 40}}
          placeholder="userid"
          onChangeText={text => {setText(text)}}
        />
      </View>
      <Button
        onPress={() => {
          setState(text)
        }}
        title=<Text style={{color:'blue',}}>
        Show Repositories
        </Text>
        color = 'white'
      />
      <View style={styles.container}>
          <FlatList
        data={data.slice(0,30)}
        renderItem={renderItem}
        keyExtractor={item => item.created_at}
      />
      </View>
      <Text> DEBUGGING </Text>
      <Text> User ID: tjhickey724 </Text>
      <Text> show Reps : true </Text>
      <Text> repos.length = 30</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    justifyContent: 'center',
    marginTop: 10,
  },

});

export default Quiz4;
