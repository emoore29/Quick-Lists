import { PaintBrush } from "./svgs";

export default function ColorSwitch() {
  return (
    <button
      className="text-onBackground dark:text-dmOnBackground 
    hover:text-primary dark:hover:text-dmPrimary"
    >
      <PaintBrush />
    </button>
  );
}
