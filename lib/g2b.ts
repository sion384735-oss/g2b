type G2BItem=Record<string,string|number|null>;
export type NormalizedBid={source:"G2B";bidNumber:string;bidOrder:string;title:string;category:string;agency:string;region:string|null;basePrice:number|null;announcedAt:string|null;deadlineAt:string|null;originalUrl:string|null;raw:G2BItem};

const DEFAULT_TIMEOUT=12_000;
const sleep=(ms:number)=>new Promise(resolve=>setTimeout(resolve,ms));
const value=(item:G2BItem,...keys:string[])=>{for(const key of keys){const found=item[key];if(found!==undefined&&found!==null)return String(found)}return""};
const money=(input:string)=>input&&Number.isFinite(Number(input))?Number(input):null;

export function normalizeBid(item:G2BItem,category:string):NormalizedBid{return{source:"G2B",bidNumber:value(item,"bidNtceNo","bidNumber"),bidOrder:value(item,"bidNtceOrd","bidOrder")||"000",title:value(item,"bidNtceNm","title"),category,agency:value(item,"ntceInsttNm","orderingAgency"),region:value(item,"prtcptPsblRgnNm","region")||null,basePrice:money(value(item,"bssamt","basePrice")),announcedAt:value(item,"bidNtceDt","announcementAt")||null,deadlineAt:value(item,"bidClseDt","deadlineAt")||null,originalUrl:value(item,"bidNtceDtlUrl","originalUrl")||null,raw:item}};

export async function fetchG2B(path:string,params:Record<string,string>,attempt=0):Promise<G2BItem[]>{
  const key=process.env.DATA_GO_KR_SERVICE_KEY;const base=process.env.G2B_API_BASE_URL;
  if(!key||!base)throw new Error("G2B API 환경변수가 설정되지 않았습니다.");
  const url=new URL(path,base);url.search=new URLSearchParams({...params,serviceKey:key,type:"json"}).toString();
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),DEFAULT_TIMEOUT);
  try{const response=await fetch(url,{signal:controller.signal,headers:{accept:"application/json"}});if(!response.ok)throw new Error(`G2B API ${response.status}`);const json=await response.json() as {response?:{body?:{items?:G2BItem[]|{item?:G2BItem[]}}}};const items=json.response?.body?.items;return Array.isArray(items)?items:items?.item??[]}
  catch(error){if(attempt<2){await sleep(400*2**attempt);return fetchG2B(path,params,attempt+1)}throw error}
  finally{clearTimeout(timer)}
}
