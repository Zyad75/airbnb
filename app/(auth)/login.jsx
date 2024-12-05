import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { Link } from "expo-router";

////------- Recuperation du context -----//
import { useContext } from "react";
import { AuthContext } from "../_layout";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { setUserToken } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault(); // sinon reset de mes states et de ma page
    // console.log("submited");
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          password: password,
          email: email,
        }
      );

      alert("Connecté");
      console.log(response.data);
    } catch (error) {
      alert(error.message);
      if (error.response.data.message === "User not found") {
        setErrorMessage("email non répertorié/");
      } else if (error.response.status === 401) {
        setErrorMessage(
          "Vous n'êtes pas autorisé a vous connecter, veuillez verifier votre email/mot de passe"
        );
      } else {
        setErrorMessage(
          "une erreur est survenue veuillez réessayer ulterieurement"
        );
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "white",
      }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center", gap: 40 }}>
        <Image
          resizeMode="contain"
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fYsTmR0-TXLa06mx13LRXBgbNyBgylU3cw&s",
          }}
          style={{ height: 100, width: 120 }}
        ></Image>
        <Text style={{ color: "gray", fontWeight: "bold", fontSize: 20 }}>
          Sign In
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TextInput
          style={{
            height: 44,
            width: "50%",
            borderBottomColor: "red",
            borderBottomWidth: 1,
            marginBottom: 40,
          }}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />

        <TextInput
          style={{
            height: 44,
            width: "50%",
            borderBottomColor: "red",
            borderBottomWidth: 1,
          }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
      </View>
      <View style={{ alignItems: "center", gap: 10 }}>
        <TouchableOpacity style={{}} onPress={handleSubmit}>
          <Text>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/Signup");
          }}
        >
          <Text style={{ color: "gray" }}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
      <StatusBar />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
