import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Shield, ChevronRight,
         RefreshCw, MapPin, Smartphone, CheckCircle, AlertCircle } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  // mode: 'login' | 'token' | 'mfa' | 'setup_mfa' | 'complete_registration'
  const [mode,        setMode]        = useState('login')
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [token,       setToken]       = useState('')
  const [mfaCode,     setMfaCode]     = useState('')
  const [mfaChoice,   setMfaChoice]   = useState(null)   // true/false — user's MFA setup choice
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')

  // Simulated: does this account have MFA enabled?
  const accountHasMfa = true   // ← replace with backend check

  const handleLogin = () => {
    if (!email.includes('@'))    { setError('Enter a valid email'); return }
    if (password.length < 4)     { setError('Enter your password'); return }
    setError(''); setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // If account has MFA → go to MFA step, else login directly
      if (accountHasMfa) setMode('mfa')
      else onLogin?.()
    }, 1400)
  }

  const handleMfa = () => {
    if (mfaCode.length < 6) { setError('Enter the 6-digit MFA code'); return }
    setError(''); setLoading(true)
    setTimeout(() => { setLoading(false); onLogin?.() }, 1200)
  }

  const handleToken = () => {
    if (token.length < 6) { setError('Enter the token from your email'); return }
    setError(''); setLoading(true)
    // New admin → after token, go to MFA one-time setup
    setTimeout(() => { setLoading(false); setMode('setup_mfa') }, 1200)
  }

  const handleMfaSetup = () => {
    if (mfaChoice === null) { setError('Please choose an MFA option'); return }
    setError(''); setLoading(true)
    setTimeout(() => { setLoading(false); setMode('complete_registration') }, 800)
  }

  const handleCompleteReg = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin?.() }, 1200)
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* ── LEFT: Branding ─────────────────────────────────── */}
      <div className="w-1/2 relative flex flex-col items-center justify-between py-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/flag.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-white text-center px-10">
          <p className="text-[10px] font-bold text-yellow-300 tracking-[0.22em] uppercase mb-5">
            The United Republic Government of Tanzania
          </p>
          <div className="w-36 h-36 rounded-full border-4 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 shadow-2xl">
            <img src="/assets/court_of_arm.png" alt="Coat of Arms" className="w-28 h-28 object-contain drop-shadow-xl" />
          </div>
          <div className="w-20 h-0.5 bg-yellow-400 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold tracking-wide drop-shadow mb-1">National Bureau of Statistics</h1>
          <p className="text-sm text-white/70 uppercase tracking-widest mb-0.5">Automated Digital Live Census</p>
          <p className="text-xs text-white/50 font-mono mb-8">Research Model (V 1.X.X)</p>
          <div className="w-20 h-20 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
            <img src="/assets/longo_nbs.png" alt="NBS Logo" className="w-14 h-14 object-contain" />
          </div>
          <p className="text-sm italic text-yellow-200/80 px-6">"Statistics for Development"</p>
        </div>

        <p className="relative z-10 text-[10px] text-white/30 text-center">
          © 2026 National Bureau of Statistics · Digital Live Census · All rights reserved
        </p>
      </div>

      {/* ── RIGHT: Auth Panel ──────────────────────────────── */}
      <div className="w-1/2 flex items-center justify-center bg-[#060f1e]">
        <div className="w-full max-w-sm px-6">

          <div className="bg-[#0d1f38] border border-[#1e3a5f] rounded-2xl p-8 shadow-2xl">

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-4">
                {mode==='mfa' || mode==='setup_mfa'
                  ? <Smartphone size={22} className="text-[#00d4ff]" />
                  : mode==='complete_registration'
                    ? <CheckCircle size={22} className="text-[#00ff9d]" />
                    : <Shield size={22} className="text-[#00d4ff]" />
                }
              </div>
              <h2 className="text-white font-bold text-lg">
                {mode==='login'                 && 'Secure Login'}
                {mode==='token'                 && 'Token Authorization'}
                {mode==='mfa'                   && 'MFA Verification'}
                {mode==='setup_mfa'             && 'Set Up MFA (One-Time)'}
                {mode==='complete_registration' && 'Complete Registration'}
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                {mode==='login'                 && 'Enter credentials to access your dashboard'}
                {mode==='token'                 && 'Enter the token sent to your official email'}
                {mode==='mfa'                   && 'Enter the 6-digit code from your authenticator app'}
                {mode==='setup_mfa'             && 'Choose MFA preference for future logins'}
                {mode==='complete_registration' && 'Your account is ready — click below to continue'}
              </p>
            </div>

            {/* ── LOGIN form */}
            {mode==='login' && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                           placeholder="official@nbs.go.tz"
                           className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-700 outline-none focus:border-[#00d4ff]/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type={showPass?'text':'password'} value={password}
                           onChange={e => { setPassword(e.target.value); setError('') }} placeholder="••••••••••"
                           className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg pl-9 pr-10 py-2.5 text-sm text-white placeholder-gray-700 outline-none focus:border-[#00d4ff]/50 transition-colors" />
                    <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300">
                      {showPass ? <EyeOff size={13}/> : <Eye size={13}/>}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{error}</p>}
                <button onClick={handleLogin}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4ff] to-[#0088bb] text-[#060f1e] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                  {loading ? <RefreshCw size={15} className="animate-spin"/> : <><span>Sign In</span><ChevronRight size={15}/></>}
                </button>
                <div className="text-center pt-1">
                  <button onClick={() => { setMode('token'); setError('') }}
                          className="text-[11px] text-[#00d4ff]/70 hover:text-[#00d4ff] transition-colors">
                    New admin? Use Authorization Token →
                  </button>
                </div>
              </div>
            )}

            {/* ── TOKEN form (new district admin first-time access) */}
            {mode==='token' && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-[#00d4ff]/20 bg-[#00d4ff]/5">
                  <p className="text-[#00d4ff] text-xs">Enter the one-time token emailed to your official government address by your Super Admin.</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">One-Time Token</label>
                  <input type="text" value={token} onChange={e => { setToken(e.target.value); setError('') }}
                         placeholder="TKN-XXXX-XXXX-XXXX"
                         className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-700 font-mono outline-none focus:border-[#00ff9d]/50 transition-colors tracking-widest" />
                </div>
                {error && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{error}</p>}
                <button onClick={handleToken}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00ff9d] to-[#00bb6e] text-[#060f1e] flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  {loading ? <RefreshCw size={15} className="animate-spin"/> : <><span>Authorize Access</span><ChevronRight size={15}/></>}
                </button>
                <div className="text-center">
                  <button onClick={() => { setMode('login'); setError('') }} className="text-[11px] text-gray-500 hover:text-white">← Back to login</button>
                </div>
              </div>
            )}

            {/* ── MFA verification (returning users with MFA enabled) */}
            {mode==='mfa' && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-[#00d4ff]/20 bg-[#00d4ff]/5">
                  <p className="text-[#00d4ff] text-xs">MFA is enabled on your account. Open your authenticator app and enter the 6-digit code.</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">6-Digit MFA Code</label>
                  <input type="text" value={mfaCode} onChange={e => { setMfaCode(e.target.value.replace(/\D/,'')); setError('') }}
                         placeholder="000000" maxLength={6}
                         className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-700 font-mono outline-none focus:border-[#00d4ff]/50 transition-colors tracking-[0.5em] text-center" />
                </div>
                {error && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{error}</p>}
                <button onClick={handleMfa}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4ff] to-[#0088bb] text-[#060f1e] flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  {loading ? <RefreshCw size={15} className="animate-spin"/> : <><span>Verify & Login</span><ChevronRight size={15}/></>}
                </button>
                <div className="text-center">
                  <button onClick={() => { setMode('login'); setError('') }} className="text-[11px] text-gray-500 hover:text-white">← Back</button>
                </div>
              </div>
            )}

            {/* ── MFA ONE-TIME SETUP (first login after token authorization) */}
            {mode==='setup_mfa' && (
              <div className="space-y-4">
                <p className="text-gray-400 text-xs">Multi-Factor Authentication adds an extra layer of security. You can change this anytime in Settings.</p>
                <div className="space-y-2">
                  {[
                    { val:true,  icon:'🔐', title:'Enable MFA',  desc:'Require 6-digit code on every login (recommended)' },
                    { val:false, icon:'⚡', title:'Skip MFA',    desc:'Login with email & password only (less secure)' },
                  ].map(({ val, icon, title, desc }) => (
                    <button key={String(val)} onClick={() => { setMfaChoice(val); setError('') }}
                            className={`w-full text-left p-3 rounded-xl border transition-all
                                       ${mfaChoice===val
                                         ? val ? 'bg-[#00ff9d]/10 border-[#00ff9d]/40' : 'bg-orange-400/10 border-orange-400/40'
                                         : 'border-[#1e3a5f] hover:border-[#2a4060]'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{icon}</span>
                        <div>
                          <p className={`text-sm font-bold ${val ? 'text-[#00ff9d]' : 'text-orange-400'}`}>{title}</p>
                          <p className="text-[10px] text-gray-500">{desc}</p>
                        </div>
                        {mfaChoice===val && <CheckCircle size={14} className={`ml-auto ${val?'text-[#00ff9d]':'text-orange-400'}`} />}
                      </div>
                    </button>
                  ))}
                </div>
                {error && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{error}</p>}
                <button onClick={handleMfaSetup}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00ff9d] to-[#00bb6e] text-[#060f1e] flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  {loading ? <RefreshCw size={15} className="animate-spin"/> : <><span>Confirm & Continue</span><ChevronRight size={15}/></>}
                </button>
              </div>
            )}

            {/* ── Complete registration success */}
            {mode==='complete_registration' && (
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center mx-auto">
                  <CheckCircle size={28} className="text-[#00ff9d]" />
                </div>
                <div>
                  <p className="text-white font-bold">Setup Complete!</p>
                  <p className="text-gray-500 text-xs mt-1">
                    MFA preference saved. Your account is fully activated.
                  </p>
                </div>
                <button onClick={handleCompleteReg}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4ff] to-[#0088bb] text-[#060f1e] hover:opacity-90 transition-all">
                  {loading ? <RefreshCw size={15} className="animate-spin mx-auto"/> : 'Go to Dashboard →'}
                </button>
              </div>
            )}
          </div>

          {/* Bottom note */}
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
