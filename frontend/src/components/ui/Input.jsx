export default function Input({ label, icon: Icon, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
        )}
        <input
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 ${
            Icon ? 'pl-11' : ''
          } ${
            error
              ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
              : 'border-slate-200 hover:border-slate-300'
          }`}
          style={{ color: '#1e293b' }}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      )}
      <textarea
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none ${
          error
            ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
            : 'border-slate-200 hover:border-slate-300'
        }`}
        style={{ color: '#1e293b' }}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
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