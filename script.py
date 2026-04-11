python3 - << 'PYEOF'
import pathlib, re

f = pathlib.Path('/src/SuperAdminDashboard.jsx')
txt = f.read_text()

# Replace old districtsByRegion and villagesByDistrict with TZ_GEO-based lookups
old_dists = re.search(r'// ── DISTRICTS & VILLAGES DATA.*?const villagesByDistrict = \{.*?\}', txt, re.DOTALL)
if old_dists:
    txt = txt.replace(old_dists.group(0),
"""// ── GEO HELPERS (from tanzania.js) ──────────────────────
// TZ_GEO imported at top — use getRegions/getDistricts/getVillages""")

# Fix DemographicsFilterBar to use real data helpers
old_scope_reg = "  const scopeRegions     = allRegions.filter(r => scope === 'national' ? true : r.jurisdiction === scope)"
new_scope_reg = "  const scopeRegions     = getRegionsByJurisdiction(scope).map(name => ({ name, code: name.slice(0,3).toUpperCase(), ...TZ_GEO[name] }))"
txt = txt.replace(old_scope_reg, new_scope_reg, 1)

old_fil_reg = """  const filteredRegions  = scopeRegions.filter(r =>
    r.name.toLowerCase().includes(regionSearch.toLowerCase()) ||
    r.code.toLowerCase().includes(regionSearch.toLowerCase())
  )
  const availableDistricts = districtsByRegion[region] || []
  const filteredDistricts  = availableDistricts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()))
  const availableVillages  = villagesByDistrict[district] || []
  const filteredVillages   = availableVillages.filter(v => v.toLowerCase().includes(villageSearch.toLowerCase()))"""
new_fil_reg = """  const filteredRegions  = scopeRegions.filter(r =>
    r.name.toLowerCase().includes(regionSearch.toLowerCase())
  )
  const availableDistricts = getDistricts(region)
  const filteredDistricts  = availableDistricts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()))
  const availableVillages  = getVillages(region, district)
  const filteredVillages   = availableVillages.filter(v => v.toLowerCase().includes(villageSearch.toLowerCase()))"""
txt = txt.replace(old_fil_reg, new_fil_reg, 1)

# Fix selectRegion to work with new scopeRegions shape
old_sel_r = "    selectRegion(r.name); setRegionSearch(r.name)"
new_sel_r = "    selectRegion(r); setRegionSearch(r.name)"
txt = txt.replace(old_sel_r, new_sel_r, 1)

# ── Fix Village Officers table: replace Total Records with Offline, remove register btn ──
old_vo_header = "              {['Officer ID','Name','Region','District','Village','Records','Status'].map(h => ("
new_vo_header = "              {['Officer ID','Name','Region','District','Village','Offline','Status','#'].map(h => ("
txt = txt.replace(old_vo_header, new_vo_header, 1)

# Fix VO row
old_vo_row = "                  <td className={`px-4 py-3 font-mono ${t.text}`}>{o.records.toLocaleString()}</td>"
new_vo_row = """                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${o.offline ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' : 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20'}`}>{o.offline?'OFFLINE':'ONLINE'}</span>
                  </td>"""
txt = txt.replace(old_vo_row, new_vo_row, 1)

# Add offline field and row number to VO data
old_vo1 = "    { id:'VO-0891', name:'Juma Mwanga Salehe',   region:'Dodoma',       district:'Chamwino',   village:'Nzuguni',   status:'ACTIVE',  records:340 },"
txt = txt.replace(old_vo1, "    { id:'VO-0891', name:'Juma Mwanga Salehe',   region:'Dodoma',       district:'Chamwino',   village:'Nzuguni',   status:'ACTIVE',  offline:false },", 1)

for old, new in [
  ("records:512", "offline:false"),
  ("records:289", "offline:false"),
  ("records:0",   "offline:true"),
  ("records:421", "offline:false"),
  ("records:198", "offline:true"),
]:
    txt = txt.replace(old, new, 1)

