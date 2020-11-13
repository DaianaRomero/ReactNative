import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Image, Button, ListItem } from 'react-native';



export default class App extends Component  {


  state = {

    response: [],
    estado: null

   }
    
    handlerBuscar(t){
    
      var buscar = t.toLowerCase();
      this.setState({value : buscar });
    
    }
    


consultarApiRandom(){

  var aleatorio=Math.round(Math.random()*100)+1;
    axios.get("https://pokeapi.co/api/v2/pokemon/"+ aleatorio
    )
    .then(
      dato => {
        console.log( dato.data);
  
        this.setState({
          response: dato.data,
          estado: true
         
        })
        console.log(this.state)
   })


}




consultarApi(){

  var buscar = this.state.value;
 
 if(buscar === null ){
  axios.get("https://pokeapi.co/api/v2/pokemon/"
  )
  .then(
    dato => {
      console.log( dato.data);

      this.setState({
        response: dato.data,
        estado: true
        
      })
      console.log(this.state)

    });

 
  
  }else{

  axios.get("https://pokeapi.co/api/v2/pokemon/"+buscar)
  .then(
    dato => {
      console.log( dato.data);

      this.setState({
        response: dato.data,
        estado: true
       
      })
      console.log(this.state)

    });
  }
}



  
render(){


  if(this.state.estado !== true){
    return (
      <View style={styles.App}>
        
        <Image style={{width: 350, height: 125}} source={ require('../proyecto/pokemon.png') }  />
       
        <View style={styles.separator} >
        <Text style={styles.App2}>¡Elige tu pokemon!</Text>
        <View  style={{flexDirection: "row"}} >
        
        <View style={{flex:1}}>
          <TextInput  style={{ height: 35, borderColor: 'gray', borderWidth: 1, margin:5}}    onChangeText={this.handlerBuscar.bind(this)}/>
          </View>
          <View style={{flex:0.5}}>
          <Button type="button" title="Buscar" onPress={this.consultarApi.bind(this)}/>
          </View>
        </View>
        </View>
        <View style={styles.separator2} >
        
            <Text style={styles.App2} >¡Déjalo a la suerte!</Text >
      
            <Button  type="button" title="Buscar" onPress={this.consultarApiRandom.bind(this)}/>
                  
       </View>
       

       
      </View>
    );

    }else if(this.state.estado === true) {
    return (
      <View style={styles.App}>

        <View>
        <Image source={ require('../proyecto/pokemon.png') } style={{width: 350, height: 125 }}/>
        </View>
        
      <View style={styles.ApiDatosBusqueda}>
        <Text>Tu pokemon elegido es</Text>

        
        
        <Text>{this.state.response.name}</Text>
        <Image style={{height: 250, width: 250}} source={{uri: this.state.response.sprites.front_default}}/>
         
        <Text>Habilidades:</Text>
        {this.state.response.abilities.map(item => (
                  <Text key={item.ability.name}>
                    {item.ability.name} 
                  </Text>
                ))}

       </View>
       
      </View>
    );
}



}
}
 













const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  App:{
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 25
  },
  App2:{
    
    textAlign: "center",
    marginTop: 50,
    marginBottom: 25
  },
  separator:{
    marginHorizontal:50
  },
  separator2:{
    marginHorizontal:100
  },
  ApiDatosBusqueda:{
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 60
  }
});
