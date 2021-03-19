import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebase.config';
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = data => {
        console.log(data);
        if(!newUser && watch('password') === watch('confirmPassword')){
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
          // Signed in 
          console.log(res);
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = '';
          newUserInfo.email = res.user.email;
          newUserInfo.isSignedIn = true;
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = error.message;
          console.log(error);
          setLoggedInUser(newUserInfo);
        });
    }
    if (newUser && data.email && data.password) {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
          // Signed in
          console.log(res);
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = '';
          newUserInfo.email = res.user.email;
          newUserInfo.isSignedIn = true;
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
            const newUserInfo = { ...loggedInUser };
            newUserInfo.error = error.message;
            console.log(error);
            setLoggedInUser(newUserInfo);
        });
     }
    
        else{
            const newUserInfo = {...loggedInUser};
            newUserInfo.error = 'Password did not matched!';
            setLoggedInUser(newUserInfo);
        }
    }
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email } = res.user;
        setLoggedInUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          error: ''
        })
        history.replace(from);
      })
      .catch(error => {
        const newUserInfo = { ...loggedInUser };
        newUserInfo.error = error.message;
        console.log(error);
        setLoggedInUser(newUserInfo);
      })
    }
    return (
        <div>
            <Header />
            <Container>
                <hr />
                <div className='w-md-50 mx-auto border rounded p-5 shadow'>
                    <h2>{newUser ? 'Login' : 'Create an account'}</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            !newUser && <input className='form-control my-3 rounded-pill' name="name" type='text' placeholder='Name' ref={register} />
                        }

                        <input name="email" className='form-control my-3 rounded-pill' placeholder='Email' ref={register({ required: true })} />
                        {errors.email && <span className='text-danger'>This field is required</span>}

                        <input name="password" className='form-control my-3 rounded-pill' type='password' placeholder='Password' ref={register({ required: true, pattern: /\d/, min: 8 })} />
                        {errors.password && <span className='text-danger'>This field is required</span>}

                        {
                            !newUser && <div>
                                <input name="confirmPassword" className='form-control my-3 rounded-pill' type='password' placeholder='Confirm Password' ref={register({ required: true, pattern: /\d/, min: 8 })} />
                            {errors.confirmPassword && <span className='text-danger'>This field is required</span>}
                            </div>
                        }

                        <p className='text-danger'>{loggedInUser.error}</p>

                        <input className='btn btn-danger btn-block rounded-pill my-3' type="submit" value={!newUser ? `Create an Account` : `Log In`} />
                        <p>{!newUser ? `Already have an account?` : `Don't have an account?` } <span className='font-italic text-danger' style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {setNewUser(!newUser)}} >{!newUser ? `Log In` : `Create an account` }</span> </p>
                    </form>
                    <h5 className='text-center my-2'>or,</h5>
                    <button className='btn btn-info btn-block rounded-pill' onClick={handleGoogleSignIn} >Sign In With Google</button>
                </div>
            </Container>
        </div>
    );
};

export default Login;