import { readFile } from "node:fs/promises";

const envText=await readFile(new URL("../.env.local",import.meta.url),"utf8");
const env=Object.fromEntries(envText.split(/\r?\n/).filter(line=>line&&!line.startsWith("#")&&line.includes("=")).map(line=>{const at=line.indexOf("=");return[line.slice(0,at),line.slice(at+1)]}));
if(!env.DATA_GO_KR_SERVICE_KEY)throw new Error("API 키가 비어 있습니다.");
const key=decodeURIComponent(env.DATA_GO_KR_SERVICE_KEY);
const url=new URL("getBidPblancListInfoServc",env.G2B_API_BASE_URL);
url.search=new URLSearchParams({serviceKey:key,pageNo:"1",numOfRows:"3",inqryDiv:"1",inqryBgnDt:"202608230000",inqryEndDt:"202608242359",type:"json"}).toString();
const response=await fetch(url,{headers:{accept:"application/json"}});
const body=await response.text();
let data={};try{data=JSON.parse(body)}catch{}
const header=data?.response?.header??{};
const items=data?.response?.body?.items;
const count=Array.isArray(items)?items.length:Array.isArray(items?.item)?items.item.length:0;
const first=Array.isArray(items)?items[0]:items?.item?.[0];
console.log(JSON.stringify({httpStatus:response.status,resultCode:header.resultCode??null,resultMessage:header.resultMsg??null,itemCount:count,contentType:response.headers.get("content-type"),fieldNames:first?Object.keys(first):[]}));
