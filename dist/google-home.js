/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function t(t,e,n,s){var i,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(r<3?i(o):r>3?i(e,n,o):i(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o}var e={},n=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,s="[^\\s]+",i=/\[([^]*?)\]/gm,r=function(){};function o(t,e){for(var n=[],s=0,i=t.length;s<i;s++)n.push(t[s].substr(0,e));return n}function a(t){return function(e,n,s){var i=s[t].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~i&&(e.month=i)}}function c(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}var l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d=["January","February","March","April","May","June","July","August","September","October","November","December"],u=o(d,3),h=o(l,3);e.i18n={dayNamesShort:h,dayNames:l,monthNamesShort:u,monthNames:d,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10)*t%10]}};var p={D:function(t){return t.getDate()},DD:function(t){return c(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return t.getDay()},dd:function(t){return c(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return t.getMonth()+1},MM:function(t){return c(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return c(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return c(t.getFullYear(),4)},h:function(t){return t.getHours()%12||12},hh:function(t){return c(t.getHours()%12||12)},H:function(t){return t.getHours()},HH:function(t){return c(t.getHours())},m:function(t){return t.getMinutes()},mm:function(t){return c(t.getMinutes())},s:function(t){return t.getSeconds()},ss:function(t){return c(t.getSeconds())},S:function(t){return Math.round(t.getMilliseconds()/100)},SS:function(t){return c(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return c(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+c(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)}},m={D:["\\d\\d?",function(t,e){t.day=e}],Do:["\\d\\d?"+s,function(t,e){t.day=parseInt(e,10)}],M:["\\d\\d?",function(t,e){t.month=e-1}],YY:["\\d\\d?",function(t,e){var n=+(""+(new Date).getFullYear()).substr(0,2);t.year=""+(e>68?n-1:n)+e}],h:["\\d\\d?",function(t,e){t.hour=e}],m:["\\d\\d?",function(t,e){t.minute=e}],s:["\\d\\d?",function(t,e){t.second=e}],YYYY:["\\d{4}",function(t,e){t.year=e}],S:["\\d",function(t,e){t.millisecond=100*e}],SS:["\\d{2}",function(t,e){t.millisecond=10*e}],SSS:["\\d{3}",function(t,e){t.millisecond=e}],d:["\\d\\d?",r],ddd:[s,r],MMM:[s,a("monthNamesShort")],MMMM:[s,a("monthNames")],a:[s,function(t,e,n){var s=e.toLowerCase();s===n.amPm[0]?t.isPm=!1:s===n.amPm[1]&&(t.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(t,e){var n,s=(e+"").match(/([+-]|\d\d)/gi);s&&(n=60*s[1]+parseInt(s[2],10),t.timezoneOffset="+"===s[0]?n:-n)}]};m.dd=m.d,m.dddd=m.ddd,m.DD=m.D,m.mm=m.m,m.hh=m.H=m.HH=m.h,m.MM=m.M,m.ss=m.s,m.A=m.a,e.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},e.format=function(t,s,r){var o=r||e.i18n;if("number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date in fecha.format");s=e.masks[s]||s||e.masks.default;var a=[];return(s=(s=s.replace(i,(function(t,e){return a.push(e),"@@@"}))).replace(n,(function(e){return e in p?p[e](t,o):e.slice(1,e.length-1)}))).replace(/@@@/g,(function(){return a.shift()}))},e.parse=function(t,s,r){var o=r||e.i18n;if("string"!=typeof s)throw new Error("Invalid format in fecha.parse");if(s=e.masks[s]||s,t.length>1e3)return null;var a={},c=[],l=[];s=s.replace(i,(function(t,e){return l.push(e),"@@@"}));var d,u=(d=s,d.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(n,(function(t){if(m[t]){var e=m[t];return c.push(e[1]),"("+e[0]+")"}return t}));u=u.replace(/@@@/g,(function(){return l.shift()}));var h=t.match(new RegExp(u,"i"));if(!h)return null;for(var p=1;p<h.length;p++)c[p-1](a,h[p],o);var f,g=new Date;return!0===a.isPm&&null!=a.hour&&12!=+a.hour?a.hour=+a.hour+12:!1===a.isPm&&12==+a.hour&&(a.hour=0),null!=a.timezoneOffset?(a.minute=+(a.minute||0)-+a.timezoneOffset,f=new Date(Date.UTC(a.year||g.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0))):f=new Date(a.year||g.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0),f};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var f=function(t,e,n,s){s=s||{},n=null==n?{}:n;var i=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return i.detail=n,t.dispatchEvent(i),i},g=new Set(["call-service","divider","section","weblink","cast","select"]),y={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},v=function(t,e){void 0===e&&(e=!1);var n=function(t,e){return s("hui-error-card",{type:"error",error:t,config:e})},s=function(t,e){var s=window.document.createElement(t);try{s.setConfig(e)}catch(s){return console.error(t,s),n(s.message,e)}return s};if(!t||"object"!=typeof t||!e&&!t.type)return n("No type defined",t);var i=t.type;if(i&&i.startsWith("custom:"))i=i.substr("custom:".length);else if(e)if(g.has(i))i="hui-"+i+"-row";else{if(!t.entity)return n("Invalid config given.",t);var r=t.entity.split(".",1)[0];i="hui-"+(y[r]||"text")+"-entity-row"}else i="hui-"+i+"-card";if(customElements.get(i))return s(i,t);var o=n("Custom element doesn't exist: "+t.type+".",t);o.style.display="None";var a=setTimeout((function(){o.style.display=""}),2e3);return customElements.whenDefined(t.type).then((function(){clearTimeout(a),f(o,"ll-rebuild",{},o)})),o
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */};const _=new WeakMap,w=t=>"function"==typeof t&&_.has(t),S=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,b=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},x={},P={},C=`{{lit-${String(Math.random()).slice(2)}}}`,N=`\x3c!--${C}--\x3e`,E=new RegExp(`${C}|${N}`),M="$lit$";class k{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],i=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,a=0;const{strings:c,values:{length:l}}=t;for(;a<l;){const t=i.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let s=0;for(let t=0;t<n;t++)O(e[t].name,M)&&s++;for(;s-- >0;){const e=c[a],n=D.exec(e)[2],s=n.toLowerCase()+M,i=t.getAttribute(s);t.removeAttribute(s);const r=i.split(E);this.parts.push({type:"attribute",index:o,name:n,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(C)>=0){const s=t.parentNode,i=e.split(E),r=i.length-1;for(let e=0;e<r;e++){let n,r=i[e];if(""===r)n=A();else{const t=D.exec(r);null!==t&&O(t[2],M)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-M.length)+t[3]),n=document.createTextNode(r)}s.insertBefore(n,t),this.parts.push({type:"node",index:++o})}""===i[r]?(s.insertBefore(A(),t),n.push(t)):t.data=i[r],a+=r}}else if(8===t.nodeType)if(t.data===C){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(A(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(n.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(C,e+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const O=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},T=t=>-1!==t.index,A=()=>document.createComment(""),D=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class j{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=S?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let i,r=0,o=0,a=s.nextNode();for(;r<n.length;)if(i=n[r],T(i)){for(;o<i.index;)o++,"TEMPLATE"===a.nodeName&&(e.push(a),s.currentNode=a.content),null===(a=s.nextNode())&&(s.currentNode=e.pop(),a=s.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,i.name,i.strings,this.options));r++}else this.__parts.push(void 0),r++;return S&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const V=` ${C} `;class Y{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let s=0;s<t;s++){const t=this.strings[s],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const r=D.exec(t);e+=null===r?t+(n?V:N):t.substr(0,r.index)+r[1]+r[2]+M+r[3]+C}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const R=t=>null===t||!("object"==typeof t||"function"==typeof t),$=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class H{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new U(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let s=0;s<e;s++){n+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(R(t)||!$(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class U{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===x||R(t)&&t===this.value||(this.value=t,w(t)||(this.committer.dirty=!0))}commit(){for(;w(this.value);){const t=this.value;this.value=x,t(this)}this.value!==x&&this.committer.commit()}}class z{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(A()),this.endNode=t.appendChild(A())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=A()),t.__insert(this.endNode=A())}insertAfterPart(t){t.__insert(this.startNode=A()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}const t=this.__pendingValue;t!==x&&(R(t)?t!==this.value&&this.__commitText(t):t instanceof Y?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):$(t)?this.__commitIterable(t):t===P?(this.value=P,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof j&&this.value.template===e)this.value.update(t.values);else{const n=new j(e,t.processor,this.options),s=n._clone();n.update(t.values),this.__commitNode(s),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const i of t)n=e[s],void 0===n&&(n=new z(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(i),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){b(this.startNode.parentNode,t.nextSibling,this.endNode)}}class I{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=x}}class q extends H{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new F(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class F extends U{}let L=!1;try{const t={get capture(){return L=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class B{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=W(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=x}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const W=t=>t&&(L?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const J=new class{handleAttributeExpressions(t,e,n,s){const i=e[0];if("."===i){return new q(t,e.slice(1),n).parts}return"@"===i?[new B(t,e.slice(1),s.eventContext)]:"?"===i?[new I(t,e.slice(1),n)]:new H(t,e,n).parts}handleTextExpression(t){return new z(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function Z(t){let e=G.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},G.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(C);return n=e.keyString.get(s),void 0===n&&(n=new k(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const G=new Map,K=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const Q=(t,...e)=>new Y(t,e,"html",J),X=133;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function tt(t,e){const{element:{content:n},parts:s}=t,i=document.createTreeWalker(n,X,null,!1);let r=nt(s),o=s[r],a=-1,c=0;const l=[];let d=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-c,r=nt(s,r),o=s[r]}l.forEach(t=>t.parentNode.removeChild(t))}const et=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,X,null,!1);for(;n.nextNode();)e++;return e},nt=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(T(e))return n}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const st=(t,e)=>`${t}--${e}`;let it=!0;void 0===window.ShadyCSS?it=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),it=!1);const rt=t=>e=>{const n=st(e.type,t);let s=G.get(n);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},G.set(n,s));let i=s.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(C);if(i=s.keyString.get(r),void 0===i){const n=e.getTemplateElement();it&&window.ShadyCSS.prepareTemplateDom(n,t),i=new k(e,n),s.keyString.set(r,i)}return s.stringsArray.set(e.strings,i),i},ot=["html","svg"],at=new Set,ct=(t,e,n)=>{at.add(t);const s=n?n.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:r}=i;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(s,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=i[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{ot.forEach(e=>{const n=G.get(st(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),tt(t,n)})})})(t);const a=s.content;n?function(t,e,n=null){const{element:{content:s},parts:i}=t;if(null==n)return void s.appendChild(e);const r=document.createTreeWalker(s,X,null,!1);let o=nt(i),a=0,c=-1;for(;r.nextNode();){for(c++,r.currentNode===n&&(a=et(e),n.parentNode.insertBefore(e,n));-1!==o&&i[o].index===c;){if(a>0){for(;-1!==o;)i[o].index+=a,o=nt(i,o);return}o=nt(i,o)}}}(n,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(n){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),tt(n,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const lt={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},dt=(t,e)=>e!==t&&(e==e||t==t),ut={attribute:!0,type:String,converter:lt,reflect:!1,hasChanged:dt},ht=Promise.resolve(!0),pt=1,mt=4,ft=8,gt=16,yt=32,vt="finalized";class _t extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=ht,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const s=this._attributeNameForProperty(n,e);void 0!==s&&(this._attributeToPropertyMap.set(s,n),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=ut){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[n]},set(e){const s=this[t];this[n]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(vt)||t.finalize(),this[vt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=dt){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,s=e.converter||lt,i="function"==typeof s?s:s.fromAttribute;return i?i(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,s=e.converter;return(s&&s.toAttribute||lt.toAttribute)(t,n)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|yt,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=ut){const s=this.constructor,i=s._attributeNameForProperty(t,n);if(void 0!==i){const t=s._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=this._updateState|ft,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=this._updateState&~ft}}_attributeToProperty(t,e){if(this._updateState&ft)return;const n=this.constructor,s=n._attributeToPropertyMap.get(t);if(void 0!==s){const t=n._classProperties.get(s)||ut;this._updateState=this._updateState|gt,this[s]=n._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~gt}}_requestUpdate(t,e){let n=!0;if(void 0!==t){const s=this.constructor,i=s._classProperties.get(t)||ut;s._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||this._updateState&gt||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|mt;const n=this._updatePromise;this._updatePromise=new Promise((n,s)=>{t=n,e=s});try{await n}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&yt}get _hasRequestedUpdate(){return this._updateState&mt}get hasUpdated(){return this._updateState&pt}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&pt||(this._updateState=this._updateState|pt,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~mt}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}_t[vt]=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const wt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:s}=e;return{kind:n,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),St=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}}:Object.assign({},e,{finisher(n){n.createProperty(e.key,t)}}),bt=(t,e,n)=>{e.constructor.createProperty(n,t)};function xt(t){return(e,n)=>void 0!==n?bt(t,e,n):St(t,e)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Pt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ct=Symbol();class Nt{constructor(t,e){if(e!==Ct)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Pt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Et=(t,...e)=>{const n=e.reduce((e,n,s)=>e+(t=>{if(t instanceof Nt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[s+1],t[0]);return new Nt(n,Ct)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const Mt=t=>t.flat?t.flat(1/0):function t(e,n=[]){for(let s=0,i=e.length;s<i;s++){const i=e[s];Array.isArray(i)?t(i,n):n.push(i)}return n}(t);class kt extends _t{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){Mt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Pt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof Y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}kt.finalized=!0,kt.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const s=n.scopeName,i=K.has(e),r=it&&11===e.nodeType&&!!e.host,o=r&&!at.has(s),a=o?document.createDocumentFragment():e;if(((t,e,n)=>{let s=K.get(e);void 0===s&&(b(e,e.firstChild),K.set(e,s=new z(Object.assign({templateFactory:Z},n))),s.appendInto(e)),s.setValue(t),s.commit()})(t,a,Object.assign({templateFactory:rt(s)},n)),o){const t=K.get(a);K.delete(a);const n=t.value instanceof j?t.value.template:void 0;ct(s,a,n),b(e,e.firstChild),e.appendChild(a),K.set(e,t)}!i&&r&&window.ShadyCSS.styleElement(e.host)};const Ot=t=>{var e;return null===(e=document.querySelector("home-assistant"))||void 0===e?void 0:e.provideHass(t)};let Tt=class extends kt{constructor(){super(...arguments),this.setConfig=t=>{if(!t)throw new Error("Invalid configuration");this.hass||Ot(this),this._config=t},this.shouldUpdate=t=>{t.get("hass");return!0},this.render=()=>{var t,e,n,s,i,r,o,a;const c=null===(t=this.hass)||void 0===t?void 0:t.states[this._config.entity],l=null===(e=this._config)||void 0===e?void 0:e.icon.startsWith("mdi:");return Q`
            <div id="wrapper">
                <button @click=${this._handleButtonClick} type="button">
                    ${l?Q`
                              <ha-icon icon=${null===(n=this._config)||void 0===n?void 0:n.icon}></ha-icon>
                          `:Q`
                              <img src=${null===(s=this._config)||void 0===s?void 0:s.icon} />
                          `}
                    <h4>
                        ${(null===(i=this._config)||void 0===i?void 0:i.name)||(null===(r=c)||void 0===r?void 0:r.attributes.friendly_name)}
                    </h4>
                </button>
                <ul class="actions">
                    ${null===(a=null===(o=this._config)||void 0===o?void 0:o.actions)||void 0===a?void 0:a.map(({label:t,state:e,service:n})=>{var s;return e&&(null===(s=c)||void 0===s?void 0:s.state)!==e?Q``:Q`
                                    <button
                                        @click=${this._handleActionClick(n)}
                                    >
                                        ${t}
                                    </button>
                                `})}
                </ul>
            </div>
        `},this._handleButtonClick=()=>f(this,"hass-more-info",{entityId:this._config.entity},{bubbles:!0,cancelable:!1,composed:!0}),this._handleActionClick=t=>{const e=this._config.entity,[n,s]=t.split(".");return()=>{var t;return null===(t=this.hass)||void 0===t?void 0:t.callService(n,s,{entity_id:e})}}}static get styles(){return Et`
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-family: 'Product Sans';
                padding: 0;
                outline: none;
                width: 100%;
            }

            #wrapper {
                display: flex;
                flex-direction: column;
            }

            #wrapper > button img {
                height: 100%;
                max-height: 50%;
                max-width: 76px;
                width: 100%;
            }

            #wrapper > button h4 {
                font-family: 'Product Sans';
                font-size: 1.1rem;
                font-weight: 400;
                margin: 12px 0px 0px;
            }

            .actions {
                align-items: center;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                height: 22px;
                justify-content: space-around;
                list-style: none;
                max-width: 170px;
                margin: 12px auto 0px;
                padding: 0;
                width: 100%;
            }

            .actions button {
                color: #4285f4;
                flex: 0;
                font-size: 1.1rem;
                font-weight: 500;
            }
        `}};t([xt()],Tt.prototype,"hass",void 0),t([xt()],Tt.prototype,"_config",void 0),Tt=t([wt("google-home-grid-item")],Tt);const At=customElements.get("home-assistant-main")?Object.getPrototypeOf(customElements.get("home-assistant-main")):Object.getPrototypeOf(customElements.get("hui-view")),Dt=At.prototype.html;At.prototype.css;const jt="custom:";function Vt(t,e){const n=document.createElement("hui-error-card");return n.setConfig({type:"error",error:t,origConfig:e}),n}function Yt(t,e){if(!e||"object"!=typeof e||!e.type)return Vt(`No ${t} type configured`,e);let n=e.type;if(n=n.startsWith(jt)?n.substr(jt.length):`hui-${n}-${t}`,customElements.get(n))return function(t,e){const n=document.createElement(t);try{n.setConfig(e)}catch(t){return Vt(t,e)}return n}(n,e);const s=Vt(`Custom element doesn't exist: ${n}.`,e);s.style.display="None";const i=setTimeout(()=>{s.style.display=""},2e3);return customElements.whenDefined(n).then(()=>{clearTimeout(i),function(t,e,n=null){if((t=new Event(t,{bubbles:!0,cancelable:!1,composed:!0})).detail=e||{},n)n.dispatchEvent(t);else{var s=document.querySelector("home-assistant");(s=(s=(s=(s=(s=(s=(s=(s=(s=(s=(s=s&&s.shadowRoot)&&s.querySelector("home-assistant-main"))&&s.shadowRoot)&&s.querySelector("app-drawer-layout partial-panel-resolver"))&&s.shadowRoot||s)&&s.querySelector("ha-panel-lovelace"))&&s.shadowRoot)&&s.querySelector("hui-root"))&&s.shadowRoot)&&s.querySelector("ha-app-layout #view"))&&s.firstElementChild)&&s.dispatchEvent(t)}}("ll-rebuild",{},s)}),s}const Rt=2;class $t extends At{static get version(){return Rt}static get properties(){return{noHass:{type:Boolean}}}setConfig(t){var e;this._config=t,this.el?this.el.setConfig(t):(this.el=this.create(t),this._hass&&(this.el.hass=this._hass),this.noHass&&(e=this,document.querySelector("home-assistant").provideHass(e)))}set config(t){this.setConfig(t)}set hass(t){this._hass=t,this.el&&(this.el.hass=t)}createRenderRoot(){return this}render(){return Dt`${this.el}`}}const Ht=function(t,e){const n=Object.getOwnPropertyDescriptors(e.prototype);for(const[e,s]of Object.entries(n))"constructor"!==e&&Object.defineProperty(t.prototype,e,s);const s=Object.getOwnPropertyDescriptors(e);for(const[e,n]of Object.entries(s))"prototype"!==e&&Object.defineProperty(t,e,n);const i=Object.getPrototypeOf(e),r=Object.getOwnPropertyDescriptors(i.prototype);for(const[e,n]of Object.entries(r))"constructor"!==e&&Object.defineProperty(Object.getPrototypeOf(t).prototype,e,n);const o=Object.getOwnPropertyDescriptors(i);for(const[e,n]of Object.entries(o))"prototype"!==e&&Object.defineProperty(Object.getPrototypeOf(t),e,n)},Ut=customElements.get("card-maker");if(!Ut||!Ut.version||Ut.version<Rt){class t extends $t{create(t){return function(t){return Yt("card",t)}(t)}getCardSize(){return this.firstElementChild&&this.firstElementChild.getCardSize?this.firstElementChild.getCardSize():1}}Ut?Ht(Ut,t):customElements.define("card-maker",t)}const zt=customElements.get("element-maker");if(!zt||!zt.version||zt.version<Rt){class t extends $t{create(t){return function(t){return Yt("element",t)}(t)}}zt?Ht(zt,t):customElements.define("element-maker",t)}const It=customElements.get("entity-row-maker");if(!It||!It.version||It.version<Rt){class t extends $t{create(t){return function(t){const e=new Set(["call-service","divider","section","weblink"]);if(!t)return Vt("Invalid configuration given.",t);if("string"==typeof t&&(t={entity:t}),"object"!=typeof t||!t.entity&&!t.type)return Vt("Invalid configuration given.",t);const n=t.type||"default";if(e.has(n)||n.startsWith(jt))return Yt("row",t);const s=t.entity.split(".",1)[0];return Object.assign(t,{type:{alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"}[s]||"text"}),Yt("entity-row",t)}(t)}}It?Ht(It,t):customElements.define("entity-row-maker",t)}let qt=class extends kt{constructor(){super(...arguments),this.setConfig=t=>{if(!t||!t.cards||!Array.isArray(t.cards))throw new Error("Invalid configuration");this._config=t,this._cards=t.cards.map(t=>v(t))},this.shouldUpdate=t=>t.has("_config"),this.render=()=>{var t,e,n;return Q`
        <div id="wrapper">
            <h2>${null===(t=this._config)||void 0===t?void 0:t.title}</h2>
            <h3>
                ${null===(e=this._cards)||void 0===e?void 0:e.length}
                ${1===(null===(n=this._cards)||void 0===n?void 0:n.length)?"device":"devices"}
            </h3>
            <div class="grid">
                ${this._cards}
            </div>
        </div>
    `}}static get styles(){return Et`
            #wrapper {
                border-top: 1px solid var(--divider-color, #dadce0);
                margin: 0 auto;
                max-width: 960px;
                padding: 20px 0;
            }

            h2,
            h3 {
                font-family: 'Product Sans';
                margin: 6px 0 0;
                text-align: center;
            }

            h2 {
                font-size: 1.4rem;
                font-weight: 500;
            }

            h3 {
                color: var(--secondary-text-color);
                font-size: 0.9rem;
                font-weight: 400;
            }

            h2:empty,
            h3:empty {
                display: none;
            }

            .grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(1px, 250px));
                gap: 24px 20px;
                justify-content: center;
                padding: 20px 20px 0;
            }
        `}};t([xt()],qt.prototype,"hass",void 0),t([xt()],qt.prototype,"_config",void 0),t([xt()],qt.prototype,"_cards",void 0),qt=t([wt("google-home-grid")],qt);let Ft=class extends kt{constructor(){super(...arguments),this.setConfig=t=>{if(!t)throw new Error("Invalid configuration");if(!t.entity)throw new Error("Invalid configuration: field `entity`is required");if(!t.icon)throw new Error("Invalid configuration: field `icon`is required");this.hass||Ot(this),this._config=t},this.shouldUpdate=t=>{t.get("hass");return!0},this.render=()=>{var t,e,n,s,i,r;const o=(t=>{switch(t){case"blue":return Et`
                background-color: #e8f0fe;
                color: #4285f4;
            `;case"cyan":return Et`
                background-color: #e4f7fb;
                color: #12b5cb;
            `;case"green":return Et`
                background-color: #e6f4ea;
                color: #34a853;
            `;case"indigo":return Et`
                background-color: #e8eaf6;
                color: #3f51b5;
            `;case"purple":return Et`
                background-color: #f3e8fd;
                color: #ab47bc;
            `;case"red":return Et`
                background-color: #fce8e6;
                color: #ea4335;
            `;case"yellow":return Et`
                background-color: #fef7e0;
                color: #af5c00;
            `;case"none":default:return Et`
                color: #616161;
                border: 1px solid #dadce0;
            `}})(null===(t=this._config)||void 0===t?void 0:t.color);return Q`
            <button
                @click=${this._handleClick}
                data-color=${null===(e=this._config)||void 0===e?void 0:e.color}
                type="button"
            >
                <ha-icon
                    icon=${null===(n=this._config)||void 0===n?void 0:n.icon}
                    style=${o}
                ></ha-icon>
                <span
                    >${(null===(s=this._config)||void 0===s?void 0:s.name)||(null===(i=this.hass)||void 0===i?void 0:i.states[null===(r=this._config)||void 0===r?void 0:r.entity].attributes.friendly_name)}</span
                >
            </button>
        `},this._handleClick=()=>f(this,"hass-more-info",{entityId:this._config.entity},{bubbles:!0,cancelable:!1,composed:!0})}static get styles(){return Et`
            button {
                align-items: center;
                background-color: transparent;
                border: none;
                cursor: pointer;
                display: flex;
                font-family: 'Product Sans';
                font-size: 0.9rem;
                flex-direction: column;
                height: 96px;
                justify-content: center;
                margin: 0 auto;
                outline: none;
                padding: 0;
                width: 96px;
            }

            ha-icon {
                border-radius: 100%;
                padding: 17px;
            }

            span {
                margin-top: 6px;
            }
        `}};t([xt()],Ft.prototype,"hass",void 0),t([xt()],Ft.prototype,"_config",void 0),Ft=t([wt("google-home-menu-item")],Ft);let Lt=class extends kt{constructor(){super(...arguments),this.setConfig=t=>{if(!t||!t.cards||!Array.isArray(t.cards))throw new Error("Invalid configuration");this._config=t,this._cards=t.cards.map(t=>v(t))},this.shouldUpdate=t=>t.has("_config"),this.render=()=>{var t;return Q`
        <div id="wrapper">
            <h1>${null===(t=this._config)||void 0===t?void 0:t.title}</h1>
            <div class="flex">
                ${this._cards}
            </div>
        </div>
    `}}static get styles(){return Et`
            #wrapper {
                margin: 0 auto;
                max-width: 960px;
                padding: 0 0 20px 0;
            }

            h1 {
                font-family: 'Product Sans';
                font-size: 32px;
                font-weight: 400;
                text-align: center;
            }

            h1:empty {
                display: none;
            }

            .flex {
                align-items: center;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }

            .flex > * {
                flex: 0 0 96px;
            }
        `}};t([xt()],Lt.prototype,"hass",void 0),t([xt()],Lt.prototype,"_config",void 0),t([xt()],Lt.prototype,"_cards",void 0),Lt=t([wt("google-home-menu")],Lt);export{qt as GoogleHomeGrid,Tt as GoogleHomeGridItem,Lt as GoogleHomeMenu,Ft as GoogleHomeMenuItem};
