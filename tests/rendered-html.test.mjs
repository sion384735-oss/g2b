import assert from "node:assert/strict";
import test from "node:test";

const workerUrl=new URL("../dist/server/index.js",import.meta.url);
workerUrl.searchParams.set("test",`${process.pid}-${Date.now()}`);
const {default:worker}=await import(workerUrl.href);
const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};
const render=(path,headers={})=>worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html",...headers}}),env,ctx);

test("랜딩 페이지가 핵심 검색 경험을 제공한다",async()=>{const response=await render("/");assert.equal(response.status,200);const html=await response.text();assert.match(html,/비드인사이트/);assert.match(html,/좋은 입찰 기회/);assert.match(html,/입찰공고 검색/);assert.doesNotMatch(html,/codex-preview|SkeletonPreview/)});
test("입찰 목록과 상세 페이지를 렌더링한다",async()=>{const list=await render("/bids");assert.equal(list.status,200);assert.match(await list.text(),/입찰공고 통합검색/);const detail=await render("/bids/R26BK01527161");assert.equal(detail.status,200);const html=await detail.text();assert.match(html,/공공데이터 품질관리/);assert.match(html,/나라장터 원문/);assert.match(html,/실제 참가 자격/)});
test("낙찰·대시보드·관리자 화면을 제공한다",async()=>{for(const [path,text] of [["/awards","낙찰정보"],["/dashboard","입찰 대시보드"],["/admin","서비스 운영관리"]]){const response=await render(path);assert.equal(response.status,200);assert.match(await response.text(),new RegExp(text))}});
