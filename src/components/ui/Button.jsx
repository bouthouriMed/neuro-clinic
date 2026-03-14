const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/30 active:scale-[0.98]',
  secondary:
    'bg-white text-surface-700 hover:bg-surface-50 border border-surface-200 hover:border-surface-300 shadow-sm active:scale-[0.98]',
  ghost:
    'text-surface-600 hover:bg-surface-100 hover:text-surface-800 active:scale-[0.98]',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 shadow-md shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/30 active:scale-[0.98]',
  danger:
    'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 active:scale-[0.98]',
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
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  )
}
