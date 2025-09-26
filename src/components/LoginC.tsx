import { IonInput, IonInputPasswordToggle } from "@ionic/react";

function LoginC() {
  return (
    <>
      <IonInput label="E-Mail"></IonInput>
      <IonInput type="password" label="Password">
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>
    </>
  );
}

export default LoginC;
