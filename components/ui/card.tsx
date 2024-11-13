import { ReactNode } from 'react';

// Type for the Card component that accepts children
interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

// Type for components that accept title
interface CardHeaderProps {
  title: string;
}

export function CardHeader({ title }: CardHeaderProps) {
  return <div className="card-header">{title}</div>;
}

export function CardTitle({ title }: CardHeaderProps) {
  return <h2 className="card-title">{title}</h2>;
}

// Type for components that accept description
interface CardDescriptionProps {
  description: string;
}

export function CardDescription({ description }: CardDescriptionProps) {
  return <p className="card-description">{description}</p>;
}

// Type for components that accept content
interface CardContentProps {
  content: ReactNode;
}

export function CardContent({ content }: CardContentProps) {
  return <div className="card-content">{content}</div>;
}

// Type for components that accept footer
interface CardFooterProps {
  footer: ReactNode;
}

export function CardFooter({ footer }: CardFooterProps) {
  return <div className="card-footer">{footer}</div>;
}
