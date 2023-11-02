import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function UserForm({ route, navigation }) {
  let editando = route.params ? true : false;
  const [aluno, setAluno] = useState(route.params ? route.params : {});

  const gerencia = async () => {
    try {
      if (editando) {
        // Modo de edição, atualizar o documento existente
        await updateDoc(doc(db, "users", aluno.id), {
          nome: aluno.nome,
          email: aluno.email,
          nota1: aluno.nota1,
          nota2: aluno.nota2,
        });
        alert("Usuário atualizado");
      } else {
        // Modo de criação, adicionar um novo documento
        await addDoc(collection(db, "users"), {
          nome: aluno.nome,
          email: aluno.email,
          nota1: aluno.nota1,
          nota2: aluno.nota2,
        });
        alert("Usuário criado");
      }

      navigation.navigate("UserList", aluno);
    } catch (e) {
      alert("Erro ao salvar o aluno!", "Verifique se preencheu todos os dados.");
      console.error("Deu erro: ", e);
    }
  };

  return (
    <View style={style.form}>
      <Text>Nome</Text>
      <TextInput
        style={style.input}
        onChangeText={(nome) => setAluno({ ...aluno, nome })}
        placeholder="Informe o nome"
        value={aluno.nome}
      />

      <Text>E-mail</Text>
      <TextInput
        style={style.input}
        onChangeText={(email) => setAluno({ ...aluno, email })}
        placeholder="Informe o e-mail"
        value={aluno.email}
      />

      <Text>Nota Semestre 1</Text>
      <TextInput
        style={style.input}
        onChangeText={(nota1) => setAluno({ ...aluno, nota1 })}
        placeholder="Informe a nota 1"
        value={aluno.nota1}
        keyboardType="numeric"
      />

      <Text>Nota Semestre 2</Text>
      <TextInput
        style={style.input}
        onChangeText={(nota2) => setAluno({ ...aluno, nota2 })}
        placeholder="Informe a nota 2"
        value={aluno.nota2}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={() => gerencia()} />
    </View>
  );
}

const style = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 5,
    padding: 10,
  },
});
