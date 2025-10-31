import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/job_logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/authSlice'

export default function Navbar() {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        window.location.href = '/'
    }

  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to='/'>
                <img src={logo} alt="" className='h-10 w-auto'/>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'>
                    Welcome, <span className='font-medium'>{user.name}</span>
                </p>
                <button onClick={handleLogout} className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 border-slate-300">
                    Logout
                </button>
            </div>
        </nav>
    </div>
  )
}
