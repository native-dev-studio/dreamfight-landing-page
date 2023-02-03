"use strict";(self.webpackChunkdream_fight=self.webpackChunkdream_fight||[]).push([[691],{4811:function(e){var t=function(e,t){if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);var a;return e=Array.isArray(e)?e.map((function(e){return e.trim()})).filter((function(e){return e.length})).join("-"):e.trim(),0===e.length?"":1===e.length?t.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=function(e){for(var t=!1,a=!1,r=!1,n=0;n<e.length;n++){var i=e[n];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,n)+"-"+e.slice(n),t=!1,r=a,a=!0,n++):a&&r&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,n-1)+"-"+e.slice(n-1),r=a,a=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,r=a,a=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e}(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(e,t){return t.toUpperCase()})).replace(/\d+(\w|$)/g,(function(e){return e.toUpperCase()})),a=e,t.pascalCase?a.charAt(0).toUpperCase()+a.slice(1):a)};e.exports=t,e.exports.default=t},9230:function(e,t,a){a.d(t,{G:function(){return A},L:function(){return f},M:function(){return x},P:function(){return E},_:function(){return s},a:function(){return l},b:function(){return u},c:function(){return C},g:function(){return d},h:function(){return o}});var r=a(7294),n=(a(4811),a(5697)),i=a.n(n);function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},l.apply(this,arguments)}function s(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(a=i[r])>=0||(n[a]=e[a]);return n}var o=function(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype};function c(){return"undefined"!=typeof GATSBY___IMAGE&&GATSBY___IMAGE}var C=function(e){var t;return function(e){var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src)}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData)}(e)?e.gatsbyImageData:function(e){return Boolean(null==e?void 0:e.gatsbyImage)}(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function u(e,t,a,r,n){return void 0===n&&(n={}),c()||(n=l({height:"100%",left:0,position:"absolute",top:0,transform:"translateZ(0)",transition:"opacity 250ms linear",width:"100%",willChange:"opacity"},n)),l({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:l({},n,{opacity:t?1:0})})}function d(e,t,a,r,n,i,s,o){var C={};i&&(C.backgroundColor=i,"fixed"===a?(C.width=r,C.height=n,C.backgroundColor=i,C.position="relative"):("constrained"===a||"fullWidth"===a)&&(C.position="absolute",C.top=0,C.left=0,C.bottom=0,C.right=0)),s&&(C.objectFit=s),o&&(C.objectPosition=o);var u=l({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:l({opacity:t?0:1,transition:"opacity 500ms linear"},C)});return c()||(u.style={height:"100%",left:0,position:"absolute",top:0,width:"100%"}),u}var m,p=["children"],g=function(e){var t=e.layout,a=e.width,n=e.height;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+n+"' width='"+a+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},f=function(e){var t=e.children,a=s(e,p);return r.createElement(r.Fragment,null,r.createElement(g,l({},a)),t,null)},h=["src","srcSet","loading","alt","shouldLoad"],y=["fallback","sources","shouldLoad"],v=function(e){var t=e.src,a=e.srcSet,n=e.loading,i=e.alt,o=void 0===i?"":i,c=e.shouldLoad,C=s(e,h);return r.createElement("img",l({},C,{decoding:"async",loading:n,src:c?t:void 0,"data-src":c?void 0:t,srcSet:c?a:void 0,"data-srcset":c?void 0:a,alt:o}))},w=function(e){var t=e.fallback,a=e.sources,n=void 0===a?[]:a,i=e.shouldLoad,o=void 0===i||i,c=s(e,y),C=c.sizes||(null==t?void 0:t.sizes),u=r.createElement(v,l({},c,t,{sizes:C,shouldLoad:o}));return n.length?r.createElement("picture",null,n.map((function(e){var t=e.media,a=e.srcSet,n=e.type;return r.createElement("source",{key:t+"-"+n+"-"+a,type:n,media:t,srcSet:o?a:void 0,"data-srcset":o?void 0:a,sizes:C})})),u):u};v.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},w.displayName="Picture",w.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};var b=["fallback"],E=function(e){var t=e.fallback,a=s(e,b);return t?r.createElement(w,l({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",l({},a))};E.displayName="Placeholder",E.propTypes={fallback:n.string,sources:null==(m=w.propTypes)?void 0:m.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};var x=function(e){return r.createElement(r.Fragment,null,r.createElement(w,l({},e)),r.createElement("noscript",null,r.createElement(w,l({},e,{shouldLoad:!0}))))};x.displayName="MainImage",x.propTypes=w.propTypes;var L,k,N=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),l=3;l<r;l++)n[l-3]=arguments[l];return e.alt||""===e.alt?i().string.apply(i(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},S={image:i().object.isRequired,alt:N},T=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],I=["style","className"],_=new Set,M=function(e){var t=e.as,n=void 0===t?"div":t,i=e.image,C=e.style,u=e.backgroundColor,d=e.className,m=e.class,p=e.onStartLoad,g=e.onLoad,f=e.onError,h=s(e,T),y=i.width,v=i.height,w=i.layout,b=function(e,t,a){var r={},n="gatsby-image-wrapper";return c()||(r.position="relative",r.overflow="hidden"),"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(c()||(r.display="inline-block",r.verticalAlign="top"),n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}(y,v,w),E=b.style,x=b.className,N=s(b,I),S=(0,r.useRef)(),M=(0,r.useMemo)((function(){return JSON.stringify(i.images)}),[i.images]);m&&(d=m);var A=function(e,t,a){var r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+a+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(w,y,v);return(0,r.useEffect)((function(){L||(L=Promise.all([a.e(774),a.e(36)]).then(a.bind(a,9036)).then((function(e){var t=e.renderImageToString,a=e.swapPlaceholderImage;return k=t,{renderImageToString:t,swapPlaceholderImage:a}})));var e,t,r=S.current.querySelector("[data-gatsby-image-ssr]");return r&&o()?(r.complete?(null==p||p({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((function(){r.removeAttribute("data-gatsby-image-ssr")}),0)):document.addEventListener("load",(function e(){document.removeEventListener("load",e),null==p||p({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((function(){r.removeAttribute("data-gatsby-image-ssr")}),0)})),void _.add(M)):k&&_.has(M)?void 0:(L.then((function(a){var r=a.renderImageToString,n=a.swapPlaceholderImage;S.current.innerHTML=r(l({isLoading:!0,isLoaded:_.has(M),image:i},h)),_.has(M)||(e=requestAnimationFrame((function(){S.current&&(t=n(S.current,M,_,C,p,g,f))})))})),function(){e&&cancelAnimationFrame(e),t&&t()})}),[i]),(0,r.useLayoutEffect)((function(){_.has(M)&&k&&(S.current.innerHTML=k(l({isLoading:_.has(M),isLoaded:_.has(M),image:i},h)),null==p||p({wasCached:!0}),null==g||g({wasCached:!0}))}),[i]),(0,r.createElement)(n,l({},N,{style:l({},E,C,{backgroundColor:u}),className:x+(d?" "+d:""),ref:S,dangerouslySetInnerHTML:{__html:A},suppressHydrationWarning:!0}))},A=(0,r.memo)((function(e){return e.image?(c(),(0,r.createElement)(M,e)):null}));A.propTypes=S,A.displayName="GatsbyImage";var O,q=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions"],D=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},F=new Set(["fixed","fullWidth","constrained"]),j={src:i().string.isRequired,alt:N,width:D,height:D,sizes:i().string,layout:function(e){if(void 0!==e.layout&&!F.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},z=(O=A,function(e){var t=e.src,a=e.__imageData,n=e.__error,i=s(e,q);return n&&console.warn(n),a?r.createElement(O,l({image:a},i)):(console.warn("Image not loaded",t),null)});z.displayName="StaticImage",z.propTypes=j},8454:function(e,t,a){a.r(t),a.d(t,{default:function(){return s}});var r=a(7294),n=function(){return r.createElement("svg",{width:"200",height:"90",viewBox:"0 0 433 98",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.createElement("path",{d:"M73.9314 24.5594C73.9314 16.764 66.0404 8.60719 60.9234 6.18688C58.412 5.0188 53.2999 4.57334 46.7514 4.57334C44.9582 4.57334 42.9817 4.57333 41.0102 4.66242C38.9496 2.33121 35.7199 0 33.9217 0C32.8468 0 31.4995 1.61354 28.9682 5.64738C14.7912 7.4391 0.79751 10.6662 0.79751 13.5369C0.79751 17.2094 10.5758 23.035 13.8055 23.035C15.8181 22.9924 17.8256 22.8138 19.8141 22.5004C10.4866 40.9621 0 64.7147 0 69.2831C0 71.7034 3.96281 77.0835 6.54855 77.0835C6.82099 77.0835 7.17765 76.9945 7.17765 76.6332C7.04813 75.9227 6.95884 75.2055 6.91018 74.4851C6.91018 72.6933 8.16342 69.5356 11.2148 63.2794C14.5337 68.7486 22.068 75.2918 29.5131 75.2918C36.8691 75.2918 48.3365 66.8777 58.6696 54.5039C67.1896 44.2881 72.6633 31.6521 73.7382 26.8114C73.8918 26.0711 73.9566 25.3151 73.9314 24.5594V24.5594ZM49.352 47.2381C40.292 58.8001 30.6029 66.0462 25.1342 66.0462C21.7262 66.0462 17.2383 60.3097 14.9051 56.8995C21.0971 44.9811 29.1713 30.3701 35.8982 19.8821C41.2356 18.9992 46.6322 18.521 52.0417 18.4517C56.3513 18.4517 59.9377 18.8972 60.7451 20.1544C61.0413 20.67 61.1677 21.2656 61.1067 21.857C61.1067 26.5293 56.6188 37.9132 49.352 47.2381Z",fill:"#E64FDC"}),r.createElement("path",{d:"M223.201 42.4861C222.933 42.4861 222.755 42.6643 222.483 43.0206C220.868 45.2628 212.08 56.1071 209.48 59.0669C207.492 61.434 205.365 63.6801 203.109 65.7933C202.391 66.511 201.584 67.0505 200.955 67.0505C200.42 67.0505 199.964 66.6001 199.964 65.526C199.964 64.6302 200.231 63.373 200.955 61.4031C202.124 58.0869 208.851 50.4696 211.629 46.7921C212.327 45.9284 212.707 44.8528 212.709 43.7433C212.709 40.5162 208.94 38.1008 205.621 37.8039C203.288 38.6997 197.279 46.1388 192.435 52.1574C192.012 52.3601 191.555 52.481 191.087 52.5138C191.051 52.5187 191.014 52.5151 190.979 52.5034C190.945 52.4917 190.913 52.4722 190.887 52.4463C190.861 52.4205 190.842 52.389 190.83 52.3543C190.818 52.3197 190.815 52.2828 190.82 52.2465C190.82 51.7961 191.449 50.9002 192.975 48.1236C193.319 47.4928 193.474 46.7761 193.42 46.0596C193.42 43.1939 191.439 39.4273 189.116 39.4273C188.593 39.4577 188.092 39.6459 187.679 39.9668C183.013 43.4611 172.323 56.4585 170.456 56.4585C170.367 56.4585 170.277 56.3695 170.277 56.1863C170.277 54.6668 178.981 43.4612 181.309 41.4912C182.656 40.4123 183.107 39.3382 183.107 38.3532C183.107 35.5716 179.144 32.9731 176.915 32.9731C171.541 32.9731 162.575 51.4744 158.701 62.982L158.523 62.9127C157.631 63.9026 154.065 67.3029 152.157 67.3029C151.622 67.2899 151.114 67.0663 150.743 66.6807C150.372 66.2951 150.168 65.7788 150.176 65.2439C150.176 61.8337 156.616 51.7961 158.597 49.1976C158.968 48.7624 159.216 48.2361 159.315 47.6732C159.315 45.7924 156.086 43.9115 152.227 43.9115C151.225 43.8974 150.225 44.0173 149.255 44.2679C147.64 52.6029 138.045 70.2627 132.66 70.2627C132.031 70.2627 131.764 69.545 131.764 68.3769C131.764 62.0168 139.749 42.4762 152.846 42.4762C154.308 42.5094 155.757 42.7511 157.151 43.1939C157.473 43.289 157.806 43.3487 158.141 43.3721C159.667 43.3721 161.113 40.5954 161.113 37.6356C161.113 34.4085 159.409 31.0032 154.203 31.0032C143.261 31.0032 133.497 43.2879 128.589 55.2855C127.256 56.8941 126.112 58.2552 125.408 59.057C119.4 65.9566 112.311 72.4999 106.124 72.4999C104.143 72.4999 103.251 71.3367 103.251 69.3668C103.257 68.1362 103.348 66.9074 103.524 65.6893C111.236 61.6555 129.282 49.7371 129.282 45.431C129.282 40.8626 125.874 40.4122 124.081 39.2491C121.386 37.4574 120.851 32.7059 117.8 32.7059C110.231 32.7059 100.898 44.6787 97.0594 56.3249C96.1033 57.4732 95.286 58.4433 94.7461 59.057C91.1548 63.18 86.3251 68.1097 85.4136 68.9164C84.7003 69.6341 83.8879 70.1736 83.2638 70.1736C82.7238 70.1736 82.2731 69.7232 82.2731 68.6492C82.2731 62.7098 91.5114 51.8209 94.5578 47.7623C95.3653 46.5991 95.7269 45.7033 95.7269 44.8965C95.7269 41.4913 89.1783 41.0408 86.6668 39.16C86.8452 39.16 88.2817 35.9329 88.2817 33.3345C88.2817 31.5427 87.5634 29.9292 85.2303 29.9292C77.5177 30.0183 71.1475 35.3044 71.1475 39.9668C71.1475 42.4762 72.8515 44.8074 77.0917 46.1487C75.566 48.0345 73.2378 51.1675 72.2471 52.3356C71.4397 53.3255 71.1722 54.1273 71.1722 54.5777C71.1722 55.4736 72.1629 55.6518 72.9654 55.6518C73.2663 55.6479 73.5662 55.6181 73.862 55.5627C77.0025 51.3507 78.8155 48.6334 79.9647 46.7773C80.8244 46.945 81.6925 47.0656 82.5653 47.1386C79.0681 54.0382 73.7728 66.1398 73.7728 73.2176C73.7728 76.5337 74.9419 78.6868 77.9883 78.6868C82.9715 78.6868 90.808 70.4013 95.3603 64.6302C95.3256 65.1251 95.3058 65.6448 95.3058 66.1398C95.3058 72.9503 103.826 78.0582 107.234 78.0582C112.316 78.0681 119.747 72.2771 125.691 64.9865C125.401 66.5526 125.247 68.1407 125.23 69.7331C125.23 73.9451 128.911 76.4545 132.854 76.4545C135.276 76.4545 139.402 73.6779 143.256 69.2827C143.523 72.782 145.317 74.4846 148.011 74.4846C150.528 74.4846 153.797 72.8067 156.928 69.4114C156.849 69.8727 156.804 70.3392 156.794 70.8071C156.794 74.841 161.099 78.2314 163.164 78.2314C164.155 78.2314 164.868 77.6969 165.314 76.4397C166.751 72.3168 176.885 56.0032 180.744 56.0032C180.876 55.9985 181.008 56.0202 181.131 56.0669C181.254 56.1137 181.367 56.1845 181.463 56.2754C181.463 56.2754 175.721 65.2389 175.721 70.9754C175.721 73.3908 179.129 75.1874 181.73 75.1874C182.983 75.1874 184.063 74.7371 184.42 73.7521C189.591 61.1259 193.509 57.3791 194.049 57.3791L194.139 57.4682C192.786 60.4234 192.053 63.6236 191.984 66.8723C191.984 71.7129 194.139 74.94 197.547 74.94C201.138 74.94 206.25 71.3565 211.719 62.4821C216.836 55.5825 222.121 48.0543 224.548 44.1986C224.548 44.1887 224.008 42.4861 223.201 42.4861ZM120.242 43.9214C120.548 43.9377 120.85 43.9977 121.138 44.0996C119.434 47.5049 116.026 53.0632 105.084 60.5023C107.932 52.7019 113.941 45.4409 120.242 43.9214Z",fill:"#E64FDC"}),r.createElement("path",{d:"M277.026 40.0562C273.974 37.814 259.981 37.9031 254.239 37.9031C258.202 31.1817 262.046 24.8166 265.182 19.981L267.069 19.7978C270.041 19.5306 272.632 19.7087 275.049 19.6197C281.791 19.5585 288.522 20.1586 295.146 21.4114C296.761 21.4114 299.005 14.0614 299.005 9.84934C299.005 8.68621 298.732 7.79035 298.286 7.70126C291.738 6.08772 283.307 5.18691 268.595 5.09782C266.529 3.11801 263.929 1.42529 262.403 1.42529C261.506 1.42529 260.521 2.23205 258.638 5.1869C250.609 5.41518 242.605 6.1941 234.683 7.51813C233.97 7.70126 232.702 8.59711 232.702 9.58207C232.708 9.80317 232.769 10.0193 232.88 10.2107C233.509 11.3738 235.302 22.3963 237.833 22.6686C238.186 22.746 238.548 22.7759 238.908 22.7576C241.063 22.7576 244.56 22.2182 249.227 21.5005C239.622 39.7048 228.229 64.3533 228.229 69.1048C228.229 71.6142 233.519 77.0834 235.58 77.0834C235.941 77.0834 236.298 76.9052 236.298 76.5439C236.164 75.8908 236.075 75.2293 236.03 74.5641C236.03 72.322 240.424 62.5516 247.963 49.0197C251.996 47.228 263.319 45.9708 270.75 45.9708C273.35 45.9708 275.505 46.5103 276.694 46.5103C277.501 46.5103 277.774 44.8968 277.774 43.3723C277.774 41.8479 277.472 40.3333 277.026 40.0562Z",fill:"#E64FDC"}),r.createElement("path",{d:"M306.088 29.0437C308.51 29.0437 311.74 23.6636 311.74 21.3324C311.74 19.0011 308.693 14.9673 304.656 14.9673C301.154 14.9673 297.479 20.1692 297.479 23.3072C297.479 26.0839 303.026 29.0437 306.088 29.0437Z",fill:"#E64FDC"}),r.createElement("path",{d:"M292.624 76.1874C292.577 75.802 292.386 75.4485 292.089 75.1975C291.089 74.2959 290.298 73.187 289.771 71.9483C289.244 70.7096 288.993 69.3709 289.038 68.0257C289.038 59.8689 304.195 39.076 304.195 34.6809C304.195 32.0824 302.046 31.1865 299.445 31.1865C297.919 31.1865 290.831 32.1764 290.831 34.1562C290.831 34.7848 291.46 35.4976 291.46 36.3043C291.46 39.7096 280.518 58.3543 280.518 66.0657C280.518 76.2814 284.733 79.4293 288.141 79.4293C290.573 79.4145 292.624 77.89 292.624 76.1874Z",fill:"#E64FDC"}),r.createElement("path",{d:"M345.378 82.8199L341.074 82.1913C327.437 80.3105 322.954 79.6819 314.612 79.5038C320.532 67.3131 325.733 57.5428 331.117 49.3118C331.49 48.8779 331.738 48.351 331.836 47.7873C331.836 45.9065 328.338 43.9366 324.301 43.9366C323.299 43.922 322.299 44.0418 321.329 44.293C319.714 52.6279 310.114 70.2878 304.735 70.2878C304.106 70.2878 303.838 69.5701 303.838 68.402C303.838 62.0419 311.818 42.5013 324.915 42.5013C327.61 42.5013 329.314 43.3971 330.211 43.3971C331.736 43.3971 333.183 40.6205 333.183 37.6607C333.183 34.4336 331.479 31.0283 326.278 31.0283C310.58 31.0283 297.304 56.3054 297.304 69.7483C297.304 73.9603 300.98 76.4697 304.928 76.4697C306.229 76.371 307.474 75.904 308.519 75.1234L306.632 79.5186C293.896 79.6077 285.555 82.2062 285.555 89.5562C285.555 94.575 290.305 97.8911 295.957 97.8911C301.342 97.8911 307.529 94.8423 312.373 84.3592C321.611 85.166 327.263 87.1359 334.887 87.5863C335.967 87.6754 336.868 87.6754 337.582 87.6754C342.694 87.6754 339.286 86.1509 343.323 85.7896C345.834 84.3592 347.627 83.7306 347.627 83.3743C347.608 83.1763 346.993 82.9981 345.378 82.8199ZM302.679 88.1951C301.069 91.6944 299.004 92.9466 297.23 92.9466C296.184 92.9193 295.192 92.4799 294.469 91.7243C293.746 90.9686 293.351 89.9579 293.371 88.9128C293.371 85.3293 297.765 83.9633 304.314 83.9633H304.675L302.679 88.1951Z",fill:"#E64FDC"}),r.createElement("path",{d:"M428.09 18.1946C421.992 18.1946 413.021 18.5559 403.689 18.8232C404.585 17.3878 405.487 16.1356 406.2 15.0615C406.609 14.4175 406.827 13.6711 406.829 12.9085C406.829 9.85962 402.436 6.54346 399.746 6.54346C398.22 6.54346 396.244 6.99385 395.436 9.05284C394.718 11.0326 392.925 14.6111 390.483 19.0905C385.732 19.0905 381.155 18.9123 377.297 18.5559C376.762 18.5559 376.132 19.9912 376.132 21.783C376.132 24.4705 377.569 27.7867 383.31 27.7867H385.822C381.784 35.4436 377.282 44.0805 373.839 51.5691C371.323 54.6675 368.806 57.7065 367.607 59.0676C361.866 65.789 356.398 70.9909 353.886 70.9909C352.99 70.9909 352.539 70.3624 352.539 68.927C352.539 62.9876 364.378 51.8067 367.429 47.7728C368.113 46.9324 368.493 45.8862 368.509 44.8031C368.509 41.1256 362.946 38.9775 360.435 38.9775C360.127 38.9748 359.822 39.0355 359.538 39.1557C356.308 41.1355 347.783 48.2084 341.507 57.9638C341.507 57.9638 341.057 57.5134 341.057 57.2462C341.166 56.4783 341.441 55.7436 341.864 55.0931C346.619 46.0405 361.331 26.881 361.331 15.9921C361.331 10.0774 358.191 8.36982 354.892 8.36982C352.608 8.44215 350.371 9.02568 348.343 10.0774C347.625 10.4338 347.352 10.7901 347.352 11.1514C347.352 11.5128 347.62 11.8691 347.887 12.4928C348.939 14.4468 349.464 16.64 349.413 18.8578C349.413 32.0334 333.805 50.7673 325.463 70.6643C325.298 71.0635 325.207 71.4896 325.195 71.9214C325.195 75.4158 330.644 78.1034 332.011 78.1034C333.002 78.1034 333.715 77.5688 334.166 76.3116C335.692 71.9214 346.902 50.5742 353.812 49.421C349.849 57.3996 345.287 67.8876 345.287 73.8913C345.287 77.747 346.813 79.3358 349.056 79.3358C354.124 79.3358 363.209 71.4463 369.089 63.4627C368.611 64.9154 368.33 66.425 368.251 67.9519C368.251 71.9858 373.096 76.4651 376.866 76.4651C377.713 76.4726 378.537 76.1876 379.199 75.6583C382.696 72.8816 388.526 66.3384 391.399 62.3936C396.422 55.494 401.802 47.9658 404.224 44.1102C404.224 44.1102 403.684 42.4076 402.881 42.4076C402.609 42.4076 402.431 42.5857 402.158 42.9421C400.543 45.1842 391.756 56.0286 389.155 58.9884C386.296 62.6075 382.91 65.7775 379.109 68.3924C377.94 69.1101 377.044 69.4714 376.504 69.4714C375.786 69.4714 375.513 68.932 375.513 68.0361C375.513 62.9282 388.254 42.4026 397.849 27.6135C411.124 27.2522 427.362 26.2672 427.362 22.9511C427.362 22.2334 426.465 21.877 426.465 21.5206C426.465 21.3375 426.733 21.1593 427.723 21.0703C430.235 19.6349 432.028 19.0063 432.028 18.6499C432.038 18.5559 431.409 18.3777 428.09 18.1946Z",fill:"#E64FDC"}))},i=a(1597),l=a(9230),s=function(){var e=(0,i.useStaticQuery)("1997579300"),t=(0,l.c)(e.hero);return r.createElement("div",{className:"flex justify-between lg:flex-row-reverse sm:flex-col-reverse flex-col-reverse"},r.createElement(l.G,{image:t,imgStyle:{objectPosition:"right top"},className:"h-screen",alt:""}),r.createElement("div",{className:"relative z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"},r.createElement("main",{className:"mx-auto px-10"},r.createElement("div",{className:"text-left"},r.createElement("div",{className:"my-10"},r.createElement(n,null)),r.createElement("h1",{className:"mt-16 mb-8 text-white text-6xl tracking-tight font-extrabold"},"Get in the game"),r.createElement("p",{className:"my-3 text-white sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0 text-white"},"DreamFight is a new sports game augmented over live broadcast that channels the kid in all of us. Think NBA Jam. NFL Blitz. We're bringing back the magic of sports and gaming."),r.createElement("div",{className:"mt-5 sm:mt-8 sm:flex sm:justify-center justify-start"},r.createElement("div",{className:"w-full"},r.createElement("div",{className:"my-3 text-white font-bold"},"Sign up for early access"),r.createElement("div",{className:"flex space-x-4 w-3xl font-large"},r.createElement("input",{type:"text",className:"focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded text-medium px-3",placeholder:"Enter your email"}),r.createElement("button",{className:"px-8 py-3 text-medium whitespace-nowrap text-white bg-purple rounded"},"Sign up"))))))))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-5c5780a38d2113bdb15d.js.map