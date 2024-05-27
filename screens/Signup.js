import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { base_url } from '../constant';
import { storage } from '../utils/storage';


const SignupScreen = () => {
  const navigation=useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formValidationError, setFormValidationError] = useState(false)
  const [passwordError,setPasswordError]=useState(false)
  const [emailFormatError,setEmailFormatError]=useState(false)

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleSignUp=async()=>{
    setEmailFormatError(false)
    setFormValidationError(false)
    setPasswordError(false)
    if(!email || !password ||!confirmPassword || !name)
      {
        setFormValidationError(true);
        return;
      }
    if(!isValidEmail(email))
      {
        setEmailFormatError(true)
        return;
      }
    if(confirmPassword !== password)
      {
        setPasswordError(true)
        return;
      }
      try {
        const res = await axios.post(`${base_url}/user/signup`,{
          name:name,
          email:email,
          password:password
        })
        if(res.data)
          {
            console.log(res.data.token)
            
            storage.set('token',res.data.token)
            storage.set('name',res.data.data.name)
            storage.set('email',res.data.data.email)
            navigation.dispatch()
            navigation.navigate('Home')
          }
        console.log(res.data)
      } catch (error) {
        console.log(error.response)
        Toast.show({
          type:'error',
          text1:error?.response?.data?.message
         })
      }
    
  }

  return (
    
    <View style={styles.mainscreen}>
      <Toast/>
      <View style={styles.textInput}>
        <Svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <Path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
        </Svg>

        <TextInput
          value={name}
          placeholder='Name'
          style={styles.inputbox}
          onChangeText={setName}
        />
      </View>
      {formValidationError && name=='' &&
      <Text style={{color:'red',width:'80%'}}>Please Enter Name
      </Text>
      }
      <View style={styles.textInput}>
        <Svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <Path d="M20.25 4H3.75A1.75 1.75 0 0 0 2 5.75v12.5A1.75 1.75 0 0 0 3.75 20h16.5A1.75 1.75 0 0 0 22 18.25V5.75A1.75 1.75 0 0 0 20.25 4zM20.5 6.5v.379l-8.25 5.175-8.25-5.175V6.5h16.5zm-16.5 10.5v-8.563l7.817 4.912a.75.75 0 0 0 .866 0L20.5 8.437V17h-16.5z" />
        </Svg>
        <TextInput
          value={email}
          placeholder='Email'
          style={styles.inputbox}
          onChangeText={(text)=>{setEmail(text);setEmailFormatError(false)}}
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

      <View style={styles.textInput}>
        <Svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <Path d="M12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-3-3h6v-1h-6v1z" />
        </Svg>
        <TextInput
          value={confirmPassword}
          placeholder='Confirm Password'
          secureTextEntry={true}
          style={styles.inputbox}
          onChangeText={setConfirmPassword}
        />
      </View>
      {formValidationError && confirmPassword=='' &&
        <Text style={{color:'red',width:'80%'}}>Please Enter Confirm Password
        </Text>
        }
      {passwordError && confirmPassword!==password &&
        <Text style={{color:'red',width:'80%'}}> Password Does not Match
        </Text>
        }

      <Pressable style={styles.sendButton} onPress={handleSignUp}>
        <LinearGradient
          colors={['#A6FFAF', '#7EFFFF']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>SIGNUP</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={{marginTop:20}} onPress={()=>{navigation.navigate('Login')}} >
        <Text style={{borderBottomWidth:1,borderColor:'white'}}>Already Have Account? Click Here</Text>
      </Pressable>
    </View>
  )
}

export default SignupScreen

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