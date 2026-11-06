import type { CSSProperties } from "react";
import { Film } from "./film";

// Session content below the hero. Source: docs/ref/whale-erp-ai-result-deck-standalone.html
// (figures are the deck's repo analysis as of 2026-10-30).

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const AGENDA = [
  ["프로젝트와 실적", "두 달 계획을 기획 약 5주, 개발 약 4주로 마친 과정"],
  ["AI와 일하는 방식", "문서를 먼저 확정하고, AI가 그 문서를 읽어 구현하는 흐름"],
  ["성과", "개발 한 달 동안 화면 약 120개, 업무 기능 약 300개"],
  ["부족했던 점", "기획 지연, 신규보다 많았던 수정, 효과를 잴 기준의 부재"],
  ["다음 프로젝트", "개선 방향, 그리고 함께 정할 여섯 가지"],
];

const FLOW = ["현업 요구 파악", "화면 시안·유저플로우", "정책·명세 확정", "AI가 코드·테스트 작성", "사람 검수 후 반영"];

const RULES = [
  ["공통 규칙·용어집", "CLAUDE.md · AGENTS.md", "모든 저장소가 같은 규칙 문서를 읽고, 같은 개념을 같은 말로 부릅니다."],
  ["영역별 작업 지침", "Claude Code skills", "서버·화면 개발 원칙을 지침으로 정리해, 누가 시켜도 같은 품질 기준으로 구현합니다."],
  ["문서 최신성 점검", "Claude Code hook · OKF", "코드가 바뀌었는데 문서가 그대로면, 작업이 끝나는 시점에 갱신을 요구합니다."],
];

const RESULTS: [string, string, string][] = [
  ["120", "화면", "관리자 웹 78 + 직원 근무 웹 44"],
  ["300", "업무 처리 기능", "서버가 제공하는 기능 단위"],
  ["400", "자동 검증 테스트 파일", "서버 288 · 화면 110"],
  ["450", "검수 요청(PR) 병합", "AI가 먼저 검토하고 리더 3명이 최종 승인"],
  ["100", "화면 시안", "기획 약 5주 동안 작성, 유저플로우 22개"],
];

const FIXES: [string, number, number][] = [
  ["서버", 381, 323],
  ["관리자 웹", 562, 314],
  ["직원 근무 웹", 62, 79],
];

const TOPICS = [
  ["적용 범위", "다음 웹 프로젝트에 이 방식을 어디까지, 어떤 파일럿으로 적용할지"],
  ["기획 단계 진행 방식", "단위업무 분배와 개발 PL·담당자의 확정 논의 참여"],
  ["정책 변경 관리", "확정 기준일과 변경 요청·영향 검토 절차"],
  ["검증·검수 체계", "화면 자동 테스트 확대, 검수 분산, QA와의 역할 분담"],
  ["효과 측정 기준", "기간·공수 기준선을 프로젝트마다 기록하고 비교하는 법"],
  ["AI 활용·보안 기준", "정보 반출·개인정보 기준과 이를 정리할 담당 부서"],
];

const pad = (n: number) => String(n).padStart(2, "0");

