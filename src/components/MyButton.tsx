import { IonButton, IonFooter } from "@ionic/react";
import { useHistory } from "react-router-dom";

const history = useHistory();

function MyButton() {
  return (
    <IonFooter>
      <IonButton expand="full">Weiter</IonButton>
    </IonFooter>
  );
}

export default MyButton;
