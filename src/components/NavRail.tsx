import React from 'react';

export default function NavRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute left-2 top-5 bottom-8 w-9 flex flex-col items-center z-40 pointer-events-none">
      {/* Avatar (placeholder gradient) */}
      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full ring-[0.5px] ring-mockup-hairline bg-cosmos-deep">
        <span className="block h-full w-full bg-gradient-to-br from-[#E2A0FF] to-[#80B3FF] opacity-90" />
      </div>

      {/* Rail container */}
      <div className="relative mt-[52px] flex flex-1 flex-col items-center">
        {/* Continuous vertical line */}
        <div className="absolute top-[8px] bottom-[8px] w-[0.5px] bg-mockup-panel" />
        
        {/* The 5 navigational dots */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-between">
          {[0, 1, 2, 3, 4].map((i) => {
            const isActive = i === activeIndex;
            return (
              <div key={i} className="flex h-5 w-5 items-center justify-center">
                {isActive ? (
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full " style={{ backgroundColor: "var(--color-star-ghost)" }} data-dummy=" ring-[0.5px] ring-star/40">
                    <span className="block h-[7px] w-[7px] rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
                  </span>
                ) : (
                  <span className="block h-[3.5px] w-[3.5px] rounded-full bg-mockup-panel" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
