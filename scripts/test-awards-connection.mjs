import { readFile } from "node:fs/promises";
const envText=await readFile(new URL("../.env.local",import.meta.url),"utf8");
const env=Object.fromEntries(envText.split(/\r?\n/).filter(line=>line&&!line.startsWith("#")&&line.includes("=")).map(line=>{const at=line.indexOf("=");return[line.slice(0,at),line.slice(at+1)]}));
if(!env.DATA_GO_KR_SERVICE_KEY)throw new Error("API 키가 비어 있습니다.");
const url=new URL("https://apis.data.go.kr/1230000/ao/PubDataOpnStdService/getDataSetOpnStdScsbidInfo");
url.search=new URLSearchParams({serviceKey:decodeURIComponent(env.DATA_GO_KR_SERVICE_KEY),pageNo:"1",numOfRows:"3",type:"json",bsnsDivCd:"5",opengBgnDt:"202608230000",opengEndDt:"202608232359"}).toString();
const response=await fetch(url,{headers:{accept:"application/json"}});const body=await response.text();let data={};try{data=JSON.parse(body)}catch{}
const header=data?.response?.header??{};const items=data?.response?.body?.items;const list=Array.isArray(items)?items:Array.isArray(items?.item)?items.item:[];
console.log(JSON.stringify({httpStatus:response.status,resultCode:header.resultCode??null,resultMessage:header.resultMsg??null,itemCount:list.length,fieldNames:list[0]?Object.keys(list[0]):[],bodyPreview:list.length?null:body.slice(0,180)}));
