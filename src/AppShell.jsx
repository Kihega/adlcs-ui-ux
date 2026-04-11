import { useState } from 'react'
import LoginPage           from './LoginPage'
import NBSHeader           from './NBSHeader'
import SuperAdminDashboard from './SuperAdminDashboard'

export default function AppShell() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeSection,  setActiveSection] = useState('Dashboard')

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#060f1e]">
      {/* Fixed institutional banner — bg image changes per section */}
      <NBSHeader activeSection={activeSection} />

      {/* Dashboard fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <SuperAdminDashboard onSectionChange={setActiveSection} />
      </div>
    </div>
  )
}