# Add entry row number to VO table after Status col
old_vo_status_td = """                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${o.status==='ACTIVE' ? 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>"""
new_vo_status_td = """                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${o.status==='ACTIVE' ? 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-[10px] font-mono ${t.textDim}`}>{i+1}/{filtered.length}</td>
                </tr>"""
txt = txt.replace(old_vo_status_td, new_vo_status_td, 1)

# Remove Register Village Officer button
txt = re.sub(
    r'\s*<button className="flex items-center gap-1\.5 px-3 py-2 rounded-lg bg-\[#00ff9d\]/10 border border-\[#00ff9d\]/30 text-\[#00ff9d\] hover:bg-\[#00ff9d\]/20 transition-all text-xs font-medium">\s*<Plus size=\{13\} \/> Register Village Officer\s*<\/button>',
    '', txt
)

# ── Add entries column to District Admins table ───────────
old_da_header = "              {['ID','Name','Region','District','Status','MFA','Joined','Actions'].map(h => ("
new_da_header = "              {['#','ID','Name','Region','District','Status','MFA','Joined','Actions'].map(h => ("
txt = txt.replace(old_da_header, new_da_header, 1)

old_da_row_start = "              {filtered.map(a => (\n                <tr key={a.id}"
new_da_row_start = "              {filtered.map((a, i) => (\n                <tr key={a.id}"
txt = txt.replace(old_da_row_start, new_da_row_start, 1)

old_da_id_td = "                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{a.id}</td>"
new_da_id_td = """                  <td className={`px-4 py-3 text-[10px] font-mono ${t.textDim}`}>{i+1}/{filtered.length}</td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{a.id}</td>"""
txt = txt.replace(old_da_id_td, new_da_id_td, 1)

# ── Infrastructure view: add entries footer to regional table ──
old_infra_footer = "        </div>\n      </div>\n    </div>\n  )\n}\n\n// ══════════════════════════════════════════════════════════\n// ── CONTENT: DISTRICT ADMINS"
new_infra_footer = """        </div>
        <div className={`px-5 py-3 border-t ${t.border} flex items-center justify-between`}>
          <span className={`text-[10px] font-mono ${t.textDim}`}>Showing 8 of {allRegions.length} regions</span>
          <button className="text-[#00d4ff] text-[10px] font-mono hover:underline">View All →</button>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ── CONTENT: DISTRICT ADMINS"""
txt = txt.replace(old_infra_footer, new_infra_footer, 1)

f.write_text(txt)
print("Geo + table patches OK")
PYEOF
4. Replace ManageUsersContent with full version (live cards + suspend/delete popups)
python3 - << 'PYEOF'
import re, pathlib

f = pathlib.Path('/root/census-ui-mockups/src/SuperAdminDashboard.jsx')
txt = f.read_text()

