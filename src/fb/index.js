import firebase from 'firebase/compat/app'; //v9
import 'firebase/compat/storage'; //v9

firebase.initializeApp({
  apiKey: "AIzaSyB4K1hRQPFB5_WlLXf9q1O3sCZj42cRVxE",
  authDomain: "booking-app-9228f.firebaseapp.com",
  projectId: "booking-app-9228f",
  storageBucket: "booking-app-9228f.appspot.com",
  messagingSenderId: "567812061424",
  appId: "1:567812061424:web:e8caa15c5329967c28aa35"
});
export const storage = firebase.storage();

 export const uploadImage =async (image) => {
  const uploadTask = await storage.ref(`images/${image.name}`).put(image);
  await uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
     return {error:error}
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          return {url:url};
        });
    }
  );
}