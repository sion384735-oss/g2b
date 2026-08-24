import type { Metadata } from "next";
import "./home.css";
import "./home-extra.css";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "비드인사이트 | 놓치지 않는 입찰 기회",
  description: "나라장터 입찰공고를 한곳에서 검색하고 마감 일정을 관리하세요.",
};

const bids = [
  { tag: "용역", title: "2026년 공공데이터 품질관리 및 개방 지원", org: "한국지능정보사회진흥원", area: "전국", amount: "3억 2,000만원", due: "오늘 18:00", urgent: true },
  { tag: "공사", title: "스마트산업단지 통합관제센터 구축공사", org: "한국산업단지공단", area: "대구", amount: "18억 7,400만원", due: "8월 26일 10:00", urgent: false },
  { tag: "물품", title: "AI 업무지원용 고성능 서버 구매", org: "한국생산기술연구원", area: "충남", amount: "6억 5,000만원", due: "8월 27일 14:00", urgent: false },
];

export default function Home() {
  return (
    <main>
      <SiteHeader active="bids"/>

      <section className="hero">
        <div className="eyebrow"><span>●</span> 나라장터 공고 실시간 업데이트</div>
        <h1>좋은 입찰 기회,<br/><em>더 이상 놓치지 마세요</em></h1>
        <p>흩어진 공공 입찰정보를 한곳에서 검색하고<br/>우리 회사에 꼭 맞는 공고만 빠르게 확인하세요.</p>
        <form className="search" action="/bids">
          <label className="sr-only" htmlFor="q">입찰공고 검색</label>
          <span aria-hidden="true">⌕</span><input id="q" name="q" placeholder="공고명, 공고번호, 발주기관을 검색하세요"/><button>입찰공고 검색</button>
        </form>
        <div className="quick"><span>빠른 검색</span><a href="/bids">건축공사</a><a href="/bids">정보화 용역</a><a href="/bids">교육·행사</a><a href="/bids">AI·소프트웨어</a></div>
      </section>

      <section className="stats" aria-label="오늘의 입찰 현황">
        <article><span className="stat-icon blue">↗</span><div><small>오늘 신규 공고</small><strong>1,284<em>건</em></strong><p>어제보다 86건 많아요</p></div></article>
        <article><span className="stat-icon orange">◷</span><div><small>오늘 마감 공고</small><strong>342<em>건</em></strong><p>마감시간을 확인하세요</p></div></article>
        <article><span className="stat-icon violet">◎</span><div><small>진행 중인 공고</small><strong>18,627<em>건</em></strong><p>전국 공공기관 기준</p></div></article>
        <article><span className="stat-icon green">✓</span><div><small>이번 달 낙찰</small><strong>5,903<em>건</em></strong><p>낙찰 결과 업데이트</p></div></article>
      </section>

      <section className="bids-section" id="bids">
        <div className="section-head"><div><span className="section-kicker">TODAY&apos;S BID</span><h2>지금 확인해야 할 입찰공고</h2><p>마감이 임박했거나 새롭게 등록된 공고입니다.</p></div><a href="/bids">전체 공고 보기 <span>→</span></a></div>
        <div className="bid-table">
          <div className="table-head"><span>구분 / 공고명</span><span>발주기관</span><span>지역</span><span>기초금액</span><span>투찰마감</span><span></span></div>
          {bids.map((bid, index) => <article className="bid-row" key={bid.title}>
            <div><span className={`tag ${bid.tag}`}>{bid.tag}</span><div><h3><a href={`/bids/R26BK01527${161 + index}`}>{bid.title}</a></h3><small>공고번호 R26BK01527{161 + index}</small></div></div>
            <span>{bid.org}</span><span>{bid.area}</span><strong>{bid.amount}</strong><span className={bid.urgent ? "deadline urgent" : "deadline"}>{bid.urgent && <b>마감임박</b>}{bid.due}</span><button className="star" aria-label={`${bid.title} 관심공고 저장`}>☆</button>
          </article>)}
        </div>
      </section>
      <section className="how" id="guide"><span className="section-kicker">HOW IT WORKS</span><h2>입찰 기회를 찾는 가장 쉬운 방법</h2><div className="how-grid"><article><b>01</b><div className="how-icon">⌕</div><h3>원하는 공고 검색</h3><p>키워드, 지역, 업종과 금액 조건으로<br/>우리 회사에 맞는 공고를 찾습니다.</p></article><article><b>02</b><div className="how-icon">☆</div><h3>관심공고 저장</h3><p>검토할 공고를 저장하고<br/>내부 메모와 일정을 관리합니다.</p></article><article><b>03</b><div className="how-icon">◷</div><h3>마감 전에 알림</h3><p>신규·변경·마감 정보를<br/>이메일로 놓치지 않고 받습니다.</p></article></div></section>
      <section className="cta" id="pricing"><div><span>14일 무료체험</span><h2>오늘부터 입찰 기회를<br/>더 빠르게 발견하세요.</h2><p>카드 등록 없이 모든 핵심 기능을 먼저 경험해보세요.</p></div><a href="/dashboard">무료로 시작하기 →</a></section>
      <footer className="footer"><div className="footer-top"><div><div className="brand"><span className="brand-mark">B</span><span>비드인사이트</span></div><p>공공데이터 기반 입찰정보 검색·관리 서비스<br/>데이터 출처: 조달청 나라장터 · 공공데이터포털</p></div><div className="footer-links"><a href="#terms">이용약관</a><a href="#privacy">개인정보처리방침</a><a href="#support">고객센터</a></div></div><div className="copyright">© 2026 BID INSIGHT. 실제 입찰 참여 전 나라장터 원문과 첨부파일을 반드시 확인하세요.</div></footer>
    </main>
  );
}
