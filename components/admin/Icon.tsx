import { BRAND } from "@/lib/brand";

/** Small QQ master mark for the admin header; tone follows the admin theme via CSS. */
export default function Icon() {
  return (
    <span className="sq-brand-icon">
      <img
        className="sq-brand__dark"
        src="/brand/icon-dark.png"
        alt={BRAND.name}
        width={18}
      />
      <img
        className="sq-brand__light"
        src="/brand/icon-light.png"
        alt=""
        aria-hidden
        width={18}
      />
    </span>
  );
}
