import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LayoutDashboard, Users, BriefcaseBusiness, WalletCards, CalendarCheck,
  Target, GraduationCap, HeartPulse, UserRound, BarChart3, ShieldCheck,
  Search, Bell, Settings, LogOut, ChevronDown, Plus, ArrowUpRight,
  MoreHorizontal, Menu, X, Clock3, Building2, CheckCircle2,
  Pencil, Trash2, UserRoundCog, BellRing, Banknote
} from 'lucide-react'
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import './App.css'

const API = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
const api = axios.create({ baseURL: API })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hrgenius_access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const navItems = [
  ['Overview', LayoutDashboard],
  ['Employees', Users],
  ['Recruitment', BriefcaseBusiness],
  ['Payroll', WalletCards],
  ['Salary', Banknote],
  ['Attendance', CalendarCheck],
  ['Performance', Target],
  ['Learning', GraduationCap],
  ['Benefits', HeartPulse],
  ['Self Service', UserRound],
  ['Analytics', BarChart3],
  ['Compliance', ShieldCheck],
]

const menuPaths = {
  Overview: '/dashboard/',
  Employees: '/employees/',
  Recruitment: '/recruitment/',
  Payroll: '/payroll/',
  Salary: '/salary/',
  Attendance: '/attendance/',
  Performance: '/performance/',
  Learning: '/learning/',
  Benefits: '/benefits/',
  'Self Service': '/self-service/',
  Analytics: '/analytics/',
  Compliance: '/compliance/',
}

const roleNavItems = {
  ADMIN: navItems,
  HR: navItems.filter(([label]) => ['Overview','Employees','Recruitment','Payroll','Salary','Attendance','Performance','Learning','Benefits','Analytics','Compliance'].includes(label)),
  EMPLOYEE: navItems.filter(([label]) => ['Overview','Salary','Attendance','Performance','Learning','Benefits','Self Service'].includes(label)),
}

async function fetchAllPages(endpoint) {
  const rows = []
  let url = endpoint
  while (url) {
    const { data } = await api.get(url)
    if (Array.isArray(data)) {
      rows.push(...data)
      break
    }
    rows.push(...(data.results || []))
    url = data.next
  }
  return rows
}

function Homepage({ onLogin, onNavigate }) {
  return (
    <main className="public-home">
      <nav className="public-nav">
        <a className="public-brand" href="/" onClick={(event) => event.preventDefault()}>
          <BrandLogo compact />
          <div><strong>HRGenius</strong><span>Human Resource Management</span></div>
        </a>
        <div className="public-links">
          <a href="#features">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#benefits">Benefits</a>
        </div>
        <button className="public-login-button" onClick={onLogin}>Sign in <ArrowUpRight size={16}/></button>
      </nav>

      <section className="public-hero">
        <div className="public-hero-copy">
          <span className="public-eyebrow">THE PEOPLE OPERATING SYSTEM</span>
          <h1>Build a workplace<br/><em>people love.</em></h1>
          <p>HRGenius brings employees, payroll, performance, learning and compliance into one beautiful, connected platform.</p>
          <div className="public-hero-actions">
            <button className="public-primary" onClick={onLogin}>Explore the platform <ArrowUpRight size={18}/></button>
            <button className="public-secondary" onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}>View features</button>
          </div>
          <div className="public-proof">
            <div><strong>10+</strong><span>Core HR modules</span></div>
            <div><strong>3</strong><span>Personalized roles</span></div>
            <div><strong>One</strong><span>Connected workspace</span></div>
          </div>
        </div>
        <div className="public-hero-visual" aria-label="HRGenius dashboard preview">
          <div className="preview-window">
            <div className="preview-top"><i/><i/><i/><span>HRGenius</span></div>
            <div className="preview-body">
              <aside><BrandLogo compact/><b/><b/><b/><b/></aside>
              <section>
                <div className="preview-heading"><div><span>WORKFORCE OVERVIEW</span><strong>Good morning, Deeksha</strong></div><i/></div>
                <div className="preview-stats"><div><span>Employees</span><strong>24</strong></div><div><span>Open roles</span><strong>5</strong></div><div><span>On leave</span><strong>4</strong></div></div>
                <div className="preview-charts"><div className="preview-bars"><i/><i/><i/><i/><i/><i/></div><div className="preview-donut"><b>24</b></div></div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="public-trust" id="solutions">
        <span>DESIGNED FOR EVERY PEOPLE TEAM</span>
        <div><b>Admin</b><i/><b>HR Manager</b><i/><b>Employee</b></div>
      </section>

      <section className="public-features" id="features">
        <div className="public-section-heading">
          <span>ONE UNIFIED PLATFORM</span>
          <h2>Everything your people team needs.</h2>
        </div>
        <div className="feature-grid">
          <article><div className="feature-icon"><Users size={21}/></div><h3>People management</h3><p>Organize profiles, departments and employee records from one reliable source.</p></article>
          <article><div className="feature-icon"><BriefcaseBusiness size={21}/></div><h3>Recruit & onboard</h3><p>Move candidates through applications, interviews and onboarding with clarity.</p></article>
          <article><div className="feature-icon"><WalletCards size={21}/></div><h3>Payroll & attendance</h3><p>Manage payroll records, working hours, leave requests and attendance.</p></article>
          <article><div className="feature-icon"><Target size={21}/></div><h3>Performance</h3><p>Set goals, complete reviews and help employees grow with measurable feedback.</p></article>
        </div>
      </section>

      <section className="public-cta" id="benefits">
        <div><span>READY WHEN YOU ARE</span><h2>Make every employee<br/>experience count.</h2></div>
        <button className="public-primary" onClick={onLogin}>Sign in to HRGenius <ArrowUpRight size={18}/></button>
      </section>

      <footer className="public-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="public-brand" href="/" onClick={(event) => event.preventDefault()}>
              <BrandLogo compact />
              <div><strong>HRGenius</strong><span>Human Resource Management</span></div>
            </a>
            <p>A connected human resource platform for building better teams and workplaces.</p>
          </div>
          <div className="footer-column">
            <strong>Platform</strong>
            <a href="#features">People management</a>
            <a href="#features">Recruitment</a>
            <a href="#features">Payroll</a>
            <a href="#features">Analytics</a>
          </div>
          <div className="footer-column">
            <strong>Solutions</strong>
            <a href="#solutions">Admin</a>
            <a href="#solutions">HR Managers</a>
            <a href="#solutions">Employees</a>
          </div>
          <div className="footer-column">
            <strong>Account</strong>
            <button type="button" onClick={onLogin}>Sign in</button>
            <a href="#benefits">Benefits</a>
            <a href="#features">Support</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 HRGenius. All rights reserved.</span>
          <div>
            <button type="button" onClick={() => onNavigate('/privacy/')}>Privacy</button>
            <button type="button" onClick={() => onNavigate('/terms/')}>Terms</button>
          </div>
        </div>
      </footer>
    </main>
  )
}

