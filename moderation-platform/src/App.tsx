import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Moderation from './pages/Moderation'
import CaseDetail from './pages/CaseDetail'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <img src="/delay-slayer-logo.png" alt="Delay Slayer — AI Flight Claims" className="logo-img" />
        </div>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Moderation Queue
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Moderation />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
