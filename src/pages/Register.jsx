
import { useState, useEffect } from "react";
import  Logo  from "../components/logo";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../components/FormRow";
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

    const handleChange = (e) => {
        console.log(e.target.value);
        setValues((prev)=> ({...prev, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    };
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>

                {/* name field */}
                <FormRow 
                  name='name' 
                  type='text' 
                  value={values.name} 
                  handleChange={handleChange} 
                />
                {/* email field */}
                <FormRow 
                  name='email' 
                  type='email' 
                  value={values.email} 
                  handleChange={handleChange} 
                />
                <button type="submit" className="btn btn-block">
                    submit
                </button>
            </form>

        </Wrapper>
    );
}

export default Register