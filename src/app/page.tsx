import type { CSSProperties } from "react";
import { HeroMotion } from "./hero-motion";
import { SoundBarsLoader } from "./sound-bars-loader";
import { Sections } from "./sections";

const d = (s: string) => ({ "--d": s }) as CSSProperties;

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="media" aria-hidden="true">
          <video id="bg" muted loop playsInline preload="auto" poster="/assets/poster.jpg">
            <source src="/assets/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="scrim" aria-hidden="true" />

        <div className="nav" data-in style={d(".1s")}>
          <a className="mark" href="#" aria-label="Interplug AI Workshop 홈">
            interplug<sup>✦</sup>
            <small>AI WORKSHOP</small>
          </a>
          <p className="invite">
            <i aria-hidden="true" />전 직원 대상
          </p>
        </div>

        <main className="stage">
          <h1>
            <span className="ln"><span style={d(".35s")}>ERP를,</span></span>
            <span className="ln"><span className="mute" style={d(".47s")}><em>with AI,</em> 함께</span></span>
            <span className="ln"><span style={d(".59s")}>지었습니다.</span></span>
          </h1>
          <p className="sub" data-in style={d(".75s")}>
            Whale ERP 세 저장소에 10주 동안 쌓인 <strong>5,144개의 커밋.</strong> 그중 81.5%에 AI가 공동 작성자로 이름을
            올렸습니다. 무엇을 맡기고, 무엇을 끝까지 사람이 지켰는지 그대로 보여드립니다.
          </p>
          <p className="when" data-in style={d(".9s")}>
            <span>WHEN</span>
            <time dateTime="2026-11-27">2026. 11. 27 금요일</time>
          </p>
        </main>

        <dl className="strip" data-in style={d("1.05s")} aria-label="Whale ERP 개발 기록">
          <div className="stat">
            <dt className="num"><span data-count="5144">5,144</span></dt>
            <dd className="lbl">Commits<span>세 저장소 누적 커밋</span></dd>
          </div>
          <div className="stat">
            <dt className="num"><span data-count="81.5" data-dec="1">81.5</span><small>%</small></dt>
            <dd className="lbl">Co-authored<span>AI 공동 작성 커밋 비율</span></dd>
          </div>
          <div className="stat">
            <dt className="num"><span data-count="3">3</span></dt>
            <dd className="lbl">Repositories<span>API · Admin · Staff</span></dd>
          </div>
          <div className="stat">
            <dt className="num"><span data-count="10">10</span><small>주</small></dt>
            <dd className="lbl">Build time<span>첫 커밋부터 오늘까지</span></dd>
          </div>
        </dl>
        <div className="grain" aria-hidden="true" />
        <HeroMotion />
        <SoundBarsLoader />
      </header>
      <Sections />
    </>
  );
}
