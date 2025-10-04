import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useRef, useState } from "react";
import { UserService } from "../services/FirebaseService";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const [isValid, setIsValid] = useState<boolean>();
  const router = useIonRouter();

  const error = (event: Event) => {
    if (
      String(emailRef.current?.value).match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const isNotEmpty = (email: string, password: string) => {
    if (email != "") {
      if (password != "") {
        try {
          UserService.login(email, password);
          router.push("/setPassword", "forward");
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      console.log("embty");
      setIsValid(false);
    }
  };

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
        <IonInput
          className={`${isValid && "ion-valid"} ${
            isValid === false && "ion-invalid"
          } ion-touched`}
          ref={emailRef}
          id="email"
          label="E-Mail"
          errorText="Überprüfe die Email adresse"
          onIonInput={(event) => error(event)}
        ></IonInput>
        {/*  */}
        <IonInput type="password" ref={passwordRef} label="Password">
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>
        {/*  */}
        <IonButton
          onClick={() =>
            isNotEmpty(
              String(emailRef.current?.value).trim(),
              String(passwordRef.current?.value).trim()
            )
          }
        >
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