function LegalPage({ page, onNavigate, onLogin }) {
  const isPrivacy = page === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use'
  const description = isPrivacy
    ? 'How HRGenius handles and protects information used within this academic HRMS demonstration.'
    : 'Terms for using the HRGenius academic Human Resource Management System demonstration.'

  return (
    <main className="legal-page">
      <nav className="legal-nav">
        <button className="public-brand legal-brand" type="button" onClick={() => onNavigate('/')}>
          <BrandLogo compact />
          <div><strong>HRGenius</strong><span>Human Resource Management</span></div>
        </button>
        <button className="public-login-button" type="button" onClick={onLogin}>Sign in <ArrowUpRight size={16}/></button>
      </nav>
      <article className="legal-content">
        <button className="legal-back" type="button" onClick={() => onNavigate('/')}>← Back to homepage</button>
        <span className="public-eyebrow">LEGAL INFORMATION</span>
        <h1>{title}</h1>
        <p className="legal-lead">{description}</p>
        {isPrivacy ? (
          <div className="legal-sections">
            <section><h2>Information we use</h2><p>HRGenius may process account, employee, recruitment, attendance, payroll, training and compliance information required to demonstrate HR workflows.</p></section>
            <section><h2>How information is used</h2><p>Information is used for authentication, role-based access, application functionality and reports within the HRMS environment.</p></section>
            <section><h2>Data protection</h2><p>Passwords are stored using Django password hashing. Demo credentials are for academic use only and should not contain real personal or confidential records.</p></section>
            <section><h2>Retention and access</h2><p>Users should only enter authorized test data. In a production deployment, retention, access controls and deletion policies should be documented and enforced.</p></section>
          </div>
        ) : (
          <div className="legal-sections">
            <section><h2>Academic demonstration</h2><p>HRGenius is provided as an educational full-stack project. Payroll, compliance and statutory calculations are simplified demonstrations and not legal or production advice.</p></section>
            <section><h2>Acceptable use</h2><p>Users must use the system responsibly, protect demo credentials and not upload confidential or unlawful information.</p></section>
            <section><h2>Account responsibility</h2><p>Users are responsible for actions performed under their account. Administrators should review role permissions and data access before sharing the system.</p></section>
            <section><h2>Availability</h2><p>The demo may be modified, reset or unavailable for development, testing or academic presentation.</p></section>
          </div>
        )}
        <p className="legal-updated">Last updated: November 2026</p>
      </article>
      <footer className="public-footer">
        <div className="footer-bottom">
          <span>&copy; 2026 HRGenius. All rights reserved.</span>
          <div>
            <button type="button" onClick={() => onNavigate('/privacy/')}>Privacy</button>
            <button type="button" onClick={() => onNavigate('/terms/')}>Terms</button>
          </div>
        </div>
      </footer>
    </main>
  )
}

function roleLabel(role) {
  if (role === 'HR') return 'HR Manager'
  if (role === 'EMPLOYEE') return 'Employee'
  return 'Admin'
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('Admin@123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.post(
        (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api') + '/auth/login/',
        { username, password }
      )
      localStorage.setItem('hrgenius_access', data.access)
      localStorage.setItem('hrgenius_refresh', data.refresh)
      const profileResponse = await axios.get(
        (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api') + '/auth/profile/',
        { headers: { Authorization: `Bearer ${data.access}` } }
      )
      onLogin(profileResponse.data)
    } catch {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-shell">
      <section className="login-brand">
        <button className="login-home-link" type="button" onClick={() => window.location.assign('/')}>
          <ArrowUpRight size={15} /> Back to homepage
        </button>
        <div className="login-brand-id">
          <BrandLogo />
          <div>
            <h1>HRGenius</h1>
            <p>Human Resource Management</p>
          </div>
        </div>
        <div className="login-quote">
          <span>YOUR PEOPLE. ONE PLATFORM.</span>
          <h2>Build better teams,<br />every day.</h2>
        </div>
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to your account</h2>
          <p>Enter your credentials to continue</p>
          {error && <div className="error-banner">{error}</div>}
          <label>Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
          </label>
          <label>Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </label>
          <button className="primary-button" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'} <ArrowUpRight size={17} /></button>
          <div className="demo-accounts">
            <b>Demo accounts</b>
            <button type="button" onClick={() => { setUsername('admin'); setPassword('Admin@123') }}>Admin</button>
            <button type="button" onClick={() => { setUsername('hrmanager'); setPassword('HR@123') }}>HR Manager</button>
            <button type="button" onClick={() => { setUsername('employee'); setPassword('Employee@123') }}>Employee</button>
          </div>
        </form>
      </section>
    </main>
  )
}

function BrandLogo({ compact = false }) {
  return (
    <div className={`brand-logo ${compact ? 'compact' : ''}`} aria-label="HRGenius">
      <svg viewBox="0 0 44 44" role="img">
        <defs>
          <linearGradient id="logoGradient" x1="4" y1="4" x2="40" y2="40">
            <stop stopColor="#70A2FF" />
            <stop offset="1" stopColor="#315FD5" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="40" height="40" rx="12" fill="url(#logoGradient)" />
        <circle cx="22" cy="16" r="5" fill="white" />
        <path d="M11.5 32c1.1-6.2 5.1-9.2 10.5-9.2S31.4 25.8 32.5 32" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M29.5 10.5h5v5M34.5 10.5l-7 7" fill="none" stroke="#CDE0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <div><span className="eyebrow">HRGENIUS</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
          <button className="icon-button" type="button" onClick={onClose}><X size={19} /></button>
        </div>
        {children}
      </section>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, trend, tone }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
      <div className="stat-meta">
        <span>{label}</span>
        <strong>{value}</strong>
        {trend && <small>{trend}</small>}
      </div>
    </article>
  )
}

