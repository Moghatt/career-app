
import { useState, useEffect } from "react";
import  {Logo,FormRow,Alert}  from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import {useNavigate} from "react-router-dom";

// global context and useNavigate later



const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
};
// if possible prefer local state
// global state

function Register() {

    const [values, setValues] = useState(initialState);

    // global context and useNavigate later
      const { user,isLoading, showAlert,displayAlert,clearAlert, registerUser } = useAppContext();
      const navigate = useNavigate();
    const toggleMember = () => {
      setValues(prev => ({ ...prev, isMember: !values.isMember }));
    };
    const handleChange = (e) => {
        setValues((prev)=> ({...prev, [e.target.name]: e.target.value}));
        
    };

const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
        displayAlert();
        return;
    }
    const currentUser = { name, email, password};
    if(isMember){
      console.log('already member')
    } else {
      registerUser(currentUser);}

    clearAlert()
    console.log(values);
    
    };

    useEffect(() => {
        if (user) {
          setTimeout(()=> {
              navigate("/"); 
          },2500)          
        }
        }, [user, navigate]);

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>
                {showAlert && <Alert />}
                {!values.isMember && (
                    <FormRow
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                {/* email field */}
                <FormRow 
                  name='email' 
                  type='email' 
                  value={values.email} 
                  handleChange={handleChange} 
                />
                {/* password field */}
                <FormRow 
                  name='password' 
                  type='password' 
                  value={values.password} 
                  handleChange={handleChange} 
                />
                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    submit
                </button>
              <p>
                  {values.isMember ? "Not a member yet?" : "Already a member?"}

                  <button type="button" onClick={toggleMember} className="member-btn">
                      {values.isMember ? "Register" : "Login"}
                  </button>
              </p>
            </form>

        </Wrapper>
    );
}

export default Register