export default function Input({ label, icon: Icon, error, className = '', disabled, ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className={`text-sm font-medium ml-1 ${disabled ? 'text-slate-400' : 'text-slate-700'}`}>{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none ${disabled ? 'text-slate-300' : 'text-slate-400'}`} />
        )}
        <input
          className={`w-full rounded-xl border px-4 py-3 text-base sm:text-sm transition-all duration-200 focus:outline-none ${
            Icon ? 'pl-11' : ''
          } ${
            disabled 
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
              : `bg-white text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 ${
                  error
                    ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`
          }`}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>
      )}
      <textarea
        className={`w-full rounded-xl border bg-white px-4 py-3 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none ${
          error
            ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
            : 'border-slate-200 hover:border-slate-300'
        }`}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
    </div>
  )
}

export function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      )}
      <select
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 appearance-none cursor-pointer ${
          error
            ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
            : 'border-slate-200 hover:border-slate-300'
        }`}
        style={{ color: '#1e293b' }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}