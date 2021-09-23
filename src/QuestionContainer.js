import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import data from "./data";
import MarksModal from "./MarksModal";

export default function App() {
  const [questions] = useState(data);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(undefined);
  const [currentAnswer, setCurrentAnswer] = useState(undefined);
  const [marks, setMarks] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const loadQuestion = (questionId) => {
    var question = questions.filter((x) => x.id === questionId)[0];
    setCurrentAnswer(undefined);
    setCurrentQuestion(question);
  };

  const submitAnswer = () => {
    if (currentQuestionId !== questions.length) {
      checkAnswer();
      setCurrentQuestionId(currentQuestionId + 1);
    } else {
      checkAnswer();
      setModalVisible(true);
    }
  };

  const checkAnswer = () => {
    if (currentQuestion.answer === currentAnswer) {
      setMarks(marks + 1);
    }
  };

  useEffect(() => {
    loadQuestion(currentQuestionId);
  }, [currentQuestionId]);

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {currentQuestion === undefined ? "" : currentQuestion.question}
        </Text>
      </View>
      <View style={styles.answerParent}>
        {currentQuestion !== undefined &&
          currentQuestion.answers.map((x, i) => {
            return (
              <TouchableOpacity
                style={[
                  styles.answerContainer,
                  {
                    backgroundColor:
                      x.answerId === currentAnswer ? "#5f9ea0" : "#d9f3ff",
                  },
                ]}
                onPress={() => {
                  setCurrentAnswer(x.answerId);
                }}
                key={i}
              >
                <Text style={styles.answerText}>{x.optionText}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <View style={{ height: "10%" }}>
        <Button
          onPress={submitAnswer}
          title="Submit"
          color="#841584"
          disabled={currentAnswer === undefined ? true : false}
        />
      </View>
      <MarksModal
        isVisible={modalVisible}
        questionCount={questions.length}
        correctAnswers={marks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
    width: "95%",
    alignItems: "center",
  },
  questionContainer: {
    width: "100%",
    alignItems: "center",
    padding: "5%",
    backgroundColor: "#08038c",
    borderRadius: 20,
  },
  questionText: {
    fontSize: 19,
    color: "white",
  },
  answerParent: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  answerContainer: {
    width: "95%",
    backgroundColor: "#d9f3ff",
    borderRadius: 70,
    padding: "5%",
    alignItems: "center",
  },
  answerText: {
    fontSize: 17,
  },
});
