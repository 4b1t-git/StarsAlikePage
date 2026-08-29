import React from 'react';

import { mockupCover } from '@/lib/assets';

export default function NavRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="pointer-events-none absolute bottom-8 left-2 top-5 z-40 flex w-11 flex-col items-center">
      {/* Avatar from the current tablet layout */}
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-cosmos-deep ring-2 ring-star/90">
        <span
          className="block h-full w-full"
          style={{ background: mockupCover("abril_avatar.png") }}
        />
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
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full ring-[0.5px] ring-star/40" style={{ backgroundColor: "var(--color-star-ghost)" }}>
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