function Dashboard({ onAddEmployee, onOpenEmployees, profile }) {
  const [stats, setStats] = useState(null)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    Promise.all([api.get('/analytics/summary/'), api.get('/employees/?page_size=5')])
      .then(([analytics, employeeData]) => {
        setStats(analytics.data)
        setEmployees(employeeData.data.results || employeeData.data)
      })
      .catch(() => {
        setStats({ totalEmployees: 0, activeEmployees: 0, openPositions: 0, pendingLeaves: 0, departments: [], gender: [], payroll: [], applications: [] })
        setEmployees([])
      })
  }, [])

  const payrollData = (stats?.payroll || []).map((item) => ({
    month: new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(
      new Date(`${String(item.month).slice(0, 10)}T00:00:00`)
    ),
    value: Number(item.value)
  }))

  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">MONDAY, 19 NOVEMBER</span>
          <h1>Good morning, {profile?.first_name || 'Aarav'}</h1>
          <p>Here is what is happening across your organization today.</p>
        </div>
        <button className="primary-button" onClick={onAddEmployee}><Plus size={17} /> Add employee</button>
      </div>

      <section className="stats-grid">
        <StatCard icon={Users} label="Total employees" value={stats?.totalEmployees ?? '—'} trend="+8.2% this year" tone="blue" />
        <StatCard icon={CheckCircle2} label="Active employees" value={stats?.activeEmployees ?? '—'} trend="91.7% workforce" tone="green" />
        <StatCard icon={BriefcaseBusiness} label="Open positions" value={stats?.openPositions ?? '—'} trend="5 roles hiring" tone="purple" />
        <StatCard icon={CalendarCheck} label="Pending leaves" value={stats?.pendingLeaves ?? '—'} trend="Needs your review" tone="orange" />
      </section>

      <section className="content-grid">
        <article className="panel headcount-panel">
          <div className="panel-header">
            <div><span className="panel-kicker">WORKFORCE</span><h3>Department overview</h3></div>
            <button className="icon-button"><MoreHorizontal size={18} /></button>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stats?.departments || []} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f4" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8a94a6' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8a94a6' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f6f8fb' }} />
                <Bar dataKey="value" fill="#356df3" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel gender-panel">
          <div className="panel-header">
            <div><span className="panel-kicker">DIVERSITY</span><h3>Gender distribution</h3></div>
          </div>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={stats?.gender || []} dataKey="value" innerRadius={52} outerRadius={76} paddingAngle={4}>
                  {(stats?.gender || []).map((_, i) => <Cell key={i} fill={i ? '#91aeea' : '#356df3'} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center"><strong>{stats?.totalEmployees || 0}</strong><span>People</span></div>
          </div>
          <div className="legend-row">
            <span><i className="male" /> Male</span>
            <span><i className="female" /> Female</span>
          </div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel employee-panel">
          <div className="panel-header">
            <div><span className="panel-kicker">TEAM</span><h3>Recent employees</h3></div>
            <button className="text-button" onClick={onOpenEmployees}>View all <ArrowUpRight size={15} /></button>
          </div>
          <div className="employee-list">
            {employees.slice(0, 5).map((employee, i) => (
              <div className="employee-row" key={employee.id || i}>
                <div className={`avatar avatar-${i % 4}`}>{employee.first_name?.[0]}{employee.last_name?.[0]}</div>
                <div className="employee-name"><strong>{employee.first_name} {employee.last_name}</strong><span>{employee.department_name || 'Employee'} · {employee.city}</span></div>
                <span className={`status ${employee.status?.toLowerCase()}`}>{employee.status}</span>
                <button className="icon-button"><MoreHorizontal size={17} /></button>
              </div>
            ))}
          </div>
        </article>
        <article className="panel payroll-panel">
          <div className="panel-header">
            <div><span className="panel-kicker">FINANCE</span><h3>Payroll overview</h3></div>
            <span className="period">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={205}>
            <LineChart data={payrollData} margin={{ top: 20, right: 12, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#667085' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(value)}`
                }
                width={68}
              />
              <Tooltip
                formatter={(value) => [`₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)}`, 'Payroll']}
                labelFormatter={(label) => `${label} 2026`}
              />
              <Line type="monotone" dataKey="value" stroke="#356df3" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>
      </section>
    </div>
  )
}

function EmployeeDashboard({ profile, onApplyLeave, onNavigate }) {
  const [stats, setStats] = useState({
    attendance: '—',
    leaveBalance: '18',
    benefits: '—',
    training: '—',
  })

  useEffect(() => {
    Promise.all([
      api.get('/attendance/'),
      api.get('/leaves/'),
      api.get('/benefit-enrollments/'),
      api.get('/enrollments/'),
    ]).then(([attendance, leaves, benefits, training]) => {
      setStats({
        attendance: attendance.data.count ?? (attendance.data.results || attendance.data).length,
        leaveBalance: '18',
        benefits: (benefits.data.results || benefits.data).length,
        training: (training.data.results || training.data).length,
      })
    }).catch(() => {})
  }, [])

  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">EMPLOYEE SELF-SERVICE</span>
          <h1>Welcome back, {[profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || 'Employee'}</h1>
          <p>Your work, benefits and development information in one place.</p>
        </div>
        <button className="primary-button" onClick={onApplyLeave}><Plus size={17}/> Apply for leave</button>
      </div>
      <section className="stats-grid">
        <StatCard icon={CalendarCheck} label="Attendance records" value={stats.attendance} tone="blue"/>
        <StatCard icon={Clock3} label="Leave balance" value={`${stats.leaveBalance} days`} tone="green"/>
        <StatCard icon={HeartPulse} label="Benefit enrollments" value={stats.benefits} tone="purple"/>
        <StatCard icon={GraduationCap} label="Assigned courses" value={stats.training} tone="orange"/>
      </section>
      <section className="content-grid">
        <article className="panel">
          <div className="panel-header"><div><span className="panel-kicker">TODAY</span><h3>My schedule</h3></div></div>
          <div className="selfservice-list">
            <div><CalendarCheck size={18}/><div><strong>Office working day</strong><span>Check-in window closes at 10:00 AM</span></div></div>
            <div><Target size={18}/><div><strong>Development goal review</strong><span>Review your quarterly progress</span></div></div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-header"><div><span className="panel-kicker">QUICK ACTIONS</span><h3>Employee services</h3></div></div>
          <div className="quick-actions">
            <button onClick={() => onNavigate('Attendance')}>View attendance</button>
            <button onClick={() => onNavigate('Payroll')}>View payslips</button>
            <button onClick={() => onNavigate('Benefits')}>View benefits</button>
            <button onClick={() => onNavigate('Learning')}>Open training</button>
          </div>
        </article>
      </section>
    </div>
  )
}

function DataPage({ name, initialSearch = '', userRole = 'ADMIN' }) {
  const routeMap = {
    Employees: 'employees', Recruitment: 'candidates', Payroll: 'payroll',
    Attendance: 'attendance', Performance: 'reviews', Learning: 'training',
    Benefits: 'benefits', 'Self Service': 'leaves', Compliance: 'documents'
  }
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(initialSearch)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [departments, setDepartments] = useState([])
  const [designations, setDesignations] = useState([])
  const [employees, setEmployees] = useState([])
  const [payrollDepartment, setPayrollDepartment] = useState('')
  const [payrollMonth, setPayrollMonth] = useState('')
  const [minimumBasic, setMinimumBasic] = useState('')
  const [maximumBasic, setMaximumBasic] = useState('')
  const [form, setForm] = useState({})
  const route = routeMap[name]

  const fieldsByPage = {
    Employees: [
      ['employee_id','Employee ID','text'], ['first_name','First name','text'], ['last_name','Last name','text'],
      ['email','Email','email'], ['phone','Phone','text'], ['gender','Gender','select',['Male','Female','Other']],
      ['date_of_birth','Date of birth','date'], ['date_of_joining','Joining date','date'],
      ['department','Department','department'], ['designation','Designation','designation'],
      ['city','City','text'], ['address','Address','textarea'], ['basic_salary','Basic salary (INR)','number'], ['status','Status','select',['Active','Inactive']]
    ],
    Recruitment: [['name','Candidate name','text'],['email','Email','email'],['phone','Phone','text'],['city','City','text']],
    Payroll: [['employee','Employee','employee'],['month','Salary month','month'],['basic','Basic salary','number'],['hra','HRA','number'],['allowances','Allowances','number'],['deductions','Deductions','number']],
    Attendance: [['employee','Employee','employee'],['date','Date','date'],['check_in','Check in','time'],['check_out','Check out','time'],['status','Status','select',['Present','Absent','Half-day','Late']]],
    Performance: [['employee','Employee','employee'],['period','Review period','select',['Q1 2026','Q2 2026','Q3 2026','Q4 2026']],['rating','Rating (1–5)','number'],['feedback','Feedback','textarea']],
    Learning: [['title','Course title','text'],['category','Category','text'],['duration_hours','Duration (hours)','number'],['description','Description','textarea']],
    Benefits: [['name','Benefit name','text'],['benefit_type','Benefit type','text'],['provider','Provider','text'],['description','Description','textarea']],
    'Self Service': [['employee','Employee','employee'],['leave_type','Leave type','select',['Casual','Sick','Earned']],['start_date','Start date','date'],['end_date','End date','date'],['reason','Reason','textarea'],['status','Status','select',['Pending','Approved','Rejected']]],
    Compliance: [['employee','Employee','employee'],['title','Document title','text'],['document_type','Document type','text'],['expiry_date','Expiry date','date'],['status','Status','select',['Submitted','Verified','Rejected','Expiring']]]
  }

  const loadRows = () => {
    if (!route) return
    setLoading(true)
    const request = name === 'Payroll'
      ? fetchAllPages(`/${route}/`)
      : api.get(`/${route}/`).then(({ data }) => data.results || data)
    request.then(setRows).catch(() => setRows([])).finally(() => setLoading(false))
  }

  useEffect(() => {
    loadRows()
    if (['Employees','Payroll','Attendance','Performance','Self Service','Compliance'].includes(name)) {
      const request = name === 'Payroll'
        ? fetchAllPages('/employees/')
        : api.get('/employees/').then(({ data }) => data.results || data)
      request.then(setEmployees).catch(() => setEmployees([]))
    }
    if (name === 'Employees') {
      Promise.all([api.get('/departments/'), api.get('/designations/')]).then(([deptData, desData]) => {
        setDepartments(deptData.data.results || deptData.data)
        setDesignations(desData.data.results || desData.data)
      }).catch(() => {})
    } else if (name === 'Payroll') {
      fetchAllPages('/departments/').then(setDepartments).catch(() => setDepartments([]))
    }
  }, [name])

  const openAdd = () => {
    setEditing(null)
    setForm(name === 'Performance'
      ? { period: 'Q4 2026', rating: '4.0', feedback: '' }
      : name === 'Self Service'
        ? { leave_type: 'Casual', status: 'Pending' }
        : {})
    setFormError('')
    setModal(true)
  }
  const openEdit = (row) => { setEditing(row); setForm({ ...row }); setFormError(''); setModal(true) }

  const saveRecord = async (event) => {
    event.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      if (editing) await api.patch(`/${route}/${editing.id}/`, form)
      else await api.post(`/${route}/`, form)
      setModal(false)
      loadRows()
    } catch (error) {
      const detail = error.response?.data
      setFormError(typeof detail === 'string' ? detail : JSON.stringify(detail || 'Could not save this record'))
    } finally {
      setSaving(false)
    }
  }

  const deleteRecord = async (row) => {
    if (!window.confirm(`Delete this ${name.toLowerCase()} record?`)) return
    try { await api.delete(`/${route}/${row.id}/`); loadRows() }
    catch { setFormError('This record could not be deleted.') }
  }

  const filteredRows = rows.filter((row) => {
    if (name !== 'Payroll') return JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
    const employee = employees.find((item) => String(item.id) === String(row.employee))
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || [row.employee_name, employee?.employee_id]
      .some((value) => String(value || '').toLowerCase().includes(query))
    const basic = Number(row.basic)
    return matchesSearch
      && (!payrollDepartment || String(employee?.department) === payrollDepartment)
      && (!payrollMonth || String(row.month || '').startsWith(payrollMonth))
      && (minimumBasic === '' || basic >= Number(minimumBasic))
      && (maximumBasic === '' || basic <= Number(maximumBasic))
  })
  const clearPayrollFilters = () => {
    setSearch('')
    setPayrollDepartment('')
    setPayrollMonth('')
    setMinimumBasic('')
    setMaximumBasic('')
  }
  const fields = fieldsByPage[name] || []

  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div><span className="eyebrow">HRGENIUS MANAGEMENT</span><h1>{name}</h1><p>Manage and review {name.toLowerCase()} records.</p></div>
        {userRole !== 'EMPLOYEE' && <button className="primary-button" onClick={openAdd}><Plus size={17} /> Add new</button>}
      </div>
      <article className="panel table-panel">
        <div className="panel-header">
          <div><span className="panel-kicker">REGISTRY</span><h3>{name} records</h3></div>
          {name !== 'Payroll' && <div className="table-tools"><div className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${name.toLowerCase()}`} /></div></div>}
        </div>
        {name === 'Payroll' && (
          <div className="payroll-filters">
            <label className="payroll-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employee name or ID" /></label>
            <select aria-label="Filter by department" value={payrollDepartment} onChange={(event) => setPayrollDepartment(event.target.value)}>
              <option value="">All Departments</option>
              {departments.map((department) => <option value={department.id} key={department.id}>{department.name}</option>)}
            </select>
            <label className="payroll-month"><span>Month</span><input aria-label="Filter by payroll month and year" type="month" value={payrollMonth} onChange={(event) => setPayrollMonth(event.target.value)} /></label>
            <label className="payroll-salary"><span>Basic salary</span><input aria-label="Minimum basic salary" type="number" min="0" placeholder="Min" value={minimumBasic} onChange={(event) => setMinimumBasic(event.target.value)} /><input aria-label="Maximum basic salary" type="number" min="0" placeholder="Max" value={maximumBasic} onChange={(event) => setMaximumBasic(event.target.value)} /></label>
            <button type="button" className="secondary-button" onClick={clearPayrollFilters}>Clear Filters</button>
          </div>
        )}
        {loading ? <div className="empty-state">Loading records...</div> : filteredRows.length ? (
          <div className="data-table">
            <table>
              {name === 'Employees' ? (
                <>
                  <thead><tr><th>Employee ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Email</th><th>Phone</th><th>Status</th>{userRole !== 'EMPLOYEE' && <th>Actions</th>}</tr></thead>
                  <tbody>{filteredRows.slice(0, 10).map((row) => <tr key={row.id}>
                    <td>{row.employee_id || '—'}</td>
                    <td><strong>{row.first_name} {row.last_name}</strong></td>
                    <td>{row.department_name || '—'}</td>
                    <td>{row.designation_name || '—'}</td>
                    <td>{row.email || '—'}</td>
                    <td>{row.phone || '—'}</td>
                    <td><span className={`status ${row.status?.toLowerCase()}`}>{row.status || '—'}</span></td>
                    {userRole !== 'EMPLOYEE' && <td className="row-actions"><button onClick={() => openEdit(row)} title="Edit"><Pencil size={15}/></button><button onClick={() => deleteRecord(row)} title="Delete"><Trash2 size={15}/></button></td>}
                  </tr>)}</tbody>
                </>
              ) : name === 'Performance' ? (
                <>
                  <thead><tr><th>Employee</th><th>Review period</th><th>Rating</th><th>Reviewer</th><th>Feedback</th>{userRole !== 'EMPLOYEE' && <th>Actions</th>}</tr></thead>
                  <tbody>{filteredRows.slice(0, 10).map((row) => <tr key={row.id}>
                    <td><strong>{row.employee_name || '—'}</strong></td>
                    <td>{row.period || '—'}</td>
                    <td><span className="rating-badge">{row.rating || '—'} / 5</span></td>
                    <td>{row.reviewer_name || '—'}</td>
                    <td>{row.feedback || '—'}</td>
                    {userRole !== 'EMPLOYEE' && <td className="row-actions"><button onClick={() => openEdit(row)} title="Edit"><Pencil size={15}/></button><button onClick={() => deleteRecord(row)} title="Delete"><Trash2 size={15}/></button></td>}
                  </tr>)}</tbody>
                </>
              ) : (
                <>
                  <thead><tr>{Object.keys(filteredRows[0]).filter(k => !['file','resume','description','address','notes'].includes(k)).slice(0, 6).map(k => <th key={k}>{k.replaceAll('_',' ')}</th>)}{userRole !== 'EMPLOYEE' && <th>Actions</th>}</tr></thead>
                  <tbody>{filteredRows.slice(0, 10).map((row) => <tr key={row.id}>
                    {Object.entries(row).filter(([k]) => !['file','resume','description','address','notes'].includes(k)).slice(0, 6).map(([k,v]) => <td key={k}>{typeof v === 'object' ? JSON.stringify(v) : String(v ?? '—')}</td>)}
                    {userRole !== 'EMPLOYEE' && <td className="row-actions"><button onClick={() => openEdit(row)} title="Edit"><Pencil size={15}/></button><button onClick={() => deleteRecord(row)} title="Delete"><Trash2 size={15}/></button></td>}
                  </tr>)}</tbody>
                </>
              )}
            </table>
          </div>
        ) : <div className="empty-state"><Building2 size={28} /><strong>No records yet</strong><span>Add a new record to get started.</span></div>}
      </article>
      {modal && (
        <Modal title={`${editing ? 'Edit' : 'Add'} ${name}`} subtitle={`Create or update ${name.toLowerCase()} information`} onClose={() => setModal(false)}>
          <form className="modal-form" onSubmit={saveRecord}>
            {formError && <div className="error-banner">{formError}</div>}
            <div className="form-grid">
              {fields.map(([key,label,type,options]) => (
                <label className={type === 'textarea' ? 'full-field' : ''} key={key}>{label}
                  {type === 'textarea' ? <textarea value={form[key] ?? ''} onChange={(event) => setForm({...form,[key]:event.target.value})}/> :
                   type === 'department' ? <select required value={form.department ?? ''} onChange={(event) => setForm({...form,department:event.target.value,designation:''})}><option value="">Select department</option>{departments.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select> :
                   type === 'designation' ? <select required value={form.designation ?? ''} onChange={(event) => setForm({...form,designation:event.target.value})}><option value="">Select designation</option>{designations.filter((item) => !form.department || String(item.department) === String(form.department)).map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select> :
                   type === 'employee' ? <select required value={form.employee ?? ''} onChange={(event) => setForm({...form,employee:event.target.value})}><option value="">Select employee</option>{employees.map((item) => <option value={item.id} key={item.id}>{item.first_name} {item.last_name}</option>)}</select> :
                   type === 'select' ? <select value={form[key] ?? ''} onChange={(event) => setForm({...form,[key]:event.target.value})}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select> :
                   type === 'month' ? <input type="month" value={String(form[key] || '').slice(0,7)} onChange={(event) => setForm({...form,[key]:`${event.target.value}-01`})}/> :
                   key === 'rating'
                     ? <input type="number" min="1" max="5" step="0.1" value={form[key] ?? ''} onChange={(event) => setForm({...form,[key]:event.target.value})}/>
                     : <input type={type} value={form[key] ?? ''} onChange={(event) => setForm({...form,[key]:event.target.value})}/>}
                </label>
              ))}
            </div>
            <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModal(false)}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? 'Saving...' : editing ? 'Save changes' : 'Create record'}</button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}

function SalaryPage() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true
    fetchAllPages('/employees/')
      .then((records) => {
        if (active) setEmployees(records)
      })
      .catch(() => {
        if (active) setLoadError('Could not load employee records.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const query = search.trim()
  const exactIdMatch = query
    ? employees.find((employee) => employee.employee_id === query)
    : null
  const matchingEmployees = !query
    ? []
    : exactIdMatch
      ? [exactIdMatch]
      : employees.filter((employee) =>
        `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(query.toLowerCase())
      )

  const clearSearch = () => {
    setSearch('')
    setSelectedEmployee(null)
  }

  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">HRGENIUS MANAGEMENT</span>
          <h1>Salary</h1>
          <p>Find an employee to review their salary details.</p>
        </div>
      </div>
      <article className="panel table-panel">
        <div className="panel-header">
          <div><span className="panel-kicker">SALARY LOOKUP</span><h3>Search employees</h3></div>
          <div className="table-tools">
            <label className="search-box">
              <Search size={16} />
              <input
                aria-label="Search by Employee ID or Employee Name"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setSelectedEmployee(null)
                }}
                placeholder="Search by Employee ID or Employee Name"
              />
            </label>
            <button type="button" className="secondary-button" onClick={clearSearch}>Clear search</button>
          </div>
        </div>
        {loading ? <div className="empty-state">Loading employee records...</div> : loadError ? (
          <div className="empty-state">{loadError}</div>
        ) : matchingEmployees.length ? (
          <div className="data-table">
            <table>
              <thead><tr><th>Employee ID</th><th>Full Name</th><th>Department</th><th>Designation</th><th>Action</th></tr></thead>
              <tbody>{matchingEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employee_id}</td>
                  <td><strong>{employee.first_name} {employee.last_name}</strong></td>
                  <td>{employee.department_name || '—'}</td>
                  <td>{employee.designation_name || '—'}</td>
                  <td><button type="button" className="text-button" onClick={() => setSelectedEmployee(employee)}>Select</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : query ? (
          <div className="empty-state">No employee found.</div>
        ) : (
          <div className="empty-state">Search by employee ID or name to view salary details.</div>
        )}
      </article>
      {selectedEmployee && (
        <article className="panel table-panel">
          <div className="panel-header">
            <div><span className="panel-kicker">EMPLOYEE SALARY</span><h3>{selectedEmployee.first_name} {selectedEmployee.last_name}</h3></div>
          </div>
          <div className="data-table">
            <table>
              <thead><tr><th>Employee ID</th><th>Full Name</th><th>Department</th><th>Designation</th><th>Email</th><th>Basic Salary</th></tr></thead>
              <tbody><tr>
                <td>{selectedEmployee.employee_id || '—'}</td>
                <td>{selectedEmployee.first_name} {selectedEmployee.last_name}</td>
                <td>{selectedEmployee.department_name || '—'}</td>
                <td>{selectedEmployee.designation_name || '—'}</td>
                <td>{selectedEmployee.email || '—'}</td>
                <td>₹{Number(selectedEmployee.basic_salary || 0).toLocaleString('en-IN')}</td>
              </tr></tbody>
            </table>
          </div>
        </article>
      )}
    </div>
  )
}

