import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase.js';

const OAuth = () => {
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch (error) {
            console.log('Could not sign in with Google', error)
        }
     }
  return (
    <button type="button" onClick={handleGoogleClick} className='bg-red-700 p-2 rounded-lg text-white hover:opacity-95 uppercase'>
        Continue with Google
    </button>
  )
}

export default OAuth