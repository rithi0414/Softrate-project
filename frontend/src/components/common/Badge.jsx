import React from 'react';
import { Link } from 'react-router-dom';

const Badge = ({ children, to, variant = 'red', size = 'sm', className = '' }) => {
  const variantStyles = {
    red: 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200',
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    slate: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200'
  };

  const sizeStyles = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  const baseClasses = `inline-flex items-center font-medium rounded-full border transition-colors ${
    variantStyles[variant] || variantStyles.red
  } ${sizeStyles[size] || sizeStyles.sm} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </Link>
    );
  }

  return <span className={baseClasses}>{children}</span>;
};

export default Badge;
