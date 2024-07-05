import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View,SafeAreaView,ScrollView,Text,Keyboard} from "react-native";
import COLORS from "../../conts/colors";
import Input from "../components/input";
import Button from "../components/Button";
import Loader from "../components/Loader";

const RegistrationScreen =({navigation})=>{
    const [inputs,setInputs]=React.useState({
        email:'',
        fullname:'',
        phone:'',
        password:'',
    });
    const [errors,setErrors]=React.useState({});
    const [loading,setLoading]=React.useState(false);
    const validate=()=>{
        Keyboard.dismiss();
        let valid=true;
        if(!inputs.email){
            handleError('Please enter email','email');
            valid=false;
        }
        else if(!inputs.email.match(/\S+@\S+\.\S+/)){
            handleError('Please enter valid email','email');
            valid=false;
        }
        if(!inputs.fullname){
            handleError('Please enter fullname','fullname');
            valid=false;
        }
        if(!inputs.phone){
            handleError('Please enter phone','phone');
            valid=false;
        }
        if(!inputs.password){
            handleError('Please enter password','password');
            valid=false;
        }
        else if(inputs.password.length <5){
            handleError('Minimum password length is 5','password');
            valid=false;
        }
        if(valid){
            register();
        }
    };
    const register =()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
            try {
                AsyncStorage.setItem("user",JSON.stringify(inputs));
                navigation.navigate('LoginScreen');
            } catch (error) {
                Alert.alert('Error','Something went wrong');
            }
        },3000);
    };
    const handleOnChange =(text,input)=>{
        setInputs(prevState =>({...prevState,[input]:text}));
    };
    const handleError =(errorMessage,input)=>{
        setErrors(prevState=>({...prevState,[input]:errorMessage}));
    };
    return(
        <SafeAreaView style={{backgroundColor:COLORS.white,flex:1}}>
            <Loader visible={loading}/>
            <ScrollView contentContainerStyle={{paddingTop:50,paddingHorizontal:20}}>
                <Text style={{color:COLORS.black,fontSize:40,fontWeight:'bold'}}>Register</Text>
                <Text style={{color:COLORS.grey,fontSize:18,marginVertical:10}}>
                    Enter Your Details to Register
                </Text>
                <View style={{marginVertical:20}}>
                    <Input placeholder="Enter your email address" iconName="email-outline" label="Email" error={errors.email} onFocus={()=>{handleError(null,'email'); }} onChangeText={text => handleOnChange(text,'email')}/>
                    <Input placeholder="Enter your Fullname" iconName="account-outline" label="Fullname"  error={errors.fullname} onFocus={()=>{handleError(null,'fullname'); }}onChangeText={text => handleOnChange(text,'fullname')}/>
                    <Input keyboardType='numeric' placeholder="Enter your Phone Number" iconName="phone-outline" label="Phone Number"  error={errors.phone} onFocus={()=>{handleError(null,'phone'); }}onChangeText={text => handleOnChange(text,'phone')}/>
                    <Input placeholder="Enter your Password" iconName="lock-outline" label="Password"  error={errors.password} onFocus={()=>{handleError(null,'password'); }} onChangeText={text => handleOnChange(text,'password')} password />
                    <Button title='Register' onPress={validate}/>
                    <Text onPress={()=>navigation.navigate("LoginScreen")}
                    style={{color:COLORS.black,textAlign:'center',fontSize:16,fontWeight:'bold'}}>Alreay have account ? Login</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default RegistrationScreen;