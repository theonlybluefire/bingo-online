import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import Grid from "../components/Grid";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
      <Grid />
    </IonPage>
  );
};

export default Home;
