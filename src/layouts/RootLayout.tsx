import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

export const RootLayout = () => {
  return (
    <div className='bg-black w-screen h-screen'>
        <header>
            <Navbar/>
        </header>
        <main className="h-[calc(100vh-4rem)]">
            <Outlet/>
        </main>
    </div>
  )
}
