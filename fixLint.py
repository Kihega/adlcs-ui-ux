#!/usr/bin/env python3
"""
fix_ci_errors.py  —  fixes all 27 ESLint CI errors in code/web/src
────────────────────────────────────────────────────────────────────
Usage:
    python3 fix_ci_errors.py              # run from  code/web/
    python3 fix_ci_errors.py path/to/src  # explicit src dir

Errors fixed:
    LoginPage.jsx              2  (getJurisdiction, adminType)
    SuperAdminDashboard.jsx   19  (getStrength, darkMode, MuiIcon, Gauge,
                                   Math.random, activeFilter, setSelIdx, Icon)
    AllActionsModal.jsx        1  (export const ALL_ACTIONS)
    AllRegionsModal.jsx        1  (export const ALL_REGIONS)
    NewRegistrationModal.jsx   2  (resetAll, Icon)
    tanzania.js                1  (duplicate 'Kigoma' key)
                              ──
                              27  total
"""

import re
import sys
import os

SRC     = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.getcwd(), 'src')
_fixed  = []
_skipped = []

# ─────────────────────────────────────────────────────────────────────────────
# I/O helpers
# ─────────────────────────────────────────────────────────────────────────────
def _read(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def _write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def patch(rel_path, *transforms):
    full = os.path.join(SRC, rel_path)
    if not os.path.exists(full):
        print(f'  warning  SKIP (not found): {rel_path}')
        _skipped.append(rel_path)
        return
    original = _read(full)
    result   = original
    for fn in transforms:
        result = fn(result)
    if result != original:
        _write(full, result)
        print(f'  ok  fixed:    {rel_path}')
        _fixed.append(rel_path)
    else:
        print(f'  --  no-op:    {rel_path}  (already correct?)')

# ─────────────────────────────────────────────────────────────────────────────
# Bracket / brace matching helper
# ─────────────────────────────────────────────────────────────────────────────
def _match_close(s, open_pos, open_ch, close_ch):
    depth = 0
    i = open_pos
    while i < len(s):
        if   s[i] == open_ch:  depth += 1
        elif s[i] == close_ch:
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return len(s)

def _body_of_function(s, sig_end):
    brace_pos = s.index('{', sig_end)
    return brace_pos, _match_close(s, brace_pos, '{', '}')

# ─────────────────────────────────────────────────────────────────────────────
# Transform functions
# ─────────────────────────────────────────────────────────────────────────────

def _strip_export_const(name):
    """Remove `export` from `export const <name>` (fast-refresh violation)."""
    return lambda s: s.replace(f'export const {name}', f'const {name}', 1)


def fix_tanzania_dupe(s):
    """Remove the second occurrence of 'Kigoma': [...] in districtsByRegion."""
    for quote in ("'", '"'):
        key = f'{quote}Kigoma{quote}:'
        i1  = s.find(key)
        if i1 < 0:
            continue
        i2 = s.find(key, i1 + len(key))
        if i2 < 0:
            return s
        line_start    = s.rfind('\n', 0, i2) + 1
        close_bracket = s.find('],', i2)
        if close_bracket < 0:
            close_bracket = s.find(']', i2)
        if close_bracket < 0:
            return s
        line_end = s.find('\n', close_bracket)
        line_end = (line_end + 1) if line_end >= 0 else len(s)
        return s[:line_start] + s[line_end:]
    return s


def fix_login(s):
    """Remove getJurisdiction import; rename adminType → _adminType."""
    s = re.sub(r',\s*getJurisdiction\b', '',  s)
    s = re.sub(r'\bgetJurisdiction\s*,\s*', '', s)
    s = re.sub(r'const\s*\[\s*adminType\s*,', 'const [_adminType,', s)
    return s


def fix_new_reg(s):
    """Rename resetAll → _resetAll; remove Icon from destructure."""
    s = re.sub(r'\bconst\s+resetAll\b', 'const _resetAll', s)
    s = re.sub(r',\s*Icon\s*(?=[,}])', '', s)
    s = re.sub(r'\bIcon\s*,\s*(?=\S)',  '', s)
    return s


# ── SuperAdminDashboard sub-fixers ────────────────────────────────────────────

def _add_usememo_import(s):
    if 'useMemo' in s:
        return s
    return re.sub(
        r"(import\s*\{)([^}]+?)(useRef)(\s*\})",
        r"\1\2useRef, useMemo\4",
        s, count=1,
    )


def _remove_getstrength(s):
    m = re.search(r'\nfunction getStrength\(pwd\)\s*\{', s)
    if not m:
        return s
    fn_open = s.index('{', m.start())
    fn_end  = _match_close(s, fn_open, '{', '}')
    if fn_end < len(s) and s[fn_end] == '\n':
        fn_end += 1
    return s[:m.start()] + '\n' + s[fn_end:]


def _fix_employment_card(s):
    s = re.sub(
        r'function EmploymentStatusCard\(\{\s*darkMode,\s*t\s*\}\)',
        'function EmploymentStatusCard({ t })',
        s,
    )
    s = re.sub(r'\s*darkMode=\{darkMode\}(?=\s+t=\{t\})', '', s)
    return s


def _fix_muiicon(s):
    """Rename MuiIcon → Icon (uppercase) in first destructure + JSX."""
    s = re.sub(r'(?<=\{)\s*MuiIcon\s*(?=,)', ' MuiIcon: Icon', s, count=1)
    s = s.replace('<MuiIcon sx=', '<Icon sx=')
    return s


def _strip_unused_darkmode_in_params(s):
    """
    For every `function XxxContent({ darkMode, t })` where darkMode is never
    referenced inside the body, remove it from the signature.
    """
    sig_re  = re.compile(r'(function \w+\()(\{\s*darkMode,\s*t\s*\})\)')
    patches = []
    for m in sig_re.finditer(s):
        body_start, body_end = _body_of_function(s, m.end())
        body = s[body_start:body_end]
        if not re.search(r'\bdarkMode\b', body):
            patches.append((
                m.start(), m.end(),
                m.group(0).replace(m.group(2), '{ t }'),
            ))
    for start, end, replacement in reversed(patches):
        s = s[:start] + replacement + s[end:]
    return s


def _relocate_gauge_component(s):
    """
    Move `const Gauge = ({...}) => (...)` from inside SystemPerformanceContent
    to a standalone `function Gauge({..., t, darkMode})` placed before it.
    Update JSX call sites to pass t and darkMode as props.
    """
    sig = re.search(
        r'\n(\s*)const Gauge\s*=\s*\(\{([^}]*)\}\)\s*=>\s*\(',
        s,
    )
    if not sig:
        return s

    paren_open  = s.index('(', s.index('=>', sig.end()))
    paren_close = _match_close(s, paren_open, '(', ')')
    inner_body  = s[paren_open + 1 : paren_close - 1]

    param_parts = [p.strip() for p in sig.group(2).split(',') if p.strip()]
    for extra in ('t', 'darkMode'):
        if extra not in param_parts:
            param_parts.append(extra)

    new_fn = (
        f'\nfunction Gauge({{ {", ".join(param_parts)} }}) {{\n'
        f'  return ({inner_body}\n  )\n}}\n'
    )

    s = s[:sig.start()] + s[paren_close:]

    insert = re.search(r'\nfunction SystemPerformanceContent', s)
    if insert:
        pos = insert.start()
        s   = s[:pos] + new_fn + s[pos:]

    def _add_props(m):
        tag = m.group(0)
        if 't={t}' not in tag:
            tag = tag.replace('/>', ' t={t} darkMode={darkMode}/>')
            tag = tag.replace('>',  ' t={t} darkMode={darkMode}>')
        return tag

    s = re.sub(r'<Gauge\b[^/\n>]*(?:/?>)', _add_props, s)
    return s


def _wrap_random_in_usememo(s, varname):
    """
    Wrap `const <varname> = Array.from(...Math.random()...)` in
    `useMemo(() => ..., [])` and replace Math.random()*N with deterministic
    `(h * prime % N)` to satisfy react-hooks/purity.
    """
    pat = re.compile(
        rf'(const {re.escape(varname)}\s*=\s*)'
        rf'(Array\.from\(\{{[^}}]+\}}\s*,.*?\)\))',
        re.DOTALL,
    )
    m = pat.search(s)
    if not m or 'useMemo' in m.group(0):
        return s

    decl = m.group(1)
    body = m.group(2)

    _primes = iter([7, 11, 13, 17, 19, 23, 29, 31])
    def _det(rm):
        return f'(h * {next(_primes, 7)} % {rm.group(1)})'

    body = re.sub(r'Math\.random\(\)\s*\*\s*(\d+)', _det, body)
    body = re.sub(r'Math\.random\(\)',              '(h % 3)', body)

    return s[:m.start()] + f'{decl}useMemo(() => {body}, [])' + s[m.end():]


def _fix_setselidx_in_effect(s):
    """
    Remove `useEffect(() => { setSelIdx(0) }, [query])` and instead reset
    the index inline in the `setQuery(...)` call.
    """
    s = re.sub(
        r'\s*useEffect\s*\(\s*\(\s*\)\s*=>\s*\{\s*setSelIdx\s*\(\s*0\s*\)\s*\}'
        r'\s*,\s*\[\s*query\s*\]\s*\)',
        '',
        s,
    )
    s = re.sub(
        r'\bsetQuery\(([^)]+)\)(?!\s*;\s*setSelIdx)',
        r'setQuery(\1); setSelIdx(0)',
        s, count=1,
    )
    return s


def _fix_active_filter_unused(s):
    """Rename `activeFilter` → `_activeFilter` (ESLint ignores /^[A-Z_]/)."""
    return re.sub(
        r'const\s*\[\s*activeFilter\s*,\s*setActiveFilter\s*\]',
        'const [_activeFilter, setActiveFilter]',
        s,
    )


def _fix_nav_icon(s):
    """Rename Icon → NavIcon in NAV.map() destructure and JSX."""
    s = re.sub(
        r'NAV\.map\(\(\{\s*label,\s*Icon\s*\}\)',
        'NAV.map(({ label, Icon: NavIcon })',
        s,
    )
    s = s.replace('<Icon sx={{ fontSize:15 }}', '<NavIcon sx={{ fontSize:15 }}')
    s = s.replace('<Icon sx={{fontSize:15}}',   '<NavIcon sx={{fontSize:15}}')
    s = re.sub(r'<Icon\s+sx=\{', '<NavIcon sx={', s)
    return s


def fix_dashboard(s):
    s = _add_usememo_import(s)
    s = _remove_getstrength(s)
    s = _fix_employment_card(s)
    s = _fix_muiicon(s)
    s = _strip_unused_darkmode_in_params(s)
    s = _relocate_gauge_component(s)
    s = _wrap_random_in_usememo(s, 'dailyMarriage')
    s = _wrap_random_in_usememo(s, 'dailyData')
    s = _fix_setselidx_in_effect(s)
    s = _fix_active_filter_unused(s)
    s = _fix_nav_icon(s)
    return s


# ─────────────────────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print(f'\nfix_ci_errors.py  —  src: {SRC}\n')

    print('[1/6] modals/AllActionsModal.jsx')
    patch('modals/AllActionsModal.jsx', _strip_export_const('ALL_ACTIONS'))

    print('[2/6] modals/AllRegionsModal.jsx')
    patch('modals/AllRegionsModal.jsx', _strip_export_const('ALL_REGIONS'))

    print('[3/6] tanzania.js')
    patch('tanzania.js', fix_tanzania_dupe)

    print('[4/6] LoginPage.jsx')
    patch('LoginPage.jsx', fix_login)

    print('[5/6] modals/NewRegistrationModal.jsx')
    patch('modals/NewRegistrationModal.jsx', fix_new_reg)

    print('[6/6] SuperAdminDashboard.jsx')
    patch('SuperAdminDashboard.jsx', fix_dashboard)

    print('\n' + '=' * 52)
    print(f'  Files patched  : {len(_fixed)}')
    print(f'  Files not found: {len(_skipped)}')
    if _skipped:
        print(f'  Missing        : {", ".join(_skipped)}')
    print('\n  Next step:')
    print('    cd code/web && npm run lint')
    print('  Expected: 0 problems (0 errors, 0 warnings)')
    print('=' * 52 + '\n')
