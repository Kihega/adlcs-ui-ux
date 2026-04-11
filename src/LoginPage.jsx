import { useState } from 'react'
import {
  Eye, EyeOff, Lock, Mail, Shield, ChevronRight,
  RefreshCw, Smartphone, Copy, CheckCircle, AlertCircle
} from 'lucide-react'

// ── TOTP demo config (kihegaalpha0091@gmail.com) ─────────
const TOTP_SECRET  = 'JBSWY3DPEHPK3PXP'
const TOTP_ISSUER  = 'NBS%20Census%20Tanzania'
const TOTP_ACCOUNT = 'kihegaalpha0091%40gmail.com'
const TOTP_URI     = `otpauth://totp/${TOTP_ISSUER}:${TOTP_ACCOUNT}?secret=${TOTP_SECRET}&issuer=${TOTP_ISSUER}`
const QR_URL       = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(TOTP_URI)}`

export default function LoginPage({ onLogin }) {
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [showPass,   setShowPass]   = useState(false)
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [mode,       setMode]       = useState('login')
  // mode: 'login' | 'token' | 'mfa-setup' | 'mfa-verify'
  const [tokenInput, setTokenInput] = useState('')
  const [mfaCode,    setMfaCode]    = useState('')
  const [copied,     setCopied]     = useState(false)
  const [error,      setError]      = useState('')

  const handleCopySecret = () => {
    navigator.clipboard.writeText(TOTP_SECRET).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = () => {
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (mfaEnabled) {
        setMode('mfa-setup')   // show Google Authenticator QR setup
      } else {
        onLogin?.()
      }
    }, 1200)
  }

  const handleMfaContinue = () => {
    // After scanning QR user clicks "I've scanned the code"
    setMode('mfa-verify')
  }

  const handleMfaVerify = () => {
    setError('')
    if (mfaCode.length !== 6 || !/^\d{6}$/.test(mfaCode)) {
      setError('Please enter the 6-digit code from Google Authenticator.')
      return
    }
    // For demo: any 6-digit code is accepted
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin?.() }, 900)
  }

  const handleTokenLogin = () => {
    setError('')
    if (!tokenInput || tokenInput.length < 4) { setError('Enter a valid token.'); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin?.() }, 1000)
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* ── LEFT: Branding ─────────────────────────────────── */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-between py-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/flag.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-white text-center px-10">
          <p className="text-[10px] font-bold text-yellow-300 tracking-[0.22em] uppercase mb-5 drop-shadow">
            The United Republic Government of Tanzania
          </p>
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
          <div className="w-20 h-20 rounded-2xl border-2 border-white/30 bg-white/10
                          backdrop-blur-sm flex items-center justify-center mb-6">
            <img src="/assets/longo_nbs.png" alt="NBS Logo" className="w-14 h-14 object-contain" />
          </div>
          <p className="text-sm italic text-yellow-200/80 px-6">"Statistics for Development"</p>
        </div>
        <p className="relative z-10 text-[10px] text-white/30 text-center">
          © 2026 National Bureau of Statistics · Digital Live Census · All rights reserved
        </p>
      </div>

      {/* ── RIGHT: Login Card ──────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#060f1e] p-6">
        <div className="w-full max-w-sm">
          <div className="bg-[#0d1f38] border border-[#1e3a5f] rounded-2xl p-8 shadow-2xl">

            {/* ══ MODE: Normal Login ══ */}
            {mode === 'login' && (
              <>
                <div className="text-center mb-7">
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30
                                  flex items-center justify-center mx-auto mb-4">
                    <Shield size={22} className="text-[#00d4ff]" />
                  </div>
                  <h2 className="text-white font-bold text-lg">Secure Login</h2>
                  <p className="text-gray-500 text-xs mt-1">Enter credentials to access your dashboard</p>
                </div>

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
                      <input type={showPass ? 'text' : 'password'} value={password}
                             onChange={e => { setPassword(e.target.value); setError('') }} placeholder="••••••••••"
                             className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg pl-9 pr-10 py-2.5 text-sm text-white placeholder-gray-700 outline-none focus:border-[#00d4ff]/50 transition-colors" />
                      <button onClick={() => setShowPass(!showPass)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300">
                        {showPass ? <EyeOff size={13}/> : <Eye size={13}/>}
                      </button>
                    </div>
                  </div>

                  {/* MFA Toggle */}
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <span className="text-xs text-gray-400">Enable MFA</span>
                      <p className="text-[10px] text-gray-600">Google Authenticator (TOTP)</p>
                    </div>
                    <button onClick={() => setMfaEnabled(!mfaEnabled)}
                            className={`w-10 h-5 rounded-full relative transition-all ${mfaEnabled ? 'bg-[#00d4ff]' : 'bg-gray-700'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${mfaEnabled ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>

                  {mfaEnabled && (
                    <div className="flex items-center gap-2 bg-[#00d4ff]/5 border border-[#00d4ff]/20 rounded-lg px-3 py-2">
                      <Smartphone size={13} className="text-[#00d4ff] shrink-0" />
                      <p className="text-[10px] text-[#00d4ff]">
                        You will be prompted to set up Google Authenticator after login.
                      </p>
                    </div>
                  )}

                  {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={11}/>{error}</p>}

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
                    <button onClick={() => { setMode('token'); setError('') }}
                            className="text-[11px] text-[#00d4ff]/70 hover:text-[#00d4ff] transition-colors">
                      Use Authorization Token instead →
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ══ MODE: Token Login ══ */}
            {mode === 'token' && (
              <>
                <div className="text-center mb-7">
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30
                                  flex items-center justify-center mx-auto mb-4">
                    <Shield size={22} className="text-[#00d4ff]" />
                  </div>
                  <h2 className="text-white font-bold text-lg">Token Authorization</h2>
                  <p className="text-gray-500 text-xs mt-1">Enter the token sent to your official email</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">Authorization Token</label>
                    <input value={tokenInput} onChange={e => { setTokenInput(e.target.value); setError('') }}
                           placeholder="Paste token from email"
                           className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-700 outline-none focus:border-[#00d4ff]/50 transition-colors font-mono tracking-widest" />
                  </div>
                  {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={11}/>{error}</p>}
                  <button onClick={handleTokenLogin}
                          className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4ff] to-[#0088bb] text-[#060f1e] flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                    {loading ? <RefreshCw size={15} className="animate-spin"/> : <><span>Authorize</span><ChevronRight size={15}/></>}
                  </button>
                  <div className="text-center">
                    <button onClick={() => { setMode('login'); setError('') }}
                            className="text-[11px] text-[#00d4ff]/70 hover:text-[#00d4ff] transition-colors">
                      ← Back to password login
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ══ MODE: MFA Setup — Google Authenticator QR ══ */}
            {mode === 'mfa-setup' && (
              <>
                <div className="text-center mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30
                                  flex items-center justify-center mx-auto mb-3">
                    <Smartphone size={22} className="text-[#00d4ff]" />
                  </div>
                  <h2 className="text-white font-bold text-lg">Set Up Google Authenticator</h2>
                  <p className="text-gray-500 text-xs mt-1">
                    Scan the QR code with your Google Authenticator app
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Account label */}
                  <div className="bg-[#060f1e] border border-[#1e3a5f] rounded-lg px-3 py-2 text-center">
                    <p className="text-[10px] text-gray-500 mb-0.5">Setup Account</p>
                    <p className="text-[#00d4ff] text-xs font-mono">kihegaalpha0091@gmail.com</p>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                      <img
                        src={QR_URL}
                        alt="Google Authenticator QR Code"
                        className="w-44 h-44 object-contain"
                        onError={e => {
                          e.target.style.display = 'none'
                          e.target.parentNode.innerHTML = `
                            <div style="width:176px;height:176px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f3f4f6;border-radius:8px;">
                              <div style="font-size:48px;margin-bottom:8px">📱</div>
                              <p style="font-size:11px;color:#6b7280;text-align:center;padding:0 8px;">QR unavailable offline. Use secret key below.</p>
                            </div>`
                        }}
                      />
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    {[
                      'Open Google Authenticator on your phone',
                      'Tap the + button → Scan a QR code',
                      'Point your camera at the QR code above',
                      'A 6-digit code will appear in the app',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/40
                                         text-[#00d4ff] text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-gray-400 text-[10px] leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Manual secret key */}
                  <div className="bg-[#060f1e] border border-[#1e3a5f] rounded-lg p-3">
                    <p className="text-gray-500 text-[10px] mb-1.5">
                      Can't scan? Enter this key manually:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-[#00d4ff] text-xs font-mono tracking-widest break-all">
                        {TOTP_SECRET}
                      </code>
                      <button onClick={handleCopySecret}
                              className="shrink-0 flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-colors">
                        {copied ? <CheckCircle size={12} className="text-[#00ff9d]"/> : <Copy size={12}/>}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <button onClick={handleMfaContinue}
                          className="w-full py-3 rounded-xl font-bold text-sm
                                     bg-gradient-to-r from-[#00d4ff] to-[#0088bb] text-[#060f1e]
                                     flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                    I've Scanned the Code <ChevronRight size={15}/>
                  </button>
                </div>
              </>
            )}

            {/* ══ MODE: MFA Verify — Enter TOTP Code ══ */}
            {mode === 'mfa-verify' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff9d]/10 border border-[#00ff9d]/30
                                  flex items-center justify-center mx-auto mb-3">
                    <Shield size={22} className="text-[#00ff9d]" />
                  </div>
                  <h2 className="text-white font-bold text-lg">Enter Authenticator Code</h2>
                  <p className="text-gray-500 text-xs mt-1">
                    Enter the 6-digit code from Google Authenticator
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#060f1e] border border-[#1e3a5f] rounded-lg px-3 py-2 text-center">
                    <p className="text-[10px] text-gray-500 mb-0.5">Verifying for</p>
                    <p className="text-[#00d4ff] text-xs font-mono">kihegaalpha0091@gmail.com</p>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block text-center">
                      6-Digit TOTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={mfaCode}
                      onChange={e => { setMfaCode(e.target.value.replace(/\D/g, '')); setError('') }}
                      placeholder="000000"
                      className="w-full bg-[#060f1e] border border-[#1e3a5f] rounded-lg px-4 py-3
                                 text-white text-center text-2xl font-mono tracking-[0.5em]
                                 outline-none focus:border-[#00ff9d]/50 transition-colors placeholder-gray-700"
                    />
                    <p className="text-[10px] text-gray-600 text-center mt-1">
                      Code refreshes every 30 seconds in the app
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs flex items-center justify-center gap-1">
                      <AlertCircle size={11}/>{error}
                    </p>
                  )}

                  <button onClick={handleMfaVerify}
                          className="w-full py-3 rounded-xl font-bold text-sm
                                     bg-gradient-to-r from-[#00ff9d] to-[#00bb6e] text-[#060f1e]
                                     flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                    {loading
                      ? <RefreshCw size={15} className="animate-spin"/>
                      : <><span>Verify & Login</span><ChevronRight size={15}/></>}
                  </button>

                  <div className="text-center">
                    <button onClick={() => { setMode('mfa-setup'); setMfaCode(''); setError('') }}
                            className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors">
                      ← Back to QR code
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>

          <p className="text-center text-gray-700 text-[10px] mt-4">
            © 2026 NBS Tanzania · Authorized Personnel Only · All rights reserved
          </p>
        </div>
      </div>
    </div>
  )
}
