import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCNtXlRX0F3WRdtqTHqkjScvO9Tu-M0d1Q",
    authDomain: "progressiveproj.firebaseapp.com",
    databaseURL: "https://progressiveproj.firebaseio.com",
    projectId: "progressiveproj",
    storageBucket: "progressiveproj.appspot.com",
    messagingSenderId: "741379373687",
    appId: "1:741379373687:web:26d888271dec148f74e472",
    measurementId: "G-F6L64L2FT7"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.database()
const auth = firebase.auth()
const currentUser = auth.currentUser

export {
    db,
    auth,
    currentUser
}