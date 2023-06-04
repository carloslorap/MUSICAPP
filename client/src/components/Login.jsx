import React, { useEffect } from 'react'
import { app } from '../config/firebase.config'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {FcGoogle} from 'react-icons/fc'
import {useNavigate} from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { validateUser } from '../api'
const Login = ({setAuth}) => {

   const firebaseAuth =getAuth(app);
   const provider =new GoogleAuthProvider();
   const navigate =useNavigate()
    const [{user}, dispatch]=useStateValue();


  const loginWithGoogle =async()=>{
    await signInWithPopup(firebaseAuth,provider).then((userCred)=>{
    if(userCred){
      setAuth(userCred)
      window.localStorage.setItem("auth","true")

      firebaseAuth.onAuthStateChanged((userCred)=>{
       if(userCred){
        userCred.getIdToken().then((token)=>{
         // console.log(token)
          validateUser(token).then((data)=>{
            dispatch({
              type:actionType.SET_USER,
              user:data
            })
          })
        })
        navigate('/',{replace:true})
       }else{
        setAuth(false);
        dispatch({
          type:actionType.SET_USER,
          user:null
        })
        navigate('/login')
       }
      })
    }else{

    }
    }) 
  }

  useEffect(()=>{
    if (window.localStorage.getItem("auth")==="true") {
      navigate('/',{relative:true})
    }
  },[])

 
  return (
    <div className='relative w-screen h-screen '>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#B2F5EA" fill-opacity="1" d="M0,192L17.1,160C34.3,128,69,64,103,58.7C137.1,53,171,107,206,138.7C240,171,274,181,309,202.7C342.9,224,377,256,411,240C445.7,224,480,160,514,154.7C548.6,149,583,203,617,197.3C651.4,192,686,128,720,96C754.3,64,789,64,823,58.7C857.1,53,891,43,926,58.7C960,75,994,117,1029,117.3C1062.9,117,1097,75,1131,58.7C1165.7,43,1200,53,1234,96C1268.6,139,1303,213,1337,256C1371.4,299,1406,309,1423,314.7L1440,320L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z"></path></svg>
       {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#B2F5EA" fill-opacity="1" d="M0,288L9.6,282.7C19.2,277,38,267,58,245.3C76.8,224,96,192,115,197.3C134.4,203,154,245,173,272C192,299,211,309,230,261.3C249.6,213,269,107,288,80C307.2,53,326,107,346,117.3C364.8,128,384,96,403,112C422.4,128,442,192,461,229.3C480,267,499,277,518,256C537.6,235,557,181,576,138.7C595.2,96,614,64,634,58.7C652.8,53,672,75,691,74.7C710.4,75,730,53,749,69.3C768,85,787,139,806,154.7C825.6,171,845,149,864,138.7C883.2,128,902,128,922,149.3C940.8,171,960,213,979,224C998.4,235,1018,213,1037,197.3C1056,181,1075,171,1094,149.3C1113.6,128,1133,96,1152,106.7C1171.2,117,1190,171,1210,186.7C1228.8,203,1248,181,1267,192C1286.4,203,1306,245,1325,266.7C1344,288,1363,288,1382,282.7C1401.6,277,1421,267,1430,261.3L1440,256L1440,0L1430.4,0C1420.8,0,1402,0,1382,0C1363.2,0,1344,0,1325,0C1305.6,0,1286,0,1267,0C1248,0,1229,0,1210,0C1190.4,0,1171,0,1152,0C1132.8,0,1114,0,1094,0C1075.2,0,1056,0,1037,0C1017.6,0,998,0,979,0C960,0,941,0,922,0C902.4,0,883,0,864,0C844.8,0,826,0,806,0C787.2,0,768,0,749,0C729.6,0,710,0,691,0C672,0,653,0,634,0C614.4,0,595,0,576,0C556.8,0,538,0,518,0C499.2,0,480,0,461,0C441.6,0,422,0,403,0C384,0,365,0,346,0C326.4,0,307,0,288,0C268.8,0,250,0,230,0C211.2,0,192,0,173,0C153.6,0,134,0,115,0C96,0,77,0,58,0C38.4,0,19,0,10,0L0,0Z"></path></svg>  */}
 <div className='absolute inset-0  flex items-center justify-center p-4'>
          
            <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
              
                <div className='text-textColor flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all'
                onClick={loginWithGoogle}>
                    <FcGoogle className='text-xl '/>
                    Sing in with Google
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Login