import './SignUp.css';
import {useState} from 'react'
const SignUp = () => {


    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const collectData=()=>{
        console.warn(name,email,password)
    }


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="input-field" required value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="input-field" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="input-field" required  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <button onClick={collectData} type="submit" className="submit-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
