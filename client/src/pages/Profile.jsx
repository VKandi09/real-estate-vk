import { useSelector } from "react-redux"

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="avatar" className="rounded-full h-24 w-24 object-cover self-center cursor-pointer"/>
        <input type="text" placeholder="username" defaultValue={currentUser.username} id="username" className="border p-3 rounded-lg"/>
        <input type="text" placeholder="email" defaultValue={currentUser.email} id="email" className="border p-3 rounded-lg"/>
        <input type="text" placeholder="password" defaultValue={currentUser.password} id="password" className="border p-3 rounded-lg"/>
        <button className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95">
          Submit
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out?</span>
      </div>
    </div>
  )
}

export default Profile
