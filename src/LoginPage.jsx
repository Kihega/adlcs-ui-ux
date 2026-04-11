import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Shield, ChevronRight, RefreshCw, MapPin } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [token,      setToken]      = useState('')
  const [showPass,   setShowPass]   = useState(false)
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [mode,       setMode]       = useState('login')

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin?.() }, 1800)
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter',sans-serif" }}>

      {/* ── LEFT: Branding ─────────────────────────────────── */}
      <div className="w-1/2 relative flex flex-col items-center justify-between py-10 overflow-hidden">

        {/* Real flag image as background */}
        <div className="absolute inset-0 z-0">
          <img src="/assets/flag.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-white text-center px-10">

          <p className="text-[10px] font-bold text-yellow-300 tracking-[0.22em] uppercase mb-5 drop-shadow">
            The United Republic Government of Tanzania
          </p>

          {/* Coat of Arms */}
          <div className="w-36 h-36 rounded-full border-4 border-white/40 bg-white/10
                          backdrop-blur-sm flex items-center justify-center mb-5 shadow-2xl">
            <img src="/assets/court_of_arm.png" alt="Coat of Arms"
                 className="w-28 h-28 object-contain drop-shadow-xl" />
          </div>

          <div className="w-20 h-0.5 bg-yellow-400 mx-auto mb-4" />

          <h1 className="text-2xl font-extrabold tracking-wide drop-shadow mb-1">
            National Bureau of Statistics
          </h1>
          <p className="text-sm text-white/70 uppercase tracking-widest mb-0.5">
            Automated Digital Live Census
          </p>
          <p className="text-xs text-white/50 font-mono mb-8">Research Model (V 1.X.X)</p>

          {/* NBS Logo */}
          <div className="w-20 h-20 rounded-2xl border-2 border-white/30 bg-white/10
                          backdrop-blur-sm flex items-center justify-center mb-6">
            <img src="/assets/longo_nbs.png" alt="NBS Logo"
                 className="w-14 h-14 object-contain" />
          </div>

          <p className="text-sm italic text-yellow-200/80 px-6">"Statistics for Development"</p>
        </div>

        <p className="relative z-10 text-[10px] text-white/30 text-center">
          © 2026 National Bureau of Statistics · Digital Live Census · All rights reserved
        </p>
      </div>

      {/* ── RIGHT: Login Card ──────────────────────────────── */}
      <div className="w-1/2 flex items-center justify-center bg-[#060f1e]">
        <div className="w-full max-w-sm px-6">

          <div className="bg-[#0d1f38] border border-[#1e3a5f] rounded-2xl p-8 shadow-2xl">

            <div className="text-center mb-7">
              <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30
                              flex items-center justify-center mx-auto mb-4">
                <Shield size={22} className="text-[#00d4ff]" />
              </div>
              <h2 className="text-white font-bold text-lg">
                {mode === 'login' ? 'Secure Login' : 'Token Authorization'}
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                {mode === 'login'
                  ? 'Enter credentials to access your dashboard'
                  : 'Enter the token sent to your official email'}
              </p>
            </div>

            {mode === 'login' ? (
              <div className="space-y-4">

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                           placeholder="official@nbs.go.tz"
                           className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg
                                      pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-700
                                      outline-none focus:border-[#00d4ff]/50 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type={showPass ? 'text' : 'password'} value={password}
                           onChange={e => setPassword(e.target.value)} placeholder="••••••••••"
                           className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg
                                      pl-9 pr-10 py-2.5 text-sm text-white placeholder-gray-700
                                      outline-none focus:border-[#00d4ff]/50 transition-colors" />
                    <button onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600
                                       hover:text-gray-300 transition-colors">
                      {showPass ? <EyeOff size={13}/> : <Eye size={13}/>}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-400">Enable MFA (optional)</span>
                  <button onClick={() => setMfaEnabled(!mfaEnabled)}
                          className={`w-10 h-5 rounded-full relative transition-all
                                      ${mfaEnabled ? 'bg-[#00d4ff]' : 'bg-gray-700'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow
                                      transition-all duration-200
                                      ${mfaEnabled ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>

                <button onClick={handleSubmit}
                        className="w-full py-3 rounded-xl font-bold text-sm mt-1
                                   bg-gradient-to-r from-[#00d4ff] to-[#0088bb] text-[#060f1e]
                                   flex items-center justify-center gap-2
                                   hover:opacity-90 active:scale-95 transition-all">
                  {loading
                    ? <RefreshCw size={15} className="animate-spin"/>
                    : <><span>Sign In</span><ChevronRight size={15}/></>}
                </button>

                <div className="text-center pt-1">
                  <button onClick={() => setMode('token')}
                          className="text-[11px] text-[#00d4ff]/70 hover:text-[#00d4ff] transition-colors">
                    Use Authorization Token instead →
                  </button>
                </div>
              </div>

            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">
                    One-Time Token
                  </label>
                  <input type="text" value={token} onChange={e => setToken(e.target.value)}
                         placeholder="TKN-XXXX-XXXX-XXXX"
                         className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg
                                    px-4 py-2.5 text-sm text-white placeholder-gray-700 font-mono
                                    outline-none focus:border-[#00ff9d]/50 transition-colors tracking-widest" />
                  <p className="text-[10px] text-gray-600 mt-1">Check your official NBS government email</p>
                </div>
                <button onClick={handleSubmit}
                        className="w-full py-3 rounded-xl font-bold text-sm
                                   bg-gradient-to-r from-[#00ff9d] to-[#00bb6e] text-[#060f1e]
                                   flex items-center justify-center gap-2
                                   hover:opacity-90 active:scale-95 transition-all">
                  {loading
                    ? <RefreshCw size={15} className="animate-spin"/>
                    : <><span>Authorize Access</span><ChevronRight size={15}/></>}
                </button>
                <div className="text-center">
                  <button onClick={() => setMode('login')}
                          className="text-[11px] text-gray-500 hover:text-white transition-colors">
                    ← Back to login
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-5 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-gray-600">
              <MapPin size={11}/>
              <span className="text-[10px]">NBS Head Office · Dodoma, Tanzania</span>
            </div>
            <p className="text-[9px] text-gray-700">Unauthorized access is prohibited and monitored</p>
          </div>
        </div>
      </div>

    </div>
  )
}
