import { IonButton, IonFooter } from "@ionic/react";
import "./MyButton.css";

function MyButton() {
  return (
    <IonFooter>
      <IonButton expand="full">Weiter</IonButton>
    </IonFooter>
  );
}

export default MyButton;
