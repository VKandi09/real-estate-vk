import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


const SignIn = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id] : e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      });
      const data = await res.json();
      console.log(data);

      if(data.success == false){
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // setLoading(false);
      // setError(null);
      navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error.message));
      // setLoading(false);
      // setError(error.message);
    }
  }


  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-8">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input type="text" placeholder="Username" id="username" className="border p-3 rounded-lg" onChange={handleChange}/> */}
        <input type="email" placeholder="Email" id="email" className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="border p-3 rounded-lg" onChange={handleChange}/>
        <button className="bg-slate-700 p-2 rounded-lg text-white uppercase hover:opacity-95">{ loading ? "Loading..." : "Sign In"}</button>
        {/* <button type="button" onClick={handleGoogleClick} className='bg-red-700 p-2 rounded-lg text-white hover:opacity-95 uppercase'> */}
          <OAuth/>
        {/* </button> */}
      </form>
      <div className="flex gap-3 mt-5">
        <p>Do not have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default SignIn;