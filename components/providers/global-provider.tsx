import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { QueryProvider } from "./query-provider";

interface IProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: IProps) => {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <Toaster richColors />
      </AuthProvider>
    </QueryProvider>
  );
};
