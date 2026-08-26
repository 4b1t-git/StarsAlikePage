import * as motion from "motion/react-client";
import { PLAY_STORE_URL } from "@/lib/site";

type PlayStoreLinkProps = {
  compact?: boolean;
  className?: string;
};

export default function PlayStoreLink({
  compact = false,
  className = "",
}: PlayStoreLinkProps) {
  return (
    <motion.a
      href={PLAY_STORE_URL}
      aria-label="Descargar Stars Alike en Google Play"
      whileHover={{ opacity: 0.94 }}
      whileTap={{ opacity: 0.82 }}
      transition={{ duration: 0.15 }}
      className={`group inline-flex items-center justify-center bg-paper-bright text-cosmos-void shadow-[0_16px_45px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-star ${
        compact
          ? "min-h-9 gap-2 rounded-lg px-3 py-1.5"
          : "min-h-12 gap-3 rounded-2xl px-5 py-3"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 36"
        className={compact ? "h-5 w-5" : "h-8 w-8"}
      >
        <path
          d="M2.4 2.6 18.8 18 2.4 33.4A4 4 0 0 1 1 30.3V5.7a4 4 0 0 1 1.4-3.1Z"
          fill="#34A853"
        />
        <path d="m18.8 18 4.7-4.4 5.6 3.2c1.2.7 1.2 1.7 0 2.4l-5.6 3.2-4.7-4.4Z" fill="#FBBC04" />
        <path d="M2.4 2.6A3.8 3.8 0 0 1 6.8 2l16.7 11.6-4.7 4.4L2.4 2.6Z" fill="#4285F4" />
        <path d="m18.8 18 4.7 4.4L6.8 34a3.8 3.8 0 0 1-4.4-.6L18.8 18Z" fill="#EA4335" />
      </svg>

      <span className="flex flex-col items-start leading-none">
        {!compact && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/55">
            Disponible en
          </span>
        )}
        <span className={`${compact ? "text-[13px]" : "mt-1 text-lg"} font-semibold tracking-tight`}>
          Google Play
        </span>
      </span>
    </motion.a>
  );
}
