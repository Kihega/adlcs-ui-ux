import { useState, useEffect, useRef } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import {
  Menu, X, Search, Bell, Settings, Sun, Moon,
  ChevronRight, ArrowUpRight, Plus, TrendingUp,
  Eye, CheckCircle2, RefreshCw, AlertTriangle,
  KeyRound, LogOut as LogOutLucide, ShieldCheck,
  Filter, ChevronDown, Lock, Mail, EyeOff,
  CheckCircle, AlertCircle
} from 'lucide-react'
import DashboardIcon        from '@mui/icons-material/Dashboard'
import AccountBalanceIcon   from '@mui/icons-material/AccountBalance'
import LocationOnIcon       from '@mui/icons-material/LocationOn'
import ManageAccountsIcon   from '@mui/icons-material/ManageAccounts'
import SpeedIcon            from '@mui/icons-material/Speed'
import ArticleIcon          from '@mui/icons-material/Article'
import GppBadIcon           from '@mui/icons-material/GppBad'
import LogoutIcon           from '@mui/icons-material/Logout'
import PublicIcon           from '@mui/icons-material/Public'
import LocationCityIcon     from '@mui/icons-material/LocationCity'
import Groups2Icon          from '@mui/icons-material/Groups2'
import SecurityIcon         from '@mui/icons-material/Security'
import MonitorHeartIcon     from '@mui/icons-material/MonitorHeart'
import HomeWorkIcon         from '@mui/icons-material/HomeWork'
import BadgeIcon            from '@mui/icons-material/Badge'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CorporateFareIcon    from '@mui/icons-material/CorporateFare'

// ── PYRAMID DATA ─────────────────────────────────────────
const buildPyramid = (scale = 1) => [
  { age: '75+',   male: Math.round(420  * scale), female: Math.round(580  * scale) },
  { age: '70-74', male: Math.round(580  * scale), female: Math.round(720  * scale) },
  { age: '65-69', male: Math.round(780  * scale), female: Math.round(920  * scale) },
  { age: '60-64', male: Math.round(1020 * scale), female: Math.round(1180 * scale) },
  { age: '55-59', male: Math.round(1380 * scale), female: Math.round(1520 * scale) },
  { age: '50-54', male: Math.round(1820 * scale), female: Math.round(1960 * scale) },
  { age: '45-49', male: Math.round(2240 * scale), female: Math.round(2380 * scale) },
  { age: '40-44', male: Math.round(2780 * scale), female: Math.round(2920 * scale) },
  { age: '35-39', male: Math.round(3420 * scale), female: Math.round(3580 * scale) },
  { age: '30-34', male: Math.round(4180 * scale), female: Math.round(4320 * scale) },
  { age: '25-29', male: Math.round(5020 * scale), female: Math.round(5180 * scale) },
  { age: '20-24', male: Math.round(5840 * scale), female: Math.round(5960 * scale) },
  { age: '15-19', male: Math.round(6420 * scale), female: Math.round(6380 * scale) },
  { age: '10-14', male: Math.round(6980 * scale), female: Math.round(6820 * scale) },
  { age: '5-9',   male: Math.round(7240 * scale), female: Math.round(7060 * scale) },
  { age: '0-4',   male: Math.round(7580 * scale), female: Math.round(7320 * scale) },
]
const pyramidData = {
  national: buildPyramid(1),
  mainland: buildPyramid(0.915),
  zanzibar: buildPyramid(0.085),
}
const filterMeta = {
  national: { pop: '63,748,291', male: '49.2%', female: '50.8%' },
  mainland: { pop: '58,319,686', male: '49.1%', female: '50.9%' },
  zanzibar: { pop: '5,428,605',  male: '49.4%', female: '50.6%' },
}

// ── ALL REGIONS ───────────────────────────────────────────
const allRegions = [
  { code:'DAR', name:'Dar es Salaam',  pop:'7.4M',  jurisdiction:'mainland' },
  { code:'ARU', name:'Arusha',         pop:'2.1M',  jurisdiction:'mainland' },
  { code:'DOD', name:'Dodoma',         pop:'2.7M',  jurisdiction:'mainland' },
  { code:'MWA', name:'Mwanza',         pop:'3.7M',  jurisdiction:'mainland' },
  { code:'MBY', name:'Mbeya',          pop:'2.7M',  jurisdiction:'mainland' },
  { code:'TAN', name:'Tanga',          pop:'2.0M',  jurisdiction:'mainland' },
  { code:'KIL', name:'Kilimanjaro',    pop:'1.7M',  jurisdiction:'mainland' },
  { code:'MOR', name:'Morogoro',       pop:'2.5M',  jurisdiction:'mainland' },
  { code:'IRN', name:'Iringa',         pop:'0.9M',  jurisdiction:'mainland' },
  { code:'SHY', name:'Shinyanga',      pop:'1.5M',  jurisdiction:'mainland' },
  { code:'KAG', name:'Kagera',         pop:'2.9M',  jurisdiction:'mainland' },
  { code:'MAR', name:'Mara',           pop:'1.7M',  jurisdiction:'mainland' },
  { code:'MAN', name:'Manyara',        pop:'1.5M',  jurisdiction:'mainland' },
  { code:'TAB', name:'Tabora',         pop:'2.3M',  jurisdiction:'mainland' },
  { code:'KIG', name:'Kigoma',         pop:'2.1M',  jurisdiction:'mainland' },
  { code:'RUK', name:'Rukwa',          pop:'1.0M',  jurisdiction:'mainland' },
  { code:'RUV', name:'Ruvuma',         pop:'1.4M',  jurisdiction:'mainland' },
  { code:'LIN', name:'Lindi',          pop:'0.9M',  jurisdiction:'mainland' },
  { code:'MTW', name:'Mtwara',         pop:'1.3M',  jurisdiction:'mainland' },
  { code:'PWA', name:'Pwani',          pop:'1.1M',  jurisdiction:'mainland' },
  { code:'SIM', name:'Simiyu',         pop:'1.5M',  jurisdiction:'mainland' },
  { code:'GET', name:'Geita',          pop:'1.7M',  jurisdiction:'mainland' },
  { code:'NJO', name:'Njombe',         pop:'0.7M',  jurisdiction:'mainland' },
  { code:'KAT', name:'Katavi',         pop:'0.5M',  jurisdiction:'mainland' },
  { code:'SON', name:'Songwe',         pop:'0.9M',  jurisdiction:'mainland' },
  { code:'SIN', name:'Singida',        pop:'1.3M',  jurisdiction:'mainland' },
  { code:'ZAN', name:'Zanzibar North', pop:'0.6M',  jurisdiction:'zanzibar' },
  { code:'ZAS', name:'Zanzibar South', pop:'0.4M',  jurisdiction:'zanzibar' },
  { code:'ZAW', name:'Zanzibar West',  pop:'1.0M',  jurisdiction:'zanzibar' },
  { code:'PEN', name:'Pemba North',    pop:'0.2M',  jurisdiction:'zanzibar' },
  { code:'PES', name:'Pemba South',    pop:'0.2M',  jurisdiction:'zanzibar' },
]

