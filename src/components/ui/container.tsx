type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// Centres content and keeps it to a comfortable width with side padding.
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-site px-gutter ${className}`.trim()}>
      {children}
    </div>
  );
}
