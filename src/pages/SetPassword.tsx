import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";

const SetPassword: React.FC = () => {
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const passwordRef2 = useRef<HTMLIonInputElement>(null);

  const [validPassword, setValidPassword] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Set Password</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        scrollY={false}
        scrollX={false}
        className="ion-padding"
      >
        <IonInput
          placeholder="Enter your new password"
          type="password"
          onKeyUp={() => {
            setValidPassword(
              passwordRef.current?.value == passwordRef2.current?.value ||
                (!passwordRef.current?.value && !passwordRef2.current?.value)
                ? true
                : false
            );
          }}
          ref={passwordRef}
        >
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>
        <IonInput
          placeholder="Enter your password again"
          type="password"
          onKeyUp={() => {
            setValidPassword(
              passwordRef.current?.value == passwordRef2.current?.value ||
                (!passwordRef.current?.value && !passwordRef2.current?.value)
                ? true
                : false
            );
          }}
          ref={passwordRef2}
          className={
            validPassword ? "ion-valid ion-touched" : "ion-invalid ion-touched"
          }
          errorText="Passwords do not match"
          helperText=""
        >
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>
      </IonContent>
      <IonFooter>
        <IonButton
          expand="block"
          routerLink="/Home"
          className="ion-padding"
          disabled={!validPassword}
        >
          Continue
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};
export default SetPassword;
