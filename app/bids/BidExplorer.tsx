"use client";
import { useMemo, useState } from "react";
import type { Bid } from "../data";
import { won } from "../data";

export default function BidExplorer({items}:{items:Bid[]}) {
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("전체"); const [region,setRegion]=useState("전체"); const [status,setStatus]=useState("전체"); const [saved,setSaved]=useState<string[]>([]);
  const result=useMemo(()=>items.filter(b=>(!query||`${b.title} ${b.number} ${b.agency}`.toLowerCase().includes(query.toLowerCase()))&&(category==="전체"||b.category===category)&&(region==="전체"||b.region===region)&&(status==="전체"||b.status===status)),[items,query,category,region,status]);
  const reset=()=>{setQuery("");setCategory("전체");setRegion("전체");setStatus("전체")};
  const exportCsv=()=>{const rows=[["공고번호","공고명","구분","발주기관","지역","기초금액","마감일"],...result.map(b=>[b.number,b.title,b.category,b.agency,b.region,String(b.basePrice),b.deadline])];const csv="\uFEFF"+rows.map(r=>r.map(v=>`"${v.replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download="비드인사이트_입찰공고.csv";a.click()};
  return <>
    <section className="panel filters" aria-label="입찰공고 검색 조건">
      <div className="filter-grid">
        <div className="field search-wide"><label htmlFor="keyword">통합검색</label><input id="keyword" value={query} onChange={e=>setQuery(e.target.value)} placeholder="공고명, 공고번호, 발주기관"/></div>
        <div className="field"><label htmlFor="category">업무구분</label><select id="category" value={category} onChange={e=>setCategory(e.target.value)}><option>전체</option><option>공사</option><option>용역</option><option>물품</option></select></div>
        <div className="field"><label htmlFor="region">지역</label><select id="region" value={region} onChange={e=>setRegion(e.target.value)}><option>전체</option>{[...new Set(items.map(b=>b.region))].map(v=><option key={v}>{v}</option>)}</select></div>
        <div className="field"><label htmlFor="status">공고상태</label><select id="status" value={status} onChange={e=>setStatus(e.target.value)}><option>전체</option><option>신규</option><option>진행중</option><option>마감임박</option></select></div>
      </div>
      <div className="filter-actions"><span></span><div><button className="btn" onClick={reset}>조건 초기화</button><button className="btn subtle" onClick={exportCsv}>CSV 다운로드</button><button className="btn primary">검색조건 저장</button></div></div>
    </section>
    <div className="result-bar"><strong>검색결과 <em>{result.length}</em>건</strong><select aria-label="검색 결과 정렬"><option>마감 임박순</option><option>최신 등록순</option><option>금액 높은순</option></select></div>
    <section className="panel data-table" aria-live="polite">
      <div className="data-head"><span>구분</span><span>공고명 / 공고번호</span><span>발주기관</span><span>지역</span><span>기초금액</span><span>투찰마감</span><span></span></div>
      {result.length===0?<div className="empty">조건에 맞는 공고가 없습니다. 검색 조건을 변경해보세요.</div>:result.map(b=><article className="data-row" key={b.id}>
        <span className={`cat ${b.category}`}>{b.category}</span><a className="bid-title" href={`/bids/${b.id}`}><strong>{b.title}</strong><small>{b.number}</small></a><span>{b.agency}</span><span>{b.region}</span><span className="money">{won(b.basePrice)}</span><span className="due">{b.status==="마감임박"&&<strong>마감임박</strong>}{b.deadline.slice(5)}</span><button className={`fav ${saved.includes(b.id)?"saved":""}`} onClick={()=>setSaved(v=>v.includes(b.id)?v.filter(id=>id!==b.id):[...v,b.id])} aria-label="관심공고 저장">{saved.includes(b.id)?"★":"☆"}</button>
      </article>)}
    </section>
  </>;
}
