import{a as b,S,i as u}from"./assets/vendor-BMHzDZyJ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();function f(i,e=1){return b.get("https://pixabay.com/api/",{params:{key:"50594223-08a3a2e6b4d3e84c5c31a5d02",q:i,page:e,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data).catch(r=>console.error(r))}function g(i){return i.map(({webformatURL:e,largeImageURL:r,tags:l,likes:t,views:o,comments:a,downloads:v})=>`<li class="gallery-item">
            <a class="gallery-link" href="${r}">
                <img
                    class="gallery-image"
                    src="${e}"
                    data-source="${r}"
                    alt="${l}"
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
                    <p>${o}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Comments</p>
                    <p>${a}</p>
                </li>
                <li>
                    <p metadata-heading>Downloads</p>
                    <p>${v}</p>
                </li>
            </ul>
        </li>`).join("")}const y=document.querySelector(".form"),c=document.querySelector(".gallery"),p=document.querySelector("input"),h=document.querySelector(".loader"),s=document.querySelector(".load-more"),L=new S(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let n=1,d="";const q=async i=>{try{i.preventDefault();const e=i.currentTarget;if(d=p.value.trim(),p.value="",d===""){u.warning({title:"Caution",message:"Please enter a query!",position:"topRight"});return}h.classList.remove("hidden"),c.innerHTML="",s.classList.add("hidden"),n=1;const r=await f(d,n);if(h.classList.add("hidden"),!r.hits.length)return c.innerHTML="",u.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"});c.innerHTML=g(r.hits),L.refresh(),r.hits.length<r.totalHits?(s.classList.remove("hidden"),s.addEventListener("click",m)):s.classList.add("hidden")}catch(e){console.log(e)}finally{y.reset()}},m=async i=>{try{h.classList.remove("hidden"),n++;const e=await f(d,n);if(!e.hits.length){u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),s.classList.add("hidden"),s.removeEventListener("click",m);return}c.insertAdjacentHTML("beforeend",g(e.hits)),L.refresh(),w(),h.classList.add("hidden"),n*15>=e.totalHits&&(u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),s.classList.add("hidden"),s.removeEventListener("click",m))}catch(e){console.log(e)}};function w(){const i=document.querySelector(".gallery-item");if(i){const{height:e}=i.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}y.addEventListener("submit",q);
//# sourceMappingURL=index.js.map