function AnalyticsPage() {
  const [stats, setStats] = useState(null)
  useEffect(() => { api.get('/analytics/summary/').then(({ data }) => setStats(data)).catch(() => setStats({ totalEmployees:0,activeEmployees:0,openPositions:0,pendingLeaves:0,departments:[],applications:[] })) }, [])
  const colors = ['#356df3','#6aa5ff','#91aeea','#7c6cf2','#45b8a5','#f3a64a']
  return (
    <div className="dashboard">
      <div className="welcome-row"><div><span className="eyebrow">PEOPLE INSIGHTS</span><h1>HR Analytics</h1><p>Live workforce metrics from the HRGenius database.</p></div></div>
      <section className="stats-grid">
        <StatCard icon={Users} label="Employees" value={stats?.totalEmployees ?? 24} tone="blue" />
        <StatCard icon={CheckCircle2} label="Active" value={stats?.activeEmployees ?? 22} tone="green" />
        <StatCard icon={BriefcaseBusiness} label="Open roles" value={stats?.openPositions ?? 5} tone="purple" />
        <StatCard icon={Clock3} label="Pending leaves" value={stats?.pendingLeaves ?? 4} tone="orange" />
      </section>
      <section className="content-grid">
        <article className="panel"><div className="panel-header"><div><span className="panel-kicker">WORKFORCE</span><h3>Department distribution</h3></div></div><ResponsiveContainer width="100%" height={280}><BarChart data={stats?.departments || []}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#356df3" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></article>
        <article className="panel"><div className="panel-header"><div><span className="panel-kicker">RECRUITMENT</span><h3>Application status</h3></div></div><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={stats?.applications || []} dataKey="value" nameKey="status" outerRadius={95}>{(stats?.applications || []).map((_,i)=><Cell key={i} fill={colors[i%colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></article>
      </section>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(() => Boolean(localStorage.getItem('hrgenius_access')))
  const pathToMenu = Object.fromEntries(Object.entries(menuPaths).map(([label, path]) => [path, label]))
  const [active, setActive] = useState(() => pathToMenu[window.location.pathname] || 'Overview')
  const [locationPath, setLocationPath] = useState(() => window.location.pathname)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [employeeModal, setEmployeeModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  const [departments, setDepartments] = useState([])
  const [designations, setDesignations] = useState([])
  const [employeeForm, setEmployeeForm] = useState({})
  const [profileForm, setProfileForm] = useState({})
  const [leaveModal, setLeaveModal] = useState(false)
  const [leaveForm, setLeaveForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const navigateTo = (label) => {
    setActive(label)
    setMobileOpen(false)
    window.history.pushState({}, '', menuPaths[label])
    setLocationPath(menuPaths[label])
  }

  const navigatePath = (path) => {
    window.history.pushState({}, '', path)
    setLocationPath(path)
  }

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setLocationPath(path)
      setActive(pathToMenu[path] || 'Overview')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (user && locationPath === '/login/') {
      navigatePath('/dashboard/')
    }
  }, [user, locationPath])

  useEffect(() => {
    if (!localStorage.getItem('hrgenius_access')) {
      setAuthLoading(false)
      return
    }
    Promise.all([api.get('/departments/'), api.get('/designations/'), api.get('/auth/profile/')])
      .then(([deptData, desData, profileResponse]) => {
        setDepartments(deptData.data.results || deptData.data)
        setDesignations(desData.data.results || desData.data)
        setProfileForm(profileResponse.data)
        setUser({
          username: profileResponse.data.username,
          first_name: profileResponse.data.first_name,
          last_name: profileResponse.data.last_name,
          role: profileResponse.data.role,
          employee_id: profileResponse.data.employee_id,
          employee_name: profileResponse.data.employee_name,
        })
      })
      .catch(() => {
        localStorage.removeItem('hrgenius_access')
        localStorage.removeItem('hrgenius_refresh')
      })
      .finally(() => setAuthLoading(false))
  }, [])

  const logout = () => {
    localStorage.removeItem('hrgenius_access')
    localStorage.removeItem('hrgenius_refresh')
    setUser(null)
    navigatePath('/login/')
  }

  const openEmployeeModal = () => { setEmployeeForm({ gender:'Male', status:'Active', date_of_joining:'2026-11-19' }); setMessage(''); setEmployeeModal(true) }

  const openLeaveModal = () => {
    setLeaveForm({
      employee: user.employee_id,
      leave_type: 'Casual',
      start_date: '',
      end_date: '',
      reason: '',
      status: 'Pending',
    })
    setMessage('')
    setLeaveModal(true)
  }

  const saveLeave = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await api.post('/leaves/', leaveForm)
      setLeaveModal(false)
      navigateTo('Self Service')
      setMessage('Leave application submitted successfully')
    } catch (error) {
      const detail = error.response?.data
      setMessage(typeof detail === 'string' ? detail : JSON.stringify(detail || 'Could not submit leave application'))
    } finally {
      setSaving(false)
    }
  }

  const saveEmployee = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await api.post('/employees/', employeeForm)
      setEmployeeModal(false)
      navigateTo('Employees')
      setMessage('Employee created successfully')
    } catch (error) {
      setMessage(typeof error.response?.data === 'string' ? error.response.data : JSON.stringify(error.response?.data || 'Could not create employee'))
    } finally {
      setSaving(false)
    }
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await api.patch('/auth/profile/', profileForm)
      setUser({
        ...user,
        username: profileForm.username,
        first_name: profileForm.first_name,
        last_name: profileForm.last_name,
      })
      setMessage('Settings saved successfully')
    } catch (error) {
      setMessage(typeof error.response?.data === 'string' ? error.response.data : JSON.stringify(error.response?.data || 'Could not save settings'))
    } finally {
      setSaving(false)
    }
  }

  if (locationPath === '/') {
    return <Homepage onLogin={() => navigatePath('/login/')} onNavigate={navigatePath} />
  }

  if (locationPath === '/privacy/' || locationPath === '/terms/') {
    return (
      <LegalPage
        page={locationPath === '/privacy/' ? 'privacy' : 'terms'}
        onNavigate={navigatePath}
        onLogin={() => navigatePath('/login/')}
      />
    )
  }

  if (locationPath === '/login/' && (!user || authLoading)) {
    if (authLoading) return <main className="login-shell"><section className="login-panel"><div className="empty-state">Loading your workspace...</div></section></main>
    return <Login onLogin={(profile) => {
      setUser(profile)
      setProfileForm(profile)
      navigatePath('/dashboard/')
    }} />
  }

  if (authLoading) return <main className="login-shell"><section className="login-panel"><div className="empty-state">Loading your workspace...</div></section></main>
  if (!user) return <Login onLogin={(profile) => { setUser(profile); setProfileForm(profile); navigatePath('/dashboard/') }} />

  const visibleNavItems = roleNavItems[user.role] || roleNavItems.EMPLOYEE

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <BrandLogo compact />
          <div><strong>HRGenius</strong><span>Human Resources</span></div>
          <button className="sidebar-close" onClick={() => setMobileOpen(false)}><X size={19}/></button>
        </div>
        <nav>
          <span className="nav-label">WORKSPACE</span>
          {visibleNavItems.map(([label, Icon]) => (
            <button key={label} className={active === label ? 'active' : ''} onClick={() => navigateTo(label)}>
              <Icon size={18} /><span>{label}</span>{active === label && <i />}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => { setMessage(''); setSettingsModal(true) }}><Settings size={18}/><span>Settings</span></button>
          <button onClick={logout}><LogOut size={18}/><span>Sign out</span></button>
        </div>
      </aside>
      {mobileOpen && <button className="overlay" onClick={() => setMobileOpen(false)} />}
      <main className="main-shell">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)}><Menu size={20}/></button>
          <form className="search-global" onSubmit={(event) => { event.preventDefault(); navigateTo('Employees') }}><Search size={17}/><input value={globalSearch} onChange={(event)=>setGlobalSearch(event.target.value)} placeholder="Search employees, documents..." /><kbd>⌘ K</kbd></form>
          <div className="top-actions">
            <div className="popover-anchor">
              <button className="notification" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }}><Bell size={19}/><i /></button>
              {notificationsOpen && <div className="popover notifications-popover"><div className="popover-title"><strong>Notifications</strong><span>3 new</span></div><div className="notice"><CalendarCheck size={16}/><div><strong>Leave request pending</strong><span>4 requests need review</span></div></div><div className="notice"><BriefcaseBusiness size={16}/><div><strong>New application</strong><span>Candidate submitted an application</span></div></div><div className="notice"><ShieldCheck size={16}/><div><strong>Document expiring</strong><span>Employment contracts need review</span></div></div></div>}
            </div>
            <div className="popover-anchor">
              <button className="profile-chip" onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }}><div className="avatar avatar-0">{`${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}` || 'AS'}</div><div><strong>{[user.first_name,user.last_name].filter(Boolean).join(' ') || 'Aarav Sharma'}</strong><span>{roleLabel(user.role)}</span></div><ChevronDown size={16}/></button>
              {profileOpen && <div className="popover profile-popover"><button onClick={() => { setProfileOpen(false); setSettingsModal(true) }}><UserRoundCog size={16}/> Profile settings</button><button onClick={logout}><LogOut size={16}/> Sign out</button></div>}
            </div>
          </div>
        </header>
        <div className="page-content">
          {active === 'Overview'
            ? (user.role === 'EMPLOYEE'
              ? <EmployeeDashboard profile={user} onApplyLeave={openLeaveModal} onNavigate={navigateTo}/>
              : <Dashboard profile={user} onAddEmployee={openEmployeeModal} onOpenEmployees={() => navigateTo('Employees')}/>)
            : active === 'Salary'
              ? <SalaryPage/>
              : active === 'Analytics'
              ? <AnalyticsPage/>
              : <DataPage name={active} initialSearch={active === 'Employees' ? globalSearch : ''} userRole={user.role}/>}
        </div>
      </main>
      {employeeModal && (
        <Modal title="Add employee" subtitle="Create a new employee profile" onClose={() => setEmployeeModal(false)}>
          <form className="modal-form" onSubmit={saveEmployee}>
            {message && <div className="error-banner success-banner">{message}</div>}
            <div className="form-grid">
              <label>Employee ID<input required value={employeeForm.employee_id || ''} onChange={(event) => setEmployeeForm({...employeeForm,employee_id:event.target.value})} placeholder="HRG-2026"/></label>
              <label>First name<input required value={employeeForm.first_name || ''} onChange={(event) => setEmployeeForm({...employeeForm,first_name:event.target.value})}/></label>
              <label>Last name<input required value={employeeForm.last_name || ''} onChange={(event) => setEmployeeForm({...employeeForm,last_name:event.target.value})}/></label>
              <label>Email<input required type="email" value={employeeForm.email || ''} onChange={(event) => setEmployeeForm({...employeeForm,email:event.target.value})}/></label>
              <label>Phone<input required value={employeeForm.phone || ''} onChange={(event) => setEmployeeForm({...employeeForm,phone:event.target.value})} placeholder="+91 98..."/></label>
              <label>Gender<select value={employeeForm.gender || 'Male'} onChange={(event) => setEmployeeForm({...employeeForm,gender:event.target.value})}><option>Male</option><option>Female</option><option>Other</option></select></label>
              <label>Joining date<input required type="date" value={employeeForm.date_of_joining || ''} onChange={(event) => setEmployeeForm({...employeeForm,date_of_joining:event.target.value})}/></label>
              <label>Department<select required value={employeeForm.department || ''} onChange={(event) => setEmployeeForm({...employeeForm,department:event.target.value,designation:''})}><option value="">Select department</option>{departments.map((item)=><option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
              <label>Designation<select required value={employeeForm.designation || ''} onChange={(event) => setEmployeeForm({...employeeForm,designation:event.target.value})}><option value="">Select designation</option>{designations.filter((item)=>!employeeForm.department || String(item.department)===String(employeeForm.department)).map((item)=><option value={item.id} key={item.id}>{item.title}</option>)}</select></label>
              <label>City<input required value={employeeForm.city || ''} onChange={(event) => setEmployeeForm({...employeeForm,city:event.target.value})}/></label>
              <label>Basic salary<input required type="number" value={employeeForm.basic_salary || ''} onChange={(event) => setEmployeeForm({...employeeForm,basic_salary:event.target.value})}/></label>
              <label>Status<select value={employeeForm.status || 'Active'} onChange={(event) => setEmployeeForm({...employeeForm,status:event.target.value})}><option>Active</option><option>Inactive</option></select></label>
            </div>
            <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setEmployeeModal(false)}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? 'Creating...' : 'Create employee'}</button></div>
          </form>
        </Modal>
      )}
      {settingsModal && (
        <Modal title="Account settings" subtitle="Update your administrator profile" onClose={() => setSettingsModal(false)}>
          <form className="modal-form" onSubmit={saveProfile}>
            {message && <div className="error-banner success-banner">{message}</div>}
            <div className="form-grid">
              <label>Username<input value={profileForm.username || ''} onChange={(event)=>setProfileForm({...profileForm,username:event.target.value})}/></label>
              <label>First name<input value={profileForm.first_name || ''} onChange={(event)=>setProfileForm({...profileForm,first_name:event.target.value})}/></label>
              <label>Last name<input value={profileForm.last_name || ''} onChange={(event)=>setProfileForm({...profileForm,last_name:event.target.value})}/></label>
              <label>Email<input type="email" value={profileForm.email || ''} onChange={(event)=>setProfileForm({...profileForm,email:event.target.value})}/></label>
              <label>Phone<input value={profileForm.phone || ''} onChange={(event)=>setProfileForm({...profileForm,phone:event.target.value})}/></label>
            </div>
            <div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setSettingsModal(false)}>Cancel</button><button className="primary-button" disabled={saving}>{saving?'Saving...':'Save settings'}</button></div>
          </form>
        </Modal>
      )}
      {leaveModal && (
        <Modal title="Apply for leave" subtitle="Submit your leave request for approval" onClose={() => setLeaveModal(false)}>
          <form className="modal-form" onSubmit={saveLeave}>
            {message && <div className="error-banner">{message}</div>}
            <div className="form-grid">
              <label>Leave type
                <select value={leaveForm.leave_type || 'Casual'} onChange={(event) => setLeaveForm({...leaveForm,leave_type:event.target.value})}>
                  <option>Casual</option><option>Sick</option><option>Earned</option>
                </select>
              </label>
              <label>Employee
                <input value={user.employee_name || ''} disabled />
              </label>
              <label>Start date
                <input required type="date" value={leaveForm.start_date || ''} onChange={(event) => setLeaveForm({...leaveForm,start_date:event.target.value})}/>
              </label>
              <label>End date
                <input required type="date" value={leaveForm.end_date || ''} onChange={(event) => setLeaveForm({...leaveForm,end_date:event.target.value})}/>
              </label>
              <label className="full-field">Reason
                <textarea value={leaveForm.reason || ''} onChange={(event) => setLeaveForm({...leaveForm,reason:event.target.value})} placeholder="Describe the reason for your leave"/>
              </label>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setLeaveModal(false)}>Cancel</button>
              <button className="primary-button" disabled={saving}>{saving ? 'Submitting...' : 'Submit application'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
