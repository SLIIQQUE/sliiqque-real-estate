import { BRAND } from "@/lib/brand";

/** Login-screen mark. Both tones render; CSS shows the one matching the admin theme. */
export default function Logo() {
  return (
    <div className="sq-brand" aria-label={`${BRAND.name} admin`}>
      <img
        className="sq-brand__dark"
        src="/brand/icon-dark.png"
        alt={BRAND.name}
        width={120}
      />
      <img
        className="sq-brand__light"
        src="/brand/icon-light.png"
        alt=""
        aria-hidden
        width={120}
      />
      <div className="sq-brand__admin">{BRAND.name} Admin</div>
    </div>
  );
}
