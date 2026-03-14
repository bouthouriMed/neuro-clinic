const variants = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.98]',
  secondary:
    'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm active:scale-[0.98]',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-800 active:scale-[0.98]',
  accent:
    'bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 active:scale-[0.98]',
  danger:
    'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 active:scale-[0.98]',
  whatsapp:
    'bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 active:scale-[0.98]',
}

const sizes = {
  sm: 'px-3.5 py-1.5 text-[13px] gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3 text-[15px] gap-2',
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant] || variants.secondary} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  )
}