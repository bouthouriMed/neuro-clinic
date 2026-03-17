const variants = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  default: 'bg-slate-100 text-slate-600 border-slate-200',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}