import SiteHeader from "../components/SiteHeader";
import { bids } from "../data";
import BidExplorer from "./BidExplorer";

export default function BidsPage(){return <div className="page-shell"><SiteHeader active="bids"/><div className="page-wrap"><div className="page-title"><div className="crumb">홈 〉 입찰공고</div><h1>입찰공고 통합검색</h1><p>나라장터의 공사·용역·물품 공고를 필요한 조건으로 빠르게 찾아보세요.</p></div><div className="demo-notice">ⓘ 현재 화면은 조달청 OpenAPI 연동 전 데모 데이터로 구성되어 있습니다.</div><BidExplorer items={bids}/></div><Footer/></div>}

function Footer(){return <footer className="footer"><div className="footer-top"><div><div className="brand"><span className="brand-mark">B</span><span>비드인사이트</span></div><p>공공데이터 기반 입찰정보 검색·관리 서비스<br/>데이터 출처: 조달청 나라장터 · 공공데이터포털</p></div><div className="footer-links"><a href="#terms">이용약관</a><a href="#privacy">개인정보처리방침</a><a href="#support">고객센터</a></div></div><div className="copyright">© 2026 BID INSIGHT. 실제 입찰 참여 전 나라장터 원문과 첨부파일을 반드시 확인하세요.</div></footer>}
