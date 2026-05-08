export function SupportFooter() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[10px] bg-[#ebf3e9] px-4 py-4 text-center lg:gap-3 lg:px-6 lg:py-2.5">
      <p className="text-sm font-bold text-black lg:text-base">
        Simplify your shipping with LMS
      </p>
      <p className="text-xs leading-snug text-black lg:text-base">
        Need assistance? Visit our support portal at{' '}
        <span className="break-all">portal.dev.groscale.com/acmeshipper</span>
      </p>
    </div>
  )
}
