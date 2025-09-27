import { IonButton, IonInput, IonInputPasswordToggle } from "@ionic/react";

function LoginC() {
  return (
    <>
      <IonInput label="E-Mail"></IonInput>
      <IonInput type="password" label="Password">
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>

      <IonButton expand="full">Login</IonButton>
    </>
  );
}

export default LoginC;
