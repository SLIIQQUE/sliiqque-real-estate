/**
 * iconsax-react relies on `defaultProps`, which React 19 ignores for function components,
 * so icons render with no colour (invisible). These wrappers restore the defaults and use
 * `currentColor`, so icons follow the surrounding text colour. Import icons from here.
 */
import * as Iconsax from "iconsax-react";
import type { Icon, IconProps } from "iconsax-react";

function withDefaults(Base: Icon): Icon {
  const Wrapped = (props: IconProps) => (
    <Base variant="Linear" size={24} color="currentColor" {...props} />
  );
  return Wrapped as unknown as Icon;
}

export const Add = withDefaults(Iconsax.Add);
export const ArrowDown = withDefaults(Iconsax.ArrowDown);
export const ArrowLeft = withDefaults(Iconsax.ArrowLeft);
export const ArrowRight = withDefaults(Iconsax.ArrowRight);
export const ArrowUp3 = withDefaults(Iconsax.ArrowUp3);
export const Building = withDefaults(Iconsax.Building);
export const Building3 = withDefaults(Iconsax.Building3);
export const Buildings2 = withDefaults(Iconsax.Buildings2);
export const Call = withDefaults(Iconsax.Call);
export const Clock = withDefaults(Iconsax.Clock);
export const CloseCircle = withDefaults(Iconsax.CloseCircle);
export const Copy = withDefaults(Iconsax.Copy);
export const DollarCircle = withDefaults(Iconsax.DollarCircle);
export const HambergerMenu = withDefaults(Iconsax.HambergerMenu);
export const Heart = withDefaults(Iconsax.Heart);
export const Home2 = withDefaults(Iconsax.Home2);
export const House = withDefaults(Iconsax.House);
export const Location = withDefaults(Iconsax.Location);
export const Map1 = withDefaults(Iconsax.Map1);
export const People = withDefaults(Iconsax.People);
export const Play = withDefaults(Iconsax.Play);
export const QuoteUp = withDefaults(Iconsax.QuoteUp);
export const SearchNormal1 = withDefaults(Iconsax.SearchNormal1);
export const Setting4 = withDefaults(Iconsax.Setting4);
export const Sms = withDefaults(Iconsax.Sms);
export const Star1 = withDefaults(Iconsax.Star1);
export const TickCircle = withDefaults(Iconsax.TickCircle);
