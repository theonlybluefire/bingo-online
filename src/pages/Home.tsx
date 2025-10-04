import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { podiumOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { fetchWords } from "../utils/FetchWords";
import "./Home.css";

const Home: React.FC = () => {
  const [toastText, setToastText] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [disabledWords, setDisabledWords] = useState<string[]>([]);

  useEffect(() => {
    generateWords();
  }, []);

  const chunkWords = (words: string[]): string[][] => {
    let chunkedWords: string[][] = [];

    if (words.length != 4 * 4) {
      console.error(
        "Home: chunkWords: words array must contain exactly 16 elements."
      );
      return [];
    }

    for (let i = 0; i < words.length; i += 4) {
      chunkedWords.push(words.slice(i, i + 4));
    }

    return chunkedWords;
  };

  function handleBingo() {
    setToastText("BINGO!");

    //TODO: implement
  }

  const generateWords = async () => {
    let fetchedWords = await fetchWords();
    if (fetchedWords.length < 16) {
      console.error("Home: Not enough words fetched.");
      return;
    }

    let generatedWords: string[] = [];
    for (let i = 0; i < 16; i++) {
      let randomIndex = Math.floor(Math.random() * fetchedWords.length);
      let word = fetchedWords[randomIndex];

      if (generatedWords.includes(word)) {
        i--;
        continue;
      }

      generatedWords.push(word);
      console.log(generatedWords);
    }

    setWords(generatedWords);
  };

  const handleWordClick = (word: string) => {
    //execute webservice
    setDisabledWords((prev) => [...prev, word]);

    setTimeout(() => {
      generateWords();
      setDisabledWords([]);
    }, 3000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonChip color={"primary"} slot="start">
            <IonIcon icon={podiumOutline}></IonIcon>
            <IonLabel>0</IonLabel>
          </IonChip>
          <IonAvatar
            slot="end"
            style={{ margin: "10px", height: "40px", width: "40px" }}
          >
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed>
          {chunkWords(words).map((row: string[], rowIndex: number) => (
            <IonRow key={rowIndex}>
              {row.map((word: string, colIndex: number) => (
                <IonCol size="3" key={colIndex}>
                  <IonCard
                    disabled={disabledWords.includes(word)}
                    button
                    onClick={() => handleWordClick(word)}
                    style={{ height: "100%" }}
                  >
                    <IonCardHeader>
                      <IonCardTitle>{word}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>

        <IonToast
          isOpen={toastText != ""}
          message={toastText}
          duration={5000}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default Home;