// ── RECENT ACTIONS ────────────────────────────────────────
const allActions = [
  { icon: CheckCircle2, color:'text-[#00ff9d]', text:'District Admin #4412 (Mwanza) validated 1,200 records',  time:'2026-05-12 14:22:01 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon: RefreshCw,    color:'text-[#00d4ff]', text:'Cloud DB synchronization triggered by System Scheduler', time:'2026-05-12 14:15:44 EAT', status:'SYNCING', sc:'text-[#00d4ff]' },
  { icon: AlertTriangle,color:'text-red-400',   text:'Multiple failed login attempts — Region: Kilimanjaro',   time:'2026-05-12 13:58:12 EAT', status:'BLOCKED', sc:'text-red-400'   },
  { icon: CheckCircle2, color:'text-[#00ff9d]', text:'New District Admin registered — Singida District',       time:'2026-05-12 13:30:05 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon: CheckCircle2, color:'text-[#00ff9d]', text:'Migration #MIG-2026-00431 confirmed — Dodoma to Dar',    time:'2026-05-12 12:47:33 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon: AlertTriangle,color:'text-red-400',   text:'Unauthorized API access attempt blocked — IP: 41.x.x.x', time:'2026-05-12 12:10:00 EAT', status:'BLOCKED', sc:'text-red-400'   },
  { icon: CheckCircle2, color:'text-[#00ff9d]', text:'Village Officer #0891 (Dodoma) registered 340 citizens', time:'2026-05-12 11:55:22 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon: RefreshCw,    color:'text-[#00d4ff]', text:'Population snapshot generated for all 31 regions',       time:'2026-05-12 11:30:00 EAT', status:'SYNCING', sc:'text-[#00d4ff]' },
  { icon: CheckCircle2, color:'text-[#00ff9d]', text:'Birth certificate #BIRTH-2026-07-00012345 issued',        time:'2026-05-12 10:45:10 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon: CheckCircle2, color:'text-[#00ff9d]', text:'Death certificate #DEATH-2026-07-00008409 issued',        time:'2026-05-12 10:22:05 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
]

const NAV = [
  { label:'Dashboard',           Icon: DashboardIcon      },
  { label:'Demographics View',   Icon: PublicIcon         },
  { label:'Infrastructure View', Icon: LocationCityIcon   },
  { label:'District Admins',     Icon: AccountBalanceIcon },
  { label:'Village Officers',    Icon: LocationOnIcon     },
  { label:'Manage Users',        Icon: ManageAccountsIcon },
  { label:'System Performance',  Icon: SpeedIcon          },
  { label:'System Log Reports',  Icon: ArticleIcon        },
  { label:'Security Alerts',     Icon: GppBadIcon         },
]

const STATS = [
  { MuiIcon: Groups2Icon,       label:'Total Population', value:'63,748,291', badge:'+1,247 this week', bColor:'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20', line:'bg-[#00ff9d]', ibg:'bg-[#00ff9d]/10 text-[#00ff9d]' },
  { MuiIcon: AccountBalanceIcon,label:'District Admins',  value:'184',        badge:'12 pending',      bColor:'text-blue-400 bg-blue-500/10 border-blue-500/20',    line:'bg-blue-400',   ibg:'bg-blue-500/10 text-blue-400'   },
  { MuiIcon: MonitorHeartIcon,  label:'System Health',    value:'99.9%',      badge:'DB + Redis OK',   bColor:'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20', line:'bg-[#00d4ff]',  ibg:'bg-[#00d4ff]/10 text-[#00d4ff]' },
  { MuiIcon: SecurityIcon,      label:'Security Alerts',  value:'02',         badge:'AUDIT LOGS',      bColor:'text-red-400 bg-red-500/10 border-red-500/20',        line:'bg-red-400',    ibg:'bg-red-500/10 text-red-400'      },
]

// ── PASSWORD STRENGTH ─────────────────────────────────────
function getStrength(pwd) {
  let score = 0
  if (pwd.length >= 8)           score++
  if (/[A-Z]/.test(pwd))        score++
  if (/[0-9]/.test(pwd))        score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (pwd.length >= 12)          score++
  if (score <= 1) return { label:'Weak',   color:'bg-red-500',    w:'w-1/5' }
  if (score <= 2) return { label:'Fair',   color:'bg-orange-400', w:'w-2/5' }
  if (score <= 3) return { label:'Good',   color:'bg-yellow-400', w:'w-3/5' }
  if (score <= 4) return { label:'Strong', color:'bg-[#00d4ff]',  w:'w-4/5' }
  return                { label:'Very Strong', color:'bg-[#00ff9d]', w:'w-full' }
}

// ── PYRAMID TOOLTIP ───────────────────────────────────────
const PyramidTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0a1628] border border-[#1a3060] rounded-lg p-3 text-xs shadow-xl">
      <p className="text-gray-400 font-mono mb-2">Age {label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.fill }} className="font-semibold">
          {p.name}: {Math.abs(p.value).toLocaleString()}K
        </p>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── MODAL: CHANGE PASSWORD ────────────────────────────────
// ══════════════════════════════════════════════════════════
function ChangePasswordModal({ onClose, darkMode, t }) {
  const [step, setStep]           = useState('email')   // email | token | reset | success
  const [email, setEmail]         = useState('')
  const [token, setToken]         = useState('')
  const [newPwd, setNewPwd]       = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showNew, setShowNew]     = useState(false)
  const [showConf, setShowConf]   = useState(false)
  const [error, setError]         = useState('')
  const strength = getStrength(newPwd)

  const handleSendRequest = (e) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
    setError('')
    // Simulate email sent — in real system calls POST /api/auth/forgot-password
    setStep('token')
  }

  const handleVerifyToken = (e) => {
    e.preventDefault()
    if (token.length < 4) { setError('Please enter the token from your email.'); return }
    setError('')
    // Simulate token validation — any token works for now
    setStep('reset')
  }

  const handleReset = (e) => {
    e.preventDefault()
    if (newPwd.length < 8)        { setError('Password must be at least 8 characters.'); return }
    if (newPwd !== confirmPwd)    { setError('Passwords do not match.'); return }
    setError('')
    setStep('success')
    setTimeout(() => { onClose(); window.location.reload() }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl z-10
                      ${t.card} ${t.cardBorder}`}>

        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${t.border}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20
                            flex items-center justify-center">
              <KeyRound size={15} className="text-[#00d4ff]" />
            </div>
            <div>
              <p className={`font-bold text-sm ${t.text}`}>Change Password</p>
              <p className={`text-[10px] ${t.textSub}`}>
                {step === 'email'   && 'Enter your registered email'}
                {step === 'token'   && 'Check your email for the token'}
                {step === 'reset'   && 'Create your new password'}
                {step === 'success' && 'Password updated successfully'}
              </p>
            </div>
          </div>
          <button onClick={onClose}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center
                             ${t.textDim} hover:text-red-400 hover:bg-red-500/10 transition-all`}>
            <X size={15} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 px-6 pt-4">
          {['email','token','reset','success'].map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500
                                    ${['email','token','reset','success'].indexOf(step) >= i
                                      ? 'bg-[#00d4ff]' : darkMode ? 'bg-gray-200' : 'bg-[#1e2d45]'}`} />
          ))}
        </div>

        <div className="px-6 py-5">

          {/* STEP 1 — Email */}
          {step === 'email' && (
            <form onSubmit={handleSendRequest} className="space-y-4">
              <p className={`text-xs ${t.textSub}`}>
                Enter your registered email address. We will send you a reset token.
              </p>
              <div className="relative">
                <Mail size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
                <input
                  type="email"
                  placeholder="admin@nbs.go.tz"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm
                             rounded-lg pl-9 pr-4 py-2.5 outline-none
                             focus:border-[#00d4ff]/50 placeholder-gray-500 transition-colors`}
                />
              </div>
              {error && <p className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle size={11} /> {error}
              </p>}
              <button type="submit"
                      className="w-full bg-[#00d4ff]/10 border border-[#00d4ff]/30
                                 text-[#00d4ff] hover:bg-[#00d4ff]/20 font-semibold
                                 text-sm py-2.5 rounded-lg transition-all">
                Send Reset Token
              </button>
            </form>
          )}

          {/* STEP 2 — Token */}
          {step === 'token' && (
            <form onSubmit={handleVerifyToken} className="space-y-4">
              <div className={`p-3 rounded-lg border ${darkMode ? 'bg-blue-50 border-blue-200' : 'bg-[#00d4ff]/5 border-[#00d4ff]/20'}`}>
                <p className="text-[#00d4ff] text-xs">
                  A reset token has been sent to <strong>{email}</strong>.
                  Check your inbox and enter the token below.
                </p>
              </div>
              <div className="relative">
                <ShieldCheck size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
                <input
                  type="text"
                  placeholder="Enter token from email"
                  value={token}
                  onChange={e => { setToken(e.target.value); setError('') }}
                  className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm
                             rounded-lg pl-9 pr-4 py-2.5 outline-none
                             focus:border-[#00d4ff]/50 placeholder-gray-500 transition-colors
                             font-mono tracking-widest`}
                />
              </div>
              {error && <p className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle size={11} /> {error}
              </p>}
              <button type="submit"
                      className="w-full bg-[#00d4ff]/10 border border-[#00d4ff]/30
                                 text-[#00d4ff] hover:bg-[#00d4ff]/20 font-semibold
                                 text-sm py-2.5 rounded-lg transition-all">
                Verify Token
              </button>
              <button type="button" onClick={() => setStep('email')}
                      className={`w-full text-xs ${t.textSub} hover:underline`}>
                ← Back to email
              </button>
            </form>
          )}

          {/* STEP 3 — Reset */}
          {step === 'reset' && (
            <form onSubmit={handleReset} className="space-y-4">
              {/* New password */}
              <div>
                <label className={`text-xs font-medium ${t.textDim} mb-1.5 block`}>New Password</label>
                <div className="relative">
                  <Lock size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
                  <input
                    type={showNew ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={newPwd}
                    onChange={e => { setNewPwd(e.target.value); setError('') }}
                    className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm
                               rounded-lg pl-9 pr-10 py-2.5 outline-none
                               focus:border-[#00d4ff]/50 placeholder-gray-500 transition-colors`}
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.textDim} hover:text-gray-400`}>
                    {showNew ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
                {/* Strength bar */}
                {newPwd && (
                  <div className="mt-2">
                    <div className={`h-1 w-full rounded-full ${darkMode ? 'bg-gray-200' : 'bg-[#1e2d45]'}`}>
                      <div className={`h-1 rounded-full transition-all duration-300 ${strength.color} ${strength.w}`} />
                    </div>
                    <p className={`text-[10px] mt-1 font-mono ${t.textSub}`}>
                      Strength: <span style={{ color: strength.color.includes('red') ? '#ef4444' : strength.color.includes('orange') ? '#f97316' : strength.color.includes('yellow') ? '#eab308' : '#00d4ff' }}>{strength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className={`text-xs font-medium ${t.textDim} mb-1.5 block`}>Confirm Password</label>
                <div className="relative">
                  <Lock size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
                  <input
                    type={showConf ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={confirmPwd}
                    onChange={e => { setConfirmPwd(e.target.value); setError('') }}
                    className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm
                               rounded-lg pl-9 pr-10 py-2.5 outline-none
                               focus:border-[#00d4ff]/50 placeholder-gray-500 transition-colors`}
                  />
                  <button type="button" onClick={() => setShowConf(!showConf)}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.textDim} hover:text-gray-400`}>
                    {showConf ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
                {confirmPwd && newPwd !== confirmPwd && (
                  <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> Passwords do not match
                  </p>
                )}
                {confirmPwd && newPwd === confirmPwd && (
                  <p className="text-[#00ff9d] text-[10px] mt-1 flex items-center gap-1">
                    <CheckCircle size={10} /> Passwords match
                  </p>
                )}
              </div>

              {error && <p className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle size={11} /> {error}
              </p>}

              <button type="submit"
                      className="w-full bg-[#00ff9d]/10 border border-[#00ff9d]/30
                                 text-[#00ff9d] hover:bg-[#00ff9d]/20 font-semibold
                                 text-sm py-2.5 rounded-lg transition-all">
                Update Password
              </button>
            </form>
          )}

          {/* STEP 4 — Success */}
          {step === 'success' && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30
                              flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-[#00ff9d]" />
              </div>
              <p className={`font-bold text-base mb-2 ${t.text}`}>Password Updated!</p>
              <p className={`text-xs ${t.textSub}`}>
                Your password has been changed successfully.
                The page will refresh shortly...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── MODAL: NEW REGISTRATION CHOOSER ──────────────────────
// ══════════════════════════════════════════════════════════
function NewRegistrationModal({ onClose, darkMode, t }) {
  const [registerRole, setRegisterRole] = useState(null)

  const TYPES = [
    {
      Icon: AdminPanelSettingsIcon,
      title: 'Register Super Admin',
      desc: 'National-level administrator with full system access.',
      note: 'Max 5 super admins allowed system-wide.',
      current: 3, max: 5,
      accent: 'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20',
      bar: 'bg-[#00d4ff]',
    },
    {
      Icon: CorporateFareIcon,
      title: 'Register District Admin',
      desc: 'District-level administrator. Minimum 2 per district.',
      note: 'Can register village officers and hospital officers.',
      current: 184, max: 200,
      accent: 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20',
      bar: 'bg-[#00ff9d]',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-lg rounded-2xl border shadow-2xl z-10
                      ${t.card} ${t.cardBorder}`}>

        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${t.border}`}>
          <div>
            <p className={`font-bold text-sm ${t.text}`}>New Registration</p>
            <p className={`text-[10px] ${t.textSub}`}>Select the type of registration to proceed</p>
          </div>
          <button onClick={onClose}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center
                             ${t.textDim} hover:text-red-400 hover:bg-red-500/10 transition-all`}>
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-3">
          {TYPES.map(({ Icon, title, desc, note, current, max, accent, bar }) => {
            const pct = Math.round((current / max) * 100)
            const full = current >= max
            return (
              <button
                key={title}
                disabled={full}
                onClick={() => { if (!full) setRegisterRole(title.replace('Register ', '')) }}

                className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                           ${full
                             ? `opacity-50 cursor-not-allowed ${t.cardBorder} ${t.card}`
                             : `${t.cardBorder} ${t.card} hover:border-[#00d4ff]/40 hover:shadow-lg`
                           }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${accent}`}>
                    <Icon sx={{ fontSize: 20 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-bold text-sm ${t.text}`}>{title}</p>
                      {full && (
                        <span className="text-[9px] font-mono text-red-400 bg-red-500/10
                                        border border-red-500/20 px-1.5 py-0.5 rounded-full">
                          LIMIT REACHED
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${t.textSub} mb-2`}>{desc}</p>
                    <p className={`text-[10px] font-mono ${t.textDim} mb-2`}>{note}</p>
                    {/* Capacity bar */}
                    <div className="flex items-center gap-2">
                      <div className={`flex-1 h-1.5 rounded-full ${darkMode ? 'bg-gray-200' : 'bg-[#1e2d45]'}`}>
                        <div className={`h-1.5 rounded-full transition-all ${bar}`}
                             style={{ width: `${pct}%` }} />
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 ${t.textSub}`}>
                        {current}/{max}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className={`px-6 pb-5`}>
          <button onClick={onClose}
                  className={`w-full py-2 rounded-lg text-xs ${t.textSub}
                             border ${t.cardBorder} hover:border-red-400/30 hover:text-red-400
                             transition-all`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
{registerRole && (
  <RegisterAdminModal
    role={registerRole}
    onClose={() => setRegisterRole(null)}
    darkMode={darkMode}
    t={t}
  />
)}
}

// ══════════════════════════════════════════════════════════
// ── MODAL: ALL REGIONS ────────────────────────────────────
// ══════════════════════════════════════════════════════════
function AllRegionsModal({ onClose, darkMode, t }) {
  const [search,      setSearch]      = useState('')
  const [jurisFilter, setJurisFilter] = useState('all')

  const filtered = allRegions.filter(r => {
    const matchJuris = jurisFilter === 'all' || r.jurisdiction === jurisFilter
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        r.code.toLowerCase().includes(search.toLowerCase())
    return matchJuris && matchSearch
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-lg rounded-2xl border shadow-2xl z-10 flex flex-col
                      ${t.card} ${t.cardBorder}`} style={{ maxHeight: '85vh' }}>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${t.border} shrink-0`}>
          <div>
            <p className={`font-bold text-sm ${t.text}`}>All Regions</p>
            <p className={`text-[10px] ${t.textSub}`}>{filtered.length} of {allRegions.length} regions</p>
          </div>
          <button onClick={onClose}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center
                             ${t.textDim} hover:text-red-400 hover:bg-red-500/10 transition-all`}>
            <X size={15} />
          </button>
        </div>

        {/* Filters */}
        <div className={`px-5 py-3 border-b ${t.border} shrink-0 space-y-2`}>
          {/* Jurisdiction filter */}
          <div className="flex gap-2">
            {['all','mainland','zanzibar'].map(f => (
              <button
                key={f}
                onClick={() => setJurisFilter(f)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase
                           font-bold transition-all border
                           ${jurisFilter === f
                             ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                             : darkMode
                               ? 'bg-gray-100 border-gray-300 text-gray-500'
                               : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'
                           }`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={12} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
            <input
              type="text"
              placeholder="Search region name or code..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-xs
                         rounded-lg pl-8 pr-4 py-2 outline-none
                         focus:border-[#00d4ff]/40 placeholder-gray-500 transition-colors`}
            />
          </div>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto flex-1 p-3 space-y-1.5">
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <p className={`text-sm ${t.textSub}`}>No regions found</p>
            </div>
          ) : filtered.map(({ code, name, pop, jurisdiction }) => (
            <div key={code}
                 className={`flex items-center gap-3 p-3 rounded-lg border
                            transition-all cursor-pointer ${t.rowHover}`}>
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0
                              ${darkMode ? 'bg-gray-100 border-gray-300' : 'bg-[#1a2d4a] border-[#2a4060]'}`}>
                <span className={`text-[9px] font-mono font-bold ${t.textDim}`}>{code}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${t.text}`}>{name}</p>
                <p className={`text-[10px] ${t.textSub} capitalize`}>{jurisdiction}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xs font-bold ${t.text}`}>{pop}</p>
                <span className="text-[9px] font-mono text-[#00ff9d] bg-[#00ff9d]/10
                                border border-[#00ff9d]/20 px-1.5 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── MODAL: ALL ACTIONS ────────────────────────────────────
// ══════════════════════════════════════════════════════════
function AllActionsModal({ onClose, darkMode, t }) {
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = allActions.filter(a => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    const matchSearch = a.text.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl z-10 flex flex-col
                      ${t.card} ${t.cardBorder}`} style={{ maxHeight: '85vh' }}>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${t.border} shrink-0`}>
          <div>
            <p className={`font-bold text-sm ${t.text}`}>All Administrative Actions</p>
            <p className={`text-[10px] ${t.textSub}`}>{filtered.length} records</p>
          </div>
          <button onClick={onClose}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center
                             ${t.textDim} hover:text-red-400 hover:bg-red-500/10 transition-all`}>
            <X size={15} />
          </button>
        </div>

        {/* Filters */}
        <div className={`px-5 py-3 border-b ${t.border} shrink-0 space-y-2`}>
          <div className="flex gap-2 flex-wrap">
            {['all','SUCCESS','SYNCING','BLOCKED'].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase
                           font-bold transition-all border
                           ${statusFilter === f
                             ? f === 'SUCCESS' ? 'bg-[#00ff9d]/10 border-[#00ff9d]/40 text-[#00ff9d]'
                               : f === 'SYNCING' ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                               : f === 'BLOCKED' ? 'bg-red-500/10 border-red-500/40 text-red-400'
                               : 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                             : darkMode
                               ? 'bg-gray-100 border-gray-300 text-gray-500'
                               : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'
                           }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={12} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
            <input
              type="text"
              placeholder="Search actions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-xs
                         rounded-lg pl-8 pr-4 py-2 outline-none
                         focus:border-[#00d4ff]/40 placeholder-gray-500 transition-colors`}
            />
          </div>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto flex-1 p-3 space-y-1.5">
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <p className={`text-sm ${t.textSub}`}>No actions found</p>
            </div>
          ) : filtered.map((a, i) => (
            <div key={i}
                 className={`flex items-center gap-3 p-3 rounded-lg border
                            transition-all ${t.rowHover}`}>
              <a.icon size={13} className={`shrink-0 ${a.color}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs ${t.text}`}>{a.text}</p>
                <p className={`text-[10px] font-mono mt-0.5 ${t.textSub}`}>{a.time}</p>
              </div>
              <span className={`text-[9px] font-mono font-bold shrink-0 ${a.sc}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: DASHBOARD ───────────────────────────────────
// ══════════════════════════════════════════════════════════
function DashboardContent({ darkMode, t, onNewReg }) {
  const [pyramidFilter, setPyramidFilter] = useState('national')
  const [showAllRegions, setShowAllRegions] = useState(false)
  const [showAllActions, setShowAllActions] = useState(false)

  const rawData   = pyramidData[pyramidFilter]
  const meta      = filterMeta[pyramidFilter]
  const chartData = rawData.map(d => ({ age:d.age, male:-d.male, female:d.female }))

  return (
    <div className="space-y-5">
      {/* Modals */}
      {showAllRegions && <AllRegionsModal onClose={() => setShowAllRegions(false)} darkMode={darkMode} t={t} />}
      {showAllActions && <AllActionsModal onClose={() => setShowAllActions(false)} darkMode={darkMode} t={t} />}

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Dashboard Overview</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>NBS National Intelligence Command Center</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border
                             text-xs font-medium transition-all
                             ${darkMode
                               ? 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                               : 'bg-[#111827] border-[#1e2d45] text-gray-400 hover:text-white hover:border-[#2a4060]'
                             }`}>
            <ArrowUpRight size={13} /> Export Report
          </button>
          <button
            onClick={onNewReg}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg
                       bg-[#00d4ff]/10 border border-[#00d4ff]/30
                       text-[#00d4ff] hover:bg-[#00d4ff]/20
                       transition-all text-xs font-medium">
            <Plus size={13} /> New Registration
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {STATS.map(({ MuiIcon, label, value, badge, bColor, line, ibg }) => (
          <div key={label}
               className={`${t.card} border ${t.cardBorder} rounded-xl p-4
                           hover:shadow-lg transition-all duration-200`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ibg}`}>
                <MuiIcon sx={{ fontSize: 18 }} />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${bColor}`}>
                {badge}
              </span>
            </div>
            <p className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${t.textDim}`}>{label}</p>
            <p className={`font-bold text-xl sm:text-2xl ${t.text}`}>{value}</p>
            <div className={`mt-3 h-0.5 rounded-full ${line}`} />
          </div>
        ))}
      </div>

      {/* Pyramid + Right */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Pyramid */}
        <div className={`xl:col-span-2 ${t.card} border ${t.cardBorder} rounded-xl p-4 sm:p-5`}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
            <div>
              <h2 className={`font-bold text-sm ${t.text}`}>Population Growth Trend</h2>
              <p className={`text-[10px] font-mono mt-0.5 ${t.textSub}`}>NATIONAL LIVE CENSUS DATA</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              {['national','mainland','zanzibar'].map(f => (
                <button key={f} onClick={() => setPyramidFilter(f)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold
                                   uppercase transition-all border
                                   ${pyramidFilter === f
                                     ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                     : darkMode
                                       ? 'bg-gray-100 border-gray-300 text-gray-500'
                                       : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'
                                   }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className={`flex gap-5 mb-3 pb-3 border-b ${t.border}`}>
            <div><p className={`text-[9px] font-mono ${t.textSub}`}>TOTAL</p><p className={`font-bold text-base ${t.text}`}>{meta.pop}</p></div>
            <div><p className="text-[#00d4ff] text-[9px] font-mono">MALE</p><p className="text-[#00d4ff] font-bold text-base">{meta.male}</p></div>
            <div><p className="text-[#ff6b9d] text-[9px] font-mono">FEMALE</p><p className="text-[#ff6b9d] font-bold text-base">{meta.female}</p></div>
          </div>
          <div className="flex gap-5 mb-2">
            <div className="flex items-center gap-1.5 text-[10px] text-[#00d4ff]">
              <div className="w-3 h-2 rounded-sm bg-[#00d4ff]/70" /> Male ←
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#ff6b9d]">
              → Female <div className="w-3 h-2 rounded-sm bg-[#ff6b9d]/70" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical"
                      margin={{ top:0, right:10, left:32, bottom:0 }} barCategoryGap="8%">
              <CartesianGrid strokeDasharray="3 3"
                stroke={darkMode ? '#e5e7eb' : '#1e2d45'} horizontal={false} />
              <XAxis type="number"
                tick={{ fill: darkMode ? '#6b7280':'#4a6080', fontSize:9, fontFamily:'monospace' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => `${Math.abs(v)}K`} />
              <YAxis type="category" dataKey="age"
                tick={{ fill: darkMode ? '#9ca3af':'#6b7280', fontSize:9, fontFamily:'monospace' }}
                axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<PyramidTooltip />} />
              <Bar dataKey="male" name="Male" radius={[0,2,2,0]}>
                {chartData.map((_,i) => <Cell key={i} fill="#00d4ff" fillOpacity={0.75} />)}
              </Bar>
              <Bar dataKey="female" name="Female" radius={[2,0,0,2]}>
                {chartData.map((_,i) => <Cell key={i} fill="#ff6b9d" fillOpacity={0.75} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right panel */}
        <div className="space-y-3">
          {/* Regional Connectivity */}
          <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-bold text-sm ${t.text}`}>Regional Connectivity</h3>
              <button onClick={() => setShowAllRegions(true)}
                      className="text-[#00d4ff] text-[10px] font-mono hover:underline
                                 flex items-center gap-1">
                <Eye size={10} /> VIEW ALL
              </button>
            </div>
            <div className="space-y-2">
              {allRegions.slice(0,5).map(({ code, name, pop }) => (
                <div key={code}
                     className={`flex items-center gap-3 p-2.5 rounded-lg border
                                transition-all cursor-pointer ${t.rowHover}`}>
                  <div className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0
                                  ${darkMode ? 'bg-gray-100 border-gray-300' : 'bg-[#1a2d4a] border-[#2a4060]'}`}>
                    <BadgeIcon sx={{ fontSize: 13, color: '#6b7280' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${t.text}`}>{name}</p>
                    <p className={`text-[10px] ${t.textSub}`}>{pop}</p>
                  </div>
                  <span className="text-[9px] font-mono text-[#00ff9d]
                                   bg-[#00ff9d]/10 border border-[#00ff9d]/20
                                   px-1.5 py-0.5 rounded-full shrink-0">LIVE</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Households */}
          <div className="bg-gradient-to-br from-[#00c853]/15 to-[#00d4ff]/5
                          border border-[#00c853]/25 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <HomeWorkIcon sx={{ fontSize:15, color:'#00ff9d' }} />
              <p className="text-[#00ff9d] text-[9px] font-mono tracking-widest">ACTIVE HOUSEHOLDS</p>
            </div>
            <p className={`font-bold text-3xl mb-1 ${t.text}`}>12.4M</p>
            <p className={`text-xs mb-3 ${t.textSub}`}>Secured Digital Entries</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-[#00ff9d]
                              bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-full px-2 py-0.5">
                <TrendingUp size={9} /> +8k this week
              </div>
              <HomeWorkIcon sx={{ fontSize:28, color:'rgba(0,200,83,0.2)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Actions */}
      <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4 sm:p-5`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-bold text-sm ${t.text}`}>Recent Administrative Actions</h3>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono ${t.textSub}`}>LAST 24 HOURS</span>
            <button onClick={() => setShowAllActions(true)}
                    className="text-[#00d4ff] text-[10px] font-mono hover:underline flex items-center gap-1">
              <Eye size={10} /> VIEW ALL
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {allActions.slice(0,5).map((a, i) => (
            <div key={i}
                 className={`flex items-center gap-3 p-3 rounded-lg border
                            transition-all cursor-pointer ${t.rowHover}`}>
              <a.icon size={13} className={`shrink-0 ${a.color}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs truncate ${t.text}`}>{a.text}</p>
                <p className={`text-[10px] font-mono mt-0.5 ${t.textSub}`}>{a.time}</p>
              </div>
              <span className={`text-[9px] font-mono font-bold shrink-0 hidden sm:block ${a.sc}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: DEMOGRAPHICS VIEW ────────────────────────────
// ══════════════════════════════════════════════════════════
function DemographicsContent({ darkMode, t }) {
  const [level,         setLevel]         = useState('national')
  const [pyramidFilter, setPyramidFilter] = useState('national')
  const [showDetails,   setShowDetails]   = useState(null)

  const meta      = filterMeta[pyramidFilter]
  const rawData   = pyramidData[pyramidFilter]
  const chartData = rawData.map(d => ({ age:d.age, male:-d.male, female:d.female }))

  const LEVELS = ['national','region','district','ward','village']

  const DEMOGRAPHIC_CARDS = [
    { label:'Total Population',    value:'63,748,291', sub:'Status: Alive only',      color:'text-[#00ff9d]', bg:'bg-[#00ff9d]/10 border-[#00ff9d]/20' },
    { label:'Male Population',     value:'31,364,159', sub:'49.2% of total',          color:'text-[#00d4ff]', bg:'bg-[#00d4ff]/10 border-[#00d4ff]/20' },
    { label:'Female Population',   value:'32,384,132', sub:'50.8% of total',          color:'text-[#ff6b9d]', bg:'bg-[#ff6b9d]/10 border-[#ff6b9d]/20' },
    { label:'Registered Births',   value:'1,247,320',  sub:'This year',               color:'text-blue-400',  bg:'bg-blue-500/10 border-blue-500/20'   },
    { label:'Registered Deaths',   value:'312,840',    sub:'This year',               color:'text-red-400',   bg:'bg-red-500/10 border-red-500/20'     },
    { label:'Active Migrations',   value:'4,891',      sub:'Pending confirmations',   color:'text-yellow-400',bg:'bg-yellow-500/10 border-yellow-500/20'},
    { label:'Active Marriages',    value:'12,340,210', sub:'Registered couples',      color:'text-purple-400',bg:'bg-purple-500/10 border-purple-500/20'},
    { label:'Disability Status',   value:'2,140,000',  sub:'3.4% of population',      color:'text-orange-400',bg:'bg-orange-500/10 border-orange-500/20'},
  ]

  const EDUCATION = [
    { level:'No Education',   pct:18 },
    { level:'Primary',        pct:35 },
    { level:'O-Level',        pct:22 },
    { level:'A-Level',        pct:8  },
    { level:'Certificate',    pct:5  },
    { level:'Diploma',        pct:5  },
    { level:"Bachelor's",     pct:4  },
    { level:"Master's+",      pct:2  },
    { level:'Other (VETA etc)',pct:1  },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Demographics View</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>National census demographics — live data</p>
        </div>
        {/* Level drill-down */}
        <div className="flex gap-1.5 flex-wrap">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase
                               font-bold transition-all border flex items-center gap-1
                               ${level === l
                                 ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                 : darkMode
                                   ? 'bg-gray-100 border-gray-300 text-gray-500'
                                   : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'
                               }`}>
              {l}
              {level === l && <ChevronDown size={9} />}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {DEMOGRAPHIC_CARDS.map(({ label, value, sub, color, bg }) => (
          <div key={label}
               onClick={() => setShowDetails(label)}
               className={`${t.card} border ${t.cardBorder} rounded-xl p-4 cursor-pointer
                           hover:shadow-lg transition-all duration-200 hover:border-[#00d4ff]/30`}>
            <p className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${t.textDim}`}>{label}</p>
            <p className={`font-bold text-lg sm:text-xl mb-1 ${t.text}`}>{value}</p>
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${color} ${bg}`}>
              {sub}
            </span>
          </div>
        ))}
      </div>

      {/* Pyramid + Education */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Population Pyramid */}
        <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h2 className={`font-bold text-sm ${t.text}`}>Population Pyramid</h2>
              <p className={`text-[10px] font-mono ${t.textSub}`}>Age & gender distribution</p>
            </div>
            <div className="flex gap-1.5">
              {['national','mainland','zanzibar'].map(f => (
                <button key={f} onClick={() => setPyramidFilter(f)}
                        className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold
                                   transition-all border
                                   ${pyramidFilter === f
                                     ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                     : darkMode
                                       ? 'bg-gray-100 border-gray-300 text-gray-500'
                                       : 'bg-white/5 border-[#1e2d45] text-gray-500'
                                   }`}>
                  {f === 'national' ? 'NAT' : f === 'mainland' ? 'MAIN' : 'ZAN'}
                </button>
              ))}
            </div>
          </div>
          <div className={`flex gap-4 mb-3 pb-2 border-b ${t.border}`}>
            <div><p className={`text-[9px] font-mono ${t.textSub}`}>TOTAL</p><p className={`font-bold text-sm ${t.text}`}>{meta.pop}</p></div>
            <div><p className="text-[#00d4ff] text-[9px] font-mono">MALE</p><p className="text-[#00d4ff] font-bold text-sm">{meta.male}</p></div>
            <div><p className="text-[#ff6b9d] text-[9px] font-mono">FEMALE</p><p className="text-[#ff6b9d] font-bold text-sm">{meta.female}</p></div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical"
                      margin={{ top:0, right:10, left:32, bottom:0 }} barCategoryGap="8%">
              <CartesianGrid strokeDasharray="3 3"
                stroke={darkMode ? '#e5e7eb' : '#1e2d45'} horizontal={false} />
              <XAxis type="number"
                tick={{ fill: darkMode ? '#6b7280':'#4a6080', fontSize:9, fontFamily:'monospace' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => `${Math.abs(v)}K`} />
              <YAxis type="category" dataKey="age"
                tick={{ fill: darkMode ? '#9ca3af':'#6b7280', fontSize:9, fontFamily:'monospace' }}
                axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<PyramidTooltip />} />
              <Bar dataKey="male" name="Male" radius={[0,2,2,0]}>
                {chartData.map((_,i) => <Cell key={i} fill="#00d4ff" fillOpacity={0.75} />)}
              </Bar>
              <Bar dataKey="female" name="Female" radius={[2,0,0,2]}>
                {chartData.map((_,i) => <Cell key={i} fill="#ff6b9d" fillOpacity={0.75} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Education Level */}
        <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
          <h2 className={`font-bold text-sm mb-1 ${t.text}`}>Education Level Distribution</h2>
          <p className={`text-[10px] font-mono mb-4 ${t.textSub}`}>% of registered citizens</p>
          <div className="space-y-2.5">
            {EDUCATION.map(({ level, pct }) => (
              <div key={level}>
                <div className="flex justify-between mb-1">
                  <p className={`text-[10px] ${t.text}`}>{level}</p>
                  <p className={`text-[10px] font-mono font-bold ${t.text}`}>{pct}%</p>
                </div>
                <div className={`h-1.5 rounded-full ${darkMode ? 'bg-gray-200' : 'bg-[#1e2d45]'}`}>
                  <div className="h-1.5 rounded-full bg-[#00d4ff] transition-all duration-500"
                       style={{ width: `${pct * 2.5}%`, opacity: 0.4 + pct / 100 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal placeholder */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"
               onClick={() => setShowDetails(null)} />
          <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl z-10 p-6
                          ${t.card} ${t.cardBorder}`}>
            <div className="flex items-center justify-between mb-4">
              <p className={`font-bold text-sm ${t.text}`}>{showDetails}</p>
              <button onClick={() => setShowDetails(null)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center
                                 ${t.textDim} hover:text-red-400 hover:bg-red-500/10`}>
                <X size={15} />
              </button>
            </div>
            <p className={`text-xs ${t.textSub}`}>
              Detailed breakdown for <strong>{showDetails}</strong> will load
              from the backend API in Sprint 3. This panel will show
              regional/district drill-down charts and filterable data tables.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── PLACEHOLDER PAGE ─────────────────────────────────────
// ══════════════════════════════════════════════════════════
function PlaceholderPage({ title, sprint, t }) {
  return (
    <div className="flex items-center justify-center h-full min-h-64">
      <div className="text-center">
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto mb-4
                        ${t.card} ${t.cardBorder}`}>
          <span className="text-2xl">🚧</span>
        </div>
        <p className={`font-bold text-lg ${t.text}`}>{title}</p>
        <p className={`text-sm mt-1 ${t.textSub}`}>Implemented in {sprint}</p>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── MAIN COMPONENT ────────────────────────────────────────
// ══════════════════════════════════════════════════════════
export default function SuperAdminDashboard() {
  const [sidebarOpen,  setSidebarOpen]  = useState(false)
  const [activeNav,    setActiveNav]    = useState('Dashboard')
  const [darkMode,     setDarkMode]     = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showChangePwd,setShowChangePwd]= useState(false)
  const [showNewReg,   setShowNewReg]   = useState(false)
  const settingsRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Theme classes
  const t = {
    bg:        darkMode ? 'bg-gray-50'      : 'bg-[#0b111e]',
    sidebar:   darkMode ? 'bg-white'        : 'bg-[#0d1526]',
    border:    darkMode ? 'border-gray-200' : 'border-[#1a2d4a]',
    card:      darkMode ? 'bg-white'        : 'bg-[#111827]',
    cardBorder:darkMode ? 'border-gray-200' : 'border-[#1e2d45]',
    input:     darkMode ? 'bg-gray-100'     : 'bg-[#111827]',
    topbar:    darkMode ? 'bg-white'        : 'bg-[#0d1526]',
    text:      darkMode ? 'text-gray-900'   : 'text-white',
    textDim:   darkMode ? 'text-gray-500'   : 'text-gray-500',
    textSub:   darkMode ? 'text-gray-600'   : 'text-gray-600',
    navActive: darkMode ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20',
    navHover:  darkMode ? 'hover:bg-gray-100 hover:text-gray-900'
                        : 'hover:bg-white/5 hover:text-gray-200',
    rowHover:  darkMode ? 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        : 'bg-[#0d1526] border-[#1a2d4a] hover:border-[#2a4060]',
    footer:    darkMode ? 'bg-white'        : 'bg-[#0d1526]',
    iconBtn:   darkMode ? 'bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900'
                        : 'bg-[#111827] border-[#1e2d45] text-gray-500 hover:text-white',
    dropdown:  darkMode ? 'bg-white border-gray-200'    : 'bg-[#0d1526] border-[#1a2d4a]',
    dropItem:  darkMode ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
  }

  const renderContent = () => {
    switch (activeNav) {
      case 'Dashboard':          return <DashboardContent darkMode={darkMode} t={t} onNewReg={() => setShowNewReg(true)} />
      case 'Demographics View':  return <DemographicsContent darkMode={darkMode} t={t} />
      default:                   return <PlaceholderPage title={activeNav} sprint="Sprint 1-6" t={t} />
    }
  }

  return (
    <div className={`flex h-screen overflow-hidden ${t.bg} ${t.text}`}>

      {/* Global modals */}
      {showChangePwd && (
        <ChangePasswordModal onClose={() => setShowChangePwd(false)} darkMode={darkMode} t={t} />
      )}
      {showNewReg && (
        <NewRegistrationModal onClose={() => setShowNewReg(false)} darkMode={darkMode} t={t} />
      )}

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden"
             onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══════ SIDEBAR ══════ */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30
                        w-56 ${t.sidebar} border-r ${t.border}
                        flex flex-col transition-transform duration-300
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className={`flex items-center justify-between px-4 py-4 border-b ${t.border}`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center overflow-hidden
                            ${darkMode ? 'bg-blue-50 border-blue-200' : 'bg-[#1a3060] border-[#2a4a80]'}`}>
              <img src="/logo-placeholder.png" alt="NBS" className="w-full h-full object-cover"
                   onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:16px">🏛</span>' }} />
            </div>
            <div>
              <p className={`font-bold text-[11px] leading-tight ${t.text}`}>Super Admin Panel</p>
              <p className="text-[#00d4ff] text-[9px] font-mono tracking-widest">V 1.0.0</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)}
                  className={`lg:hidden ${t.textDim} hover:text-red-400 transition-colors`}>
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map(({ label, Icon }) => (
            <button key={label}
                    onClick={() => { setActiveNav(label); setSidebarOpen(false) }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                               text-left transition-all duration-150 border text-[11px] font-medium
                               ${activeNav === label
                                 ? t.navActive
                                 : `${t.textDim} ${t.navHover} border-transparent`}`}>
              <Icon sx={{ fontSize:15 }} className="shrink-0" />
              <span className="leading-tight">{label}</span>
              {activeNav === label && <ChevronRight size={10} className="ml-auto opacity-60" />}
            </button>
          ))}
        </nav>

        <div className={`p-2 border-t ${t.border}`}>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                             text-red-400 hover:bg-red-500/10 transition-all text-[11px]
                             font-medium border border-transparent">
            <LogoutIcon sx={{ fontSize:15 }} /> Logout
          </button>
        </div>
      </aside>

      {/* ══════ MAIN ══════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* TOP BAR */}
        <header className={`h-14 ${t.topbar} border-b ${t.border}
                           flex items-center gap-3 px-4 shrink-0`}>
          <button onClick={() => setSidebarOpen(true)}
                  className={`lg:hidden ${t.textDim} hover:text-blue-500 transition-colors`}>
            <Menu size={18} />
          </button>

          <p className={`hidden sm:block font-bold text-sm tracking-wide ${t.text}`}>
            NBS CENSUS SYSTEM
          </p>

          <div className="flex-1 max-w-sm ml-2 relative hidden md:block">
            <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
            <input type="text" placeholder="Global system search..."
                   className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm
                              rounded-lg pl-8 pr-4 py-2 outline-none
                              focus:border-[#00d4ff]/40 placeholder-gray-500 transition-colors`} />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono
                          text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20
                          rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
            SYSTEM SECURE
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {/* Dark/Light toggle */}
            <button onClick={() => setDarkMode(!darkMode)}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center
                               transition-all duration-200 ${t.iconBtn}`}
                    title={darkMode ? 'Dark Mode' : 'Light Mode'}>
              {darkMode
                ? <Moon size={14} className="text-blue-500" />
                : <Sun  size={14} className="text-yellow-400" />}
            </button>

            {/* Bell */}
            <button className={`relative w-8 h-8 rounded-lg border flex items-center justify-center
                               transition-colors ${t.iconBtn}`}>
              <Bell size={14} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Settings dropdown */}
            <div className="relative" ref={settingsRef}>
              <button onClick={() => setSettingsOpen(!settingsOpen)}
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center
                                 transition-all ${t.iconBtn}
                                 ${settingsOpen ? 'border-[#00d4ff]/40 text-[#00d4ff]' : ''}`}>
                <Settings size={14} />
              </button>

              {settingsOpen && (
                <div className={`absolute right-0 top-10 w-48 ${t.dropdown}
                                border rounded-xl shadow-2xl z-50 overflow-hidden`}>
                  <div className="pt-2 pb-2">
                    <p className={`px-4 py-1.5 text-[9px] font-mono tracking-widest ${t.textSub} uppercase`}>
                      Account
                    </p>
                    <button
                      onClick={() => { setSettingsOpen(false); setShowChangePwd(true) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-all ${t.dropItem}`}>
                      <KeyRound size={13} className="text-[#00d4ff] shrink-0" />
                      Change Password
                    </button>
                    <div className={`my-1 border-t ${t.border}`} />
                    <button onClick={() => setSettingsOpen(false)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs
                                       text-red-400 hover:bg-red-500/10 transition-all">
                      <LogOutLucide size={13} className="shrink-0" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin profile */}
            <div className={`flex items-center gap-2 ml-1 pl-3 border-l ${t.border}`}>
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center overflow-hidden
                              ${darkMode ? 'bg-gray-100 border-gray-300' : 'bg-[#1a2d4a] border-[#2a4060]'}`}>
                <img src="/avatar-placeholder.png" alt="Admin" className="w-full h-full object-cover"
                     onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML=`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='#6b7280'><path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z'/></svg>` }} />
              </div>
              <div className="hidden sm:block">
                <p className={`text-[11px] font-bold leading-tight ${t.text}`}>ADMINISTRATOR</p>
                <p className="text-[#00d4ff] text-[9px] font-mono tracking-widest">SUPER ADMIN</p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT — only this area changes */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          {renderContent()}
        </main>

        {/* FOOTER */}
        <footer className={`h-8 ${t.footer} border-t ${t.border}
                           flex items-center justify-between px-4 shrink-0`}>
          <span className="flex items-center gap-1.5 text-[10px] text-[#00ff9d] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
            CENSUS LIVE — LAST UPDATED: 2 MIN AGO
          </span>
          <span className={`text-[10px] hidden sm:block ${t.textSub}`}>
            © 2026 NBS TANZANIA — AUTOMATED DIGITAL LIVE CENSUS MODEL
          </span>
        </footer>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── DEMOGRAPHICS FILTER BAR ───────────────────────────────
// ══════════════════════════════════════════════════════════
const districtsByRegion = {
  'Dar es Salaam':['Ilala','Kinondoni','Temeke','Ubungo','Kigamboni'],
  'Arusha':       ['Arusha City','Meru','Monduli','Ngorongoro','Longido'],
  'Dodoma':       ['Dodoma City','Bahi','Chamwino','Chemba','Kondoa'],
  'Mwanza':       ['Ilemela','Nyamagana','Magu','Kwimba','Sengerema'],
  'Mbeya':        ['Mbeya City','Chunya','Kyela','Mbarali','Rungwe'],
  'Tanga':        ['Tanga City','Handeni','Kilindi','Korogwe','Lushoto'],
  'Kilimanjaro':  ['Moshi Urban','Moshi Rural','Hai','Mwanga','Same'],
  'Morogoro':     ['Morogoro Urban','Kilosa','Kilombero','Ulanga','Mvomero'],
  'Kagera':       ['Bukoba Urban','Bukoba Rural','Biharamulo','Karagwe','Muleba'],
  'Mara':         ['Musoma Urban','Musoma Rural','Bunda','Rorya','Serengeti'],
}

const villagesByDistrict = {
  'Ilala':      ['Buguruni','Chang\'ombe','Gerezani','Kariakoo','Kivukoni'],
  'Kinondoni':  ['Magomeni','Makuburi','Mbezi','Msasani','Sinza'],
  'Temeke':     ['Azimio','Chamazi','Chang\'ombe','Keko','Miburani'],
  'Ilemela':    ['Buswelu','Igogo','Kiloleli','Kirumba','Mkolani'],
  'Nyamagana':  ['Bwiru','Isamilo','Mahina','Mirongo','Nyegezi'],
  'Dodoma City':['Chamwino','Ipagala','Kikuyu','Makulu','Nzuguni'],
  'Moshi Urban':['Bondeni','Kaloleni','Karanga','Mji Mwema','Rau'],
}

function DemographicsFilterBar({ onFilterChange, darkMode, t }) {
  const [scope,          setScope]          = useState('national')
  const [region,         setRegion]         = useState('')
  const [district,       setDistrict]       = useState('')
  const [village,        setVillage]        = useState('')
  const [regionSearch,   setRegionSearch]   = useState('')
  const [districtSearch, setDistrictSearch] = useState('')
  const [villageSearch,  setVillageSearch]  = useState('')
  const [showRegDD,      setShowRegDD]      = useState(false)
  const [showDisDD,      setShowDisDD]      = useState(false)
  const [showVilDD,      setShowVilDD]      = useState(false)

  const scopeRegions = allRegions.filter(r =>
    scope === 'national' ? true : r.jurisdiction === scope
  )
  const filteredRegions = scopeRegions.filter(r =>
    r.name.toLowerCase().includes(regionSearch.toLowerCase()) ||
    r.code.toLowerCase().includes(regionSearch.toLowerCase())
  )
  const availableDistricts = districtsByRegion[region] || []
  const filteredDistricts  = availableDistricts.filter(d =>
    d.toLowerCase().includes(districtSearch.toLowerCase())
  )
  const availableVillages = villagesByDistrict[district] || []
  const filteredVillages  = availableVillages.filter(v =>
    v.toLowerCase().includes(villageSearch.toLowerCase())
  )

  const handleScope = (s) => {
    setScope(s)
    setRegion(''); setDistrict(''); setVillage('')
    setRegionSearch(''); setDistrictSearch(''); setVillageSearch('')
    onFilterChange?.({ scope: s, region: '', district: '', village: '' })
  }
  const selectRegion = (r) => {
    setRegion(r.name); setRegionSearch(r.name)
    setDistrict(''); setVillage('')
    setDistrictSearch(''); setVillageSearch('')
    setShowRegDD(false)
    onFilterChange?.({ scope, region: r.name, district: '', village: '' })
  }
  const selectDistrict = (d) => {
    setDistrict(d); setDistrictSearch(d)
    setVillage(''); setVillageSearch('')
    setShowDisDD(false)
    onFilterChange?.({ scope, region, district: d, village: '' })
  }
  const selectVillage = (v) => {
    setVillage(v); setVillageSearch(v)
    setShowVilDD(false)
    onFilterChange?.({ scope, region, district, village: v })
  }
  const clearAll = () => handleScope(scope)

  const SCOPES = [
    { key:'national', label:'National',  pop:'63,748,291', color:'text-[#00d4ff]', activeBorder:'border-[#00d4ff]/50', activeBg:'bg-[#00d4ff]/10' },
    { key:'mainland', label:'Mainland',  pop:'58,319,686', color:'text-[#00ff9d]', activeBorder:'border-[#00ff9d]/50', activeBg:'bg-[#00ff9d]/10' },
    { key:'zanzibar', label:'Zanzibar',  pop:'5,428,605',  color:'text-orange-400', activeBorder:'border-orange-400/50', activeBg:'bg-orange-400/10' },
  ]

  const inputCls = `w-full ${t?.input || 'bg-[#0a1628]'} border ${t?.cardBorder || 'border-[#1e2d45]'}
                   ${t?.text || 'text-white'} text-xs rounded-lg px-3 py-2 outline-none
                   focus:border-[#00d4ff]/40 placeholder-gray-600 transition-colors`

  return (
    <div className="space-y-3 mb-5">

      {/* 3 Scope cards */}
      <div className="grid grid-cols-3 gap-3">
        {SCOPES.map(({ key, label, pop, color, activeBorder, activeBg }) => (
          <button key={key} onClick={() => handleScope(key)}
                  className={`p-3 rounded-xl border text-left transition-all
                              ${scope === key
                                ? `${activeBg} ${activeBorder}`
                                : `${t?.cardBorder || 'border-[#1e2d45]'} hover:border-[#2a4060]`}`}>
            <p className={`text-[9px] font-bold uppercase tracking-widest
                           ${scope === key ? color : t?.textDim || 'text-gray-500'}`}>
              {label}
            </p>
            <p className={`text-base font-extrabold mt-0.5
                           ${scope === key ? color : t?.textSub || 'text-gray-400'}`}>
              {pop}
            </p>
            <p className={`text-[8px] mt-0.5 ${t?.textDim || 'text-gray-500'}`}>Total Population</p>
          </button>
        ))}
      </div>

      {/* Cascading search dropdowns */}
      <div className="grid grid-cols-3 gap-3 relative">

        {/* Region */}
        <div className="relative">
          <p className={`text-[9px] uppercase tracking-widest mb-1 ${t?.textDim || 'text-gray-500'}`}>
            {region ? `Region: ${region}` : 'Filter by Region'}
          </p>
          <input value={regionSearch}
                 onChange={e => { setRegionSearch(e.target.value); setShowRegDD(true) }}
                 onFocus={() => setShowRegDD(true)}
                 placeholder="Search region..."
                 className={inputCls} />
          {showRegDD && regionSearch && (
            <div className={`absolute top-full mt-1 left-0 right-0 z-30 rounded-lg border shadow-xl
                            max-h-44 overflow-y-auto ${t?.card || 'bg-[#0d1f38]'} ${t?.cardBorder || 'border-[#1e3a5f]'}`}>
              {filteredRegions.length === 0
                ? <p className={`px-3 py-2 text-xs ${t?.textDim || 'text-gray-500'}`}>No regions found</p>
                : filteredRegions.map(r => (
                    <button key={r.code} onClick={() => selectRegion(r)}
                            className={`w-full text-left px-3 py-2 text-xs transition-colors
                                       ${t?.text || 'text-gray-300'} hover:bg-[#1a3060] hover:text-white`}>
                      {r.name}
                      <span className={`ml-2 text-[9px] ${t?.textDim || 'text-gray-600'}`}>{r.pop}</span>
                    </button>
                  ))
              }
            </div>
          )}
        </div>

        {/* District */}
        <div className="relative">
          <p className={`text-[9px] uppercase tracking-widest mb-1 ${t?.textDim || 'text-gray-500'}`}>
            {district ? `District: ${district}` : 'Filter by District'}
          </p>
          <input value={districtSearch}
                 onChange={e => { setDistrictSearch(e.target.value); setShowDisDD(true) }}
                 onFocus={() => setShowDisDD(true)}
                 disabled={!region}
                 placeholder={region ? 'Search district...' : 'Select region first'}
                 className={`${inputCls} disabled:opacity-40 disabled:cursor-not-allowed`} />
          {showDisDD && districtSearch && region && (
            <div className={`absolute top-full mt-1 left-0 right-0 z-30 rounded-lg border shadow-xl
                            max-h-44 overflow-y-auto ${t?.card || 'bg-[#0d1f38]'} ${t?.cardBorder || 'border-[#1e3a5f]'}`}>
              {filteredDistricts.length === 0
                ? <p className={`px-3 py-2 text-xs ${t?.textDim || 'text-gray-500'}`}>No districts found</p>
                : filteredDistricts.map(d => (
                    <button key={d} onClick={() => selectDistrict(d)}
                            className={`w-full text-left px-3 py-2 text-xs transition-colors
                                       ${t?.text || 'text-gray-300'} hover:bg-[#1a3060] hover:text-white`}>
                      {d}
                    </button>
                  ))
              }
            </div>
          )}
        </div>

        {/* Village */}
        <div className="relative">
          <p className={`text-[9px] uppercase tracking-widest mb-1 ${t?.textDim || 'text-gray-500'}`}>
            {village ? `Village: ${village}` : 'Filter by Village'}
          </p>
          <input value={villageSearch}
                 onChange={e => { setVillageSearch(e.target.value); setShowVilDD(true) }}
                 onFocus={() => setShowVilDD(true)}
                 disabled={!district}
                 placeholder={district ? 'Search village...' : 'Select district first'}
                 className={`${inputCls} disabled:opacity-40 disabled:cursor-not-allowed`} />
          {showVilDD && villageSearch && district && (
            <div className={`absolute top-full mt-1 left-0 right-0 z-30 rounded-lg border shadow-xl
                            max-h-44 overflow-y-auto ${t?.card || 'bg-[#0d1f38]'} ${t?.cardBorder || 'border-[#1e3a5f]'}`}>
              {filteredVillages.length === 0
                ? <p className={`px-3 py-2 text-xs ${t?.textDim || 'text-gray-500'}`}>No villages found</p>
                : filteredVillages.map(v => (
                    <button key={v} onClick={() => selectVillage(v)}
                            className={`w-full text-left px-3 py-2 text-xs transition-colors
                                       ${t?.text || 'text-gray-300'} hover:bg-[#1a3060] hover:text-white`}>
                      {v}
                    </button>
                  ))
              }
            </div>
          )}
        </div>
      </div>

      {/* Active filter breadcrumb */}
      {(region || district || village) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[9px] ${t?.textDim || 'text-gray-500'}`}>Showing:</span>
          {region   && <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">{region}</span>}
          {district && <><span className={`text-[9px] ${t?.textDim || 'text-gray-500'}`}>›</span>
                         <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20">{district}</span></>}
          {village  && <><span className={`text-[9px] ${t?.textDim || 'text-gray-500'}`}>›</span>
                         <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-orange-400/10 text-orange-400 border border-orange-400/20">{village}</span></>}
          <button onClick={clearAll}
                  className="text-[9px] text-red-400 hover:underline ml-1">
            Clear ×
          </button>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── EMPLOYMENT STATUS CARD ────────────────────────────────
// ══════════════════════════════════════════════════════════
function EmploymentStatusCard({ darkMode, t }) {
  const bars = [
    { label:'Government Employees', note:'Teachers, Doctors, Officers, Civil Servants', pct:18.4, color:'bg-[#00d4ff]',  text:'text-[#00d4ff]'  },
    { label:'Self Employed',        note:'Farmers, Business Owners, Traders',           pct:47.2, color:'bg-[#00ff9d]',  text:'text-[#00ff9d]'  },
    { label:'Others',               note:'Private Sector, NGO, Informal Workers',       pct:34.4, color:'bg-orange-400', text:'text-orange-400' },
  ]
  return (
    <div className={`p-4 rounded-2xl border ${t.card} ${t.cardBorder}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20
                        flex items-center justify-center">
          <span className="text-purple-400 text-xs">💼</span>
        </div>
        <div>
          <p className={`text-xs font-bold ${t.text}`}>Employment Status</p>
          <p className={`text-[9px] ${t.textDim}`}>Primary Activity · National Estimate</p>
        </div>
      </div>
      <div className="space-y-3">
        {bars.map(({ label, note, pct, color, text }) => (
          <div key={label}>
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className={`text-xs font-semibold ${t.text}`}>{label}</p>
                <p className={`text-[9px] ${t.textDim}`}>{note}</p>
              </div>
              <span className={`text-sm font-bold shrink-0 ml-2 ${text}`}>{pct}%</span>
            </div>
            <div className={`h-1.5 rounded-full ${darkMode ? 'bg-gray-200' : 'bg-[#1e2d45]'}`}>
              <div className={`h-1.5 rounded-full ${color} transition-all duration-700`}
                   style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── MODAL: REGISTER ADMIN ─────────────────────────────────
// ══════════════════════════════════════════════════════════
function RegisterAdminModal({ role, onClose, darkMode, t }) {
  const [step,        setStep]        = useState('form')
  const [employeeId,  setEmployeeId]  = useState('')
  const [nida,        setNida]        = useState('')
  const [email,       setEmail]       = useState('')
  const [nidaLoading, setNidaLoading] = useState(false)
  const [nidaData,    setNidaData]    = useState(null)
  const [error,       setError]       = useState('')

  const STEPS = ['form','nida','confirm','done']

  const fetchNida = () => {
    if (!employeeId.trim()) { setError('Employee ID is required'); return }
    if (nida.length < 8)   { setError('Enter a valid NIDA number'); return }
    setError(''); setNidaLoading(true)
    setTimeout(() => {
      setNidaLoading(false)
      setNidaData({
        fullName: 'PLACEHOLDER · FULL NAME',
        dob:      '01 / 01 / 1985',
        gender:   'Male',
        region:   'Dodoma',
        district: 'Chamwino',
        ward:     'Nzuguni',
        nida,
      })
      setStep('nida')
    }, 2200)
  }

  const handleRegister = () => {
    if (!email.includes('@')) { setError('Enter a valid official email'); return }
    setError(''); setStep('done')
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl z-10
                      ${t.card} ${t.cardBorder}`}>

        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${t.border}`}>
          <div>
            <p className={`font-bold text-sm ${t.text}`}>Register {role}</p>
            <p className={`text-[10px] ${t.textSub}`}>
              {step === 'form'    && 'Step 1 · Employee credentials'}
              {step === 'nida'    && 'Step 2 · Verify NIDA demographics'}
              {step === 'confirm' && 'Step 3 · Set official email'}
              {step === 'done'    && 'Registration complete'}
            </p>
          </div>
          <button onClick={onClose}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center
                             ${t.textDim} hover:text-red-400 hover:bg-red-500/10 transition-all`}>
            <X size={15}/>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 px-6 pt-4">
          {STEPS.map((s, i) => (
            <div key={s}
                 className={`h-1 flex-1 rounded-full transition-all duration-500
                             ${STEPS.indexOf(step) >= i
                               ? 'bg-[#00ff9d]'
                               : darkMode ? 'bg-gray-200' : 'bg-[#1e2d45]'}`} />
          ))}
        </div>

        <div className="px-6 py-5 space-y-4">

          {/* STEP 1 — Credentials form */}
          {step === 'form' && (<>
            <div>
              <label className={`text-[10px] uppercase tracking-widest ${t.textDim} mb-1 block`}>
                Employee ID
              </label>
              <input value={employeeId} onChange={e => { setEmployeeId(e.target.value); setError('') }}
                     placeholder="e.g. EMP-2026-04412"
                     className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm
                                rounded-lg px-4 py-2.5 outline-none font-mono
                                focus:border-[#00d4ff]/50 placeholder-gray-500 transition-colors`} />
            </div>

            <div>
              <label className={`text-[10px] uppercase tracking-widest ${t.textDim} mb-1 block`}>
                NIDA Number
              </label>
              <div className="flex gap-2">
                <input value={nida} onChange={e => { setNida(e.target.value); setError('') }}
                       placeholder="e.g. 19850101-12345-00001-2"
                       className={`flex-1 ${t.input} border ${t.cardBorder} ${t.text} text-sm
                                  rounded-lg px-4 py-2.5 outline-none font-mono
                                  focus:border-[#00d4ff]/50 placeholder-gray-500 transition-colors`} />
                <button onClick={fetchNida} disabled={nidaLoading}
                        className="px-4 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30
                                   text-[#00d4ff] text-xs font-bold hover:bg-[#00d4ff]/20
                                   disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0">
                  {nidaLoading
                    ? <><RefreshCw size={11} className="animate-spin"/> Fetching</>
                    : 'Verify →'}
                </button>
              </div>
              <p className={`text-[9px] ${t.textDim} mt-1`}>
                Fetches demographic info from national NIDA database
              </p>
            </div>

            {error && (
              <p className="text-red-400 text-[10px] flex items-center gap-1">
                <AlertCircle size={10}/> {error}
              </p>
            )}
          </>)}

          {/* STEP 2 — NIDA demographics display */}
          {step === 'nida' && nidaData && (<>
            <div className={`rounded-xl border ${t.cardBorder} overflow-hidden`}>
              {/* Photo + name */}
              <div className={`flex items-center gap-4 p-4 border-b ${t.border}`}>
                <div className={`w-16 h-16 rounded-xl border ${t.cardBorder}
                                ${darkMode ? 'bg-gray-100' : 'bg-[#1a2d4a]'}
                                flex items-center justify-center shrink-0`}>
                  <span className={`text-[8px] text-center ${t.textDim} leading-tight px-1`}>
                    Photo{'\n'}Placeholder
                  </span>
                </div>
                <div>
                  <p className={`font-bold text-sm ${t.text}`}>{nidaData.fullName}</p>
                  <p className={`text-[10px] font-mono ${t.textSub}`}>{nidaData.nida}</p>
                  <p className={`text-[9px] ${t.textDim} mt-0.5`}>Employee ID: {employeeId}</p>
                </div>
              </div>
              {/* Fields */}
              <div className="grid grid-cols-2">
                {[
                  ['Date of Birth', nidaData.dob],
                  ['Gender',        nidaData.gender],
                  ['Region',        nidaData.region],
                  ['District',      nidaData.district],
                  ['Ward',          nidaData.ward],
                  ['Role',          role],
                ].map(([k, v], i) => (
                  <div key={k}
                       className={`p-3 border-b ${i % 2 === 0 ? 'border-r' : ''} ${t.border}`}>
                    <p className={`text-[8.5px] uppercase tracking-widest ${t.textDim}`}>{k}</p>
                    <p className={`text-xs font-semibold ${t.text} mt-0.5`}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className={`text-[10px] ${t.textSub}`}>
              ⚠ Confirm this person matches the intended registrant before proceeding.
            </p>

            <div className="flex gap-3">
              <button onClick={() => setStep('form')}
                      className={`flex-1 py-2.5 rounded-lg text-xs border ${t.cardBorder}
                                 ${t.textSub} hover:border-red-400/30 hover:text-red-400 transition-all`}>
                ← Wrong Person
              </button>
              <button onClick={() => setStep('confirm')}
                      className="flex-1 py-2.5 rounded-lg text-xs bg-[#00ff9d]/10 border
                                 border-[#00ff9d]/30 text-[#00ff9d] font-bold
                                 hover:bg-[#00ff9d]/20 transition-all">
                Confirm Identity ✓
              </button>
            </div>
          </>)}

          {/* STEP 3 — Email */}
          {step === 'confirm' && (<>
            <div className={`p-3 rounded-lg border
                            ${darkMode ? 'bg-green-50 border-green-200' : 'bg-[#00ff9d]/5 border-[#00ff9d]/20'}`}>
              <p className="text-[#00ff9d] text-xs">
                Identity confirmed for <strong>{nidaData?.fullName}</strong>.
                Enter their official government email to send login credentials.
              </p>
            </div>

            <div>
              <label className={`text-[10px] uppercase tracking-widest ${t.textDim} mb-1 block`}>
                Official Email Address
              </label>
              <input value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                     placeholder="official@nbs.go.tz" type="email"
                     className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm
                                rounded-lg px-4 py-2.5 outline-none
                                focus:border-[#00ff9d]/50 placeholder-gray-500 transition-colors`} />
            </div>

            {error && (
              <p className="text-red-400 text-[10px] flex items-center gap-1">
                <AlertCircle size={10}/> {error}
              </p>
            )}

            <div className={`p-3 rounded-lg border ${t.cardBorder} space-y-1`}>
              <p className={`text-[10px] ${t.textDim}`}>📧 Login token will be sent to the email above</p>
              <p className={`text-[10px] ${t.textDim}`}>🔗 Dashboard access link included in the email</p>
              <p className={`text-[10px] ${t.textDim}`}>🔒 Admin must complete profile setup on first login</p>
            </div>

            <button onClick={handleRegister}
                    className="w-full py-3 rounded-xl font-bold text-sm
                               bg-gradient-to-r from-[#00ff9d] to-[#00bb6e]
                               text-[#060f1e] hover:opacity-90 transition-all">
              Register & Send Credentials →
            </button>
          </>)}

          {/* STEP 4 — Done */}
          {step === 'done' && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30
                              flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-[#00ff9d]"/>
              </div>
              <p className={`font-bold text-base mb-2 ${t.text}`}>Registration Successful!</p>
              <p className={`text-xs ${t.textSub} mb-1`}>Login token & dashboard link sent to:</p>
              <p className="text-[#00d4ff] text-xs font-mono">{email}</p>
              <button onClick={onClose}
                      className="mt-5 px-6 py-2 rounded-lg bg-[#00d4ff]/10 border
                                 border-[#00d4ff]/30 text-[#00d4ff] text-xs
                                 hover:bg-[#00d4ff]/20 transition-all">
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
