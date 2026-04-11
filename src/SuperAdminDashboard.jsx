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
  CheckCircle, AlertCircle, MapPin, Shield,
  Wifi, WifiOff, Download, Upload, Activity,
  UserCheck, UserX, Clock, Database, Server,
  Cpu, HardDrive, Globe, FileText, ShieldAlert,
  ChevronUp, MoreVertical, Trash2, Edit3, Eye as EyeIcon
} from 'lucide-react'
import DashboardIcon          from '@mui/icons-material/Dashboard'
import AccountBalanceIcon     from '@mui/icons-material/AccountBalance'
import LocationOnIcon         from '@mui/icons-material/LocationOn'
import ManageAccountsIcon     from '@mui/icons-material/ManageAccounts'
import SpeedIcon              from '@mui/icons-material/Speed'
import ArticleIcon            from '@mui/icons-material/Article'
import GppBadIcon             from '@mui/icons-material/GppBad'
import LogoutIcon             from '@mui/icons-material/Logout'
import PublicIcon             from '@mui/icons-material/Public'
import LocationCityIcon       from '@mui/icons-material/LocationCity'
import Groups2Icon            from '@mui/icons-material/Groups2'
import SecurityIcon           from '@mui/icons-material/Security'
import MonitorHeartIcon       from '@mui/icons-material/MonitorHeart'
import HomeWorkIcon           from '@mui/icons-material/HomeWork'
import BadgeIcon              from '@mui/icons-material/Badge'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CorporateFareIcon      from '@mui/icons-material/CorporateFare'
import SchoolIcon             from '@mui/icons-material/School'
import LocalHospitalIcon      from '@mui/icons-material/LocalHospital'
import ElectricBoltIcon       from '@mui/icons-material/ElectricBolt'
import WaterIcon              from '@mui/icons-material/Water'
import RoadIcon               from '@mui/icons-material/Landscape'

// ── Import modals from ./modals/ ──────────────────────────
import ChangePasswordModal   from './modals/ChangePasswordModal'
import NewRegistrationModal  from './modals/NewRegistrationModal'
import AllRegionsModal       from './modals/AllRegionsModal'
import AllActionsModal       from './modals/AllActionsModal'

// ── PYRAMID DATA ─────────────────────────────────────────
const buildPyramid = (scale = 1) => [
  { age:'75+',   male:Math.round(420  *scale), female:Math.round(580  *scale) },
  { age:'70-74', male:Math.round(580  *scale), female:Math.round(720  *scale) },
  { age:'65-69', male:Math.round(780  *scale), female:Math.round(920  *scale) },
  { age:'60-64', male:Math.round(1020 *scale), female:Math.round(1180 *scale) },
  { age:'55-59', male:Math.round(1380 *scale), female:Math.round(1520 *scale) },
  { age:'50-54', male:Math.round(1820 *scale), female:Math.round(1960 *scale) },
  { age:'45-49', male:Math.round(2240 *scale), female:Math.round(2380 *scale) },
  { age:'40-44', male:Math.round(2780 *scale), female:Math.round(2920 *scale) },
  { age:'35-39', male:Math.round(3420 *scale), female:Math.round(3580 *scale) },
  { age:'30-34', male:Math.round(4180 *scale), female:Math.round(4320 *scale) },
  { age:'25-29', male:Math.round(5020 *scale), female:Math.round(5180 *scale) },
  { age:'20-24', male:Math.round(5840 *scale), female:Math.round(5960 *scale) },
  { age:'15-19', male:Math.round(6420 *scale), female:Math.round(6380 *scale) },
  { age:'10-14', male:Math.round(6980 *scale), female:Math.round(6820 *scale) },
  { age:'5-9',   male:Math.round(7240 *scale), female:Math.round(7060 *scale) },
  { age:'0-4',   male:Math.round(7580 *scale), female:Math.round(7320 *scale) },
]
const pyramidData = {
  national: buildPyramid(1),
  mainland: buildPyramid(0.915),
  zanzibar: buildPyramid(0.085),
}
const filterMeta = {
  national: { pop:'63,748,291', male:'49.2%', female:'50.8%' },
  mainland: { pop:'58,319,686', male:'49.1%', female:'50.9%' },
  zanzibar: { pop:'5,428,605',  male:'49.4%', female:'50.6%' },
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
  { icon:CheckCircle2, color:'text-[#00ff9d]', text:'District Admin #4412 (Mwanza) validated 1,200 records',  time:'2026-05-12 14:22:01 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon:RefreshCw,    color:'text-[#00d4ff]', text:'Cloud DB synchronization triggered by System Scheduler', time:'2026-05-12 14:15:44 EAT', status:'SYNCING', sc:'text-[#00d4ff]' },
  { icon:AlertTriangle,color:'text-red-400',   text:'Multiple failed login attempts — Region: Kilimanjaro',   time:'2026-05-12 13:58:12 EAT', status:'BLOCKED', sc:'text-red-400'   },
  { icon:CheckCircle2, color:'text-[#00ff9d]', text:'New District Admin registered — Singida District',       time:'2026-05-12 13:30:05 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon:CheckCircle2, color:'text-[#00ff9d]', text:'Migration #MIG-2026-00431 confirmed — Dodoma to Dar',    time:'2026-05-12 12:47:33 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon:AlertTriangle,color:'text-red-400',   text:'Unauthorized API access attempt blocked — IP: 41.x.x.x', time:'2026-05-12 12:10:00 EAT', status:'BLOCKED', sc:'text-red-400'   },
  { icon:CheckCircle2, color:'text-[#00ff9d]', text:'Village Officer #0891 (Dodoma) registered 340 citizens', time:'2026-05-12 11:55:22 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon:RefreshCw,    color:'text-[#00d4ff]', text:'Population snapshot generated for all 31 regions',       time:'2026-05-12 11:30:00 EAT', status:'SYNCING', sc:'text-[#00d4ff]' },
  { icon:CheckCircle2, color:'text-[#00ff9d]', text:'Birth certificate #BIRTH-2026-07-00012345 issued',        time:'2026-05-12 10:45:10 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
  { icon:CheckCircle2, color:'text-[#00ff9d]', text:'Death certificate #DEATH-2026-07-00008409 issued',        time:'2026-05-12 10:22:05 EAT', status:'SUCCESS', sc:'text-[#00ff9d]' },
]

const NAV = [
  { label:'Dashboard',           Icon:DashboardIcon       },
  { label:'Demographics View',   Icon:PublicIcon          },
  { label:'Infrastructure View', Icon:LocationCityIcon    },
  { label:'District Admins',     Icon:AccountBalanceIcon  },
  { label:'Village Officers',    Icon:LocationOnIcon      },
  { label:'Manage Users',        Icon:ManageAccountsIcon  },
  { label:'System Performance',  Icon:SpeedIcon           },
  { label:'System Log Reports',  Icon:ArticleIcon         },
  { label:'Security Alerts',     Icon:GppBadIcon          },
]

const STATS = [
  { MuiIcon:Groups2Icon,       label:'Total Population', value:'63,748,291', badge:'+1,247 this week', bColor:'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20', line:'bg-[#00ff9d]', ibg:'bg-[#00ff9d]/10 text-[#00ff9d]' },
  { MuiIcon:AccountBalanceIcon,label:'District Admins',  value:'184',        badge:'12 pending',      bColor:'text-blue-400 bg-blue-500/10 border-blue-500/20',    line:'bg-blue-400',   ibg:'bg-blue-500/10 text-blue-400'   },
  { MuiIcon:MonitorHeartIcon,  label:'System Health',    value:'99.9%',      badge:'DB + Redis OK',   bColor:'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20', line:'bg-[#00d4ff]',  ibg:'bg-[#00d4ff]/10 text-[#00d4ff]' },
  { MuiIcon:SecurityIcon,      label:'Security Alerts',  value:'02',         badge:'AUDIT LOGS',      bColor:'text-red-400 bg-red-500/10 border-red-500/20',        line:'bg-red-400',    ibg:'bg-red-500/10 text-red-400'      },
]

// ── PASSWORD STRENGTH ─────────────────────────────────────
function getStrength(pwd) {
  let score = 0
  if (pwd.length >= 8)           score++
  if (/[A-Z]/.test(pwd))        score++
  if (/[0-9]/.test(pwd))        score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (pwd.length >= 12)          score++
  if (score <= 1) return { label:'Weak',       color:'bg-red-500',    w:'w-1/5'  }
  if (score <= 2) return { label:'Fair',       color:'bg-orange-400', w:'w-2/5'  }
  if (score <= 3) return { label:'Good',       color:'bg-yellow-400', w:'w-3/5'  }
  if (score <= 4) return { label:'Strong',     color:'bg-[#00d4ff]',  w:'w-4/5'  }
  return                 { label:'Very Strong', color:'bg-[#00ff9d]', w:'w-full' }
}

// ── PYRAMID TOOLTIP ───────────────────────────────────────
const PyramidTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0a1628] border border-[#1a3060] rounded-lg p-3 text-xs shadow-xl">
      <p className="text-gray-400 font-mono mb-2">Age {label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color:p.fill }} className="font-semibold">
          {p.name}: {Math.abs(p.value).toLocaleString()}K
        </p>
      ))}
    </div>
  )
}

// ── DISTRICTS & VILLAGES DATA ─────────────────────────────
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
  'Manyara':      ['Babati Urban','Babati Rural','Hanang','Kiteto','Mbulu'],
  'Tabora':       ['Tabora Urban','Igunga','Kaliua','Nzega','Sikonge'],
  'Kigoma':       ['Kigoma Urban','Buhigwe','Kakonko','Kibondo','Kasulu'],
  'Singida':      ['Singida Urban','Ikungi','Iramba','Manyoni','Mkalama'],
  'Kagera':       ['Bukoba Urban','Bukoba Rural','Biharamulo','Karagwe','Muleba'],
  'Zanzibar North':['Kaskazini A','Kaskazini B'],
  'Zanzibar South':['Kusini','Kati'],
  'Zanzibar West': ['Mjini','Magharibi A','Magharibi B'],
  'Pemba North':   ['Micheweni','Wete'],
  'Pemba South':   ['Chake Chake','Mkoani'],
}
const villagesByDistrict = {
  'Ilala':        ['Buguruni','Chang\'ombe','Gerezani','Kariakoo','Kivukoni'],
  'Kinondoni':    ['Magomeni','Makuburi','Mbezi','Msasani','Sinza'],
  'Temeke':       ['Azimio','Chamazi','Chang\'ombe','Keko','Miburani'],
  'Ilemela':      ['Buswelu','Igogo','Kiloleli','Kirumba','Mkolani'],
  'Nyamagana':    ['Bwiru','Isamilo','Mahina','Mirongo','Nyegezi'],
  'Dodoma City':  ['Chamwino','Ipagala','Kikuyu','Makulu','Nzuguni'],
  'Moshi Urban':  ['Bondeni','Kaloleni','Karanga','Mji Mwema','Rau'],
  'Arusha City':  ['Elerai','Kimandolu','Levolosi','Moshono','Ngarenaro'],
  'Mbeya City':   ['Iyela','Kalobe','Mwansekwa','Nsalaga','Sisimba'],
}

