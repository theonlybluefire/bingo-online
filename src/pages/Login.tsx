import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Email from "../components/Email";
import MyButton from "../components/MyButton";
import Passwort from "../components/Passwort";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lifaka Bingo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <Passwort />
        <Email />
      </IonContent>
      <MyButton />
    </IonPage>
  );
};

export default Login;
