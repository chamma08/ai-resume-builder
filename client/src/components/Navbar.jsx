import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/job_logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/authSlice'
import { LogOutIcon, UserCircle2Icon } from 'lucide-react'

export default function Navbar() {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        window.location.href = '/'
    }

  return (
    <div className='bg-white border-b border-slate-200'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-4'>
            <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                <img src={logo} alt="Logo" className='h-10 w-auto'/>
            </Link>
            <div className='flex items-center gap-4'>
                <div className='hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200'>
                    <UserCircle2Icon className='size-5 text-slate-600' />
                    <p className='text-sm text-slate-700'>
                        <span className='font-semibold'>{user.name}</span>
                    </p>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    <LogOutIcon className='size-4' />
                    <span className='hidden sm:inline'>Logout</span>
                </button>
            </div>
        </nav>
    </div>
  )
}
