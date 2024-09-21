import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id] : e.target.value
    });
    // console.log(formdata);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      });
      const data = await res.json();
      console.log(data);

      if(data.success == false){
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/signin');
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="Email" id="email" className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="border p-3 rounded-lg" onChange={handleChange}/>
        <button className="bg-slate-700 p-2 rounded-lg text-white uppercase hover:opacity-95">{ loading ? "Loading..." : "Sign Up"}</button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 m-5'>{error}</p>}
    </div>
  )
}

export default Signup