import React, { useEffect, useState } from "react";

const LogoLoading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center space-y-8">
      {/* Animated Logo */}
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
          <div className="text-white text-2xl font-bold">M</div>
        </div>

        {/* Pulsing rings around logo */}
        <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-ping" />
        <div
          className="absolute inset-0 rounded-2xl border-2 border-purple-500/20 animate-ping"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Brand name */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          MindfulAI
        </h1>
        <p className="text-muted-foreground">
          Loading your therapy experience{dots}
        </p>
      </div>

      {/* Loading indicator */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-primary to-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoLoading;
