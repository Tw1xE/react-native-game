import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Easing,
} from "react-native";

const SlotGame = () => {
  const [selectedType, setSelectedType] = useState("numbers");
  const [symbols, setSymbols] = useState([0, 0, 0]);
  const [message, setMessage] = useState("");
  const [tokens, setTokens] = useState(1000);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBet, setSelectedBet] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(30, 30, 30, 0.5)"
  );
  const emojiFruits = [
    "🍎",
    "🍊",
    "🍋",
    "🍇",
    "🍉",
    "🍌",
    "🍒",
    "🍓",
    "🥝",
    "🍍",
  ];

  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      setBackgroundColor(newColor);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const spinNumbers = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.7) {
        const sameNumber = Math.floor(Math.random() * 10);
        const newNumbers = [
          sameNumber,
          sameNumber,
          Math.floor(Math.random() * 10),
        ];
        setSymbols(newNumbers);

        if (
          newNumbers[0] === newNumbers[1] &&
          newNumbers[1] === newNumbers[2]
        ) {
          const winAmount = selectedBet * 500;
          setMessage(`Jackpot! You won ${winAmount} tokens.`);
          setTokens((prevTokens) => prevTokens + winAmount);
        } else {
          setMessage("Congratulations! You got at least two similar numbers.");
        }
      } else {
        const newNumbers = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ];
        setSymbols(newNumbers);

        if (
          newNumbers[0] === newNumbers[1] &&
          newNumbers[1] === newNumbers[2]
        ) {
          const winAmount = selectedBet * 50;
          setMessage(`Jackpot! You won ${winAmount} tokens.`);
          setTokens((prevTokens) => prevTokens + winAmount);
        } else {
          setMessage("Unlucky, try again!");
        }
      }

      setTokens((prevTokens) => prevTokens - selectedBet);
      setModalVisible(true);
    }, 1000);
  };
  const spinFruits = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.7) {
        const sameFruit = Math.floor(Math.random() * emojiFruits.length);
        const newFruits = [
          emojiFruits[sameFruit],
          emojiFruits[sameFruit],
          emojiFruits[Math.floor(Math.random() * emojiFruits.length)],
        ];
        setSymbols(newFruits);

        if (newFruits[0] === newFruits[1] && newFruits[1] === newFruits[2]) {
          const winAmount = selectedBet * 50;
          setMessage(`Jackpot! You won ${winAmount} tokens.`);
          setTokens((prevTokens) => prevTokens + winAmount);
        } else {
          setMessage("Congratulations! You got at least two similar fruits.");
        }
      } else {
        const newFruits = [
          emojiFruits[Math.floor(Math.random() * emojiFruits.length)],
          emojiFruits[Math.floor(Math.random() * emojiFruits.length)],
          emojiFruits[Math.floor(Math.random() * emojiFruits.length)],
        ];
        setSymbols(newFruits);

        if (newFruits[0] === newFruits[1] && newFruits[1] === newFruits[2]) {
          const winAmount = selectedBet * 100;
          setMessage(`Jackpot! You won ${winAmount} tokens.`);
          setTokens((prevTokens) => prevTokens + winAmount);
        } else {
          setMessage("Unlucky, try again!");
        }
      }

      setTokens((prevTokens) => prevTokens - selectedBet);
      setModalVisible(true);
    }, 1000);
  };

  const spinReels = () => {
    if (selectedType === "numbers") {
      spinNumbers();
    } else if (selectedType === "fruits") {
      spinFruits();
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View
        style={[styles.slotContainer, { transform: [{ rotate: spin }] }]}
      >
        {selectedType === "numbers"
          ? symbols.map((number, index) => (
              <Text style={styles.number} key={index}>
                {number}
              </Text>
            ))
          : symbols.map((fruit, index) => (
              <Text style={styles.fruit} key={index}>
                {fruit}
              </Text>
            ))}
      </Animated.View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={spinReels}>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              letterSpacing: 15,
              textTransform: "uppercase",
            }}
          >
            Spin
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20 }}>Tokens: {tokens}</Text>
        <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>
          Selected Bet: {selectedBet}
        </Text>
        <TouchableOpacity
          onPress={() => setSelectedBet(10)}
          style={styles.betButton}
        >
          <Text style={[styles.selectedBet, styles.btnUI]}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedBet(50)}
          style={styles.betButton}
        >
          <Text style={[styles.selectedBet, styles.btnUI]}>50</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedBet(100)}
          style={styles.betButton}
        >
          <Text style={[styles.selectedBet, styles.btnUI]}>100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType("numbers")}
          style={styles.typeButton}
        >
          <Text
            style={[
              selectedType === "numbers" ? styles.selectedType : styles.type,
              styles.btnUI,
            ]}
          >
            Numbers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType("fruits")}
          style={styles.typeButton}
        >
          <Text
            style={[
              selectedType === "fruits" ? styles.selectedType : styles.type,
              styles.btnUI,
            ]}
          >
            Fruits
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  slotContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#f5f5f5",
    borderRadius: 8,
    padding: 20,
  },
  number: {
    fontSize: 50,
    marginHorizontal: 10,
    color: "white",
  },
  fruit: {
    fontSize: 50,
    marginHorizontal: 10,
    color: "white",
  },
  controls: {
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  betButton: {
    marginVertical: 5,
  },
  bet: {
    fontSize: 18,
    padding: 5,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    color: "white",
  },
  selectedBet: {
    fontSize: 18,
    padding: 5,
    backgroundColor: "lightblue",
    borderRadius: 5,
    color: "white",
  },
  typeButton: {
    marginVertical: 5,
  },
  type: {
    fontSize: 18,
    padding: 5,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    color: "white",
  },
  selectedType: {
    fontSize: 18,
    padding: 5,
    backgroundColor: "lightblue",
    borderRadius: 5,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
  btnUI: {
    backgroundColor: "#555",
    color: "#f5f5f5",
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 8,
    padding: 10,
  },
});

export default SlotGame;
