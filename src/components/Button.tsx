import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

type Variante = "primaire" | "secondaire" | "clair" | "sombre";

const STYLES: Record<Variante, string> = {
  primaire:
    "bg-tomato-500 text-cream shadow-[0_14px_30px_-12px_rgba(193,39,45,0.8)] hover:bg-tomato-600",
  secondaire:
    "border-2 border-ink/20 bg-transparent text-ink hover:border-tomato-500 hover:text-tomato-600",
  clair: "bg-cream text-ink hover:bg-white",
  sombre: "bg-ink text-cream hover:bg-ink-2",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variante?: Variante;
  taille?: "normal" | "grand";
};

export function Button({
  children,
  variante = "primaire",
  taille = "normal",
  className,
  ...props
}: Props) {
  return (
    <a
      {...props}
      className={cn(
        "brillance group inline-flex items-center justify-center gap-2.5 rounded-full font-display uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        taille === "grand"
          ? "px-8 py-4 text-base sm:text-lg"
          : "px-6 py-3 text-sm sm:text-base",
        STYLES[variante],
        className
      )}
    >
      {children}
    </a>
  );
}
