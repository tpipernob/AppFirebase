import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Button,
    Alert,
  } from "react-native";
  
  import { useState } from "react";
  
  import { deleteDoc, doc } from "firebase/firestore";
  import { db } from "./firebase";
  
  export default function UserDetails(props) {
    const [aluno, setAluno] = useState(
      props.route.params ? props.route.params : {}
    );
  
    const calculaMedia = (aluno) => {
      return parseInt((parseInt(aluno.nota1) + parseInt(aluno.nota2)) / 2);
    };
  
    const situacao = (aluno) => {
      const media = calculaMedia(aluno);
  
      if (media >= 70) {
        return "Aprovado";
      } else {
        return "Reprovado";
      }
    };
  
    const handleExcluirAluno = async () => {
      try {
        // Excluir o aluno do Firestore usando o ID do aluno
        await deleteDoc(doc(db, "users", aluno.id));
        Alert.alert("Aluno excluído com sucesso");
        props.navigation.navigate("UserList", aluno);
      } catch (error) {
        console.error("Erro ao excluir aluno: ", error);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textoPadrao}>Nome: {aluno.nome}</Text>
        <Text style={styles.textoPadrao}>Email: {aluno.email}</Text>
        <Text style={styles.textoPadrao}>Nota Semestre 1: {aluno.nota1}</Text>
        <Text style={styles.textoPadrao}>Nota Semestre 2: {aluno.nota2}</Text>
        <Text style={styles.textoPadrao}>Média: {calculaMedia(aluno)}</Text>
        <Text style={[styles.textoPadrao, styles.textoDestaque]}>
          Sitaução: {situacao(aluno)}
        </Text>
        <View style={styles.fixToText}>
          <Button
            title="Editar"
            onPress={() => props.navigation.navigate("UserForm", aluno)}
          />
          <Text> </Text>
          <Button
            title="Excluir"
            onPress={() =>
              Alert.alert("Confirmação", "Deseja realmente excluir este aluno?", [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => handleExcluirAluno() },
              ])
            }
            color="red"
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
    textoPadrao: {
      fontSize: 20,
      padding: 10,
    },
    textoDestaque: {
      fontWeight: "bold",
    },
    botao: {
      margin: 10,
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "flex-start",
      margin: 10,
    },
  });
  