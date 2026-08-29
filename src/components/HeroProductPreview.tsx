import { HomeMockup } from "@/components/HomeMockup";
import NavRail from "@/components/NavRail";

export default function HeroProductPreview() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl pb-1 sm:mt-16">
      <div className="relative z-10 rounded-[1.7rem] border border-white/12 bg-white/[0.045] p-1.5 shadow-[0_45px_140px_rgba(0,0,0,0.75),0_0_80px_var(--color-star-ghost)] backdrop-blur-xl sm:rounded-[2rem] sm:p-2">
        <div className="overflow-hidden rounded-[1.35rem] bg-[#08090b] sm:rounded-[1.55rem]">
          <div
            aria-label="Vista de la pantalla de inicio de Stars Alike"
            className="pointer-events-none relative aspect-[4/3] overflow-hidden bg-cosmos-void sm:aspect-[16/10]"
            inert
          >
            <div className="absolute left-1/2 top-0 aspect-[16/10] w-[170%] -translate-x-1/2 sm:inset-0 sm:w-full sm:translate-x-0">
              <HomeMockup active />
              <NavRail activeIndex={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
