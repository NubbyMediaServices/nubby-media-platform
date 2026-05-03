import { Outlet } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";
import PremiumHeader from "./PremiumHeader";
import PremiumFooter from "./PremiumFooter";

export default function PremiumPublicLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-cream">
      <AnimatedBackground />

      <div className="relative z-10">
        <PremiumHeader />

        <main>
          <Outlet />
        </main>

        <PremiumFooter />
      </div>
    </div>
  );
}