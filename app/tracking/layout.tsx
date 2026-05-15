export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  // Tracking is a public-facing surface — keep it light regardless of the
  // portal-wide theme toggle.
  return <div className="force-light bg-background text-foreground">{children}</div>
}
