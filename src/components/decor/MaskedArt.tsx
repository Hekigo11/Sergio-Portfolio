import type { CSSProperties } from "react";

interface MaskedArtProps {
  /** URL of an SVG asset, imported so Vite emits and fingerprints it. */
  src: string;
  /** Sizing, placement, `text-*` colour token and opacity all ride here. */
  className?: string;
  style?: CSSProperties;
}

// Renders authored SVG artwork as a CSS mask rather than an <img>: the shape
// comes from the file's alpha, the colour from `currentColor` — so a caller
// tints it with the same `text-*` tokens every other decor primitive uses,
// and the artwork's own baked hex never reaches the page. It also keeps the
// (large) path data in a cached, gzipped external file rather than the JS
// bundle.
//
// Note the failure mode, which is unforgiving: if the mask does not apply for
// any reason, this div paints a solid `currentColor` rectangle at whatever box
// and opacity the caller set. There is no graceful degradation to fall back
// on, so the mask declaration has to be right (see the quoting note below).
export function MaskedArt({ src, className = "", style }: MaskedArtProps) {
  // The URL *must* be quoted. Vite emits large assets as plain paths but
  // inlines small ones as `data:image/svg+xml,...` containing single quotes,
  // and CSS's unquoted url() token forbids quote characters — an unquoted
  // data URI silently fails to parse, dropping the mask and leaving the div
  // painting its background colour as a solid rectangle.
  const url = `url("${src}")`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none bg-current ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        ...style,
      }}
    />
  );
}

export default MaskedArt;
