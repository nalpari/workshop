"use client";

import Image from "next/image";
import { useState } from "react";

const ID = "pizGojetcmg";

// Click-to-load YouTube: the iframe (and YouTube's scripts/cookies) only load once someone presses play.
export function Film() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="film-frame">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ID}?autoplay=1&rel=0&playsinline=1`}
          title="Whale ERP 출시 영상"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        />
      ) : (
        <button type="button" className="film-play" onClick={() => setPlaying(true)} aria-label="Whale ERP 출시 영상 재생">
          <Image src="/assets/film-poster.jpg" alt="" fill sizes="(max-width: 720px) 100vw, 90vw" />
          <span className="film-btn" aria-hidden="true">
            <i>
              <svg viewBox="0 0 24 24">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </i>
            영상 재생 <small>0:21</small>
          </span>
        </button>
      )}
    </div>
  );
}
