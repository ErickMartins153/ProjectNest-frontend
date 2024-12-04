import { ReactNode } from "react";

type ListViewProps = {
  children: ReactNode
}

export default function ListView({ children }: ListViewProps) {
  return (<>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  </>);
}