import { LegacyRef, ReactNode} from "react";

type ListViewProps = {
  children: ReactNode
  scrollSentinelRef?: LegacyRef<HTMLDivElement>
}

export default function ListView({ children, scrollSentinelRef }: ListViewProps) {
  return (<>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {children}
      {scrollSentinelRef && (
        <div id="scroll-sentinel" ref={scrollSentinelRef}></div>
      )}
    </div>
  </>);
}