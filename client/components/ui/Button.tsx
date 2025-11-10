import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md hover:shadow-lg',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  ghost: 'text-foreground hover:bg-muted',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm rounded-md',
  md: 'px-4 py-3 text-base rounded-lg min-h-11 min-w-11',
  lg: 'px-6 py-4 text-lg rounded-lg min-h-12 min-w-12',
  xl: 'px-8 py-5 text-xl rounded-xl min-h-14 min-w-14 font-semibold',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
