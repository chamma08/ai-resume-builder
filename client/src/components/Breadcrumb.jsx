import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Define route configurations
    const getRouteConfig = () => {
        const path = location.pathname;
        
        // Dashboard (root of /app)
        if (path === '/app') {
            return [{ label: 'Dashboard', path: '/app', active: true }];
        }
        
        // Resume Builder
        if (path.includes('/app/builder/')) {
            return [
                { label: 'Dashboard', path: '/app', active: false },
                { label: 'Resume Builder', path: path, active: true }
            ];
        }
        
        // Points Dashboard
        if (path === '/app/points') {
            return [
                { label: 'Dashboard', path: '/app', active: false },
                { label: 'Points Dashboard', path: '/app/points', active: true }
            ];
        }
        
        // Leaderboard
        if (path === '/app/leaderboard') {
            return [
                { label: 'Dashboard', path: '/app', active: false },
                { label: 'Leaderboard', path: '/app/leaderboard', active: true }
            ];
        }
        
        // Activity History
        if (path === '/app/activity') {
            return [
                { label: 'Dashboard', path: '/app', active: false },
                { label: 'Activity History', path: '/app/activity', active: true }
            ];
        }
        
        // Referral Page
        if (path === '/app/referral') {
            return [
                { label: 'Dashboard', path: '/app', active: false },
                { label: 'Referral Program', path: '/app/referral', active: true }
            ];
        }
        
        // Default fallback
        return [{ label: 'Dashboard', path: '/app', active: true }];
    };
    
    const breadcrumbs = getRouteConfig();
    
    // Chevron icon component
    const ChevronIcon = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
        </svg>
    );
    
    return (
        <nav className="flex flex-wrap items-center top-0 space-x-2 text-sm text-gray-500 font-medium bg-transparent py-2 px-4 rounded-lg" aria-label="Breadcrumb"> 
            {/* Home Icon */}
            <Link 
                to="/" 
                type="button" 
                aria-label="Home"
                className="hover:opacity-80 transition-opacity"
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7.609c.352 0 .69.122.96.343l.111.1 6.25 6.25v.001a1.5 1.5 0 0 1 .445 1.071v7.5a.89.89 0 0 1-.891.891H9.125a.89.89 0 0 1-.89-.89v-7.5l.006-.149a1.5 1.5 0 0 1 .337-.813l.1-.11 6.25-6.25c.285-.285.67-.444 1.072-.444Zm5.984 7.876L16 9.5l-5.984 5.985v6.499h11.968z" fill="#475569" stroke="#475569" strokeWidth=".094"/>
                </svg>
            </Link>
            
            <ChevronIcon />
            
            {/* Breadcrumb Items */}
            {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-2">
                    {crumb.active ? (
                        <span className="text-black font-semibold">{crumb.label}</span>
                    ) : (
                        <Link 
                            to={crumb.path} 
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            {crumb.label}
                        </Link>
                    )}
                    
                    {/* Add chevron if not the last item */}
                    {index < breadcrumbs.length - 1 && <ChevronIcon />}
                </div>
            ))}
        </nav>
    );
};