import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

const VotingDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId) => {
    setSelectedOption(optionId);
    setHasVoted(true);
    // Make API call to submit the vote
  };

  const renderCandidates = () => {
    const candidates = [
      {
        id: 1,
        name: "Candidate 1",
        image: require("../../../assets/qr-code.png"),
        description: "Description 1",
        votes: 10,
      },
      {
        id: 2,
        name: "Candidate 2",
        image: require("../../../assets/qr-code.png"),
        description: "Description 2",
        votes: 7,
      },
      {
        id: 3,
        name: "Candidate 3",
        image: require("../../../assets/qr-code.png"),
        description: "Description 3",
        votes: 5,
      },
    ];

    return (
      <View style={styles.candidatesContainer}>
        {candidates.map((candidate) => (
          <TouchableOpacity
            key={candidate.id}
            style={[
              styles.candidateButton,
              selectedOption === candidate.id && styles.selectedCandidateButton,
            ]}
            disabled={hasVoted}
            onPress={() => handleVote(candidate.id)}
          >
            <Image source={candidate.image} style={styles.candidateImage} />
            <View style={styles.candidateInfo}>
              <Text style={styles.candidateName}>{candidate.name}</Text>
              <Text style={styles.candidateDescription}>
                {candidate.description}
              </Text>
              <Text
                style={styles.votingCount}
              >{`${candidate.votes} Votes`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Presidential Election</Text>
      </View>
      <View style={styles.content}>
        {!hasVoted ? (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsText}>
              Select your preferred candidate:
            </Text>
            {renderCandidates()}
          </View>
        ) : (
          <View style={styles.acknowledgementContainer}>
            <Text style={styles.acknowledgementText}>Thanks for voting!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  appBar: {
    backgroundColor: "#000080",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  candidatesContainer: {
    marginTop: 10,
  },
  candidateButton: {
    backgroundColor: "#004080",
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#002060",
  },
  candidateImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  candidateInfo: {
    flex: 1,
    marginLeft: 10,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  candidateDescription: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 5,
  },
  votingCount: {
    fontSize: 12,
    color: "#FFF",
  },
  acknowledgementContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  acknowledgementText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
//please customize
export default VotingDashboard;
