import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Database, getDatabase, onValue, ref } from "firebase/database";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getFirestore,
} from "firebase/firestore";

export interface IFirebaseService {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  realtimeDb: Database;
}

export class UserService {
  public static async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FirebaseService.Instance.auth,
        email,
        password
      );

      //TODO: save user data to realtime db

      console.info(
        "UserService: User logged in successfully! User: ",
        userCredential.user
      );
    } catch (error) {
      console.error("UserService: Error while loggin in! Error:", error);
    }
  }

  public static subscribeToUserData(onDataChange: (data: any) => void) {
    const dbRef = ref(
      FirebaseService.Instance.realtimeDb,
      `users/` + FirebaseService.Instance.auth.currentUser?.uid
    );

    onValue(dbRef, (snapshot) => {
      console.debug(
        "UserService: User data changed. New data: ",
        snapshot.val()
      );

      onDataChange(snapshot.val());
    });
  }
}

export class FirestoreService {
  public static async getFirestoreData(
    collectionName: string,
    documentId: string
  ): Promise<DocumentSnapshot<DocumentData, DocumentData>> {
    const result = await getDoc(
      doc(FirebaseService.Instance.firestore, collectionName, documentId)
    );

    return result;
  }
}

export class FirebaseService {
  private static firebaseService: IFirebaseService;

  private constructor() {}

  private static init(): IFirebaseService {
    const firebaseConfig = {
      apiKey: "AIzaSyBz3kPZO1DzwJS8FKVa_VHwPSS9A1yA8cc",
      authDomain: "online-bingo-5f256.firebaseapp.com",
      projectId: "online-bingo-5f256",
      storageBucket: "online-bingo-5f256.firebasestorage.app",
      messagingSenderId: "353320801453",
      appId: "1:353320801453:web:317e1f7a8576078370e224",
    };

    const firebaseApp = initializeApp(firebaseConfig);

    return {
      app: firebaseApp,
      firestore: getFirestore(firebaseApp),
      auth: getAuth(firebaseApp),
      realtimeDb: getDatabase(firebaseApp),
    } as IFirebaseService;
  }

  public static get Instance(): IFirebaseService {
    if (!FirebaseService.firebaseService) {
      FirebaseService.firebaseService = this.init();
    }

    return FirebaseService.firebaseService;
  }
}
