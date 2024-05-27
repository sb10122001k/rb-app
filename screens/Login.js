import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { base_url } from '../constant';
import { storage } from '../utils/storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';


const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formValidationError, setFormValidationError] = useState(false)
  const [emailFormatError,setEmailFormatError]=useState(false)

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async() =>{
    setEmailFormatError(false)
    setFormValidationError(false)
    if(!email || !password)
      {
        setFormValidationError(true)
        return;
      }
    if(!isValidEmail(email))
      {
        setEmailFormatError(true)
        return;
      }
    try {
      const res = await axios.post(`${base_url}/user/login`,{
        email:email,
        password
      })
      if(res.status)
        {
          console.log(res.data.token)
            Toast.show({
              type:'success',
              text1:"Login Successfull"
            })
            storage.set('token',res.data.token)
            storage.set('name',res.data.data.name)
            storage.set('email',res.data.data.email)
            navigation.dispatch()
            navigation.navigate('Home')
        }
    } catch (error) {
     console.log('error',error?.response?.data) 
     Toast.show({
      type:'error',
      text1:error?.response?.data?.message
     })
    }
  }
  useEffect(()=>{
    const token = storage.getString('token')
    if(token)
      {
        navigation.navigate('Home')
      }
  },[])

  return (
    <View style={styles.mainscreen}>
      <Toast/>
      <View style={styles.textInput}>
        <Svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <Path d="M20.25 4H3.75A1.75 1.75 0 0 0 2 5.75v12.5A1.75 1.75 0 0 0 3.75 20h16.5A1.75 1.75 0 0 0 22 18.25V5.75A1.75 1.75 0 0 0 20.25 4zM20.5 6.5v.379l-8.25 5.175-8.25-5.175V6.5h16.5zm-16.5 10.5v-8.563l7.817 4.912a.75.75 0 0 0 .866 0L20.5 8.437V17h-16.5z" />
        </Svg>
        <TextInput
          value={email}
          placeholder='Email'
          style={styles.inputbox}
          onChangeText={setEmail}
        />
      </View>
      {formValidationError && email=='' &&
        <Text style={{color:'red',width:'80%'}}>Please Enter Email
        </Text>
        }
        {emailFormatError  &&
          <Text style={{color:'red',width:'80%'}}>Please Enter Valid Email
          </Text>
        }

      <View style={styles.textInput}>
        <Svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <Path d="M12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-1-3h2v-1h-2v1z" />
        </Svg>
        <TextInput
          value={password}
          placeholder='Password'
          secureTextEntry={true}
          style={styles.inputbox}
          onChangeText={setPassword}
        />
      </View>
      {formValidationError && password=='' &&
        <Text style={{color:'red',width:'80%'}}>Please Enter Password
        </Text>
        }   

      <Pressable style={styles.sendButton} onPress={handleLogin}>
        <LinearGradient
          colors={['#A6FFAF', '#7EFFFF']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={{marginTop:20}} onPress={()=>{navigation.navigate('Signup')}} >
        <Text style={{borderBottomWidth:1,borderColor:'white'}}>Don't Have Account? Click Here</Text>
      </Pressable>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainscreen: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  textInput: {
    borderColor: 'white',
    borderWidth: 1,
    width: '80%',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  inputbox: {
    width: '100%'
  },
  sendButton: {
    alignSelf: 'center',
    height: 40,
    marginTop: 40,
    width: 150,
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
})