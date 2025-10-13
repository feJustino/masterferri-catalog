import { cn } from '../../../lib/utils';

export default function Button({
  children,
  variant = 'primary',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'p-3 justify-items-center text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-primary-600',
        variant === 'secondary' && 'bg-secondary-500 text-black',
        variant === 'ghost' && 'border border-gray-300 text-gray-700',
        props.className
      )}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: 'Criar agora',
};
