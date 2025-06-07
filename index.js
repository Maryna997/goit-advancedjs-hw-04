import{a as b,S as w,i as u}from"./assets/vendor-BMHzDZyJ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();async function f(s,e=1){try{return(await b.get("https://pixabay.com/api/",{params:{key:"50594223-08a3a2e6b4d3e84c5c31a5d02",q:s,page:e,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(o){console.error(o)}}function g(s){return s.map(({webformatURL:e,largeImageURL:o,tags:c,likes:t,views:r,comments:a,downloads:v})=>`<li class="gallery-item">
            <a class="gallery-link" href="${o}">
                <img
                    class="gallery-image"
                    src="${e}"
                    data-source="${o}"
                    alt="${c}"
                    width=360
                    height=200
                />

            </a>
            <ul class='metadata'>
                <li>
                    <p class='metadata-heading'>Likes</p>
                    <p>${t}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Views</p>
                    <p>${r}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Comments</p>
                    <p>${a}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Downloads</p>
                    <p>${v}</p>
                </li>
            </ul>
        </li>`).join("")}const y=document.querySelector(".form"),l=document.querySelector(".gallery"),p=document.querySelector("input"),h=document.querySelector(".loader"),i=document.querySelector(".load-more"),L=new w(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let n=1,d="";const S=async s=>{try{s.preventDefault();const e=s.currentTarget;if(d=p.value.trim(),p.value="",d===""){u.warning({title:"Caution",message:"Please enter a query!",position:"topRight"});return}h.classList.remove("hidden"),l.innerHTML="",i.classList.add("hidden"),n=1;const o=await f(d,n);if(h.classList.add("hidden"),!o.hits.length)return l.innerHTML="",u.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"});l.innerHTML=g(o.hits),L.refresh(),o.hits.length<o.totalHits?(i.classList.remove("hidden"),i.addEventListener("click",m)):i.classList.add("hidden")}catch(e){console.log(e)}finally{y.reset()}},m=async s=>{try{h.classList.remove("hidden"),n++;const e=await f(d,n);if(!e.hits.length){u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.classList.add("hidden"),i.removeEventListener("click",m);return}l.insertAdjacentHTML("beforeend",g(e.hits)),L.refresh(),q(),h.classList.add("hidden"),n*15>=e.totalHits&&(u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.classList.add("hidden"),i.removeEventListener("click",m))}catch(e){console.log(e)}};function q(){const s=document.querySelector(".gallery-item");if(s){const{height:e}=s.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}y.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
