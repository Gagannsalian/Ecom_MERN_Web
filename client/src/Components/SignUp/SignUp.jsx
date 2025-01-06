import './SignUp.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
const SignUp = () => {


    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');

        }
    })

    const collectData= async()=>{

        console.warn(name,email,password);
        let result = await fetch("http://localhost:8082/register",{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/');
        
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
