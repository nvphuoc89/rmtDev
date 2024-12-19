import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

export const ActiveIdContext = createContext<{
  activeId: number | null;
} | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeId] = useActiveId();
  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
