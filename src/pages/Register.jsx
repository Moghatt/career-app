
import { useState, useEffect } from "react";
import  {Logo,FormRow,Alert}  from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

// global context and useNavigate later



const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
    showAlert: false
};
// if possible prefer local state
// global state

function Register() {
  const state = useAppContext()
  console.log(state)
    const [values, setValues] = useState(initialState);

    // global context and useNavigate later
    const toggleMember = () => {
      setValues(prev => ({ ...prev, isMember: !values.isMember }));
    };
    const handleChange = (e) => {
        console.log(e.target.value);
        setValues((prev)=> ({...prev, [e.target.name]: e.target.value}));
        
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(values);
    };
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>
                {values.showAlert && <Alert />}
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
                <button type="submit" className="btn btn-block">
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