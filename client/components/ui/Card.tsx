import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: 'default' | 'elevated' | 'outline';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200',
          variant === 'default' && 'bg-card text-card-foreground',
          variant === 'elevated' && 'bg-card text-card-foreground shadow-lg',
          variant === 'outline' && 'border-2 border-border bg-card text-card-foreground',
          hover && 'hover:shadow-lg hover:scale-105 cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-2xl font-bold', className)} {...props} />
  )
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
