export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="nubby-orb nubby-orb-one" />
      <div className="nubby-orb nubby-orb-two" />
      <div className="nubby-orb nubby-orb-three" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink" />
    </div>
  );
}