NEW_MANAGE = '''
// ══════════════════════════════════════════════════════════
// ── CONTENT: MANAGE USERS ────────────────────────────────
// ══════════════════════════════════════════════════════════
function ManageUsersContent({ darkMode, t }) {
  const [roleFilter,    setRoleFilter]    = useState('all')
  const [search,        setSearch]        = useState('')
  const [confirmAction, setConfirmAction] = useState(null) // { type:'suspend'|'delete', user }
  const [users,         setUsers]         = useState([
    { id:'USR-001', name:'Dr. Fatuma Rashid',   role:'Super Admin',    email:'f.rashid@nbs.go.tz',    status:'ACTIVE',    last:'2026-05-12 14:20', online:true  },
    { id:'USR-002', name:'John Amsterdam',       role:'Super Admin',    email:'j.amsterdam@nbs.go.tz', status:'ACTIVE',    last:'2026-05-12 13:55', online:true  },
    { id:'USR-003', name:'Amina Said Mwinyi',    role:'District Admin', email:'a.mwinyi@nbs.go.tz',   status:'ACTIVE',    last:'2026-05-12 11:30', online:false },
    { id:'USR-004', name:'Emmanuel Kihega',      role:'District Admin', email:'e.kihega@nbs.go.tz',   status:'PENDING',   last:'—',                online:false },
    { id:'USR-005', name:'Grace Haule',          role:'Village Officer',email:'g.haule@nbs.go.tz',    status:'ACTIVE',    last:'2026-05-12 09:10', online:true  },
    { id:'USR-006', name:'Peter Nduguru',        role:'District Admin', email:'p.nduguru@nbs.go.tz',  status:'SUSPENDED', last:'2026-04-01 08:00', online:false },
    { id:'USR-007', name:'Zainab Omar',          role:'Village Officer',email:'z.omar@nbs.go.tz',     status:'ACTIVE',    last:'2026-05-12 10:00', online:false },
    { id:'USR-008', name:'Ali Hassan Mkubwa',    role:'Citizen',        email:'ali.hassan@gmail.com',  status:'ACTIVE',    last:'2026-05-11 18:00', online:false },
    { id:'USR-009', name:'Maria Josephine Mlay', role:'Citizen',        email:'m.mlay@yahoo.com',      status:'ACTIVE',    last:'2026-05-11 20:30', online:true  },
  ])

  const roles = ['all','Super Admin','District Admin','Village Officer','Citizen']
  const roleBadge = {
    'Super Admin':    'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20',
    'District Admin': 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20',
    'Village Officer':'text-purple-400 bg-purple-400/10 border-purple-400/20',
    'Citizen':        'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  }
  const statusColor = { ACTIVE:'text-[#00ff9d]', PENDING:'text-yellow-400', SUSPENDED:'text-red-400' }

  const filtered = users.filter(u =>
    (roleFilter==='all' || u.role===roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  )

  const totalOnline  = users.filter(u=>u.online).length
  const totalOffline = users.filter(u=>!u.online).length

  const doSuspend = (u) => {
    setUsers(prev => prev.map(x => x.id===u.id ? {...x, status: x.status==='SUSPENDED' ? 'ACTIVE' : 'SUSPENDED'} : x))
    setConfirmAction(null)
  }
  const doDelete = (u) => {
    setUsers(prev => prev.filter(x => x.id!==u.id))
    setConfirmAction(null)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className={`font-bold text-xl sm:text-2xl ${t.text}`}>Manage Users</h1>
        <p className={`text-xs mt-0.5 ${t.textSub}`}>All system users — admins, officers & citizens</p>
      </div>

      {/* Live user cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
          <p className={`text-[9px] uppercase tracking-widest font-mono ${t.textDim} mb-1`}>Total Users</p>
          <p className="text-2xl font-extrabold text-[#00d4ff]">{users.length}</p>
          <p className={`text-[10px] mt-1 ${t.textSub}`}>All roles combined</p>
        </div>
        <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"/>
            <p className={`text-[9px] uppercase tracking-widest font-mono ${t.textDim}`}>Online Now</p>
          </div>
          <p className="text-2xl font-extrabold text-[#00ff9d]">{totalOnline}</p>
          <p className={`text-[10px] mt-1 ${t.textSub}`}>Active sessions</p>
        </div>
        <div className={`${t.card} border ${t.cardBorder} rounded-xl p-4`}>
          <p className={`text-[9px] uppercase tracking-widest font-mono ${t.textDim} mb-1`}>Offline</p>
          <p className="text-2xl font-extrabold text-gray-400">{totalOffline}</p>
          <p className={`text-[10px] mt-1 ${t.textSub}`}>Inactive / logged out</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
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
        <div className="relative flex-1">
          <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textDim}`} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
                 className={`w-full ${t.input} border ${t.cardBorder} ${t.text} text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-[#00d4ff]/40 placeholder-gray-500`} />
        </div>
      </div>

      {/* Table */}
      <div className={`${t.card} border ${t.cardBorder} rounded-xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={`border-b ${t.border}`}>
                {['#','ID','Name','Role','Email','Status','Online','Last Login','Actions'].map(h => (
                  <th key={h} className={`px-4 py-3 text-left text-[9px] font-mono uppercase tracking-widest ${t.textDim}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className={`border-b ${t.border} ${t.rowHover} transition-all ${u.status==='SUSPENDED'?'opacity-60':''}`}>
                  <td className={`px-4 py-3 text-[10px] font-mono ${t.textDim}`}>{i+1}/{filtered.length}</td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textDim}`}>{u.id}</td>
                  <td className={`px-4 py-3 font-semibold ${t.text}`}>{u.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${roleBadge[u.role]}`}>{u.role}</span>
                  </td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textSub}`}>{u.email}</td>
                  <td className={`px-4 py-3 font-bold text-[10px] ${statusColor[u.status]}`}>{u.status}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 text-[9px] font-mono ${u.online?'text-[#00ff9d]':t.textDim}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.online?'bg-[#00ff9d] animate-pulse':'bg-gray-600'}`}/>
                      {u.online?'Online':'Offline'}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-mono text-[10px] ${t.textSub}`}>{u.last}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setConfirmAction({ type:'suspend', user:u })}
                        title={u.status==='SUSPENDED'?'Unsuspend':'Suspend'}
                        className={`w-6 h-6 rounded flex items-center justify-center border transition-colors text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/10`}>
                        <span className="text-[9px]">{u.status==='SUSPENDED'?'▶':'⏸'}</span>
                      </button>
                      <button
                        onClick={() => setConfirmAction({ type:'delete', user:u })}
                        title="Delete user"
                        className={`w-6 h-6 rounded flex items-center justify-center border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-colors`}>
                        <Trash2 size={10}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`px-5 py-3 border-t ${t.border}`}>
          <span className={`text-[10px] font-mono ${t.textDim}`}>Showing {filtered.length} of {users.length} users</span>
        </div>
      </div>

      {/* Confirm Action Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setConfirmAction(null)} />
          <div className={`relative w-full max-w-sm rounded-2xl border shadow-2xl z-10 p-6 ${t.card} ${t.cardBorder}`}>
            <div className="text-center space-y-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto border
                              ${confirmAction.type==='delete'
                                ? 'bg-red-500/10 border-red-500/30'
                                : 'bg-yellow-400/10 border-yellow-400/30'}`}>
                <span className="text-2xl">{confirmAction.type==='delete' ? '🗑️' : '⏸️'}</span>
              </div>
              <div>
                <p className={`font-bold text-base ${t.text}`}>
                  {confirmAction.type==='delete' ? 'Delete User?' : confirmAction.user.status==='SUSPENDED' ? 'Unsuspend User?' : 'Suspend User?'}
                </p>
                <p className={`text-xs mt-1 ${t.textSub}`}>
                  {confirmAction.type==='delete'
                    ? `This will permanently remove ${confirmAction.user.name} from the system. This action cannot be undone.`
                    : confirmAction.user.status==='SUSPENDED'
                      ? `This will re-activate ${confirmAction.user.name}'s account and restore access.`
                      : `This will pause ${confirmAction.user.name}'s access. They will not be able to log in.`}
                </p>
                <p className="text-[#00d4ff] text-[10px] font-mono mt-2">{confirmAction.user.email}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setConfirmAction(null)}
                        className={`flex-1 py-2.5 rounded-lg text-xs border ${t.cardBorder} ${t.textSub} hover:text-white transition-all`}>
                  Cancel
                </button>
                <button
                  onClick={() => confirmAction.type==='delete' ? doDelete(confirmAction.user) : doSuspend(confirmAction.user)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all
                              ${confirmAction.type==='delete'
                                ? 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30'
                                : 'bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/30'}`}>
                  {confirmAction.type==='delete' ? 'Yes, Delete' : confirmAction.user.status==='SUSPENDED' ? 'Yes, Unsuspend' : 'Yes, Suspend'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
'''

# Replace old ManageUsersContent
old_manage = re.search(r'// ══+\n// ── CONTENT: MANAGE USERS.*?// ══+\n// ── CONTENT: SYSTEM PERFORMANCE', txt, re.DOTALL)
if old_manage:
    txt = txt.replace(old_manage.group(0), NEW_MANAGE + '\n// ══════════════════════════════════════════════════════════\n// ── CONTENT: SYSTEM PERFORMANCE')

f.write_text(txt)
print("ManageUsers replaced OK")
PYEOF