// ══════════════════════════════════════════════════════════
// ── DEMOGRAPHICS FILTER BAR ───────────────────────────────
// ══════════════════════════════════════════════════════════
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

  const scopeRegions     = allRegions.filter(r => scope === 'national' ? true : r.jurisdiction === scope)
  const filteredRegions  = scopeRegions.filter(r =>
    r.name.toLowerCase().includes(regionSearch.toLowerCase()) ||
    r.code.toLowerCase().includes(regionSearch.toLowerCase())
  )
  const availableDistricts = districtsByRegion[region] || []
  const filteredDistricts  = availableDistricts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()))
  const availableVillages  = villagesByDistrict[district] || []
  const filteredVillages   = availableVillages.filter(v => v.toLowerCase().includes(villageSearch.toLowerCase()))

  const handleScope = (s) => {
    setScope(s); setRegion(''); setDistrict(''); setVillage('')
    setRegionSearch(''); setDistrictSearch(''); setVillageSearch('')
    onFilterChange?.({ scope:s, region:'', district:'', village:'' })
  }
  const selectRegion = (r) => {
    setRegion(r.name); setRegionSearch(r.name)
    setDistrict(''); setVillage(''); setDistrictSearch(''); setVillageSearch('')
    setShowRegDD(false)
    onFilterChange?.({ scope, region:r.name, district:'', village:'' })
  }
  const selectDistrict = (d) => {
    setDistrict(d); setDistrictSearch(d); setVillage(''); setVillageSearch('')
    setShowDisDD(false)
    onFilterChange?.({ scope, region, district:d, village:'' })
  }
  const selectVillage = (v) => {
    setVillage(v); setVillageSearch(v); setShowVilDD(false)
    onFilterChange?.({ scope, region, district, village:v })
  }

  const SCOPES = [
    { key:'national', label:'National',  pop:'63,748,291', color:'text-[#00d4ff]', ab:'border-[#00d4ff]/50', abg:'bg-[#00d4ff]/10' },
    { key:'mainland', label:'Mainland',  pop:'58,319,686', color:'text-[#00ff9d]', ab:'border-[#00ff9d]/50', abg:'bg-[#00ff9d]/10' },
    { key:'zanzibar', label:'Zanzibar',  pop:'5,428,605',  color:'text-orange-400', ab:'border-orange-400/50', abg:'bg-orange-400/10' },
  ]
  const iBase = `w-full ${t.input} border ${t.cardBorder} ${t.text} text-xs rounded-lg px-3 py-2 outline-none focus:border-[#00d4ff]/40 placeholder-gray-600 transition-colors`

  return (
    <div className="space-y-3 mb-5">
      {/* 3 Scope cards */}
      <div className="grid grid-cols-3 gap-3">
        {SCOPES.map(({ key, label, pop, color, ab, abg }) => (
          <button key={key} onClick={() => handleScope(key)}
                  className={`p-3 rounded-xl border text-left transition-all
                              ${scope===key ? `${abg} ${ab}` : `${t.cardBorder} hover:border-[#2a4060]`}`}>
            <p className={`text-[9px] font-bold uppercase tracking-widest ${scope===key ? color : t.textDim}`}>{label}</p>
            <p className={`text-base font-extrabold mt-0.5 ${scope===key ? color : t.textSub}`}>{pop}</p>
            <p className={`text-[8px] mt-0.5 ${t.textDim}`}>Total Population</p>
          </button>
        ))}
      </div>

      {/* Cascading dropdowns */}
      <div className="grid grid-cols-3 gap-3">
        {/* Region */}
        <div className="relative">
          <p className={`text-[9px] uppercase tracking-widest mb-1 ${t.textDim}`}>
            {region ? `Region: ${region}` : 'Filter by Region'}
          </p>
          <input value={regionSearch}
                 onChange={e => { setRegionSearch(e.target.value); setShowRegDD(true) }}
                 onFocus={() => setShowRegDD(true)}
                 placeholder="Type to search region..."
                 className={iBase} />
          {showRegDD && regionSearch && (
            <div className={`absolute top-full mt-1 left-0 right-0 z-30 rounded-lg border shadow-xl max-h-44 overflow-y-auto ${t.card} ${t.cardBorder}`}>
              {filteredRegions.length === 0
                ? <p className={`px-3 py-2 text-xs ${t.textDim}`}>No regions found</p>
                : filteredRegions.map(r => (
                    <button key={r.code} onClick={() => selectRegion(r)}
                            className={`w-full text-left px-3 py-2 text-xs ${t.text} hover:bg-[#1a3060] hover:text-white transition-colors`}>
                      {r.name} <span className={`ml-2 text-[9px] ${t.textDim}`}>{r.pop}</span>
                    </button>
                  ))
              }
            </div>
          )}
        </div>

        {/* District */}
        <div className="relative">
          <p className={`text-[9px] uppercase tracking-widest mb-1 ${t.textDim}`}>
            {district ? `District: ${district}` : 'Filter by District'}
          </p>
          <input value={districtSearch}
                 onChange={e => { setDistrictSearch(e.target.value); setShowDisDD(true) }}
                 onFocus={() => setShowDisDD(true)}
                 disabled={!region}
                 placeholder={region ? 'Type to search district...' : 'Select region first'}
                 className={`${iBase} disabled:opacity-40 disabled:cursor-not-allowed`} />
          {showDisDD && districtSearch && region && (
            <div className={`absolute top-full mt-1 left-0 right-0 z-30 rounded-lg border shadow-xl max-h-44 overflow-y-auto ${t.card} ${t.cardBorder}`}>
              {filteredDistricts.length === 0
                ? <p className={`px-3 py-2 text-xs ${t.textDim}`}>No districts found</p>
                : filteredDistricts.map(d => (
                    <button key={d} onClick={() => selectDistrict(d)}
                            className={`w-full text-left px-3 py-2 text-xs ${t.text} hover:bg-[#1a3060] hover:text-white transition-colors`}>
                      {d}
                    </button>
                  ))
              }
            </div>
          )}
        </div>

        {/* Village */}
        <div className="relative">
          <p className={`text-[9px] uppercase tracking-widest mb-1 ${t.textDim}`}>
            {village ? `Village: ${village}` : 'Filter by Village'}
          </p>
          <input value={villageSearch}
                 onChange={e => { setVillageSearch(e.target.value); setShowVilDD(true) }}
                 onFocus={() => setShowVilDD(true)}
                 disabled={!district}
                 placeholder={district ? 'Type to search village...' : 'Select district first'}
                 className={`${iBase} disabled:opacity-40 disabled:cursor-not-allowed`} />
          {showVilDD && villageSearch && district && (
            <div className={`absolute top-full mt-1 left-0 right-0 z-30 rounded-lg border shadow-xl max-h-44 overflow-y-auto ${t.card} ${t.cardBorder}`}>
              {filteredVillages.length === 0
                ? <p className={`px-3 py-2 text-xs ${t.textDim}`}>No villages found</p>
                : filteredVillages.map(v => (
                    <button key={v} onClick={() => selectVillage(v)}
                            className={`w-full text-left px-3 py-2 text-xs ${t.text} hover:bg-[#1a3060] hover:text-white transition-colors`}>
                      {v}
                    </button>
                  ))
              }
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      {(region || district || village) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[9px] ${t.textDim}`}>Showing:</span>
          {region   && <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">{region}</span>}
          {district && <><span className={`text-[9px] ${t.textDim}`}>›</span><span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20">{district}</span></>}
          {village  && <><span className={`text-[9px] ${t.textDim}`}>›</span><span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-orange-400/10 text-orange-400 border border-orange-400/20">{village}</span></>}
          <button onClick={() => handleScope(scope)} className="text-[9px] text-red-400 hover:underline ml-1">Clear ×</button>
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
        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <span className="text-xs">💼</span>
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
              <div className={`h-1.5 rounded-full ${color} transition-all duration-700`} style={{ width:`${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: DASHBOARD ───────────────────────────────────
// ══════════════════════════════════════════════════════════
function DashboardContent({ darkMode, t, onNewReg }) {
  const [pyramidFilter,  setPyramidFilter]  = useState('national')
  const [showAllRegions, setShowAllRegions] = useState(false)
  const [showAllActions, setShowAllActions] = useState(false)

  const rawData   = pyramidData[pyramidFilter]
  const meta      = filterMeta[pyramidFilter]
  const chartData = rawData.map(d => ({ age:d.age, male:-d.male, female:d.female }))

  return (
    <div className="space-y-5">
      {showAllRegions && <AllRegionsModal onClose={() => setShowAllRegions(false)} darkMode={darkMode} t={t} />}
      {showAllActions && <AllActionsModal onClose={() => setShowAllActions(false)} darkMode={darkMode} t={t} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Dashboard Overview</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>NBS National Intelligence Command Center</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all
                             ${darkMode ? 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                                       : 'bg-[#111827] border-[#1e2d45] text-gray-400 hover:text-white hover:border-[#2a4060]'}`}>
            <ArrowUpRight size={13} /> Export Report
          </button>
          <button onClick={onNewReg}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30
                             text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all text-xs font-medium">
            <Plus size={13} /> New Registration
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {STATS.map(({ MuiIcon, label, value, badge, bColor, line, ibg }) => (
          <div key={label} className={`${t.card} border ${t.cardBorder} rounded-xl p-4 hover:shadow-lg transition-all`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ibg}`}>
                <MuiIcon sx={{ fontSize:18 }} />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${bColor}`}>{badge}</span>
            </div>
            <p className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${t.textDim}`}>{label}</p>
            <p className={`font-bold text-xl sm:text-2xl ${t.text}`}>{value}</p>
            <div className={`mt-3 h-0.5 rounded-full ${line}`} />
          </div>
        ))}
      </div>

      {/* Pyramid + Right */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className={`xl:col-span-2 ${t.card} border ${t.cardBorder} rounded-xl p-4 sm:p-5`}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
            <div>
              <h2 className={`font-bold text-sm ${t.text}`}>Population Growth Trend</h2>
              <p className={`text-[10px] font-mono mt-0.5 ${t.textSub}`}>NATIONAL LIVE CENSUS DATA</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              {['national','mainland','zanzibar'].map(f => (
                <button key={f} onClick={() => setPyramidFilter(f)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all border
                                   ${pyramidFilter===f ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                                       : darkMode ? 'bg-gray-100 border-gray-300 text-gray-500'
                                                                  : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'}`}>
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
            <div className="flex items-center gap-1.5 text-[10px] text-[#00d4ff]"><div className="w-3 h-2 rounded-sm bg-[#00d4ff]/70" /> Male ←</div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#ff6b9d]">→ Female <div className="w-3 h-2 rounded-sm bg-[#ff6b9d]/70" /></div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ top:0, right:10, left:32, bottom:0 }} barCategoryGap="8%">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#e5e7eb' : '#1e2d45'} horizontal={false} />
              <XAxis type="number" tick={{ fill:darkMode?'#6b7280':'#4a6080', fontSize:9, fontFamily:'monospace' }}
                     axisLine={false} tickLine={false} tickFormatter={v => `${Math.abs(v)}K`} />
              <YAxis type="category" dataKey="age" tick={{ fill:darkMode?'#9ca3af':'#6b7280', fontSize:9, fontFamily:'monospace' }}
                     axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<PyramidTooltip />} />
              <Bar dataKey="male" name="Male" radius={[0,2,2,0]}>{chartData.map((_,i) => <Cell key={i} fill="#00d4ff" fillOpacity={0.75} />)}</Bar>
              <Bar dataKey="female" name="Female" radius={[2,0,0,2]}>{chartData.map((_,i) => <Cell key={i} fill="#ff6b9d" fillOpacity={0.75} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-bold text-sm ${t.text}`}>Regional Connectivity</h3>
              <button onClick={() => setShowAllRegions(true)} className="text-[#00d4ff] text-[10px] font-mono hover:underline flex items-center gap-1">
                <Eye size={10} /> VIEW ALL
              </button>
            </div>
            <div className="space-y-2">
              {allRegions.slice(0,5).map(({ code, name, pop }) => (
                <div key={code} className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${t.rowHover}`}>
                  <div className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${darkMode ? 'bg-gray-100 border-gray-300' : 'bg-[#1a2d4a] border-[#2a4060]'}`}>
                    <BadgeIcon sx={{ fontSize:13, color:'#6b7280' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${t.text}`}>{name}</p>
                    <p className={`text-[10px] ${t.textSub}`}>{pop}</p>
                  </div>
                  <span className="text-[9px] font-mono text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-1.5 py-0.5 rounded-full shrink-0">LIVE</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#00c853]/15 to-[#00d4ff]/5 border border-[#00c853]/25 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <HomeWorkIcon sx={{ fontSize:15, color:'#00ff9d' }} />
              <p className="text-[#00ff9d] text-[9px] font-mono tracking-widest">ACTIVE HOUSEHOLDS</p>
            </div>
            <p className={`font-bold text-3xl mb-1 ${t.text}`}>12.4M</p>
            <p className={`text-xs mb-3 ${t.textSub}`}>Secured Digital Entries</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-full px-2 py-0.5">
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
            <button onClick={() => setShowAllActions(true)} className="text-[#00d4ff] text-[10px] font-mono hover:underline flex items-center gap-1">
              <Eye size={10} /> VIEW ALL
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {allActions.slice(0,5).map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${t.rowHover}`}>
              <a.icon size={13} className={`shrink-0 ${a.color}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs truncate ${t.text}`}>{a.text}</p>
                <p className={`text-[10px] font-mono mt-0.5 ${t.textSub}`}>{a.time}</p>
              </div>
              <span className={`text-[9px] font-mono font-bold shrink-0 hidden sm:block ${a.sc}`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: DEMOGRAPHICS VIEW (UPDATED) ─────────────────
// ══════════════════════════════════════════════════════════
function DemographicsContent({ darkMode, t }) {
  const [pyramidFilter, setPyramidFilter] = useState('national')
  const [activeFilter,  setActiveFilter]  = useState({ scope:'national', region:'', district:'', village:'' })
  const [showDetails,   setShowDetails]   = useState(null)

  const meta      = filterMeta[pyramidFilter]
  const rawData   = pyramidData[pyramidFilter]
  const chartData = rawData.map(d => ({ age:d.age, male:-d.male, female:d.female }))

  const scopeLabel = activeFilter.village || activeFilter.district || activeFilter.region || activeFilter.scope

  const DEMOGRAPHIC_CARDS = [
    { label:'Total Population',  value:'63,748,291', sub:'Status: Alive only',    color:'text-[#00ff9d]', bg:'bg-[#00ff9d]/10 border-[#00ff9d]/20' },
    { label:'Male Population',   value:'31,364,159', sub:'49.2% of total',        color:'text-[#00d4ff]', bg:'bg-[#00d4ff]/10 border-[#00d4ff]/20' },
    { label:'Female Population', value:'32,384,132', sub:'50.8% of total',        color:'text-[#ff6b9d]', bg:'bg-[#ff6b9d]/10 border-[#ff6b9d]/20' },
    { label:'Registered Births', value:'1,247,320',  sub:'This year',             color:'text-blue-400',  bg:'bg-blue-500/10 border-blue-500/20'   },
    { label:'Registered Deaths', value:'312,840',    sub:'This year',             color:'text-red-400',   bg:'bg-red-500/10 border-red-500/20'     },
    { label:'Active Migrations', value:'4,891',      sub:'Pending confirmations', color:'text-yellow-400',bg:'bg-yellow-500/10 border-yellow-500/20'},
    { label:'Active Marriages',  value:'12,340,210', sub:'Registered couples',    color:'text-purple-400',bg:'bg-purple-500/10 border-purple-500/20'},
    { label:'Disability Status', value:'2,140,000',  sub:'3.4% of population',    color:'text-orange-400',bg:'bg-orange-500/10 border-orange-500/20'},
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
    { level:'VETA / Other',   pct:1  },
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Demographics View</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>
            Showing: <span className="text-[#00d4ff] font-mono capitalize">{scopeLabel}</span> — live census data
          </p>
        </div>
      </div>

      {/* ── 3-Scope Filter Bar + Cascading Region→District→Village */}
      <DemographicsFilterBar
        onFilterChange={f => {
          setActiveFilter(f)
          setPyramidFilter(f.scope)
        }}
        darkMode={darkMode}
        t={t}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {DEMOGRAPHIC_CARDS.map(({ label, value, sub, color, bg }) => (
          <div key={label} onClick={() => setShowDetails(label)}
               className={`${t.card} border ${t.cardBorder} rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all hover:border-[#00d4ff]/30`}>
            <p className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${t.textDim}`}>{label}</p>
            <p className={`font-bold text-lg sm:text-xl mb-1 ${t.text}`}>{value}</p>
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${color} ${bg}`}>{sub}</span>
          </div>
        ))}
      </div>

      {/* Pyramid + Education + Employment */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Population Pyramid */}
        <div className={`xl:col-span-2 ${t.card} border ${t.cardBorder} rounded-xl p-4`}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h2 className={`font-bold text-sm ${t.text}`}>Population Pyramid</h2>
              <p className={`text-[10px] font-mono ${t.textSub}`}>Age & gender distribution</p>
            </div>
            <div className="flex gap-1.5">
              {['national','mainland','zanzibar'].map(f => (
                <button key={f} onClick={() => setPyramidFilter(f)}
                        className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold transition-all border
                                   ${pyramidFilter===f ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                                       : darkMode ? 'bg-gray-100 border-gray-300 text-gray-500'
                                                                  : 'bg-white/5 border-[#1e2d45] text-gray-500'}`}>
                  {f==='national'?'NAT':f==='mainland'?'MAIN':'ZAN'}
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
            <BarChart data={chartData} layout="vertical" margin={{ top:0, right:10, left:32, bottom:0 }} barCategoryGap="8%">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode?'#e5e7eb':'#1e2d45'} horizontal={false} />
              <XAxis type="number" tick={{ fill:darkMode?'#6b7280':'#4a6080', fontSize:9, fontFamily:'monospace' }} axisLine={false} tickLine={false} tickFormatter={v => `${Math.abs(v)}K`} />
              <YAxis type="category" dataKey="age" tick={{ fill:darkMode?'#9ca3af':'#6b7280', fontSize:9, fontFamily:'monospace' }} axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<PyramidTooltip />} />
              <Bar dataKey="male" name="Male" radius={[0,2,2,0]}>{chartData.map((_,i) => <Cell key={i} fill="#00d4ff" fillOpacity={0.75} />)}</Bar>
              <Bar dataKey="female" name="Female" radius={[2,0,0,2]}>{chartData.map((_,i) => <Cell key={i} fill="#ff6b9d" fillOpacity={0.75} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right column: Education + Employment */}
        <div className="space-y-4">
          <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
            <h2 className={`font-bold text-sm mb-1 ${t.text}`}>Education Distribution</h2>
            <p className={`text-[10px] font-mono mb-3 ${t.textSub}`}>% of registered citizens</p>
            <div className="space-y-2">
              {EDUCATION.map(({ level, pct }) => (
                <div key={level}>
                  <div className="flex justify-between mb-0.5">
                    <p className={`text-[10px] ${t.text}`}>{level}</p>
                    <p className={`text-[10px] font-mono font-bold ${t.text}`}>{pct}%</p>
                  </div>
                  <div className={`h-1.5 rounded-full ${darkMode ? 'bg-gray-200' : 'bg-[#1e2d45]'}`}>
                    <div className="h-1.5 rounded-full bg-[#00d4ff] transition-all" style={{ width:`${pct*2.5}%`, opacity:0.4+(pct/100) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employment Status Card */}
          <EmploymentStatusCard darkMode={darkMode} t={t} />
        </div>
      </div>

      {/* Detail modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDetails(null)} />
          <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl z-10 p-6 ${t.card} ${t.cardBorder}`}>
            <div className="flex items-center justify-between mb-4">
              <p className={`font-bold text-sm ${t.text}`}>{showDetails}</p>
              <button onClick={() => setShowDetails(null)} className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.textDim} hover:text-red-400 hover:bg-red-500/10`}>
                <X size={15} />
              </button>
            </div>
            <p className={`text-xs ${t.textSub}`}>
              Detailed breakdown for <strong>{showDetails}</strong> will load from the backend API in Sprint 3.
              This panel will show regional/district drill-down charts and filterable data tables.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: INFRASTRUCTURE VIEW ─────────────────────────
// ══════════════════════════════════════════════════════════
function InfrastructureContent({ darkMode, t }) {
  const INFRA = [
    { MuiIcon:SchoolIcon,        label:'Schools',             value:'19,847',   sub:'Public & Private',  color:'text-blue-400',   ibg:'bg-blue-500/10 text-blue-400',   pct:72 },
    { MuiIcon:LocalHospitalIcon, label:'Health Facilities',   value:'8,432',    sub:'Hospitals & Clinics',color:'text-red-400',    ibg:'bg-red-500/10 text-red-400',     pct:58 },
    { MuiIcon:ElectricBoltIcon,  label:'Electrification',     value:'68.4%',    sub:'National Coverage',  color:'text-yellow-400', ibg:'bg-yellow-500/10 text-yellow-400',pct:68 },
    { MuiIcon:WaterIcon,         label:'Clean Water Access',  value:'74.2%',    sub:'Safe Water Sources', color:'text-[#00d4ff]',  ibg:'bg-[#00d4ff]/10 text-[#00d4ff]', pct:74 },
    { MuiIcon:HomeWorkIcon,      label:'Registered Housing',  value:'12.4M',    sub:'Household Units',    color:'text-[#00ff9d]',  ibg:'bg-[#00ff9d]/10 text-[#00ff9d]', pct:61 },
    { MuiIcon:RoadIcon,          label:'Road Network',        value:'86,472 km', sub:'Paved & Unpaved',  color:'text-orange-400', ibg:'bg-orange-500/10 text-orange-400',pct:45 },
  ]
  const REGIONS_INFRA = allRegions.slice(0,8).map((r, i) => ({
    ...r,
    schools: Math.floor(200 + i*180),
    hospitals: Math.floor(30 + i*25),
    electricity: Math.floor(45 + i*6),
    water: Math.floor(55 + i*5),
  }))

  return (
    <div className="space-y-5">
      <div>
        <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Infrastructure View</h1>
        <p className={`text-xs mt-0.5 ${t.textSub}`}>National infrastructure coverage & facility mapping</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
        {INFRA.map(({ MuiIcon, label, value, sub, color, ibg, pct }) => (
          <div key={label} className={`${t.card} border ${t.cardBorder} rounded-xl p-4 hover:shadow-lg transition-all`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ibg}`}>
                <MuiIcon sx={{ fontSize:18 }} />
              </div>
              <span className={`text-sm font-bold ${color}`}>{pct}%</span>
            </div>
            <p className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${t.textDim}`}>{label}</p>
            <p className={`font-bold text-lg ${t.text} mb-1`}>{value}</p>
            <p className={`text-[10px] ${t.textSub} mb-2`}>{sub}</p>
            <div className={`h-1.5 rounded-full ${darkMode?'bg-gray-200':'bg-[#1e2d45]'}`}>
              <div className={`h-1.5 rounded-full bg-current ${color} transition-all`} style={{ width:`${pct}%`, opacity:0.8 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Regional breakdown table */}
      <div className={`${t.card} border ${t.cardBorder} rounded-xl overflow-hidden`}>
        <div className={`flex items-center justify-between px-5 py-4 border-b ${t.border}`}>
          <div>
            <p className={`font-bold text-sm ${t.text}`}>Regional Infrastructure Breakdown</p>
            <p className={`text-[10px] ${t.textSub}`}>Key metrics per region</p>
          </div>
          <button className="text-[#00d4ff] text-[10px] font-mono hover:underline flex items-center gap-1">
            <Download size={10} /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={`border-b ${t.border}`}>
                {['Region','Population','Schools','Hospitals','Electricity %','Water %'].map(h => (
                  <th key={h} className={`px-4 py-3 text-left text-[9px] font-mono uppercase tracking-widest ${t.textDim}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REGIONS_INFRA.map((r, i) => (
                <tr key={r.code} className={`border-b ${t.border} transition-all ${t.rowHover}`}>
                  <td className={`px-4 py-3 font-semibold ${t.text}`}>{r.name}</td>
                  <td className={`px-4 py-3 font-mono ${t.textSub}`}>{r.pop}</td>
                  <td className={`px-4 py-3 text-blue-400 font-mono`}>{r.schools.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-red-400 font-mono`}>{r.hospitals}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`flex-1 h-1 rounded-full ${darkMode?'bg-gray-200':'bg-[#1e2d45]'}`}>
                        <div className="h-1 rounded-full bg-yellow-400" style={{ width:`${r.electricity}%` }} />
                      </div>
                      <span className={`text-[9px] font-mono ${t.textSub}`}>{r.electricity}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`flex-1 h-1 rounded-full ${darkMode?'bg-gray-200':'bg-[#1e2d45]'}`}>
                        <div className="h-1 rounded-full bg-[#00d4ff]" style={{ width:`${r.water}%` }} />
                      </div>
                      <span className={`text-[9px] font-mono ${t.textSub}`}>{r.water}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: DISTRICT ADMINS ──────────────────────────────
// ══════════════════════════════════════════════════════════
function DistrictAdminsContent({ darkMode, t, onNewReg }) {
  const [search, setSearch] = useState('')
  const ADMINS = [
    { id:'DA-001', name:'John Jovith Amsterdam', region:'Dar es Salaam', district:'Ilala',     status:'ACTIVE',   joined:'2025-01-15', mfa:true  },
    { id:'DA-002', name:'Amina Said Mwinyi',     region:'Iringa',       district:'Mufindi',    status:'ACTIVE',   joined:'2025-02-08', mfa:false },
    { id:'DA-003', name:'Emmanuel Kihega Alpha', region:'Mbeya',        district:'Chunya',     status:'PENDING',  joined:'2026-04-20', mfa:false },
    { id:'DA-004', name:'Grace Haule Mbwana',    region:'Mwanza',       district:'Ilemela',    status:'ACTIVE',   joined:'2025-03-11', mfa:true  },
    { id:'DA-005', name:'Peter Nduguru Swai',    region:'Arusha',       district:'Meru',       status:'SUSPENDED',joined:'2024-11-01', mfa:false },
    { id:'DA-006', name:'Fatuma Rashid Juma',    region:'Tanga',        district:'Handeni',    status:'ACTIVE',   joined:'2025-06-14', mfa:true  },
    { id:'DA-007', name:'Moses Mwita Chacha',    region:'Kagera',       district:'Karagwe',    status:'ACTIVE',   joined:'2025-07-22', mfa:false },
    { id:'DA-008', name:'Zainab Omar Hussein',   region:'Zanzibar West',district:'Mjini',      status:'ACTIVE',   joined:'2025-09-03', mfa:true  },
  ]
  const filtered = ADMINS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.region.toLowerCase().includes(search.toLowerCase()) ||
    a.district.toLowerCase().includes(search.toLowerCase())
  )
  const statusColor = { ACTIVE:'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20', PENDING:'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', SUSPENDED:'text-red-400 bg-red-400/10 border-red-400/20' }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>District Admins</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>{filtered.length} of {ADMINS.length} district administrators</p>
        </div>
        <button onClick={onNewReg}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] hover:bg-[#00ff9d]/20 transition-all text-xs font-medium">
          <Plus size={13} /> Register District Admin
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:'Total Admins', value:'184', color:'text-[#00d4ff]', bg:'bg-[#00d4ff]/10 border-[#00d4ff]/20' },
          { label:'Active',       value:'171', color:'text-[#00ff9d]', bg:'bg-[#00ff9d]/10 border-[#00ff9d]/20' },
          { label:'Pending/Suspended', value:'13', color:'text-red-400', bg:'bg-red-400/10 border-red-400/20' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
            <p className={`text-[9px] uppercase tracking-widest font-mono ${t.textDim} mb-1`}>{label}</p>
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
        <input value={search} onChange={e => setSearch(e.target.value)}
               placeholder="Search by name, region or district..."
               className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-[#00d4ff]/40 placeholder-gray-500 transition-colors`} />
      </div>

      {/* Table */}
      <div className={`${t.card} border ${t.cardBorder} rounded-xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={`border-b ${t.border}`}>
                {['ID','Name','Region','District','Status','MFA','Joined','Actions'].map(h => (
                  <th key={h} className={`px-4 py-3 text-left text-[9px] font-mono uppercase tracking-widest ${t.textDim}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className={`border-b ${t.border} ${t.rowHover} transition-all`}>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{a.id}</td>
                  <td className={`px-4 py-3 font-semibold ${t.text}`}>{a.name}</td>
                  <td className={`px-4 py-3 ${t.textSub}`}>{a.region}</td>
                  <td className={`px-4 py-3 ${t.textSub}`}>{a.district}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${statusColor[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    {a.mfa
                      ? <span className="text-[9px] font-mono text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-2 py-0.5 rounded-full">ON</span>
                      : <span className={`text-[9px] font-mono ${t.textDim} border ${t.cardBorder} px-2 py-0.5 rounded-full`}>OFF</span>
                    }
                  </td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textSub}`}>{a.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className={`w-6 h-6 rounded flex items-center justify-center ${t.iconBtn} hover:text-[#00d4ff] transition-colors`}><EyeIcon size={11}/></button>
                      <button className={`w-6 h-6 rounded flex items-center justify-center ${t.iconBtn} hover:text-yellow-400 transition-colors`}><Edit3 size={11}/></button>
                      <button className={`w-6 h-6 rounded flex items-center justify-center ${t.iconBtn} hover:text-red-400 transition-colors`}><Trash2 size={11}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: VILLAGE OFFICERS ─────────────────────────────
// ══════════════════════════════════════════════════════════
function VillageOfficersContent({ darkMode, t }) {
  const [search, setSearch] = useState('')
  const OFFICERS = [
    { id:'VO-0891', name:'Juma Mwanga Salehe',   region:'Dodoma',       district:'Chamwino',   village:'Nzuguni',   status:'ACTIVE',  records:340 },
    { id:'VO-0892', name:'Neema Fumo Chande',    region:'Dar es Salaam',district:'Temeke',     village:'Keko',      status:'ACTIVE',  records:512 },
    { id:'VO-0893', name:'Hassan Mtoro Bakari',  region:'Mwanza',       district:'Ilemela',    village:'Igogo',     status:'ACTIVE',  records:289 },
    { id:'VO-0894', name:'Upendo Ngowi Mbise',   region:'Kilimanjaro',  district:'Moshi Urban',village:'Karanga',   status:'PENDING', records:0   },
    { id:'VO-0895', name:'Rashidi Tito Hamisi',  region:'Arusha',       district:'Arusha City',village:'Ngarenaro', status:'ACTIVE',  records:421 },
    { id:'VO-0896', name:'Miriam Ally Chuma',    region:'Tanga',        district:'Tanga City', village:'Chumbageni',status:'ACTIVE',  records:198 },
  ]
  const filtered = OFFICERS.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.village.toLowerCase().includes(search.toLowerCase()) ||
    o.district.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Village Officers</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>{filtered.length} village-level officers</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] hover:bg-[#00ff9d]/20 transition-all text-xs font-medium">
          <Plus size={13} /> Register Village Officer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label:'Total Officers', value:'2,847', color:'text-[#00d4ff]' },
          { label:'Active',         value:'2,791', color:'text-[#00ff9d]' },
          { label:'Total Records',  value:'1.2M',  color:'text-purple-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
            <p className={`text-[9px] uppercase tracking-widest font-mono ${t.textDim} mb-1`}>{label}</p>
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, village or district..."
               className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-[#00d4ff]/40 placeholder-gray-500`} />
      </div>

      <div className={`${t.card} border ${t.cardBorder} rounded-xl overflow-hidden`}>
        <table className="w-full text-xs">
          <thead>
            <tr className={`border-b ${t.border}`}>
              {['Officer ID','Name','Region','District','Village','Records','Status'].map(h => (
                <th key={h} className={`px-4 py-3 text-left text-[9px] font-mono uppercase tracking-widest ${t.textDim}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className={`border-b ${t.border} ${t.rowHover} transition-all`}>
                <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{o.id}</td>
                <td className={`px-4 py-3 font-semibold ${t.text}`}>{o.name}</td>
                <td className={`px-4 py-3 ${t.textSub}`}>{o.region}</td>
                <td className={`px-4 py-3 ${t.textSub}`}>{o.district}</td>
                <td className={`px-4 py-3 text-[#00d4ff] font-mono`}>{o.village}</td>
                <td className={`px-4 py-3 font-mono ${t.text}`}>{o.records.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${o.status==='ACTIVE' ? 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: MANAGE USERS ────────────────────────────────
// ══════════════════════════════════════════════════════════
function ManageUsersContent({ darkMode, t }) {
  const [roleFilter, setRoleFilter] = useState('all')
  const USERS = [
    { id:'USR-001', name:'Dr. Fatuma Rashid',   role:'Super Admin',    email:'f.rashid@nbs.go.tz',   status:'ACTIVE',   last:'2026-05-12 14:20' },
    { id:'USR-002', name:'John Amsterdam',       role:'Super Admin',    email:'j.amsterdam@nbs.go.tz', status:'ACTIVE',   last:'2026-05-12 13:55' },
    { id:'USR-003', name:'Amina Said Mwinyi',    role:'District Admin', email:'a.mwinyi@nbs.go.tz',   status:'ACTIVE',   last:'2026-05-12 11:30' },
    { id:'USR-004', name:'Emmanuel Kihega',      role:'District Admin', email:'e.kihega@nbs.go.tz',   status:'PENDING',  last:'—'               },
    { id:'USR-005', name:'Grace Haule',          role:'Village Officer',email:'g.haule@nbs.go.tz',    status:'ACTIVE',   last:'2026-05-12 09:10' },
    { id:'USR-006', name:'Peter Nduguru',        role:'District Admin', email:'p.nduguru@nbs.go.tz',  status:'SUSPENDED',last:'2026-04-01 08:00' },
  ]
  const roles = ['all','Super Admin','District Admin','Village Officer']
  const filtered = USERS.filter(u => roleFilter==='all' || u.role===roleFilter)
  const roleBadge = { 'Super Admin':'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20', 'District Admin':'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20', 'Village Officer':'text-purple-400 bg-purple-400/10 border-purple-400/20' }
  const statusColor = { ACTIVE:'text-[#00ff9d]', PENDING:'text-yellow-400', SUSPENDED:'text-red-400' }

  return (
    <div className="space-y-5">
      <div>
        <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Manage Users</h1>
        <p className={`text-xs mt-0.5 ${t.textSub}`}>All system users across roles</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {roles.map(r => (
          <button key={r} onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold transition-all border
                             ${roleFilter===r ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                             : darkMode ? 'bg-gray-100 border-gray-300 text-gray-500'
                                                        : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'}`}>
            {r}
          </button>
        ))}
      </div>

      <div className={`${t.card} border ${t.cardBorder} rounded-xl overflow-hidden`}>
        <table className="w-full text-xs">
          <thead>
            <tr className={`border-b ${t.border}`}>
              {['ID','Name','Role','Email','Last Login','Status','Actions'].map(h => (
                <th key={h} className={`px-4 py-3 text-left text-[9px] font-mono uppercase tracking-widest ${t.textDim}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className={`border-b ${t.border} ${t.rowHover} transition-all`}>
                <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{u.id}</td>
                <td className={`px-4 py-3 font-semibold ${t.text}`}>{u.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${roleBadge[u.role]}`}>{u.role}</span>
                </td>
                <td className={`px-4 py-3 font-mono text-[10px] ${t.textSub}`}>{u.email}</td>
                <td className={`px-4 py-3 font-mono text-[10px] ${t.textSub}`}>{u.last}</td>
                <td className={`px-4 py-3 font-bold text-[10px] ${statusColor[u.status]}`}>{u.status}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button className={`w-6 h-6 rounded flex items-center justify-center ${t.iconBtn} hover:text-[#00d4ff]`}><Edit3 size={11}/></button>
                    <button className={`w-6 h-6 rounded flex items-center justify-center ${t.iconBtn} hover:text-red-400`}><Trash2 size={11}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: SYSTEM PERFORMANCE ──────────────────────────
// ══════════════════════════════════════════════════════════
function SystemPerformanceContent({ darkMode, t }) {
  const [tick, setTick] = useState(0)
  useEffect(() => { const id = setInterval(() => setTick(x => x+1), 3000); return () => clearInterval(id) }, [])

  const cpu  = Math.min(98, 32 + Math.round(Math.sin(tick*0.7)*12))
  const ram  = Math.min(98, 68 + Math.round(Math.sin(tick*0.5)*8))
  const disk = 47
  const net  = Math.min(99, 58 + Math.round(Math.sin(tick*0.9)*18))

  const SERVICES = [
    { name:'PostgreSQL DB',    status:'RUNNING', latency:'2ms',  uptime:'99.98%', color:'text-[#00ff9d]' },
    { name:'Redis Cache',      status:'RUNNING', latency:'0.4ms',uptime:'100%',   color:'text-[#00ff9d]' },
    { name:'API Gateway',      status:'RUNNING', latency:'12ms', uptime:'99.95%', color:'text-[#00ff9d]' },
    { name:'NIDA Connector',   status:'RUNNING', latency:'84ms', uptime:'99.80%', color:'text-[#00ff9d]' },
    { name:'Email Service',    status:'RUNNING', latency:'210ms',uptime:'99.70%', color:'text-[#00ff9d]' },
    { name:'Backup Service',   status:'IDLE',    latency:'—',    uptime:'100%',   color:'text-yellow-400' },
    { name:'SMS Gateway',      status:'RUNNING', latency:'340ms',uptime:'98.90%', color:'text-[#00ff9d]' },
    { name:'Audit Logger',     status:'RUNNING', latency:'1ms',  uptime:'100%',   color:'text-[#00ff9d]' },
  ]

  const Gauge = ({ label, value, color }) => (
    <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-3">
        <p className={`text-[10px] font-mono uppercase tracking-widest ${t.textDim}`}>{label}</p>
        <span className={`text-lg font-extrabold ${color}`}>{value}%</span>
      </div>
      <div className={`h-2 rounded-full ${darkMode?'bg-gray-200':'bg-[#1e2d45]'}`}>
        <div className={`h-2 rounded-full transition-all duration-1000 ${value>85?'bg-red-500':value>70?'bg-yellow-400':color.replace('text-','bg-')}`}
             style={{ width:`${value}%` }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className={`text-[9px] ${t.textDim}`}>0%</span>
        <span className={`text-[9px] ${t.textDim}`}>100%</span>
      </div>
    </div>
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>System Performance</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>Live server metrics — auto-refreshing every 3s</p>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] text-[#00ff9d] font-mono bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" /> LIVE
        </span>
      </div>

      {/* Resource gauges */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <Gauge label="CPU Usage"    value={cpu}  color="text-[#00d4ff]" />
        <Gauge label="RAM Usage"    value={ram}  color="text-[#00ff9d]" />
        <Gauge label="Disk Usage"   value={disk} color="text-orange-400" />
        <Gauge label="Network I/O"  value={net}  color="text-purple-400" />
      </div>

      {/* Services table */}
      <div className={`${t.card} border ${t.cardBorder} rounded-xl overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${t.border}`}>
          <p className={`font-bold text-sm ${t.text}`}>Active Services</p>
          <p className={`text-[10px] ${t.textSub}`}>{SERVICES.filter(s=>s.status==='RUNNING').length} of {SERVICES.length} running</p>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className={`border-b ${t.border}`}>
              {['Service','Status','Avg Latency','Uptime'].map(h => (
                <th key={h} className={`px-4 py-3 text-left text-[9px] font-mono uppercase tracking-widest ${t.textDim}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICES.map(s => (
              <tr key={s.name} className={`border-b ${t.border} ${t.rowHover}`}>
                <td className={`px-4 py-3 font-semibold ${t.text}`}>{s.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${s.status==='RUNNING' ? 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'}`}>
                    {s.status}
                  </span>
                </td>
                <td className={`px-4 py-3 font-mono ${t.textSub}`}>{s.latency}</td>
                <td className={`px-4 py-3 font-mono font-bold ${s.color}`}>{s.uptime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: SYSTEM LOG REPORTS ──────────────────────────
// ══════════════════════════════════════════════════════════
function LogReportsContent({ darkMode, t }) {
  const [typeFilter, setTypeFilter] = useState('all')
  const [search,     setSearch]     = useState('')

  const LOGS = [
    { id:'LOG-001', type:'AUTH',   level:'INFO',  user:'j.amsterdam@nbs.go.tz',  action:'Successful login',                     time:'2026-05-12 14:22:01', ip:'197.186.1.10'  },
    { id:'LOG-002', type:'AUDIT',  level:'INFO',  user:'a.mwinyi@nbs.go.tz',     action:'Validated 1,200 citizen records',       time:'2026-05-12 14:20:10', ip:'41.220.3.89'   },
    { id:'LOG-003', type:'SECURITY',level:'WARN', user:'UNKNOWN',                action:'5 failed login attempts — Kilimanjaro', time:'2026-05-12 13:58:12', ip:'41.33.12.205'  },
    { id:'LOG-004', type:'SYSTEM', level:'INFO',  user:'SCHEDULER',              action:'Cloud DB sync completed',               time:'2026-05-12 13:55:44', ip:'internal'      },
    { id:'LOG-005', type:'AUDIT',  level:'INFO',  user:'g.haule@nbs.go.tz',      action:'Registered 340 citizens — Nzuguni',    time:'2026-05-12 11:55:22', ip:'105.27.4.11'   },
    { id:'LOG-006', type:'SECURITY',level:'ERROR',user:'UNKNOWN',                action:'Unauthorized API access blocked',       time:'2026-05-12 12:10:00', ip:'41.200.55.3'   },
    { id:'LOG-007', type:'AUTH',   level:'INFO',  user:'f.rashid@nbs.go.tz',     action:'Password changed successfully',         time:'2026-05-12 09:30:15', ip:'41.58.12.90'   },
    { id:'LOG-008', type:'SYSTEM', level:'INFO',  user:'SYSTEM',                 action:'Population snapshot generated',         time:'2026-05-12 11:30:00', ip:'internal'      },
  ]
  const levelColor = { INFO:'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20', WARN:'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', ERROR:'text-red-400 bg-red-400/10 border-red-400/20' }
  const types = ['all','AUTH','AUDIT','SECURITY','SYSTEM']
  const filtered = LOGS.filter(l =>
    (typeFilter==='all' || l.type===typeFilter) &&
    (l.action.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>System Log Reports</h1>
        <p className={`text-xs mt-0.5 ${t.textSub}`}>Audit trail — {filtered.length} entries</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-wrap">
          {types.map(tp => (
            <button key={tp} onClick={() => setTypeFilter(tp)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold transition-all border
                               ${typeFilter===tp ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                                 : darkMode ? 'bg-gray-100 border-gray-300 text-gray-500'
                                                            : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'}`}>
              {tp}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..."
                 className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-[#00d4ff]/40 placeholder-gray-500`} />
        </div>
      </div>

      <div className={`${t.card} border ${t.cardBorder} rounded-xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={`border-b ${t.border}`}>
                {['Log ID','Type','Level','User','Action','Time','IP'].map(h => (
                  <th key={h} className={`px-4 py-3 text-left text-[9px] font-mono uppercase tracking-widest ${t.textDim}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className={`border-b ${t.border} ${t.rowHover} transition-all`}>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{l.id}</td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.text}`}>{l.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${levelColor[l.level]}`}>{l.level}</span>
                  </td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textSub}`}>{l.user}</td>
                  <td className={`px-4 py-3 ${t.text}`}>{l.action}</td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textSub}`}>{l.time}</td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: SECURITY ALERTS ─────────────────────────────
// ══════════════════════════════════════════════════════════
function SecurityAlertsContent({ darkMode, t }) {
  const [sevFilter, setSevFilter] = useState('all')

  const ALERTS = [
    { id:'ALT-001', severity:'CRITICAL', type:'Brute Force',      region:'Kilimanjaro', detail:'5 consecutive failed logins from same IP',        time:'2026-05-12 13:58', ip:'41.33.12.205', resolved:false },
    { id:'ALT-002', severity:'HIGH',     type:'Unauthorized API',  region:'National',    detail:'Blocked API call without valid Bearer token',     time:'2026-05-12 12:10', ip:'41.200.55.3',  resolved:false },
    { id:'ALT-003', severity:'MEDIUM',   type:'Unusual Activity',  region:'Dar es Salaam',detail:'Admin accessed 500+ records in under 2 minutes', time:'2026-05-12 10:44', ip:'197.186.1.22', resolved:true  },
    { id:'ALT-004', severity:'LOW',      type:'Session Timeout',   region:'Dodoma',      detail:'Admin session expired without explicit logout',    time:'2026-05-12 09:12', ip:'197.250.4.5',  resolved:true  },
    { id:'ALT-005', severity:'HIGH',     type:'IP Blacklist Hit',  region:'External',    detail:'Known malicious IP attempted system access',      time:'2026-05-11 22:30', ip:'104.21.9.0',   resolved:true  },
    { id:'ALT-006', severity:'MEDIUM',   type:'Cert Expiry',       region:'National',    detail:'SSL certificate expires in 14 days',              time:'2026-05-11 08:00', ip:'internal',     resolved:false },
  ]

  const sevColor = {
    CRITICAL:'text-red-400 bg-red-400/10 border-red-400/30',
    HIGH:    'text-orange-400 bg-orange-400/10 border-orange-400/30',
    MEDIUM:  'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    LOW:     'text-blue-400 bg-blue-400/10 border-blue-400/30',
  }
  const sevs = ['all','CRITICAL','HIGH','MEDIUM','LOW']
  const filtered = ALERTS.filter(a => sevFilter==='all' || a.severity===sevFilter)
  const unresolved = ALERTS.filter(a => !a.resolved).length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Security Alerts</h1>
          <p className={`text-xs mt-0.5 ${t.textSub}`}>{unresolved} unresolved alerts</p>
        </div>
        {unresolved > 0 && (
          <span className="flex items-center gap-1.5 text-[10px] text-red-400 font-mono bg-red-400/10 border border-red-400/20 rounded-full px-3 py-1 animate-pulse">
            <ShieldAlert size={10} /> {unresolved} ACTIVE
          </span>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {sevs.slice(1).map(s => {
          const count = ALERTS.filter(a => a.severity===s).length
          return (
            <div key={s} className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
              <p className={`text-[9px] uppercase tracking-widest font-mono ${t.textDim} mb-1`}>{s}</p>
              <p className={`text-2xl font-extrabold ${sevColor[s].split(' ')[0]}`}>{count}</p>
            </div>
          )
        })}
      </div>

      <div className="flex gap-2 flex-wrap">
        {sevs.map(s => (
          <button key={s} onClick={() => setSevFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold transition-all border
                             ${sevFilter===s ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]'
                                            : darkMode ? 'bg-gray-100 border-gray-300 text-gray-500'
                                                       : 'bg-white/5 border-[#1e2d45] text-gray-500 hover:text-gray-300'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(a => (
          <div key={a.id} className={`${t.card} border ${t.cardBorder} rounded-xl p-4 transition-all ${!a.resolved ? 'border-l-4 border-l-red-500/50' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <ShieldAlert size={15} className={sevColor[a.severity].split(' ')[0]} />
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className={`font-bold text-sm ${t.text}`}>{a.type}</p>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${sevColor[a.severity]}`}>{a.severity}</span>
                    {a.resolved && <span className="text-[9px] font-mono text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-2 py-0.5 rounded-full">RESOLVED</span>}
                  </div>
                  <p className={`text-xs ${t.textSub} mb-1`}>{a.detail}</p>
                  <div className={`flex items-center gap-3 text-[9px] font-mono ${t.textDim}`}>
                    <span>ID: {a.id}</span>
                    <span>Region: {a.region}</span>
                    <span>IP: {a.ip}</span>
                    <span>{a.time}</span>
                  </div>
                </div>
              </div>
              {!a.resolved && (
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/30 hover:bg-[#00ff9d]/20 transition-all shrink-0">
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── MAIN COMPONENT ────────────────────────────────────────
// ══════════════════════════════════════════════════════════
export default function SuperAdminDashboard({ onSectionChange }) {
  const [sidebarOpen,  setSidebarOpen]  = useState(false)
  const [activeNav,    setActiveNav]    = useState('Dashboard')
  const [darkMode,     setDarkMode]     = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showChangePwd,setShowChangePwd]= useState(false)
  const [showNewReg,   setShowNewReg]   = useState(false)
  const [mfaEnabled,   setMfaEnabled]   = useState(true)
  const settingsRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const handleNavChange = (label) => {
    setActiveNav(label)
    setSidebarOpen(false)
    onSectionChange?.(label)
  }

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
      case 'Dashboard':           return <DashboardContent darkMode={darkMode} t={t} onNewReg={() => setShowNewReg(true)} />
      case 'Demographics View':   return <DemographicsContent darkMode={darkMode} t={t} />
      case 'Infrastructure View': return <InfrastructureContent darkMode={darkMode} t={t} />
      case 'District Admins':     return <DistrictAdminsContent darkMode={darkMode} t={t} onNewReg={() => setShowNewReg(true)} />
      case 'Village Officers':    return <VillageOfficersContent darkMode={darkMode} t={t} />
      case 'Manage Users':        return <ManageUsersContent darkMode={darkMode} t={t} />
      case 'System Performance':  return <SystemPerformanceContent darkMode={darkMode} t={t} />
      case 'System Log Reports':  return <LogReportsContent darkMode={darkMode} t={t} />
      case 'Security Alerts':     return <SecurityAlertsContent darkMode={darkMode} t={t} />
      default:                    return null
    }
  }

  return (
    <div className={`flex h-full overflow-hidden ${t.bg} ${t.text}`}>

      {/* Global modals */}
      {showChangePwd && <ChangePasswordModal  onClose={() => setShowChangePwd(false)} darkMode={darkMode} t={t} />}
      {showNewReg    && <NewRegistrationModal onClose={() => setShowNewReg(false)}    darkMode={darkMode} t={t} />}

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══════ SIDEBAR ══════ */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-56 ${t.sidebar} border-r ${t.border}
                        flex flex-col transition-transform duration-300
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className={`flex items-center justify-between px-4 py-4 border-b ${t.border}`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center overflow-hidden
                            ${darkMode ? 'bg-blue-50 border-blue-200' : 'bg-[#1a3060] border-[#2a4a80]'}`}>
              <img src="/assets/longo_nbs.png" alt="NBS" className="w-full h-full object-cover"
                   onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:16px">🏛</span>' }} />
            </div>
            <div>
              <p className={`font-bold text-[11px] leading-tight ${t.text}`}>Super Admin Panel</p>
              <p className="text-[#00d4ff] text-[9px] font-mono tracking-widest">V 1.0.0</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className={`lg:hidden ${t.textDim} hover:text-red-400 transition-colors`}>
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map(({ label, Icon }) => (
            <button key={label} onClick={() => handleNavChange(label)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left
                               transition-all duration-150 border text-[11px] font-medium
                               ${activeNav===label
                                 ? t.navActive
                                 : `${t.textDim} ${t.navHover} border-transparent`}`}>
              <Icon sx={{ fontSize:15 }} className="shrink-0" />
              <span className="leading-tight">{label}</span>
              {activeNav===label && <ChevronRight size={10} className="ml-auto opacity-60" />}
            </button>
          ))}
        </nav>

        <div className={`p-2 border-t ${t.border}`}>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-[11px] font-medium border border-transparent">
            <LogoutIcon sx={{ fontSize:15 }} /> Logout
          </button>
        </div>
      </aside>

      {/* ══════ MAIN ══════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* TOP BAR */}
        <header className={`h-14 ${t.topbar} border-b ${t.border} flex items-center gap-3 px-4 shrink-0`}>
          <button onClick={() => setSidebarOpen(true)} className={`lg:hidden ${t.textDim} hover:text-blue-500 transition-colors`}>
            <Menu size={18} />
          </button>

          {/* ── Replaced "NBS CENSUS SYSTEM" with proper branding + location */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className={`font-bold text-sm tracking-wide ${t.text}`}>National Bureau of Statistics</span>
            <span className={`flex items-center gap-1 text-[9px] ${t.textDim}`}>
              <MapPin size={9}/> Dodoma, Tanzania
            </span>
          </div>

          <div className="flex-1 max-w-sm ml-2 relative hidden md:block">
            <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
            <input type="text" placeholder="Global system search..."
                   className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm rounded-lg pl-8 pr-4 py-2 outline-none focus:border-[#00d4ff]/40 placeholder-gray-500 transition-colors`} />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
            SYSTEM SECURE
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={() => setDarkMode(!darkMode)}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${t.iconBtn}`}>
              {darkMode ? <Moon size={14} className="text-blue-500" /> : <Sun size={14} className="text-yellow-400" />}
            </button>

            <button className={`relative w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${t.iconBtn}`}>
              <Bell size={14} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Settings dropdown with MFA toggle */}
            <div className="relative" ref={settingsRef}>
              <button onClick={() => setSettingsOpen(!settingsOpen)}
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${t.iconBtn}
                                 ${settingsOpen ? 'border-[#00d4ff]/40 text-[#00d4ff]' : ''}`}>
                <Settings size={14} />
              </button>

              {settingsOpen && (
                <div className={`absolute right-0 top-10 w-52 ${t.dropdown} border rounded-xl shadow-2xl z-50 overflow-hidden`}>
                  <div className="pt-2 pb-2">
                    <p className={`px-4 py-1.5 text-[9px] font-mono tracking-widest ${t.textSub} uppercase`}>Account</p>
                    <button onClick={() => { setSettingsOpen(false); setShowChangePwd(true) }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-all ${t.dropItem}`}>
                      <KeyRound size={13} className="text-[#00d4ff] shrink-0" />
                      Change Password
                    </button>

                    <div className={`my-1 border-t ${t.border}`} />
                    <p className={`px-4 py-1.5 text-[9px] font-mono tracking-widest ${t.textSub} uppercase`}>Security</p>

                    {/* MFA toggle — one-time setup, can be disabled here */}
                    <button onClick={() => { setMfaEnabled(!mfaEnabled); setSettingsOpen(false) }}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-xs transition-all ${t.dropItem}`}>
                      <span className="flex items-center gap-2">
                        <Shield size={13} className={mfaEnabled ? 'text-[#00ff9d]' : 'text-gray-500'} />
                        MFA Authentication
                      </span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${mfaEnabled ? 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20' : 'text-gray-500 border-gray-600'}`}>
                        {mfaEnabled ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <div className={`my-1 border-t ${t.border}`} />
                    <button onClick={() => setSettingsOpen(false)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-all">
                      <LogOutLucide size={13} className="shrink-0" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

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

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          {renderContent()}
        </main>

        {/* FOOTER */}
        <footer className={`h-8 ${t.footer} border-t ${t.border} flex items-center justify-between px-4 shrink-0`}>
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
