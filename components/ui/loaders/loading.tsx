import { cn } from "@/lib/utils";

interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "bars" | "ring";
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
  overlay?: boolean;
}

export function Loading({
  variant = "spinner",
  size = "md",
  text,
  className,
  overlay = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const LoadingSpinner = () => (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-purple-200 dark:border-purple-800 border-t-primary",
        sizeClasses[size],
        className
      )}
    />
  );

  const LoadingDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-gradient-to-r from-primary to-purple-600 animate-bounce",
            size === "sm"
              ? "w-1 h-1"
              : size === "md"
              ? "w-2 h-2"
              : size === "lg"
              ? "w-3 h-3"
              : "w-4 h-4",
            className
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const LoadingPulse = () => (
    <div
      className={cn(
        "rounded-full bg-gradient-to-r from-primary to-purple-600 animate-pulse",
        sizeClasses[size],
        className
      )}
    />
  );

  const LoadingBars = () => (
    <div className="flex space-x-1 items-end">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-gradient-to-t from-primary to-purple-600 animate-pulse rounded-sm",
            size === "sm"
              ? "w-1"
              : size === "md"
              ? "w-1.5"
              : size === "lg"
              ? "w-2"
              : "w-3",
            size === "sm"
              ? "h-3"
              : size === "md"
              ? "h-4"
              : size === "lg"
              ? "h-6"
              : "h-8",
            className
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );

  const LoadingRing = () => (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-purple-200 dark:border-purple-800",
        "border-t-primary border-r-purple-600",
        sizeClasses[size],
        className
      )}
    />
  );

  const renderLoading = () => {
    switch (variant) {
      case "dots":
        return <LoadingDots />;
      case "pulse":
        return <LoadingPulse />;
      case "bars":
        return <LoadingBars />;
      case "ring":
        return <LoadingRing />;
      default:
        return <LoadingSpinner />;
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderLoading()}
      {text && (
        <p
          className={cn(
            "text-muted-foreground font-medium",
            textSizeClasses[size]
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card border rounded-lg p-8 shadow-xl">{content}</div>
      </div>
    );
  }

  return content;
}