export function Sections() {
  return (
    <>
      <section className="sec intro" aria-labelledby="t-intro">
        <div className="sec-head rv">
          <p className="idx">01 — 세션 소개</p>
          <h2 id="t-intro">
            효과는 컸고,
            <br />
            <span className="mute">보완할 점도 분명했습니다.</span>
          </h2>
        </div>
        <div className="intro-body">
          <p className="lede rv">
            사내 웹 ERP를 AI와 함께 만든 두 달을 성과와 부족한 점으로 나누어 돌아봅니다. 숫자는 모두 저장소를 직접 집계한 값이고,
            잘된 것만큼 아쉬운 것도 그대로 꺼내 놓습니다.
          </p>
          <ol className="agenda">
            {AGENDA.map(([t, d], n) => (
              <li key={t} className="rv" style={i(n)}>
                <span className="no">{pad(n + 1)}</span>
                <strong>{t}</strong>
                <span className="desc">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec method" aria-labelledby="t-method">
        <div className="sec-head rv">
          <p className="idx">02 — AI와 일하는 방식</p>
          <h2 id="t-method">
            AI에게 바로 코딩을
            <br />
            시키지 <em>않았습니다.</em>
          </h2>
          <p className="lede">
            사람이 정책과 화면 기준을 문서로 확정하면, AI가 그 문서를 읽고 코드와 테스트를 함께 씁니다. 정책이 바뀌면 코드보다 문서를
            먼저 고칩니다.
          </p>
        </div>
        <ol className="flow">
          {FLOW.map((s, n) => (
            <li key={s} className={n === 3 ? "rv ai" : "rv"} style={i(n)}>
              <span className="no">{pad(n + 1)}</span>
              {s}
            </li>
          ))}
        </ol>
        <p className="loop rv">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          검수에서 문제가 보이면 확정 단계로 돌아가 문서를 고치고, AI가 다시 구현합니다. 개발 중 근거 문서·시안 갱신 약 1,100건.
        </p>
        <ul className="rules">
          {RULES.map(([t, tool, d], n) => (
            <li key={t} className="rv" style={i(n)}>
              <span className="tool">{tool}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec results" aria-labelledby="t-results">
        <div className="sec-head rv">
          <p className="idx">03 — 성과</p>
          <h2 id="t-results">
            개발 한 달,
            <br />
            <em>이만큼</em> 지었습니다.
          </h2>
          <p className="lede">개발 인력은 계획보다 1명 적은 7명. 기획 1개월, 개발 1개월로 잡은 두 달 안에 마쳤습니다.</p>
        </div>
        <dl className="ledger">
          {RESULTS.map(([v, t, d], n) => (
            <div key={t} className="rv" style={i(n)}>
              <dt>
                <small>약</small>
                {v}
              </dt>
              <dd>
                <strong>{t}</strong>
                {d}
              </dd>
            </div>
          ))}
          <div className="rv" style={i(5)}>
            <dt>
              8<span className="arrow">→</span>7
            </dt>
            <dd>
              <strong>개발 인력</strong>
              계획보다 1명 적게 투입하고 개발 기간은 계획 준수
            </dd>
          </div>
        </dl>
        <p className="note rv">※ 저장소 분석 기준(2026-10-30)이며 대략치입니다. QA는 별도 기간으로 진행해 위 기간에 넣지 않았습니다.</p>
      </section>

      <section className="sec film" aria-labelledby="t-film">
        <div className="sec-head rv">
          <p className="idx">Film — 출시 영상</p>
          <h2 id="t-film">
            숫자 뒤의
            <br />
            <em>실제 화면</em>
          </h2>
          <p className="lede">
            Whale ERP 직원 근무 앱 출시 영상입니다. 출근 등록부터 근로계약 서명까지, 세션에서 다룰 결과물이 실제로 어떻게
            움직이는지 21초로 먼저 확인해 보세요.
          </p>
        </div>
        <Film />
      </section>

      <section className="sec gaps" aria-labelledby="t-gaps">
        <div className="sec-head rv">
          <p className="idx">04 — 부족했던 점</p>
          <h2 id="t-gaps">
            병목은 개발에서
            <br />
            <span className="mute">기획과 검수로 옮겨갔습니다.</span>
          </h2>
          <p className="lede">개발이 빨라지자 부담이 앞뒤로 몰렸습니다. 세션에서는 잘된 점만큼 이 부분을 솔직하게 나눕니다.</p>
        </div>
        <div className="gap-grid">
          <ol className="gap-list">
            <li className="rv" style={i(0)}>
              <h3>기획이 약 1주 길어졌습니다</h3>
              <p>1개월 계획이 약 5주로. 원인은 AI가 아니라 현업 소통, 현행 업무 파악 부족, 잦은 정책 변경, 기획 PL에 몰린 업무였습니다.</p>
            </li>
            <li className="rv" style={i(1)}>
              <h3>수정이 신규 기능보다 많았습니다</h3>
              <p>AI가 빨리 만든 결과를 검증하고 보완하는 비용이 컸습니다. 특히 화면 쪽 자동 검증이 서버보다 얇았습니다.</p>
            </li>
            <li className="rv" style={i(2)}>
              <h3>효과를 잴 기준이 없었습니다</h3>
              <p>기존 방식의 공수·기간 기준선이 없어, AI 효과를 수치로 증명하기 어렵습니다.</p>
            </li>
          </ol>
          <figure className="chart rv" style={i(1)}>
            <figcaption>
              수정 vs 신규 기능 작업 건수
              <span>
                <i className="k-fix" />
                수정 <i className="k-new" />
                신규
              </span>
            </figcaption>
            {FIXES.map(([repo, fix, add]) => (
              <div key={repo} className="row">
                <span className="repo">{repo}</span>
                <span className="bars">
                  <span className="bar fix" style={{ "--w": fix / 562 } as CSSProperties}>
                    <i />
                    <b>{fix}</b>
                  </span>
                  <span className="bar new" style={{ "--w": add / 562 } as CSSProperties}>
                    <i />
                    <b>{add}</b>
                  </span>
                </span>
              </div>
            ))}
            <p className="sum">수정 약 1,000건 · 신규 기능 약 720건</p>
          </figure>
        </div>
      </section>

      <section className="sec next" aria-labelledby="t-next">
        <div className="sec-head rv">
          <p className="idx">05 — 다음 프로젝트</p>
          <h2 id="t-next">
            함께 정할 <em>여섯 가지</em>
          </h2>
          <p className="lede">
            개선 방향은 기획 보강, 검증 강화, 사내 기준 마련 세 축입니다. 세션 마지막에는 다음 웹 프로젝트에 적용하기 위해 아래
            여섯 가지를 함께 논의합니다.
          </p>
        </div>
        <ol className="topics">
          {TOPICS.map(([t, d], n) => (
            <li key={t} className="rv" style={i(n % 3)}>
              <span className="no">{pad(n + 1)}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="closing" aria-labelledby="t-closing">
        <div className="closing-media" aria-hidden="true" />
        <div className="closing-body rv">
          <h2 id="t-closing">
            직접 만든 사람들이
            <br />
            <em>그대로</em> 이야기합니다.
          </h2>
          <p className="lede">잘된 것과 아쉬운 것, 그리고 다음에 바꿀 것. 전 직원 누구나 들을 수 있습니다.</p>
          <p className="when">
            <span>WHEN</span>
            <time dateTime="2026-11-27">2026. 11. 27 금요일</time>
          </p>
        </div>
        <footer className="foot">
          <span className="mark">
            interplug<sup>✦</sup>
            <small>AI WORKSHOP</small>
          </span>
          <span>Whale ERP · 저장소 분석 기준 2026-10-30</span>
        </footer>
      </section>
    </>
  );
}
