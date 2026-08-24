import { chatGPTSignInPath } from "../chatgpt-auth";

export default function SiteHeader({active=""}:{active?:string}) {
  return <header className="header app-header">
    <a className="brand" href="/" aria-label="비드인사이트 홈"><span className="brand-mark">B</span><span>비드인사이트</span></a>
    <nav aria-label="주요 메뉴">
      <a className={active==="bids"?"active":""} href="/bids">입찰공고</a>
      <a className={active==="awards"?"active":""} href="/awards">낙찰정보</a>
      <a className={active==="guide"?"active":""} href="/#guide">이용안내</a>
      <a className={active==="pricing"?"active":""} href="/#pricing">요금제</a>
    </nav>
    <div className="header-actions"><a className="login header-link" href={chatGPTSignInPath("/dashboard")}>로그인</a><a className="signup header-link" href={chatGPTSignInPath("/dashboard")}>무료로 시작하기</a></div>
  </header>;
}
