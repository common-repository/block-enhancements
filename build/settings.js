(()=>{var e={856:function(e){e.exports=function(){"use strict";const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:r,getOwnPropertyDescriptor:a}=Object;let{freeze:i,seal:o,create:s}=Object,{apply:l,construct:c}="undefined"!=typeof Reflect&&Reflect;i||(i=function(e){return e}),o||(o=function(e){return e}),l||(l=function(e,t,n){return e.apply(t,n)}),c||(c=function(e,t){return new e(...t)});const u=_(Array.prototype.forEach),d=_(Array.prototype.pop),f=_(Array.prototype.push),m=_(String.prototype.toLowerCase),p=_(String.prototype.toString),h=_(String.prototype.match),g=_(String.prototype.replace),v=_(String.prototype.indexOf),b=_(String.prototype.trim),y=_(Object.prototype.hasOwnProperty),w=_(RegExp.prototype.test),x=(k=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return c(k,t)});var k;function _(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return l(e,t,r)}}function E(e,r){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:m;t&&t(e,null);let i=r.length;for(;i--;){let t=r[i];if("string"==typeof t){const e=a(t);e!==t&&(n(r)||(r[i]=e),t=e)}e[t]=!0}return e}function C(e){for(let t=0;t<e.length;t++)y(e,t)||(e[t]=null);return e}function S(t){const n=s(null);for(const[r,a]of e(t))y(t,r)&&(Array.isArray(a)?n[r]=C(a):a&&"object"==typeof a&&a.constructor===Object?n[r]=S(a):n[r]=a);return n}function T(e,t){for(;null!==e;){const n=a(e,t);if(n){if(n.get)return _(n.get);if("function"==typeof n.value)return _(n.value)}e=r(e)}return function(){return null}}const A=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),N=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),O=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),L=i(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),R=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),M=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),I=i(["#text"]),D=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),P=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),z=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),B=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),H=o(/\{\{[\w\W]*|[\w\W]*\}\}/gm),U=o(/<%[\w\W]*|[\w\W]*%>/gm),F=o(/\${[\w\W]*}/gm),j=o(/^data-[\-\w.\u00B7-\uFFFF]/),$=o(/^aria-[\-\w]+$/),W=o(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),G=o(/^(?:\w+script|data):/i),V=o(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),q=o(/^html$/i),Y=o(/^[a-z][.\w]*(-[.\w]+)+$/i);var X=Object.freeze({__proto__:null,MUSTACHE_EXPR:H,ERB_EXPR:U,TMPLIT_EXPR:F,DATA_ATTR:j,ARIA_ATTR:$,IS_ALLOWED_URI:W,IS_SCRIPT_OR_DATA:G,ATTR_WHITESPACE:V,DOCTYPE_NAME:q,CUSTOM_ELEMENT:Y});const Z=function(){return"undefined"==typeof window?null:window};return function t(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z();const r=e=>t(e);if(r.version="3.0.11",r.removed=[],!n||!n.document||9!==n.document.nodeType)return r.isSupported=!1,r;let{document:a}=n;const o=a,l=o.currentScript,{DocumentFragment:c,HTMLTemplateElement:k,Node:_,Element:C,NodeFilter:H,NamedNodeMap:U=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:F,DOMParser:j,trustedTypes:$}=n,G=C.prototype,V=T(G,"cloneNode"),Y=T(G,"nextSibling"),K=T(G,"childNodes"),J=T(G,"parentNode");if("function"==typeof k){const e=a.createElement("template");e.content&&e.content.ownerDocument&&(a=e.content.ownerDocument)}let Q,ee="";const{implementation:te,createNodeIterator:ne,createDocumentFragment:re,getElementsByTagName:ae}=a,{importNode:ie}=o;let oe={};r.isSupported="function"==typeof e&&"function"==typeof J&&te&&void 0!==te.createHTMLDocument;const{MUSTACHE_EXPR:se,ERB_EXPR:le,TMPLIT_EXPR:ce,DATA_ATTR:ue,ARIA_ATTR:de,IS_SCRIPT_OR_DATA:fe,ATTR_WHITESPACE:me,CUSTOM_ELEMENT:pe}=X;let{IS_ALLOWED_URI:he}=X,ge=null;const ve=E({},[...A,...N,...O,...R,...I]);let be=null;const ye=E({},[...D,...P,...z,...B]);let we=Object.seal(s(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),xe=null,ke=null,_e=!0,Ee=!0,Ce=!1,Se=!0,Te=!1,Ae=!1,Ne=!1,Oe=!1,Le=!1,Re=!1,Me=!1,Ie=!0,De=!1,Pe=!0,ze=!1,Be={},He=null;const Ue=E({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Fe=null;const je=E({},["audio","video","img","source","image","track"]);let $e=null;const We=E({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ge="http://www.w3.org/1998/Math/MathML",Ve="http://www.w3.org/2000/svg",qe="http://www.w3.org/1999/xhtml";let Ye=qe,Xe=!1,Ze=null;const Ke=E({},[Ge,Ve,qe],p);let Je=null;const Qe=["application/xhtml+xml","text/html"];let et=null,tt=null;const nt=a.createElement("form"),rt=function(e){return e instanceof RegExp||e instanceof Function},at=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!tt||tt!==e){if(e&&"object"==typeof e||(e={}),e=S(e),Je=-1===Qe.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,et="application/xhtml+xml"===Je?p:m,ge=y(e,"ALLOWED_TAGS")?E({},e.ALLOWED_TAGS,et):ve,be=y(e,"ALLOWED_ATTR")?E({},e.ALLOWED_ATTR,et):ye,Ze=y(e,"ALLOWED_NAMESPACES")?E({},e.ALLOWED_NAMESPACES,p):Ke,$e=y(e,"ADD_URI_SAFE_ATTR")?E(S(We),e.ADD_URI_SAFE_ATTR,et):We,Fe=y(e,"ADD_DATA_URI_TAGS")?E(S(je),e.ADD_DATA_URI_TAGS,et):je,He=y(e,"FORBID_CONTENTS")?E({},e.FORBID_CONTENTS,et):Ue,xe=y(e,"FORBID_TAGS")?E({},e.FORBID_TAGS,et):{},ke=y(e,"FORBID_ATTR")?E({},e.FORBID_ATTR,et):{},Be=!!y(e,"USE_PROFILES")&&e.USE_PROFILES,_e=!1!==e.ALLOW_ARIA_ATTR,Ee=!1!==e.ALLOW_DATA_ATTR,Ce=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Se=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,Te=e.SAFE_FOR_TEMPLATES||!1,Ae=e.WHOLE_DOCUMENT||!1,Le=e.RETURN_DOM||!1,Re=e.RETURN_DOM_FRAGMENT||!1,Me=e.RETURN_TRUSTED_TYPE||!1,Oe=e.FORCE_BODY||!1,Ie=!1!==e.SANITIZE_DOM,De=e.SANITIZE_NAMED_PROPS||!1,Pe=!1!==e.KEEP_CONTENT,ze=e.IN_PLACE||!1,he=e.ALLOWED_URI_REGEXP||W,Ye=e.NAMESPACE||qe,we=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&rt(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(we.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&rt(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(we.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(we.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(Ee=!1),Re&&(Le=!0),Be&&(ge=E({},I),be=[],!0===Be.html&&(E(ge,A),E(be,D)),!0===Be.svg&&(E(ge,N),E(be,P),E(be,B)),!0===Be.svgFilters&&(E(ge,O),E(be,P),E(be,B)),!0===Be.mathMl&&(E(ge,R),E(be,z),E(be,B))),e.ADD_TAGS&&(ge===ve&&(ge=S(ge)),E(ge,e.ADD_TAGS,et)),e.ADD_ATTR&&(be===ye&&(be=S(be)),E(be,e.ADD_ATTR,et)),e.ADD_URI_SAFE_ATTR&&E($e,e.ADD_URI_SAFE_ATTR,et),e.FORBID_CONTENTS&&(He===Ue&&(He=S(He)),E(He,e.FORBID_CONTENTS,et)),Pe&&(ge["#text"]=!0),Ae&&E(ge,["html","head","body"]),ge.table&&(E(ge,["tbody"]),delete xe.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw x('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw x('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');Q=e.TRUSTED_TYPES_POLICY,ee=Q.createHTML("")}else void 0===Q&&(Q=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+a+" could not be created."),null}}($,l)),null!==Q&&"string"==typeof ee&&(ee=Q.createHTML(""));i&&i(e),tt=e}},it=E({},["mi","mo","mn","ms","mtext"]),ot=E({},["foreignobject","desc","title","annotation-xml"]),st=E({},["title","style","font","a","script"]),lt=E({},[...N,...O,...L]),ct=E({},[...R,...M]),ut=function(e){f(r.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},dt=function(e,t){try{f(r.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){f(r.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!be[e])if(Le||Re)try{ut(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},ft=function(e){let t=null,n=null;if(Oe)e="<remove></remove>"+e;else{const t=h(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===Je&&Ye===qe&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const r=Q?Q.createHTML(e):e;if(Ye===qe)try{t=(new j).parseFromString(r,Je)}catch(e){}if(!t||!t.documentElement){t=te.createDocument(Ye,"template",null);try{t.documentElement.innerHTML=Xe?ee:r}catch(e){}}const i=t.body||t.documentElement;return e&&n&&i.insertBefore(a.createTextNode(n),i.childNodes[0]||null),Ye===qe?ae.call(t,Ae?"html":"body")[0]:Ae?t.documentElement:i},mt=function(e){return ne.call(e.ownerDocument||e,e,H.SHOW_ELEMENT|H.SHOW_COMMENT|H.SHOW_TEXT|H.SHOW_PROCESSING_INSTRUCTION|H.SHOW_CDATA_SECTION,null)},pt=function(e){return"function"==typeof _&&e instanceof _},ht=function(e,t,n){oe[e]&&u(oe[e],(e=>{e.call(r,t,n,tt)}))},gt=function(e){let t=null;if(ht("beforeSanitizeElements",e,null),(n=e)instanceof F&&("string"!=typeof n.nodeName||"string"!=typeof n.textContent||"function"!=typeof n.removeChild||!(n.attributes instanceof U)||"function"!=typeof n.removeAttribute||"function"!=typeof n.setAttribute||"string"!=typeof n.namespaceURI||"function"!=typeof n.insertBefore||"function"!=typeof n.hasChildNodes))return ut(e),!0;var n;const a=et(e.nodeName);if(ht("uponSanitizeElement",e,{tagName:a,allowedTags:ge}),e.hasChildNodes()&&!pt(e.firstElementChild)&&w(/<[/\w]/g,e.innerHTML)&&w(/<[/\w]/g,e.textContent))return ut(e),!0;if(7===e.nodeType)return ut(e),!0;if(!ge[a]||xe[a]){if(!xe[a]&&bt(a)){if(we.tagNameCheck instanceof RegExp&&w(we.tagNameCheck,a))return!1;if(we.tagNameCheck instanceof Function&&we.tagNameCheck(a))return!1}if(Pe&&!He[a]){const t=J(e)||e.parentNode,n=K(e)||e.childNodes;if(n&&t)for(let r=n.length-1;r>=0;--r)t.insertBefore(V(n[r],!0),Y(e))}return ut(e),!0}return e instanceof C&&!function(e){let t=J(e);t&&t.tagName||(t={namespaceURI:Ye,tagName:"template"});const n=m(e.tagName),r=m(t.tagName);return!!Ze[e.namespaceURI]&&(e.namespaceURI===Ve?t.namespaceURI===qe?"svg"===n:t.namespaceURI===Ge?"svg"===n&&("annotation-xml"===r||it[r]):Boolean(lt[n]):e.namespaceURI===Ge?t.namespaceURI===qe?"math"===n:t.namespaceURI===Ve?"math"===n&&ot[r]:Boolean(ct[n]):e.namespaceURI===qe?!(t.namespaceURI===Ve&&!ot[r])&&!(t.namespaceURI===Ge&&!it[r])&&!ct[n]&&(st[n]||!lt[n]):!("application/xhtml+xml"!==Je||!Ze[e.namespaceURI]))}(e)?(ut(e),!0):"noscript"!==a&&"noembed"!==a&&"noframes"!==a||!w(/<\/no(script|embed|frames)/i,e.innerHTML)?(Te&&3===e.nodeType&&(t=e.textContent,u([se,le,ce],(e=>{t=g(t,e," ")})),e.textContent!==t&&(f(r.removed,{element:e.cloneNode()}),e.textContent=t)),ht("afterSanitizeElements",e,null),!1):(ut(e),!0)},vt=function(e,t,n){if(Ie&&("id"===t||"name"===t)&&(n in a||n in nt))return!1;if(Ee&&!ke[t]&&w(ue,t));else if(_e&&w(de,t));else if(!be[t]||ke[t]){if(!(bt(e)&&(we.tagNameCheck instanceof RegExp&&w(we.tagNameCheck,e)||we.tagNameCheck instanceof Function&&we.tagNameCheck(e))&&(we.attributeNameCheck instanceof RegExp&&w(we.attributeNameCheck,t)||we.attributeNameCheck instanceof Function&&we.attributeNameCheck(t))||"is"===t&&we.allowCustomizedBuiltInElements&&(we.tagNameCheck instanceof RegExp&&w(we.tagNameCheck,n)||we.tagNameCheck instanceof Function&&we.tagNameCheck(n))))return!1}else if($e[t]);else if(w(he,g(n,me,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==v(n,"data:")||!Fe[e])if(Ce&&!w(fe,g(n,me,"")));else if(n)return!1;return!0},bt=function(e){return"annotation-xml"!==e&&h(e,pe)},yt=function(e){ht("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be};let a=t.length;for(;a--;){const i=t[a],{name:o,namespaceURI:s,value:l}=i,c=et(o);let f="value"===o?l:b(l);if(n.attrName=c,n.attrValue=f,n.keepAttr=!0,n.forceKeepAttr=void 0,ht("uponSanitizeAttribute",e,n),f=n.attrValue,n.forceKeepAttr)continue;if(dt(o,e),!n.keepAttr)continue;if(!Se&&w(/\/>/i,f)){dt(o,e);continue}Te&&u([se,le,ce],(e=>{f=g(f,e," ")}));const m=et(e.nodeName);if(vt(m,c,f)){if(!De||"id"!==c&&"name"!==c||(dt(o,e),f="user-content-"+f),Q&&"object"==typeof $&&"function"==typeof $.getAttributeType)if(s);else switch($.getAttributeType(m,c)){case"TrustedHTML":f=Q.createHTML(f);break;case"TrustedScriptURL":f=Q.createScriptURL(f)}try{s?e.setAttributeNS(s,o,f):e.setAttribute(o,f),d(r.removed)}catch(e){}}}ht("afterSanitizeAttributes",e,null)},wt=function e(t){let n=null;const r=mt(t);for(ht("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)ht("uponSanitizeShadowNode",n,null),gt(n)||(n.content instanceof c&&e(n.content),yt(n));ht("afterSanitizeShadowDOM",t,null)};return r.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,a=null,i=null,s=null;if(Xe=!e,Xe&&(e="\x3c!--\x3e"),"string"!=typeof e&&!pt(e)){if("function"!=typeof e.toString)throw x("toString is not a function");if("string"!=typeof(e=e.toString()))throw x("dirty is not a string, aborting")}if(!r.isSupported)return e;if(Ne||at(t),r.removed=[],"string"==typeof e&&(ze=!1),ze){if(e.nodeName){const t=et(e.nodeName);if(!ge[t]||xe[t])throw x("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof _)n=ft("\x3c!----\x3e"),a=n.ownerDocument.importNode(e,!0),1===a.nodeType&&"BODY"===a.nodeName||"HTML"===a.nodeName?n=a:n.appendChild(a);else{if(!Le&&!Te&&!Ae&&-1===e.indexOf("<"))return Q&&Me?Q.createHTML(e):e;if(n=ft(e),!n)return Le?null:Me?ee:""}n&&Oe&&ut(n.firstChild);const l=mt(ze?e:n);for(;i=l.nextNode();)gt(i)||(i.content instanceof c&&wt(i.content),yt(i));if(ze)return e;if(Le){if(Re)for(s=re.call(n.ownerDocument);n.firstChild;)s.appendChild(n.firstChild);else s=n;return(be.shadowroot||be.shadowrootmode)&&(s=ie.call(o,s,!0)),s}let d=Ae?n.outerHTML:n.innerHTML;return Ae&&ge["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&w(q,n.ownerDocument.doctype.name)&&(d="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+d),Te&&u([se,le,ce],(e=>{d=g(d,e," ")})),Q&&Me?Q.createHTML(d):d},r.setConfig=function(){at(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),Ne=!0},r.clearConfig=function(){tt=null,Ne=!1},r.isValidAttribute=function(e,t,n){tt||at({});const r=et(e),a=et(t);return vt(r,a,n)},r.addHook=function(e,t){"function"==typeof t&&(oe[e]=oe[e]||[],f(oe[e],t))},r.removeHook=function(e){if(oe[e])return d(oe[e])},r.removeHooks=function(e){oe[e]&&(oe[e]=[])},r.removeAllHooks=function(){oe={}},r}()}()},991:e=>{"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var r,a,i;if(Array.isArray(t)){if((r=t.length)!=n.length)return!1;for(a=r;0!=a--;)if(!e(t[a],n[a]))return!1;return!0}if(t instanceof Map&&n instanceof Map){if(t.size!==n.size)return!1;for(a of t.entries())if(!n.has(a[0]))return!1;for(a of t.entries())if(!e(a[1],n.get(a[0])))return!1;return!0}if(t instanceof Set&&n instanceof Set){if(t.size!==n.size)return!1;for(a of t.entries())if(!n.has(a[0]))return!1;return!0}if(ArrayBuffer.isView(t)&&ArrayBuffer.isView(n)){if((r=t.length)!=n.length)return!1;for(a=r;0!=a--;)if(t[a]!==n[a])return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((r=(i=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(a=r;0!=a--;)if(!Object.prototype.hasOwnProperty.call(n,i[a]))return!1;for(a=r;0!=a--;){var o=i[a];if(!e(t[o],n[o]))return!1}return!0}return t!=t&&n!=n}},252:e=>{"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var r,a,i;if(Array.isArray(t)){if((r=t.length)!=n.length)return!1;for(a=r;0!=a--;)if(!e(t[a],n[a]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((r=(i=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(a=r;0!=a--;)if(!Object.prototype.hasOwnProperty.call(n,i[a]))return!1;for(a=r;0!=a--;){var o=i[a];if(!("_owner"===o&&t.$$typeof||e(t[o],n[o])))return!1}return!0}return t!=t&&n!=n}},281:e=>{e.exports=function(e){var t=function(n,r,a){var i=n.splice(0,50);a=(a=a||[]).concat(e.add(i)),n.length>0?setTimeout((function(){t(n,r,a)}),1):(e.update(),r(a))};return t}},332:e=>{e.exports=function(e){return e.handlers.filterStart=e.handlers.filterStart||[],e.handlers.filterComplete=e.handlers.filterComplete||[],function(t){if(e.trigger("filterStart"),e.i=1,e.reset.filter(),void 0===t)e.filtered=!1;else{e.filtered=!0;for(var n=e.items,r=0,a=n.length;r<a;r++){var i=n[r];t(i)?i.filtered=!0:i.filtered=!1}}return e.update(),e.trigger("filterComplete"),e.visibleItems}}},916:(e,t,n)=>{n(650);var r=n(744),a=n(841),i=n(631),o=n(209),s=n(294);e.exports=function(e,t){t=a({location:0,distance:100,threshold:.4,multiSearch:!0,searchClass:"fuzzy-search"},t=t||{});var n={search:function(r,a){for(var i=t.multiSearch?r.replace(/ +$/,"").split(/ +/):[r],o=0,s=e.items.length;o<s;o++)n.item(e.items[o],a,i)},item:function(e,t,r){for(var a=!0,i=0;i<r.length;i++){for(var o=!1,s=0,l=t.length;s<l;s++)n.values(e.values(),t[s],r[i])&&(o=!0);o||(a=!1)}e.found=a},values:function(e,n,r){if(e.hasOwnProperty(n)){var a=i(e[n]).toLowerCase();if(s(a,r,t))return!0}return!1}};return r.bind(o(e.listContainer,t.searchClass),"keyup",e.utils.events.debounce((function(t){var r=t.target||t.srcElement;e.search(r.value,n.search)}),e.searchDelay)),function(t,r){e.search(t,r,n.search)}}},709:(e,t,n)=>{var r=n(915),a=n(209),i=n(841),o=n(191),s=n(744),l=n(631),c=n(650),u=n(961),d=n(63);e.exports=function(e,t,f){var m,p=this,h=n(266)(p),g=n(281)(p),v=n(101)(p);m={start:function(){p.listClass="list",p.searchClass="search",p.sortClass="sort",p.page=1e4,p.i=1,p.items=[],p.visibleItems=[],p.matchingItems=[],p.searched=!1,p.filtered=!1,p.searchColumns=void 0,p.searchDelay=0,p.handlers={updated:[]},p.valueNames=[],p.utils={getByClass:a,extend:i,indexOf:o,events:s,toString:l,naturalSort:r,classes:c,getAttribute:u,toArray:d},p.utils.extend(p,t),p.listContainer="string"==typeof e?document.getElementById(e):e,p.listContainer&&(p.list=a(p.listContainer,p.listClass,!0),p.parse=n(607)(p),p.templater=n(269)(p),p.search=n(108)(p),p.filter=n(332)(p),p.sort=n(771)(p),p.fuzzySearch=n(916)(p,t.fuzzySearch),this.handlers(),this.items(),this.pagination(),p.update())},handlers:function(){for(var e in p.handlers)p[e]&&p.handlers.hasOwnProperty(e)&&p.on(e,p[e])},items:function(){p.parse(p.list),void 0!==f&&p.add(f)},pagination:function(){if(void 0!==t.pagination){!0===t.pagination&&(t.pagination=[{}]),void 0===t.pagination[0]&&(t.pagination=[t.pagination]);for(var e=0,n=t.pagination.length;e<n;e++)v(t.pagination[e])}}},this.reIndex=function(){p.items=[],p.visibleItems=[],p.matchingItems=[],p.searched=!1,p.filtered=!1,p.parse(p.list)},this.toJSON=function(){for(var e=[],t=0,n=p.items.length;t<n;t++)e.push(p.items[t].values());return e},this.add=function(e,t){if(0!==e.length){if(!t){var n=[],r=!1;void 0===e[0]&&(e=[e]);for(var a=0,i=e.length;a<i;a++){var o;r=p.items.length>p.page,o=new h(e[a],void 0,r),p.items.push(o),n.push(o)}return p.update(),n}g(e.slice(0),t)}},this.show=function(e,t){return this.i=e,this.page=t,p.update(),p},this.remove=function(e,t,n){for(var r=0,a=0,i=p.items.length;a<i;a++)p.items[a].values()[e]==t&&(p.templater.remove(p.items[a],n),p.items.splice(a,1),i--,a--,r++);return p.update(),r},this.get=function(e,t){for(var n=[],r=0,a=p.items.length;r<a;r++){var i=p.items[r];i.values()[e]==t&&n.push(i)}return n},this.size=function(){return p.items.length},this.clear=function(){return p.templater.clear(),p.items=[],p},this.on=function(e,t){return p.handlers[e].push(t),p},this.off=function(e,t){var n=p.handlers[e],r=o(n,t);return r>-1&&n.splice(r,1),p},this.trigger=function(e){for(var t=p.handlers[e].length;t--;)p.handlers[e][t](p);return p},this.reset={filter:function(){for(var e=p.items,t=e.length;t--;)e[t].filtered=!1;return p},search:function(){for(var e=p.items,t=e.length;t--;)e[t].found=!1;return p}},this.update=function(){var e=p.items,t=e.length;p.visibleItems=[],p.matchingItems=[],p.templater.clear();for(var n=0;n<t;n++)e[n].matching()&&p.matchingItems.length+1>=p.i&&p.visibleItems.length<p.page?(e[n].show(),p.visibleItems.push(e[n]),p.matchingItems.push(e[n])):e[n].matching()?(p.matchingItems.push(e[n]),e[n].hide()):e[n].hide();return p.trigger("updated"),p},m.start()}},266:e=>{e.exports=function(e){return function(t,n,r){var a=this;this._values={},this.found=!1,this.filtered=!1,this.values=function(t,n){if(void 0===t)return a._values;for(var r in t)a._values[r]=t[r];!0!==n&&e.templater.set(a,a.values())},this.show=function(){e.templater.show(a)},this.hide=function(){e.templater.hide(a)},this.matching=function(){return e.filtered&&e.searched&&a.found&&a.filtered||e.filtered&&!e.searched&&a.filtered||!e.filtered&&e.searched&&a.found||!e.filtered&&!e.searched},this.visible=function(){return!(!a.elm||a.elm.parentNode!=e.list)},function(t,n,r){if(void 0===n)r?a.values(t,r):a.values(t);else{a.elm=n;var i=e.templater.get(a,t);a.values(i)}}(t,n,r)}}},101:(e,t,n)=>{var r=n(650),a=n(744),i=n(709);e.exports=function(e){var t=!1,n=function(n,a){if(e.page<1)return e.listContainer.style.display="none",void(t=!0);t&&(e.listContainer.style.display="block");var i,s=e.matchingItems.length,l=e.i,c=e.page,u=Math.ceil(s/c),d=Math.ceil(l/c),f=a.innerWindow||2,m=a.left||a.outerWindow||0,p=a.right||a.outerWindow||0;p=u-p,n.clear();for(var h=1;h<=u;h++){var g=d===h?"active":"";o.number(h,m,p,d,f)?(i=n.add({page:h,dotted:!1})[0],g&&r(i.elm).add(g),i.elm.firstChild.setAttribute("data-i",h),i.elm.firstChild.setAttribute("data-page",c)):o.dotted(n,h,m,p,d,f,n.size())&&(i=n.add({page:"...",dotted:!0})[0],r(i.elm).add("disabled"))}},o={number:function(e,t,n,r,a){return this.left(e,t)||this.right(e,n)||this.innerWindow(e,r,a)},left:function(e,t){return e<=t},right:function(e,t){return e>t},innerWindow:function(e,t,n){return e>=t-n&&e<=t+n},dotted:function(e,t,n,r,a,i,o){return this.dottedLeft(e,t,n,r,a,i)||this.dottedRight(e,t,n,r,a,i,o)},dottedLeft:function(e,t,n,r,a,i){return t==n+1&&!this.innerWindow(t,a,i)&&!this.right(t,r)},dottedRight:function(e,t,n,r,a,i,o){return!e.items[o-1].values().dotted&&t==r&&!this.innerWindow(t,a,i)&&!this.right(t,r)}};return function(t){var r=new i(e.listContainer.id,{listClass:t.paginationClass||"pagination",item:t.item||"<li><a class='page' href='#'></a></li>",valueNames:["page","dotted"],searchClass:"pagination-search-that-is-not-supposed-to-exist",sortClass:"pagination-sort-that-is-not-supposed-to-exist"});a.bind(r.listContainer,"click",(function(t){var n=t.target||t.srcElement,r=e.utils.getAttribute(n,"data-page"),a=e.utils.getAttribute(n,"data-i");a&&e.show((a-1)*r+1,r)})),e.on("updated",(function(){n(r,t)})),n(r,t)}}},607:(e,t,n)=>{e.exports=function(e){var t=n(266)(e),r=function(n,r){for(var a=0,i=n.length;a<i;a++)e.items.push(new t(r,n[a]))},a=function(t,n){var i=t.splice(0,50);r(i,n),t.length>0?setTimeout((function(){a(t,n)}),1):(e.update(),e.trigger("parseComplete"))};return e.handlers.parseComplete=e.handlers.parseComplete||[],function(){var t=function(e){for(var t=e.childNodes,n=[],r=0,a=t.length;r<a;r++)void 0===t[r].data&&n.push(t[r]);return n}(e.list),n=e.valueNames;e.indexAsync?a(t,n):r(t,n)}}},108:e=>{e.exports=function(e){var t,n,r,a={resetList:function(){e.i=1,e.templater.clear(),r=void 0},setOptions:function(e){2==e.length&&e[1]instanceof Array?t=e[1]:2==e.length&&"function"==typeof e[1]?(t=void 0,r=e[1]):3==e.length?(t=e[1],r=e[2]):t=void 0},setColumns:function(){0!==e.items.length&&void 0===t&&(t=void 0===e.searchColumns?a.toArray(e.items[0].values()):e.searchColumns)},setSearchString:function(t){t=(t=e.utils.toString(t).toLowerCase()).replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),n=t},toArray:function(e){var t=[];for(var n in e)t.push(n);return t}},i=function(i){return e.trigger("searchStart"),a.resetList(),a.setSearchString(i),a.setOptions(arguments),a.setColumns(),""===n?(e.reset.search(),e.searched=!1):(e.searched=!0,r?r(n,t):function(){for(var r,a=[],i=n;null!==(r=i.match(/"([^"]+)"/));)a.push(r[1]),i=i.substring(0,r.index)+i.substring(r.index+r[0].length);(i=i.trim()).length&&(a=a.concat(i.split(/\s+/)));for(var o=0,s=e.items.length;o<s;o++){var l=e.items[o];if(l.found=!1,a.length){for(var c=0,u=a.length;c<u;c++){for(var d=!1,f=0,m=t.length;f<m;f++){var p=l.values(),h=t[f];if(p.hasOwnProperty(h)&&void 0!==p[h]&&null!==p[h]&&-1!==("string"!=typeof p[h]?p[h].toString():p[h]).toLowerCase().indexOf(a[c])){d=!0;break}}if(!d)break}l.found=d}}}()),e.update(),e.trigger("searchComplete"),e.visibleItems};return e.handlers.searchStart=e.handlers.searchStart||[],e.handlers.searchComplete=e.handlers.searchComplete||[],e.utils.events.bind(e.utils.getByClass(e.listContainer,e.searchClass),"keyup",e.utils.events.debounce((function(t){var n=t.target||t.srcElement;""===n.value&&!e.searched||i(n.value)}),e.searchDelay)),e.utils.events.bind(e.utils.getByClass(e.listContainer,e.searchClass),"input",(function(e){""===(e.target||e.srcElement).value&&i("")})),i}},771:e=>{e.exports=function(e){var t={els:void 0,clear:function(){for(var n=0,r=t.els.length;n<r;n++)e.utils.classes(t.els[n]).remove("asc"),e.utils.classes(t.els[n]).remove("desc")},getOrder:function(t){var n=e.utils.getAttribute(t,"data-order");return"asc"==n||"desc"==n?n:e.utils.classes(t).has("desc")?"asc":e.utils.classes(t).has("asc")?"desc":"asc"},getInSensitive:function(t,n){var r=e.utils.getAttribute(t,"data-insensitive");n.insensitive="false"!==r},setOrder:function(n){for(var r=0,a=t.els.length;r<a;r++){var i=t.els[r];if(e.utils.getAttribute(i,"data-sort")===n.valueName){var o=e.utils.getAttribute(i,"data-order");"asc"==o||"desc"==o?o==n.order&&e.utils.classes(i).add(n.order):e.utils.classes(i).add(n.order)}}}},n=function(){e.trigger("sortStart");var n={},r=arguments[0].currentTarget||arguments[0].srcElement||void 0;r?(n.valueName=e.utils.getAttribute(r,"data-sort"),t.getInSensitive(r,n),n.order=t.getOrder(r)):((n=arguments[1]||n).valueName=arguments[0],n.order=n.order||"asc",n.insensitive=void 0===n.insensitive||n.insensitive),t.clear(),t.setOrder(n);var a,i=n.sortFunction||e.sortFunction||null,o="desc"===n.order?-1:1;a=i?function(e,t){return i(e,t,n)*o}:function(t,r){var a=e.utils.naturalSort;return a.alphabet=e.alphabet||n.alphabet||void 0,!a.alphabet&&n.insensitive&&(a=e.utils.naturalSort.caseInsensitive),a(t.values()[n.valueName],r.values()[n.valueName])*o},e.items.sort(a),e.update(),e.trigger("sortComplete")};return e.handlers.sortStart=e.handlers.sortStart||[],e.handlers.sortComplete=e.handlers.sortComplete||[],t.els=e.utils.getByClass(e.listContainer,e.sortClass),e.utils.events.bind(t.els,"click",n),e.on("searchStart",t.clear),e.on("filterStart",t.clear),n}},269:e=>{var t=function(e){var t,n=this,r=function(e){if("string"==typeof e){if(/<tr[\s>]/g.exec(e)){var t=document.createElement("tbody");return t.innerHTML=e,t.firstElementChild}if(-1!==e.indexOf("<")){var n=document.createElement("div");return n.innerHTML=e,n.firstElementChild}}},a=function(t,n,r){var a=void 0,i=function(t){for(var n=0,r=e.valueNames.length;n<r;n++){var a=e.valueNames[n];if(a.data){for(var i=a.data,o=0,s=i.length;o<s;o++)if(i[o]===t)return{data:t}}else{if(a.attr&&a.name&&a.name==t)return a;if(a===t)return t}}}(n);i&&(i.data?t.elm.setAttribute("data-"+i.data,r):i.attr&&i.name?(a=e.utils.getByClass(t.elm,i.name,!0))&&a.setAttribute(i.attr,r):(a=e.utils.getByClass(t.elm,i,!0))&&(a.innerHTML=r))};this.get=function(t,r){n.create(t);for(var a={},i=0,o=r.length;i<o;i++){var s=void 0,l=r[i];if(l.data)for(var c=0,u=l.data.length;c<u;c++)a[l.data[c]]=e.utils.getAttribute(t.elm,"data-"+l.data[c]);else l.attr&&l.name?(s=e.utils.getByClass(t.elm,l.name,!0),a[l.name]=s?e.utils.getAttribute(s,l.attr):""):(s=e.utils.getByClass(t.elm,l,!0),a[l]=s?s.innerHTML:"")}return a},this.set=function(e,t){if(!n.create(e))for(var r in t)t.hasOwnProperty(r)&&a(e,r,t[r])},this.create=function(e){return void 0===e.elm&&(e.elm=t(e.values()),n.set(e,e.values()),!0)},this.remove=function(t){t.elm.parentNode===e.list&&e.list.removeChild(t.elm)},this.show=function(t){n.create(t),e.list.appendChild(t.elm)},this.hide=function(t){void 0!==t.elm&&t.elm.parentNode===e.list&&e.list.removeChild(t.elm)},this.clear=function(){if(e.list.hasChildNodes())for(;e.list.childNodes.length>=1;)e.list.removeChild(e.list.firstChild)},function(){var n;if("function"!=typeof e.item){if(!(n="string"==typeof e.item?-1===e.item.indexOf("<")?document.getElementById(e.item):r(e.item):function(){for(var t=e.list.childNodes,n=0,r=t.length;n<r;n++)if(void 0===t[n].data)return t[n].cloneNode(!0)}()))throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");n=function(t,n){var r=t.cloneNode(!0);r.removeAttribute("id");for(var a=0,i=n.length;a<i;a++){var o=void 0,s=n[a];if(s.data)for(var l=0,c=s.data.length;l<c;l++)r.setAttribute("data-"+s.data[l],"");else s.attr&&s.name?(o=e.utils.getByClass(r,s.name,!0))&&o.setAttribute(s.attr,""):(o=e.utils.getByClass(r,s,!0))&&(o.innerHTML="")}return r}(n,e.valueNames),t=function(){return n.cloneNode(!0)}}else t=function(t){var n=e.item(t);return r(n)}}()};e.exports=function(e){return new t(e)}},650:(e,t,n)=>{var r=n(191),a=/\s+/;function i(e){if(!e||!e.nodeType)throw new Error("A DOM element reference is required");this.el=e,this.list=e.classList}Object.prototype.toString,e.exports=function(e){return new i(e)},i.prototype.add=function(e){if(this.list)return this.list.add(e),this;var t=this.array();return~r(t,e)||t.push(e),this.el.className=t.join(" "),this},i.prototype.remove=function(e){if(this.list)return this.list.remove(e),this;var t=this.array(),n=r(t,e);return~n&&t.splice(n,1),this.el.className=t.join(" "),this},i.prototype.toggle=function(e,t){return this.list?(void 0!==t?t!==this.list.toggle(e,t)&&this.list.toggle(e):this.list.toggle(e),this):(void 0!==t?t?this.add(e):this.remove(e):this.has(e)?this.remove(e):this.add(e),this)},i.prototype.array=function(){var e=(this.el.getAttribute("class")||"").replace(/^\s+|\s+$/g,"").split(a);return""===e[0]&&e.shift(),e},i.prototype.has=i.prototype.contains=function(e){return this.list?this.list.contains(e):!!~r(this.array(),e)}},744:(e,t,n)=>{var r=window.addEventListener?"addEventListener":"attachEvent",a=window.removeEventListener?"removeEventListener":"detachEvent",i="addEventListener"!==r?"on":"",o=n(63);t.bind=function(e,t,n,a){for(var s=0,l=(e=o(e)).length;s<l;s++)e[s][r](i+t,n,a||!1)},t.unbind=function(e,t,n,r){for(var s=0,l=(e=o(e)).length;s<l;s++)e[s][a](i+t,n,r||!1)},t.debounce=function(e,t,n){var r;return t?function(){var a=this,i=arguments,o=n&&!r;clearTimeout(r),r=setTimeout((function(){r=null,n||e.apply(a,i)}),t),o&&e.apply(a,i)}:e}},841:e=>{e.exports=function(e){for(var t,n=Array.prototype.slice.call(arguments,1),r=0;t=n[r];r++)if(t)for(var a in t)e[a]=t[a];return e}},294:e=>{e.exports=function(e,t,n){var r=n.location||0,a=n.distance||100,i=n.threshold||.4;if(t===e)return!0;if(t.length>32)return!1;var o=r,s=function(){var e,n={};for(e=0;e<t.length;e++)n[t.charAt(e)]=0;for(e=0;e<t.length;e++)n[t.charAt(e)]|=1<<t.length-e-1;return n}();function l(e,n){var r=e/t.length,i=Math.abs(o-n);return a?r+i/a:i?1:r}var c=i,u=e.indexOf(t,o);-1!=u&&(c=Math.min(l(0,u),c),-1!=(u=e.lastIndexOf(t,o+t.length))&&(c=Math.min(l(0,u),c)));var d,f,m=1<<t.length-1;u=-1;for(var p,h=t.length+e.length,g=0;g<t.length;g++){for(d=0,f=h;d<f;)l(g,o+f)<=c?d=f:h=f,f=Math.floor((h-d)/2+d);h=f;var v=Math.max(1,o-f+1),b=Math.min(o+f,e.length)+t.length,y=Array(b+2);y[b+1]=(1<<g)-1;for(var w=b;w>=v;w--){var x=s[e.charAt(w-1)];if(y[w]=0===g?(y[w+1]<<1|1)&x:(y[w+1]<<1|1)&x|(p[w+1]|p[w])<<1|1|p[w+1],y[w]&m){var k=l(g,w-1);if(k<=c){if(c=k,!((u=w-1)>o))break;v=Math.max(1,2*o-u)}}}if(l(g+1,o)>c)break;p=y}return!(u<0)}},961:e=>{e.exports=function(e,t){var n=e.getAttribute&&e.getAttribute(t)||null;if(!n)for(var r=e.attributes,a=r.length,i=0;i<a;i++)void 0!==r[i]&&r[i].nodeName===t&&(n=r[i].nodeValue);return n}},209:e=>{e.exports=function(e,t,n,r){return(r=r||{}).test&&r.getElementsByClassName||!r.test&&document.getElementsByClassName?function(e,t,n){return n?e.getElementsByClassName(t)[0]:e.getElementsByClassName(t)}(e,t,n):r.test&&r.querySelector||!r.test&&document.querySelector?function(e,t,n){return t="."+t,n?e.querySelector(t):e.querySelectorAll(t)}(e,t,n):function(e,t,n){for(var r=[],a=e.getElementsByTagName("*"),i=a.length,o=new RegExp("(^|\\s)"+t+"(\\s|$)"),s=0,l=0;s<i;s++)if(o.test(a[s].className)){if(n)return a[s];r[l]=a[s],l++}return r}(e,t,n)}},191:e=>{var t=[].indexOf;e.exports=function(e,n){if(t)return e.indexOf(n);for(var r=0,a=e.length;r<a;++r)if(e[r]===n)return r;return-1}},63:e=>{e.exports=function(e){if(void 0===e)return[];if(null===e)return[null];if(e===window)return[window];if("string"==typeof e)return[e];if(function(e){return"[object Array]"===Object.prototype.toString.call(e)}(e))return e;if("number"!=typeof e.length)return[e];if("function"==typeof e&&e instanceof Function)return[e];for(var t=[],n=0,r=e.length;n<r;n++)(Object.prototype.hasOwnProperty.call(e,n)||n in e)&&t.push(e[n]);return t.length?t:[]}},631:e=>{e.exports=function(e){return(e=null===(e=void 0===e?"":e)?"":e).toString()}},555:(e,t,n)=>{var r=n(178),a=/\s+/g,i=/%[\dA-F]{2}/g,o=/"/g;function s(e){switch(e){case"%20":return" ";case"%3D":return"=";case"%3A":return":";case"%2F":return"/";default:return e.toLowerCase()}}function l(e){if("string"!=typeof e)throw new TypeError("Expected a string, but received "+typeof e);var t,n;return 65279===e.charCodeAt(0)&&(e=e.slice(1)),"data:image/svg+xml,"+function(e){return encodeURIComponent(e).replace(i,s)}((n=e,t=n.trim().replace(a," "),Object.keys(r).forEach((function(e){r[e].test(t)&&(t=t.replace(r[e],e))})),t).replace(o,"'"))}l.toSrcset=function(e){return l(e).replace(/ /g,"%20")},e.exports=l},178:e=>{e.exports={aqua:/#00ffff(ff)?(?!\w)|#0ff(f)?(?!\w)/gi,azure:/#f0ffff(ff)?(?!\w)/gi,beige:/#f5f5dc(ff)?(?!\w)/gi,bisque:/#ffe4c4(ff)?(?!\w)/gi,black:/#000000(ff)?(?!\w)|#000(f)?(?!\w)/gi,blue:/#0000ff(ff)?(?!\w)|#00f(f)?(?!\w)/gi,brown:/#a52a2a(ff)?(?!\w)/gi,coral:/#ff7f50(ff)?(?!\w)/gi,cornsilk:/#fff8dc(ff)?(?!\w)/gi,crimson:/#dc143c(ff)?(?!\w)/gi,cyan:/#00ffff(ff)?(?!\w)|#0ff(f)?(?!\w)/gi,darkblue:/#00008b(ff)?(?!\w)/gi,darkcyan:/#008b8b(ff)?(?!\w)/gi,darkgrey:/#a9a9a9(ff)?(?!\w)/gi,darkred:/#8b0000(ff)?(?!\w)/gi,deeppink:/#ff1493(ff)?(?!\w)/gi,dimgrey:/#696969(ff)?(?!\w)/gi,gold:/#ffd700(ff)?(?!\w)/gi,green:/#008000(ff)?(?!\w)/gi,grey:/#808080(ff)?(?!\w)/gi,honeydew:/#f0fff0(ff)?(?!\w)/gi,hotpink:/#ff69b4(ff)?(?!\w)/gi,indigo:/#4b0082(ff)?(?!\w)/gi,ivory:/#fffff0(ff)?(?!\w)/gi,khaki:/#f0e68c(ff)?(?!\w)/gi,lavender:/#e6e6fa(ff)?(?!\w)/gi,lime:/#00ff00(ff)?(?!\w)|#0f0(f)?(?!\w)/gi,linen:/#faf0e6(ff)?(?!\w)/gi,maroon:/#800000(ff)?(?!\w)/gi,moccasin:/#ffe4b5(ff)?(?!\w)/gi,navy:/#000080(ff)?(?!\w)/gi,oldlace:/#fdf5e6(ff)?(?!\w)/gi,olive:/#808000(ff)?(?!\w)/gi,orange:/#ffa500(ff)?(?!\w)/gi,orchid:/#da70d6(ff)?(?!\w)/gi,peru:/#cd853f(ff)?(?!\w)/gi,pink:/#ffc0cb(ff)?(?!\w)/gi,plum:/#dda0dd(ff)?(?!\w)/gi,purple:/#800080(ff)?(?!\w)/gi,red:/#ff0000(ff)?(?!\w)|#f00(f)?(?!\w)/gi,salmon:/#fa8072(ff)?(?!\w)/gi,seagreen:/#2e8b57(ff)?(?!\w)/gi,seashell:/#fff5ee(ff)?(?!\w)/gi,sienna:/#a0522d(ff)?(?!\w)/gi,silver:/#c0c0c0(ff)?(?!\w)/gi,skyblue:/#87ceeb(ff)?(?!\w)/gi,snow:/#fffafa(ff)?(?!\w)/gi,tan:/#d2b48c(ff)?(?!\w)/gi,teal:/#008080(ff)?(?!\w)/gi,thistle:/#d8bfd8(ff)?(?!\w)/gi,tomato:/#ff6347(ff)?(?!\w)/gi,violet:/#ee82ee(ff)?(?!\w)/gi,wheat:/#f5deb3(ff)?(?!\w)/gi,white:/#ffffff(ff)?(?!\w)|#fff(f)?(?!\w)/gi}},915:e=>{"use strict";var t,n,r=0;function a(e){return e>=48&&e<=57}function i(e,t){for(var i=(e+="").length,o=(t+="").length,s=0,l=0;s<i&&l<o;){var c=e.charCodeAt(s),u=t.charCodeAt(l);if(a(c)){if(!a(u))return c-u;for(var d=s,f=l;48===c&&++d<i;)c=e.charCodeAt(d);for(;48===u&&++f<o;)u=t.charCodeAt(f);for(var m=d,p=f;m<i&&a(e.charCodeAt(m));)++m;for(;p<o&&a(t.charCodeAt(p));)++p;var h=m-d-p+f;if(h)return h;for(;d<m;)if(h=e.charCodeAt(d++)-t.charCodeAt(f++))return h;s=m,l=p}else{if(c!==u)return c<r&&u<r&&-1!==n[c]&&-1!==n[u]?n[c]-n[u]:c-u;++s,++l}}return s>=i&&l<o&&i>=o?-1:l>=o&&s<i&&o>=i?1:i-o}i.caseInsensitive=i.i=function(e,t){return i((""+e).toLowerCase(),(""+t).toLowerCase())},Object.defineProperties(i,{alphabet:{get:function(){return t},set:function(e){n=[];var a=0;if(t=e)for(;a<t.length;a++)n[t.charCodeAt(a)]=a;for(r=n.length,a=0;a<r;a++)void 0===n[a]&&(n[a]=-1)}}}),e.exports=i}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.React,t=window.lodash,r=window.wp.i18n,a=window.wp.element,i=window.wp.domReady;var o=n.n(i);const s=window.wp.components,l=window.wp.blockLibrary,c=window.wp.data;window.wp.blockEditor,n(991);const u=window.wp.apiFetch;var d=n.n(u);const f={headers:{"Content-Type":"application/json"},method:"GET"};n(856);const m=window.wp.url,p=window.wp.primitives,h=((0,e.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(p.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})),(0,e.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(p.Path,{d:"M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"})),(0,e.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(p.Path,{d:"M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"})),window.wp.hooks,"Mobile"),g="Tablet",v="Desktop",b={},y=getComputedStyle(document.documentElement);b[h]=y.getPropertyValue("--wp--custom--breakpoint--sm")||"576px",b[g]=y.getPropertyValue("--wp--custom--breakpoint--md")||"768px",b[v]=y.getPropertyValue("--wp--custom--breakpoint--lg")||"1024px";const w={};Object.keys(b).map((e=>{w[e]=e===h?"":`@media (min-width: ${b[e]})`})),(0,r.__)("Mobile","block-enhancements"),w[h],(0,r.__)("Tablet","block-enhancements"),w[g],(0,r.__)("Desktop","block-enhancements"),w[v];const x=(e,t="log")=>{e&&"development"===window?.BBLOG?.environmentType&&(["log","info","warn","error","debug","dir","table"].includes(t)?console[t](e):console.log(e))};const k={mouseState:"normal"},_=(0,c.createReduxStore)("block-enhancements/mousestate",{selectors:{getMouseState(e){var t;return null!==(t=e?.mouseState)&&void 0!==t?t:"normal"}},actions:{setMouseState:e=>({type:"SET_HOVER_STATE",payload:e})},reducer:(e=k,t)=>"SET_HOVER_STATE"===t.type?{...e,mouseState:t.payload}:e});(0,c.register)(_),(0,r.__)("Normal","block-enhancements"),(0,r.__)("Hover","block-enhancements"),n(555);class E{constructor(e=""){e||(e=window.location.href),this.parsedURL=new URL(e)}get(e,t=null){return this.parsedURL.searchParams.get(e)||t}set(e,t,n=!0){this.parsedURL.searchParams.set(e,t),n&&history.pushState&&history.pushState({},null,this.parsedURL.href)}delete(e,t=!0){this.parsedURL.searchParams.delete(e),t&&history.pushState&&history.pushState({},null,this.parsedURL.href)}reload(){history?.go?history.go():window.location.reload()}getHref(){return this.parsedURL.href}}const C=window.wp.coreData,S=window.wp.blocks,T=(e,t,n)=>{var r;const i=(null!==(r=t[e]?.availableBlocks)&&void 0!==r?r:[]).map((({name:e})=>e)).join("|");return(0,a.useMemo)((()=>{if(!n?.length)return[];const e=new RegExp(i),t=n.filter((({name:t})=>{const n=t.match(e);return n&&(n[0]===t||!n[0])}));return t.sort((({title:e},{title:t})=>e>t?1:e<t?-1:0)),t}),[i,n])},A=(0,a.createContext)();function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},N.apply(this,arguments)}function O(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}var L=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,R=O((function(e){return L.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),M=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),I=Math.abs,D=String.fromCharCode,P=Object.assign;function z(e){return e.trim()}function B(e,t,n){return e.replace(t,n)}function H(e,t){return e.indexOf(t)}function U(e,t){return 0|e.charCodeAt(t)}function F(e,t,n){return e.slice(t,n)}function j(e){return e.length}function $(e){return e.length}function W(e,t){return t.push(e),e}var G=1,V=1,q=0,Y=0,X=0,Z="";function K(e,t,n,r,a,i,o){return{value:e,root:t,parent:n,type:r,props:a,children:i,line:G,column:V,length:o,return:""}}function J(e,t){return P(K("",null,null,"",null,null,0),e,{length:-e.length},t)}function Q(){return X=Y>0?U(Z,--Y):0,V--,10===X&&(V=1,G--),X}function ee(){return X=Y<q?U(Z,Y++):0,V++,10===X&&(V=1,G++),X}function te(){return U(Z,Y)}function ne(){return Y}function re(e,t){return F(Z,e,t)}function ae(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ie(e){return G=V=1,q=j(Z=e),Y=0,[]}function oe(e){return Z="",e}function se(e){return z(re(Y-1,ue(91===e?e+2:40===e?e+1:e)))}function le(e){for(;(X=te())&&X<33;)ee();return ae(e)>2||ae(X)>3?"":" "}function ce(e,t){for(;--t&&ee()&&!(X<48||X>102||X>57&&X<65||X>70&&X<97););return re(e,ne()+(t<6&&32==te()&&32==ee()))}function ue(e){for(;ee();)switch(X){case e:return Y;case 34:case 39:34!==e&&39!==e&&ue(X);break;case 40:41===e&&ue(e);break;case 92:ee()}return Y}function de(e,t){for(;ee()&&e+X!==57&&(e+X!==84||47!==te()););return"/*"+re(t,Y-1)+"*"+D(47===e?e:ee())}function fe(e){for(;!ae(te());)ee();return re(e,Y)}var me="-ms-",pe="-moz-",he="-webkit-",ge="comm",ve="rule",be="decl",ye="@keyframes";function we(e,t){for(var n="",r=$(e),a=0;a<r;a++)n+=t(e[a],a,e,t)||"";return n}function xe(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case be:return e.return=e.return||e.value;case ge:return"";case ye:return e.return=e.value+"{"+we(e.children,r)+"}";case ve:e.value=e.props.join(",")}return j(n=we(e.children,r))?e.return=e.value+"{"+n+"}":""}function ke(e){return oe(_e("",null,null,null,[""],e=ie(e),0,[0],e))}function _e(e,t,n,r,a,i,o,s,l){for(var c=0,u=0,d=o,f=0,m=0,p=0,h=1,g=1,v=1,b=0,y="",w=a,x=i,k=r,_=y;g;)switch(p=b,b=ee()){case 40:if(108!=p&&58==U(_,d-1)){-1!=H(_+=B(se(b),"&","&\f"),"&\f")&&(v=-1);break}case 34:case 39:case 91:_+=se(b);break;case 9:case 10:case 13:case 32:_+=le(p);break;case 92:_+=ce(ne()-1,7);continue;case 47:switch(te()){case 42:case 47:W(Ce(de(ee(),ne()),t,n),l);break;default:_+="/"}break;case 123*h:s[c++]=j(_)*v;case 125*h:case 59:case 0:switch(b){case 0:case 125:g=0;case 59+u:-1==v&&(_=B(_,/\f/g,"")),m>0&&j(_)-d&&W(m>32?Se(_+";",r,n,d-1):Se(B(_," ","")+";",r,n,d-2),l);break;case 59:_+=";";default:if(W(k=Ee(_,t,n,c,u,a,s,y,w=[],x=[],d),i),123===b)if(0===u)_e(_,t,k,k,w,i,d,s,x);else switch(99===f&&110===U(_,3)?100:f){case 100:case 108:case 109:case 115:_e(e,k,k,r&&W(Ee(e,k,k,0,0,a,s,y,a,w=[],d),x),a,x,d,s,r?w:x);break;default:_e(_,k,k,k,[""],x,0,s,x)}}c=u=m=0,h=v=1,y=_="",d=o;break;case 58:d=1+j(_),m=p;default:if(h<1)if(123==b)--h;else if(125==b&&0==h++&&125==Q())continue;switch(_+=D(b),b*h){case 38:v=u>0?1:(_+="\f",-1);break;case 44:s[c++]=(j(_)-1)*v,v=1;break;case 64:45===te()&&(_+=se(ee())),f=te(),u=d=j(y=_+=fe(ne())),b++;break;case 45:45===p&&2==j(_)&&(h=0)}}return i}function Ee(e,t,n,r,a,i,o,s,l,c,u){for(var d=a-1,f=0===a?i:[""],m=$(f),p=0,h=0,g=0;p<r;++p)for(var v=0,b=F(e,d+1,d=I(h=o[p])),y=e;v<m;++v)(y=z(h>0?f[v]+" "+b:B(b,/&\f/g,f[v])))&&(l[g++]=y);return K(e,t,n,0===a?ve:s,l,c,u)}function Ce(e,t,n){return K(e,t,n,ge,D(X),F(e,2,-2),0)}function Se(e,t,n,r){return K(e,t,n,be,F(e,0,r),F(e,r+1,-1),r)}var Te=function(e,t,n){for(var r=0,a=0;r=a,a=te(),38===r&&12===a&&(t[n]=1),!ae(a);)ee();return re(e,Y)},Ae=new WeakMap,Ne=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||Ae.get(n))&&!r){Ae.set(e,!0);for(var a=[],i=function(e,t){return oe(function(e,t){var n=-1,r=44;do{switch(ae(r)){case 0:38===r&&12===te()&&(t[n]=1),e[n]+=Te(Y-1,t,n);break;case 2:e[n]+=se(r);break;case 4:if(44===r){e[++n]=58===te()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=D(r)}}while(r=ee());return e}(ie(e),t))}(t,a),o=n.props,s=0,l=0;s<i.length;s++)for(var c=0;c<o.length;c++,l++)e.props[l]=a[s]?i[s].replace(/&\f/g,o[c]):o[c]+" "+i[s]}}},Oe=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function Le(e,t){switch(function(e,t){return 45^U(e,0)?(((t<<2^U(e,0))<<2^U(e,1))<<2^U(e,2))<<2^U(e,3):0}(e,t)){case 5103:return he+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return he+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return he+e+pe+e+me+e+e;case 6828:case 4268:return he+e+me+e+e;case 6165:return he+e+me+"flex-"+e+e;case 5187:return he+e+B(e,/(\w+).+(:[^]+)/,he+"box-$1$2"+me+"flex-$1$2")+e;case 5443:return he+e+me+"flex-item-"+B(e,/flex-|-self/,"")+e;case 4675:return he+e+me+"flex-line-pack"+B(e,/align-content|flex-|-self/,"")+e;case 5548:return he+e+me+B(e,"shrink","negative")+e;case 5292:return he+e+me+B(e,"basis","preferred-size")+e;case 6060:return he+"box-"+B(e,"-grow","")+he+e+me+B(e,"grow","positive")+e;case 4554:return he+B(e,/([^-])(transform)/g,"$1"+he+"$2")+e;case 6187:return B(B(B(e,/(zoom-|grab)/,he+"$1"),/(image-set)/,he+"$1"),e,"")+e;case 5495:case 3959:return B(e,/(image-set\([^]*)/,he+"$1$`$1");case 4968:return B(B(e,/(.+:)(flex-)?(.*)/,he+"box-pack:$3"+me+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+he+e+e;case 4095:case 3583:case 4068:case 2532:return B(e,/(.+)-inline(.+)/,he+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(j(e)-1-t>6)switch(U(e,t+1)){case 109:if(45!==U(e,t+4))break;case 102:return B(e,/(.+:)(.+)-([^]+)/,"$1"+he+"$2-$3$1"+pe+(108==U(e,t+3)?"$3":"$2-$3"))+e;case 115:return~H(e,"stretch")?Le(B(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==U(e,t+1))break;case 6444:switch(U(e,j(e)-3-(~H(e,"!important")&&10))){case 107:return B(e,":",":"+he)+e;case 101:return B(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+he+(45===U(e,14)?"inline-":"")+"box$3$1"+he+"$2$3$1"+me+"$2box$3")+e}break;case 5936:switch(U(e,t+11)){case 114:return he+e+me+B(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return he+e+me+B(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return he+e+me+B(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return he+e+me+e+e}return e}var Re=[function(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case be:e.return=Le(e.value,e.length);break;case ye:return we([J(e,{value:B(e.value,"@","@"+he)})],r);case ve:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return we([J(e,{props:[B(t,/:(read-\w+)/,":-moz-$1")]})],r);case"::placeholder":return we([J(e,{props:[B(t,/:(plac\w+)/,":"+he+"input-$1")]}),J(e,{props:[B(t,/:(plac\w+)/,":-moz-$1")]}),J(e,{props:[B(t,/:(plac\w+)/,me+"input-$1")]})],r)}return""}))}}],Me=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var r,a,i=e.stylisPlugins||Re,o={},s=[];r=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)o[t[n]]=!0;s.push(e)}));var l,c,u,d,f=[xe,(d=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&d(e)})],m=(c=[Ne,Oe].concat(i,f),u=$(c),function(e,t,n,r){for(var a="",i=0;i<u;i++)a+=c[i](e,t,n,r)||"";return a});a=function(e,t,n,r){l=n,we(ke(e?e+"{"+t.styles+"}":t.styles),m),r&&(p.inserted[t.name]=!0)};var p={key:t,sheet:new M({key:t,container:r,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:o,registered:{},insert:a};return p.sheet.hydrate(s),p},Ie={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},De=!!e.useInsertionEffect&&e.useInsertionEffect,Pe=De||function(e){return e()},ze=(De||e.useLayoutEffect,e.createContext("undefined"!=typeof HTMLElement?Me({key:"css"}):null));ze.Provider;var Be=e.createContext({}),He=function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)},Ue=/[A-Z]|^ms/g,Fe=/_EMO_([^_]+?)_([^]*?)_EMO_/g,je=function(e){return 45===e.charCodeAt(1)},$e=function(e){return null!=e&&"boolean"!=typeof e},We=O((function(e){return je(e)?e:e.replace(Ue,"-$&").toLowerCase()})),Ge=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(Fe,(function(e,t,n){return qe={name:t,styles:n,next:qe},t}))}return 1===Ie[e]||je(e)||"number"!=typeof t||0===t?t:t+"px"};function Ve(e,t,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return qe={name:n.name,styles:n.styles,next:qe},n.name;if(void 0!==n.styles){var r=n.next;if(void 0!==r)for(;void 0!==r;)qe={name:r.name,styles:r.styles,next:qe},r=r.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var a=0;a<n.length;a++)r+=Ve(e,t,n[a])+";";else for(var i in n){var o=n[i];if("object"!=typeof o)null!=t&&void 0!==t[o]?r+=i+"{"+t[o]+"}":$e(o)&&(r+=We(i)+":"+Ge(i,o)+";");else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=t&&void 0!==t[o[0]]){var s=Ve(e,t,o);switch(i){case"animation":case"animationName":r+=We(i)+":"+s+";";break;default:r+=i+"{"+s+"}"}}else for(var l=0;l<o.length;l++)$e(o[l])&&(r+=We(i)+":"+Ge(i,o[l])+";")}return r}(e,t,n);case"function":if(void 0!==e){var a=qe,i=n(e);return qe=a,Ve(e,t,i)}}if(null==t)return n;var o=t[n];return void 0!==o?o:n}var qe,Ye=/label:\s*([^\s;\n{]+)\s*(;|$)/g,Xe=R,Ze=function(e){return"theme"!==e},Ke=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Xe:Ze},Je=function(e,t,n){var r;if(t){var a=t.shouldForwardProp;r=e.__emotion_forwardProp&&a?function(t){return e.__emotion_forwardProp(t)&&a(t)}:a}return"function"!=typeof r&&n&&(r=e.__emotion_forwardProp),r},Qe=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return He(t,n,r),Pe((function(){return function(e,t,n){He(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+r:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}}(t,n,r)})),null},et=function t(n,r){var a,i,o=n.__emotion_real===n,s=o&&n.__emotion_base||n;void 0!==r&&(a=r.label,i=r.target);var l=Je(n,r,o),c=l||Ke(s),u=!c("as");return function(){var d=arguments,f=o&&void 0!==n.__emotion_styles?n.__emotion_styles.slice(0):[];if(void 0!==a&&f.push("label:"+a+";"),null==d[0]||void 0===d[0].raw)f.push.apply(f,d);else{f.push(d[0][0]);for(var m=d.length,p=1;p<m;p++)f.push(d[p],d[0][p])}var h,g=(h=function(t,n,r){var a,o,d,m,p=u&&t.as||s,h="",g=[],v=t;if(null==t.theme){for(var b in v={},t)v[b]=t[b];v.theme=e.useContext(Be)}"string"==typeof t.className?(a=n.registered,o=g,d=t.className,m="",d.split(" ").forEach((function(e){void 0!==a[e]?o.push(a[e]+";"):m+=e+" "})),h=m):null!=t.className&&(h=t.className+" ");var y=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,a="";qe=void 0;var i=e[0];null==i||void 0===i.raw?(r=!1,a+=Ve(n,t,i)):a+=i[0];for(var o=1;o<e.length;o++)a+=Ve(n,t,e[o]),r&&(a+=i[o]);Ye.lastIndex=0;for(var s,l="";null!==(s=Ye.exec(a));)l+="-"+s[1];var c=function(e){for(var t,n=0,r=0,a=e.length;a>=4;++r,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(a){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(a)+l;return{name:c,styles:a,next:qe}}(f.concat(g),n.registered,v);h+=n.key+"-"+y.name,void 0!==i&&(h+=" "+i);var w=u&&void 0===l?Ke(p):c,x={};for(var k in t)u&&"as"===k||w(k)&&(x[k]=t[k]);return x.className=h,x.ref=r,e.createElement(e.Fragment,null,e.createElement(Qe,{cache:n,serialized:y,isStringTag:"string"==typeof p}),e.createElement(p,x))},(0,e.forwardRef)((function(t,n){var r=(0,e.useContext)(ze);return h(t,r,n)})));return g.displayName=void 0!==a?a:"Styled("+("string"==typeof s?s:s.displayName||s.name||"Component")+")",g.defaultProps=n.defaultProps,g.__emotion_real=g,g.__emotion_base=s,g.__emotion_styles=f,g.__emotion_forwardProp=l,Object.defineProperty(g,"toString",{value:function(){return"."+i}}),g.withComponent=function(e,n){return t(e,N({},r,n,{shouldForwardProp:Je(g,n,!0)})).apply(void 0,f)},g}}.bind();function tt(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=tt(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){et[e]=et(e)})),et(s.BaseControl)`
  margin-bottom: 8px !important;

  &.is-bold {
    font-weight: 600;
  }

  &.h3 {
    font-size: 13px;
    font-weight: bold;
  }

  .components-base-control__field {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .components-base-control__label {
    margin-bottom: 0;
  }

  div.components-dropdown {
    min-height: 30px;
    margin-bottom: 0;
    border: 0;

    &:first-of-type {
      margin-left: 10px;
    }

    .components-button {
      min-width: 36px;
      height: 30px;

      &.has-icon {
        min-width: 48px;
      }
    }
  }
`,et.div`
  padding-bottom: 4px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;

  > * {
    margin-bottom: 8px !important;
  }

  .repeater-group__item__actions {
    display: flex;
    align-items: center;
    gap: 0.2em;

    > *:first-of-type {
      margin-right: auto;
    }
  }
`;const nt=function(){for(var e,t,n=0,r="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=tt(e))&&(r&&(r+=" "),r+=t);return r},rt=et.div`
  box-sizing: border-box;
  width: 100%;

  .group-control__body {
    gap: 4px;

    > * {
      max-width: 100%;
    }
  }

  &.is-2-columns {
    .group-control__body {
      > * {
        flex-basis: calc(50% - 4px);

        &:nth-of-type(n + 3) {
          margin-top: 8px !important;
        }
      }
    }
  }

  &.is-3-columns {
    .group-control__body {
      > * {
        flex-basis: calc(33.33333% - 4px);

        &:nth-of-type(n + 4) {
          margin-top: 8px !important;
        }
      }
    }
  }

  &.is-4-columns {
    .group-control__body {
      > * {
        flex-basis: calc(25% - 4px);

        &:nth-of-type(n + 5) {
          margin-top: 8px !important;
        }
      }
    }
  }
`,at=et(s.Flex)`
  padding-bottom: 8px;

  .label-control {
    margin-bottom: 0 !important;
  }
`,it=et(s.Flex)`
  flex-wrap: wrap;
  width: auto;
  gap: 4px;

  > * {
    flex: 1 0 auto;
    margin: 0 !important;
  }
`,ot=(0,e.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(p.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})),st=(0,e.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(p.Path,{d:"M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"}));function lt({isLinked:t,...n}){const a=t?(0,r.__)("Unlink Sides","block-enhancements"):(0,r.__)("Link Sides","block-enhancements");return(0,e.createElement)(s.Tooltip,{text:a},(0,e.createElement)("span",null,(0,e.createElement)(s.Button,{...n,className:"component-group-control__linked-button",variant:t?"primary":"secondary",size:"small",icon:t?ot:st,iconSize:16,"aria-label":a})))}var ct=n(252),ut=n.n(ct);const dt=({values:e,fields:n})=>{const r=n.map((({name:t})=>{var n;return null!==(n=e[t])&&void 0!==n?n:void 0}));return(a=r.filter((e=>e))).sort(((e,n)=>(0,t.isObject)(e)?a.filter((t=>ut()(t,e))).length-a.filter((e=>ut()(e,n))).length:a.filter((t=>t===e)).length-a.filter((e=>e===n)).length)).pop();var a},ft=({values:t,fields:n,renderControl:r,onChange:i,normalizeValue:o})=>n.map((s=>{var l;const{name:c}=s;return(0,e.createElement)(a.Fragment,{key:`group-control-${c}`},r({value:null!==(l=t[c])&&void 0!==l?l:void 0,onChange:(u=c,e=>{e=o({side:u,value:e}),i({...t,[u]:e})}),fields:n,values:t,...s}));var u})),mt=({values:e,fields:t,renderControl:n,renderAllControl:r=null,onChange:a,normalizeValue:i,...o})=>(r||(r=n),r({value:dt({values:e,fields:t}),fields:t,values:e,onChange:n=>{n=i({side:"all",value:n});let r={...e};t.forEach((({name:e})=>{r={...r,[e]:n}})),a(r)},...o})),pt=({label:n,fields:r=[],values:i={},renderLabel:o=t.noop,renderControl:s=t.noop,onChange:l=t.noop,normalizeValue:c=(({side:e,value:t})=>t),isLinkedGroup:u=!0,getInitialLinkedState:d=t.noop,className:f,columns:m,...p})=>{const h={fields:r,values:i,renderControl:s,onChange:l,normalizeValue:c,...p},[g,v]=u?function(e){const[t,n]=(0,a.useState)(e);return(0,a.useEffect)((()=>n(e)),[e]),[t,n]}(d(i)):[!1,t.noop];return(0,e.createElement)(rt,{className:nt("group-control",f,{[`is-${m}-columns`]:m}),...p},(0,e.createElement)(at,{className:"group-control__header"},o({label:n,isLinkedGroup:u,...p}),u&&(0,e.createElement)(lt,{onClick:()=>{v(!g)},isLinked:g})),(0,e.createElement)(it,{className:"group-control__body"},g&&(0,e.createElement)(mt,{...h}),!g&&(0,e.createElement)(ft,{...h})))};et(pt)`
  /* .block-editor-panel-color-gradient-settings__item {
    padding: 8px !important;
  } */

  .components-toggle-control {
    > * {
      margin-bottom: 0;
    }
  }
`,et.div`
  .shadow-list__title {
    margin-bottom: 8px;
  }

  .shadow-list {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;

    margin-bottom: 16px;
  }

  .shadow-item {
    height: 30px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #ddd;

    &.is-selected {
      background: #ddd;
    }
  }
`,et.div`
  > .block-editor-tools-panel-color-gradient-settings__item {
    margin: 0 !important;
    border-right: 1px solid #0000001a;
    border-bottom: 1px solid #0000001a;
    border-left: 1px solid #0000001a;

    &:first-of-type {
      border-top: 1px solid #0000001a;
    }
  }

  .block-editor-tools-panel-color-gradient-settings__dropdown {
    display: block;
  }

  &.is-inner-control {
    > * {
      margin: 0 !important;
      border: 0 !important;
    }

    .block-editor-tools-panel-color-gradient-settings__dropdown {
      display: flex;
      align-items: center;
      align-self: flex-end;
      height: 32px;
      border: 1px solid #757575;

      > button {
        height: 100%;
        padding: 4px;
      }
    }
  }
`,et(pt)`
  > .group-control__body {
    align-items: flex-end;
  }

  .block-editor-panel-color-gradient-settings__item {
    padding: 4px !important;
  }

  .block-editor-panel-color-gradient-settings__dropdown > .components-flex {
    gap: 0;
  }

  .component-color-indicator {
    width: 14px;
    height: 14px;

    &,
    + * {
      margin-left: 2px;
    }
  }
`,et(pt)`
  .components-base-control__field {
    margin-bottom: 0;
  }
`,window.wp.notices,et.div`
  .svg-input-control {
    &__label {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &__actions {
      display: flex;
      gap: 8px;
      margin: 6px 0;
    }

    &__input {
      margin: 8px 0 4px;

      > * {
        margin-bottom: 0;
      }
    }
  }
`,et(s.ButtonGroup)`
  margin-top: 1px;
  margin-left: 1px;
  button {
    margin: -1px 0 0 -1px;
    vertical-align: middle;
  }
`,et.div`
  margin-top: 8px;
  margin-bottom: revert;
  font-size; 12px;
  color: #757575;
`,n(709),window.wp.keycodes,et(s.Modal)`
  // Modal content
  .components-modal__content {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;
    margin-top: 50px;
    overflow: hidden;

    &::before {
      margin-bottom: 20px;
    }

    > :not(.components-modal__header, .icon-submit) {
      max-height: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;
    }
  }

  // Modal header
  .components-modal__header {
    height: 50px;
    padding: 0 20px;
  }

  .icon-library-wrapper {
    flex: 1;
    overflow: hidden;
    content-visibility: hidden;

    &.is-loading,
    &.show-library {
      content-visibility: visible;
    }
  }

  .icon-filter {
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;

    &__search {
      min-width: 220px;
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      font-size: 14px;

      > li {
        margin: 0;
      }

      .keyword-label {
        font-weight: 500;
      }

      span {
        display: block;
        padding: 3px 5px;
      }

      .keyword:not(.is-selected) {
        color: var(--wp-admin-theme-color, #007cba);
        cursor: pointer;
      }

      .is-selected {
        font-weight: 500;
        pointer-events: none;
      }
    }

    @media (max-width: 781px) {
      flex-wrap: wrap;

      &__search {
        width: 100%;
      }

      &__keywords {
        margin-top: 8px;
        margin-left: 0 !important;
      }
    }
  }

  .components-search-control > * {
    margin-bottom: 0;
  }

  // Icons list
  .icon-library {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9em, 1fr));
    gap: 0.5em;
    max-height: calc(100% - 110px);
    overflow: auto;

    /* box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.4); */

    svg {
      width: 4em;
      height: 4em;
    }

    .title {
      max-height: 1.7em;
      font-size: 0.85em;
      line-height: 1.5;
      text-align: center;
      word-break: break-word;
    }

    > * {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5em 1em;
      overflow: hidden;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .selected {
      background-color: #ccc;
    }

    &:empty::before {
      display: block;
      width: 100%;
      padding: 2rem;
      text-align: center;
      content: attr(data-empty);
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  // Pagination
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0;
    font-size: 1.5em;

    > li {
      margin: 0 5px;

      &:only-child {
        display: none;
      }

      &.active {
        a {
          color: #3c434a;
        }
      }

      &:not(.active) {
        a {
          cursor: pointer;
        }
      }
    }

    a {
      display: block;
      padding: 5px 10px;
    }
  }
`;const ht=et.div`
  .settings-section__description {
    margin: 1em 0;
    font-size: 1.1em;
    font-weight: 500;
  }

  .meta-box-sortables {
    @media (min-width: 1080px) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
      gap: 1rem;

      .postbox {
        margin-bottom: 0;
      }
    }
  }
`,gt=({title:t,description:n,children:r})=>(0,e.createElement)(ht,{className:"settings-section"},t&&(0,e.createElement)("h3",{className:"settings-section__title"},t),n&&(0,e.createElement)("p",{className:"settings-section__description"},n),(0,e.createElement)("div",{className:"meta-box-sortables"},r)),vt=et.div`
  &.is-full-row {
    grid-column: span 2;
  }

  &.is-header-hidden {
    .inside {
      padding: 12px;
    }

    @media (min-width: 1080px) {
      margin: 0;
    }
  }

  .postbox-header {
    .hndle {
      cursor: pointer;
    }
  }

  .inside {
    margin: 0;
  }

  .postbox-footer {
    padding: 12px;
    border-top: 1px solid #f0f0f1;
  }

  &.closed .postbox-footer {
    display: none;
  }

  .components-notice {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 8px;
    margin-right: 0;
    margin-left: 0;
    box-sizing: border-box;
  }
`,bt=et.div`
  padding: 12px 16px;
  margin-top: 12px;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  border-radius: 2px;

  .fieldset__label {
    margin-bottom: 12px;
  }

  .fieldset__list {
    margin-bottom: 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 1rem;
  }

  .file-upload {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
  }

  .file-preview {
    display: flex;
    align-items: center;
    gap: 0.5em;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
`,yt=({title:n,settingsName:r="boldblocks-settings",children:i,renderFooter:o=null,isFullRow:s=!1,isHeaderHidden:l=!1,className:c,initialOpen:u=!0})=>{const d=`${r}-${(0,m.cleanForSlug)(n)}`,[f,p]=((e,n=null)=>{const[r,i]=(0,a.useState)((()=>{try{const r=JSON.parse(localStorage.getItem(e));return(0,t.isNil)(r)?n:r}catch(e){return x(e,"error"),n}}));return[r,t=>{i(t),localStorage.setItem(e,JSON.stringify(t))}]})(d,!u);return(0,e.createElement)(vt,{className:nt("postbox",c,{closed:f,"is-full-row":s,"is-header-hidden":l})},!l&&(0,e.createElement)("div",{className:"postbox-header","aria-expanded":f?"false":"true",tabIndex:-1,onClick:e=>{e.preventDefault(),p(!f)}},(0,e.createElement)("h2",{className:"hndle"},n),(0,e.createElement)("div",{className:"handle-actions hide-if-no-js"},(0,e.createElement)("button",{type:"button",className:"handlediv","aria-expanded":f?"false":"true",onClick:e=>{e.preventDefault(),p(!f)}},(0,e.createElement)("span",{className:"screen-reader-text"},"Toggle panel: ",n),(0,e.createElement)("span",{className:"toggle-indicator","aria-hidden":f?"true":"false"})))),(0,e.createElement)("div",{className:"inside"},i),(0,t.isFunction)(o)&&(0,e.createElement)("div",{className:"postbox-footer"},o()))};et(s.__experimentalToolsPanelItem)`
  padding-top: 8px;
  margin-top: -1px;
  border-top: 1px solid #ddd;
`,et(s.__experimentalVStack)`
  > * {
    margin-bottom: 0 !important;
  }

  > .label-control,
  > hr {
    margin: 0 !important;
  }

  .components-tools-panel-item {
    margin-top: 0 !important;
  }
`;const wt=et(yt)`
  border-top: 0;

  h1 {
    padding: 0;
    margin: 10px 0;
    font-size: 2.5em;
  }

  h2 {
    margin-bottom: 0.75em !important;
  }

  .welcome {
    &__description {
      ul,
      p {
        font-size: 1.2em;
      }

      ul {
        padding-left: 20px;
        list-style: disc;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }

    &__guides {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5em;

      h4 {
        margin: 0 0 1em;
      }
    }
  }

  .video-tutorials {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;

    @media (min-width: 782px) {
      // $break-medium
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1280px) {
      // $break-wide
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    &__item {
      border: 1px solid #ddd;

      &__video {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        margin: 0;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      &__desc {
        padding: 8px 10px 10px;
        font-size: 1.2em;
        font-weight: 500;
      }
    }
  }

  h2.view-playlists {
    margin-top: 1rem;
  }
`,xt=()=>{const{loading:t,data:n}=(0,a.useContext)(A);return(0,e.createElement)(wt,{isHeaderHidden:!0,isFullRow:!0,className:"welcome-widget welcome"},(0,e.createElement)("h1",null,(0,r.__)("Welcome to Block Enhancements","block-enhancements")),(0,e.createElement)("div",{className:"welcome__description"},(0,e.createElement)("p",null,(0,r.__)("This plugin enhances your blocks with some usefull features. You can add icons, responsive text alignment, colors, shadows, transforms, transitions with hover style to make your blocks stand out. It works well with both core and third-party blocks, you can choose which blocks should be supported for each feature from the 'Manage Features' section.","block-enhancements")),(0,e.createElement)("p",null,(0,r.__)("To get started, we suggest you check out these quick guides and watch these video tutorials below.","block-enhancements")),(0,e.createElement)("h2",null,(0,r.__)("Here are some quick guides on how to use them.","block-enhancements")),(0,e.createElement)("div",{className:"welcome__guides"},t?(0,e.createElement)(s.Spinner,null):!!n?.guides&&n?.guides.map((({title:t,src:n})=>(0,e.createElement)("div",{key:n},(0,e.createElement)("h4",null,t),(0,e.createElement)("img",{src:n}))))),(0,e.createElement)("h2",null,(0,r.__)("Video tutorials","block-enhancements")),(0,e.createElement)("p",null,(0,r.__)("Below is a list of short video tutorials, you can use them as learning resources. We will upload more videos soon, so don’t miss out on the latest updates. To get notified when we release new videos, please subscribe to our youtube channel and turn on the notifications. ","block-enhancements"),(0,e.createElement)(s.ExternalLink,{href:"https://www.youtube.com/channel/UCB7Y3mlCEKHVM-RCZaTkR1g?sub_confirmation=1"},"Subscribe"),", ",(0,e.createElement)(s.ExternalLink,{href:"https://www.youtube.com/playlist?list=PLPuEwc7dZklcKwDc2AJLjLvH3QCQclmzh"},(0,r.__)("View all playlist","block-enhancements"))),(0,e.createElement)("div",{className:"video-tutorials"},t?(0,e.createElement)(s.Spinner,null):!!n?.videoTutorials&&n?.videoTutorials.map((({title:t,id:n})=>(0,e.createElement)("div",{className:"video-tutorials__item",key:n},(0,e.createElement)("div",{className:"video-tutorials__item__video"},(0,e.createElement)("iframe",{src:`https://www.youtube.com/embed/${n}`,srcDoc:`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img{position:absolute;width:100%;top:0;bottom:0;margin:auto}.btn-play{position: absolute;top: 50%;left: 50%;z-index: 1;display: block;width: 68px;height: 48px;margin:0;cursor: pointer;transform: translate3d(-50%, -50%, 0);background-color: transparent;background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');filter: grayscale(100%);transition: filter .1s cubic-bezier(0, 0, 0.2, 1);border: none;}body:hover .btn-play,.btn-play:focus{filter:none}.visually-hidden{clip: rect(0 0 0 0);clip-path: inset(50%);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}</style><a href="https://www.youtube.com/embed/${n}?autoplay=1&enablejsapi=1&playsinline=1"><img src="https://img.youtube.com/vi/${n}/hqdefault.jpg" alt="${t}"><button type="button" class="btn-play"><span class="visually-hidden">Play</span></button></a>`,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),(0,e.createElement)("div",{className:"video-tutorials__item__desc"},t)))))))},kt=()=>(0,e.createElement)(gt,null,(0,e.createElement)(xt,null)),_t=et(yt)`
  fieldset {
    min-height: 60px;
    overflow: auto;
  }

  .blocktype-checkbox {
    > .components-base-control__field {
      display: flex;
      align-items: center;
    }
    .components-checkbox-control__label {
      display: inline-flex;
      align-items: center;

      svg {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
    }

    .label {
      display: block;
      max-width: 170px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`,Et=({blockTypes:t,featureName:n,selectedBlocks:r,setSelectedBlocks:a,isChecked:i,title:o})=>(0,e.createElement)(e.Fragment,null,!!o&&(0,e.createElement)("h4",{className:"list-title"},o),(0,e.createElement)("ul",{className:"fieldset__list"},t.map((o=>(0,e.createElement)("li",{key:`${n}-${o?.name}`},(0,e.createElement)(s.CheckboxControl,{label:(0,e.createElement)(e.Fragment,null,(0,e.createElement)(s.Icon,{className:"block-icon",icon:o?.icon?.src}),(0,e.createElement)("span",{className:"label",title:o?.title},`${o?.title}`)),checked:i(o?.name),onChange:e=>{let i=[];if(e){const e=t.find((({name:e})=>e===o?.name));i=[...r,{name:e.name}]}else i=r.filter((({name:e})=>e!==o?.name));a([...i],n)},className:"blocktype-checkbox"})))))),Ct=(0,a.memo)((({featureName:t,availableBlockTypes:n,isLoading:i,selectedBlocks:o,title:l,description:c,updateSettings:u})=>{const[d,f]=(0,a.useState)(o),m=(0,a.useMemo)((()=>n.reduce(((e,t)=>{var n;if(["core/block","core/missing"].includes(t?.name))return e;const r=t?.category?t.category:"other";return null!==(n=e[r])&&void 0!==n&&n?e[r].push(t):e[r]=[t],e}),{})),[n?.length]),p=(0,a.useCallback)((e=>!!d.find((({name:t})=>t===e))),[d]),[h,g]=(0,a.useState)({type:"success",message:""});return(0,e.createElement)(_t,{title:l,renderFooter:()=>{const[n,i]=(0,a.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(s.Button,{variant:"primary",disabled:n,onClick:e=>{e.preventDefault(),i(!0),u(d,t).then((()=>{g({type:"success",message:(0,r.__)("Setttings saved!","block-enhancements")})})).catch((e=>{x(e,"error"),g({type:"error",message:(0,r.__)("Something went wrong, please contact the author for support!","block-enhancements")})})).finally((()=>{i(!1)}))}},(0,r.__)("Update settings","block-enhancements")),n&&(0,e.createElement)(s.Spinner,null))},isFullRow:!0,settingsName:"be-settings",initialOpen:!1},(0,e.createElement)("p",null,c),(0,e.createElement)(bt,{className:"fieldset"},(0,e.createElement)("div",{className:"fieldset__label"},(0,e.createElement)("strong",null,(0,r.__)("Choose which blocks should be supported.","block-enhancements"))),i?(0,e.createElement)(s.Spinner,null):n?.length>0&&(0,e.createElement)("fieldset",null,(0,e.createElement)(s.CheckboxControl,{label:(0,r.__)("Toggle All","block-enhancements"),checked:d.length===n.length,onChange:e=>{f(e?n.map((({name:e})=>({name:e}))):[])}}),n.length<24?(0,e.createElement)(Et,{blockTypes:n,featureName:t,selectedBlocks:d,setSelectedBlocks:f,isChecked:p}):(0,e.createElement)(e.Fragment,null,Object.keys(m).map((n=>(0,e.createElement)(Et,{key:n,title:n.toUpperCase(),blockTypes:m[n],featureName:t,selectedBlocks:d,setSelectedBlocks:f,isChecked:p})))))),h&&h?.message&&(0,e.createElement)(s.Notice,{status:h?.type,isDismissible:!1},h.message))})),St=()=>{const{blocksByFeatures:t,isLoading:n,updateSettings:a}=(()=>{var e;const t=null!==(e=window?.BlockEnhancementsFeatures)&&void 0!==e?e:{},{saveEditedEntityRecord:n}=(0,c.useDispatch)(C.store),[r,a]=(0,C.useEntityProp)("root","site","be_allowed_blocks");let i=(0,S.getBlockTypes)();const o=Object.keys(t).reduce(((e,n)=>{var a,o;let s=(null!=r?r:[]).find((e=>e?.featureName===n));return{...e,[n]:{allowedBlocks:s?null!==(a=s?.allowedBlocks)&&void 0!==a?a:[]:null!==(o=t[n]?.allowedBlocks)&&void 0!==o?o:[],availableBlocks:T(n,t,i)}}}),{});return{blocksByFeatures:o,isLoading:!r,updateSettings:(e,t)=>{const i=r.map((n=>n?.featureName!==t?n:{...n,allowedBlocks:e}));return a(i),n("root","site")}}})(),i=Object.keys(t).map((i=>{var o,s;let l;switch(i){case"withIcon":l=(0,r.__)("With Icon","block-enhancements");break;case"withTextAlignment":l=(0,r.__)("With Responsive Text Alignment","block-enhancements");break;case"withColor":l=(0,r.__)("With Color","block-enhancements");break;case"withShadow":l=(0,r.__)("With Box Shadow","block-enhancements");break;case"withTextShadow":l=(0,r.__)("With Text Shadow","block-enhancements");break;case"withTransform":l=(0,r.__)("With Transform","block-enhancements");break;case"withTransition":l=(0,r.__)("With Transition","block-enhancements");break;case"withTypography":l=(0,r.__)("With Typography","block-enhancements")}return(0,e.createElement)(Ct,{key:i,featureName:i,title:l,isLoading:n,availableBlockTypes:null!==(o=t[i].availableBlocks)&&void 0!==o?o:[],updateSettings:a,selectedBlocks:null!==(s=t[i].allowedBlocks)&&void 0!==s?s:[]})}));return(0,e.createElement)(gt,{title:(0,r.__)("Manage allowed blocks for each feature","block-enhancements")},i)},Tt=({children:t})=>(0,e.createElement)("div",{className:"metabox-holder"},t),At=()=>{const n=[{name:"getting-started",title:(0,r.__)("Getting Started","block-enhancements"),className:"setting-tabs__getting-started"},{name:"manage-features",title:(0,r.__)("Manage Features","block-enhancements"),className:"setting-tabs__manage-features"}],i=new E,o=i.get("tab"),l=(0,t.findKey)(n,["name",o])?o:"getting-started",c=(()=>{const{loading:e,error:t,data:{data:n}={}}=((e,t={},n=[])=>{const[r,i]=(0,a.useState)(!0),[o,s]=(0,a.useState)(),[l,c]=(0,a.useState)(),u=(0,a.useCallback)((()=>{i(!0),s(void 0),c(void 0),d()({path:e,...{...f,...t}}).then(c).catch(s).finally((()=>i(!1)))}),n);return(0,a.useEffect)((()=>{u()}),[u]),{loading:r,error:o,data:l}})("blockenhancements/v1/getDocs");return{loading:e,error:t,data:n}})();return(0,e.createElement)(A.Provider,{value:c},(0,e.createElement)(s.TabPanel,{tabs:n,className:"settings-tabs",activeClass:"is-active",initialTabName:l,onSelect:e=>{i.set("tab",e)}},(t=>{switch(t.name){case"getting-started":return(0,e.createElement)(Tt,null,(0,e.createElement)(kt,null));case"manage-features":return(0,e.createElement)(Tt,null,(0,e.createElement)(St,null))}})))};o()((()=>{(0,l.registerCoreBlocks)(),(0,a.render)((0,e.createElement)(At,null),document.querySelector(".js-be-settings-root"))}))})()})();