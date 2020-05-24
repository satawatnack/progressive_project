import firebase from 'firebase'

var firebaseConfig = {
}

firebase.initializeApp(firebaseConfig)
const db = firebase.database()
const auth = firebase.auth()
const storage = firebase.storage()
const currentUser = auth.currentUser

export {
    db,
    auth,
    storage,
    currentUser
}