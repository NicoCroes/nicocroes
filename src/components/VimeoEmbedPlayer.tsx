import { useEffect, useRef, useState } from "react";
import { getVimeoId } from "../utils/getVimeoId";

interface VimeoPlayerProps {
  embedCode: string;
  autoplay?: number;
  background?: number;
  loop?: number;
  quality?: string;
  controls?: number;
  muted?: number;
  previewImage?: string | null;
  uiColor?: string;
}

//TODO: add iframe is loaded logic
export default function VimeoPlayer({
  embedCode,
  autoplay = 0,
  background = 0,
  loop = 0,
  quality = "720p",
  controls = 1,
  muted = 0,
  previewImage,
  uiColor,
}: VimeoPlayerProps) {
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(embedCode);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const adjustIframeSize = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const container = iframe.parentElement;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const containerRatio = containerWidth / containerHeight;
      const videoRatio = 16 / 9; // Vimeo video aspect ratio

      let iframeWidth: number;
      let iframeHeight: number;

      if (containerRatio > videoRatio) {
        // Container is wider than video - make iframe wider to fill width
        iframeWidth = containerWidth;
        iframeHeight = containerWidth / videoRatio;
      } else {
        // Container is taller than video - make iframe taller to fill height
        iframeHeight = containerHeight;
        iframeWidth = containerHeight * videoRatio;
      }

      // Apply calculated dimensions
      iframe.style.width = `${iframeWidth}px`;
      iframe.style.height = `${iframeHeight}px`;

      // Center the iframe
      iframe.style.left = `${(containerWidth - iframeWidth) / 2}px`;
      iframe.style.top = `${(containerHeight - iframeHeight) / 2}px`;
      iframe.style.position = "absolute";
    };

    adjustIframeSize();
    window.addEventListener("resize", adjustIframeSize);

    return () => {
      window.removeEventListener("resize", adjustIframeSize);
    };
  }, [vimeoId]);

  //TODO: update ui colors
  const src = `https://player.vimeo.com/video/${vimeoId}?${
    vimeoHash ? `h=${vimeoHash}&` : ""
  }badge=0&autopause=0&player_id=0&app_id=58479&background=${background}&autoplay=${autoplay}&quality=${quality}&loop=${loop}&controls=${controls}&muted=${muted}&byline=false&portrait=false&vimeo_logo=false&pip=false&title=false&like=false&transcript=false&cc=false&color=${uiColor ?? "00f"}`;

  return background === 1 ? (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        className={`absolute rounded-2xl ${background === 1 ? "pointer-events-none" : ""}`}
        src={src}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </div>
  ) : (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <iframe
        className={`h-full w-full transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />

      {previewImage && (
        <img
          src={previewImage}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? "pointer-events-none opacity-0" : "opacity-100"}`}
          alt=""
        />
      )}
    </div>
  );
}
