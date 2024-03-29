import { Link, useNavigate } from "react-router-dom"
import FireBaseContext from "../context/firebase"
import { useContext, useEffect, useState } from "react"
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from "../services/firebase"

export default function Signup() {
    const history = useNavigate()

    const [username,setUsername] = useState('')
    const [fullname,setFullname] = useState('')

    const [emailAddress,setEmailAddress] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const isInvalid = password === '' || emailAddress === ''

    const handleSignUp = async (e) => {
        e.preventDefault()

        const usernameExists = await doesUsernameExist(username)
        console.log(usernameExists)

        if(usernameExists?.[0] === false){
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress,password)
                await createdUserResult.user.updateProfile({
                    displayName: username
                })

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullname,
                    emailAddress: emailAddress.toLowerCase,
                    following: [],
                    dateCreated: Date.now()

                })

                history.push(ROUTES.DASHBOARD)
                
            } catch (error) {
                setFullname('')
                setEmailAddress('')
                setPassword('')
                setError(error.message)
            }
        }
        else{
            setError("That username is already taken, please try another")
        }
    }

    useEffect(() =>     {
        document.title = 'Login - Chefstagram'
    },[])

    const { firebase } = useContext(FireBaseContext)

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/Logo.svg" alt="Chefstagram Logo"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col">
                <h1 className="flex justify-center w-full">
                    <img src="/images/LogoText.svg"></img>
                </h1>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                <form onSubmit={handleSignUp} method="POST">
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Username"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                        border-gray-primary rounded mb-2"
                        onChange={({target}) => setUsername(target.value)}
                        value={username}
                    />
                    <input
                        aria-label="Enter your full name"
                        type="text"
                        placeholder="Full Name"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                        border-gray-primary rounded mb-2"
                        onChange={({target}) => setFullname(target.value)}
                        value={fullname}
                    />
                    <input
                        aria-label="Enter your email address"
                        type="text"
                        placeholder="Email address"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                        border-gray-primary rounded mb-2"
                        onChange={({target}) => setEmailAddress(target.value)}
                        value={emailAddress}
                    />
                    <input
                        aria-label="Enter your password"
                        type="password"
                        placeholder="password"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                        border-gray-primary rounded mb-2"
                        onChange={({target}) => setPassword(target.value)}
                        value={password}
                    />
                    <button
                        disabled={isInvalid} 
                        type="submit"
                        className={`bg-blue-medium text-white w-full h-8 rounded1 ${isInvalid && 'opacity-50'}`}
                    >
                        Login
                    </button>

                </form>  

            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Have an account?{` `}</p>
                    <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                        Login
                    </Link>    
            </div>
            </div>
        </div>
        )

}