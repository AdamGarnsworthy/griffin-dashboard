window.Platform={};var logFlags={};!function(){function a(a){if(this._element=a,a.className!=this._classCache){if(this._classCache=a.className,!this._classCache)return;var b,c=this._classCache.replace(/^\s+|\s+$/g,"").split(/\s+/);for(b=0;b<c.length;b++)g.call(this,c[b])}}function b(a,b){a.className=b.join(" ")}function c(a,b,c){Object.defineProperty?Object.defineProperty(a,b,{get:c}):a.__defineGetter__(b,c)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var d=Array.prototype,e=d.indexOf,f=d.slice,g=d.push,h=d.splice,i=d.join;a.prototype={add:function(a){this.contains(a)||(g.call(this,a),b(this._element,f.call(this,0)))},contains:function(a){return-1!==e.call(this,a)},item:function(a){return this[a]||null},remove:function(a){var c=e.call(this,a);-1!==c&&(h.call(this,c,1),b(this._element,f.call(this,0)))},toString:function(){return i.call(this," ")},toggle:function(a){-1===e.call(this,a)?this.add(a):this.remove(a)}},window.DOMTokenList=a,c(Element.prototype,"classList",function(){return new a(this)})}}(),"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){this.set(a,void 0)}},window.WeakMap=c}();var SideTable;if("undefined"!=typeof WeakMap&&navigator.userAgent.indexOf("Firefox/")<0?SideTable=WeakMap:!function(){var a=Object.defineProperty,b=Date.now()%1e9;SideTable=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")},SideTable.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){this.set(a,void 0)}}}(),function(a){function b(a){u.push(a),t||(t=!0,q(d))}function c(a){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(a)||a}function d(){t=!1;var a=u;u=[],a.sort(function(a,b){return a.uid_-b.uid_});var b=!1;a.forEach(function(a){var c=a.takeRecords();e(a),c.length&&(a.callback_(c,a),b=!0)}),b&&d()}function e(a){a.nodes_.forEach(function(b){var c=p.get(b);c&&c.forEach(function(b){b.observer===a&&b.removeTransientObservers()})})}function f(a,b){for(var c=a;c;c=c.parentNode){var d=p.get(c);if(d)for(var e=0;e<d.length;e++){var f=d[e],g=f.options;if(c===a||g.subtree){var h=b(g);h&&f.enqueue(h)}}}}function g(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++v}function h(a,b){this.type=a,this.target=b,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function i(a){var b=new h(a.type,a.target);return b.addedNodes=a.addedNodes.slice(),b.removedNodes=a.removedNodes.slice(),b.previousSibling=a.previousSibling,b.nextSibling=a.nextSibling,b.attributeName=a.attributeName,b.attributeNamespace=a.attributeNamespace,b.oldValue=a.oldValue,b}function j(a,b){return w=new h(a,b)}function k(a){return x?x:(x=i(w),x.oldValue=a,x)}function l(){w=x=void 0}function m(a){return a===x||a===w}function n(a,b){return a===b?a:x&&m(a)?x:null}function o(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var p=new SideTable,q=window.msSetImmediate;if(!q){var r=[],s=String(Math.random());window.addEventListener("message",function(a){if(a.data===s){var b=r;r=[],b.forEach(function(a){a()})}}),q=function(a){r.push(a),window.postMessage(s,"*")}}var t=!1,u=[],v=0;g.prototype={observe:function(a,b){if(a=c(a),!b.childList&&!b.attributes&&!b.characterData||b.attributeOldValue&&!b.attributes||b.attributeFilter&&b.attributeFilter.length&&!b.attributes||b.characterDataOldValue&&!b.characterData)throw new SyntaxError;var d=p.get(a);d||p.set(a,d=[]);for(var e,f=0;f<d.length;f++)if(d[f].observer===this){e=d[f],e.removeListeners(),e.options=b;break}e||(e=new o(this,a,b),d.push(e),this.nodes_.push(a)),e.addListeners()},disconnect:function(){this.nodes_.forEach(function(a){for(var b=p.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){d.removeListeners(),b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}};var w,x;o.prototype={enqueue:function(a){var c=this.observer.records_,d=c.length;if(c.length>0){var e=c[d-1],f=n(e,a);if(f)return c[d-1]=f,void 0}else b(this.observer);c[d]=a},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(a){var b=this.options;b.attributes&&a.addEventListener("DOMAttrModified",this,!0),b.characterData&&a.addEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.addEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(a){var b=this.options;b.attributes&&a.removeEventListener("DOMAttrModified",this,!0),b.characterData&&a.removeEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.removeEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(a){if(a!==this.target){this.addListeners_(a),this.transientObservedNodes.push(a);var b=p.get(a);b||p.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[],a.forEach(function(a){this.removeListeners_(a);for(var b=p.get(a),c=0;c<b.length;c++)if(b[c]===this){b.splice(c,1);break}},this)},handleEvent:function(a){switch(a.stopImmediatePropagation(),a.type){case"DOMAttrModified":var b=a.attrName,c=a.relatedNode.namespaceURI,d=a.target,e=new j("attributes",d);e.attributeName=b,e.attributeNamespace=c;var g=a.attrChange===MutationEvent.ADDITION?null:a.prevValue;f(d,function(a){return!a.attributes||a.attributeFilter&&a.attributeFilter.length&&-1===a.attributeFilter.indexOf(b)&&-1===a.attributeFilter.indexOf(c)?void 0:a.attributeOldValue?k(g):e});break;case"DOMCharacterDataModified":var d=a.target,e=j("characterData",d),g=a.prevValue;f(d,function(a){return a.characterData?a.characterDataOldValue?k(g):e:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(a.target);case"DOMNodeInserted":var h,i,d=a.relatedNode,m=a.target;"DOMNodeInserted"===a.type?(h=[m],i=[]):(h=[],i=[m]);var n=m.previousSibling,o=m.nextSibling,e=j("childList",d);e.addedNodes=h,e.removedNodes=i,e.previousSibling=n,e.nextSibling=o,f(d,function(a){return a.childList?e:void 0})}l()}},a.JsMutationObserver=g}(this),!window.MutationObserver&&(window.MutationObserver=window.WebKitMutationObserver||window.JsMutationObserver,!MutationObserver))throw new Error("no mutation observer support");!function(a){function b(b,f){var g=f||{};if(!b)throw new Error("document.register: first argument `name` must not be empty");if(b.indexOf("-")<0)throw new Error("document.register: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(b)+"'.");if(g.name=b,!g.prototype)throw new Error("Options missing required prototype property");return g.lifecycle=g.lifecycle||{},g.ancestry=c(g.extends),d(g),e(g),k(g.prototype),m(b,g),g.ctor=n(g),g.ctor.prototype=g.prototype,g.prototype.constructor=g.ctor,a.ready&&a.upgradeAll(document),g.ctor}function c(a){var b=v[a];return b?c(b.extends).concat([b]):[]}function d(a){for(var b,c=a.extends,d=0;b=a.ancestry[d];d++)c=b.is&&b.tag;a.tag=c||a.name,c&&(a.is=a.name)}function e(a){if(!Object.__proto__){var b=HTMLElement.prototype;if(a.is){var c=document.createElement(a.tag);b=Object.getPrototypeOf(c)}for(var d,e=a.prototype;e&&e!==b;){var d=Object.getPrototypeOf(e);e.__proto__=d,e=d}}a.native=b}function f(a){return g(w(a.tag),a)}function g(b,c){return c.is&&b.setAttribute("is",c.is),h(b,c),b.__upgraded__=!0,a.upgradeSubtree(b),j(b),b}function h(a,b){Object.__proto__?a.__proto__=b.prototype:(i(a,b.prototype,b.native),a.__proto__=b.prototype)}function i(a,b,c){for(var d={},e=b;e!==c&&e!==HTMLUnknownElement.prototype;){for(var f,g=Object.getOwnPropertyNames(e),h=0;f=g[h];h++)d[f]||(Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(e,f)),d[f]=1);e=Object.getPrototypeOf(e)}}function j(a){a.createdCallback&&a.createdCallback()}function k(a){var b=a.setAttribute;a.setAttribute=function(a,c){l.call(this,a,c,b)};var c=a.removeAttribute;a.removeAttribute=function(a,b){l.call(this,a,b,c)}}function l(a,b,c){var d=this.getAttribute(a);c.apply(this,arguments),this.attributeChangedCallback&&this.getAttribute(a)!==d&&this.attributeChangedCallback(a,d)}function m(a,b){v[a]=b}function n(a){return function(){return f(a)}}function o(a,b){var c=v[b||a];return c?new c.ctor:w(a)}function p(a){if(!a.__upgraded__&&a.nodeType===Node.ELEMENT_NODE){var b=a.getAttribute("is")||a.localName,c=v[b];return c&&g(a,c)}}function q(b){var c=x.call(this,b);return a.upgradeAll(c),c}a||(a=window.CustomElements={flags:{}});var r=a.flags,s=Boolean(document.register),t=!r.register&&s;if(t){var u=function(){};a.registry={},a.upgradeElement=u,a.watchShadow=u,a.upgrade=u,a.upgradeAll=u,a.upgradeSubtree=u,a.observeDocument=u,a.upgradeDocument=u,a.takeRecords=u}else{var v={},w=document.createElement.bind(document),x=Node.prototype.cloneNode;document.register=b,document.createElement=o,Node.prototype.cloneNode=q,a.registry=v,a.upgrade=p}a.hasNative=s,a.useNative=t}(window.CustomElements),function(a){function b(a,c,d){var e=a.firstElementChild;if(!e)for(e=a.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)c(e,d)!==!0&&b(e,c,d),e=e.nextElementSibling;return null}function c(a,b){for(var c=a.shadowRoot;c;)d(c,b),c=c.olderShadowRoot}function d(a,d){b(a,function(a){return d(a)?!0:(c(a,d),void 0)}),c(a,d)}function e(a){return h(a)?(i(a),!0):(l(a),void 0)}function f(a){d(a,function(a){return e(a)?!0:void 0})}function g(a){return e(a)||f(a)}function h(b){if(!b.__upgraded__&&b.nodeType===Node.ELEMENT_NODE){var c=b.getAttribute("is")||b.localName,d=a.registry[c];if(d)return y.dom&&console.group("upgrade:",b.localName),a.upgrade(b),y.dom&&console.groupEnd(),!0}}function i(a){l(a),p(a)&&d(a,function(a){l(a)})}function j(a){if(B.push(a),!A){A=!0;var b=window.Platform&&window.Platform.endOfMicrotask||setTimeout;b(k)}}function k(){A=!1;for(var a,b=B,c=0,d=b.length;d>c&&(a=b[c]);c++)a();B=[]}function l(a){z?j(function(){m(a)}):m(a)}function m(a){(a.enteredViewCallback||a.__upgraded__&&y.dom)&&(y.dom&&console.group("inserted:",a.localName),p(a)&&(a.__inserted=(a.__inserted||0)+1,a.__inserted<1&&(a.__inserted=1),a.__inserted>1?y.dom&&console.warn("inserted:",a.localName,"insert/remove count:",a.__inserted):a.enteredViewCallback&&(y.dom&&console.log("inserted:",a.localName),a.enteredViewCallback())),y.dom&&console.groupEnd())}function n(a){o(a),d(a,function(a){o(a)})}function o(a){z?j(function(){_removed(a)}):_removed(a)}function o(a){(a.leftViewCallback||a.__upgraded__&&y.dom)&&(y.dom&&console.log("removed:",a.localName),p(a)||(a.__inserted=(a.__inserted||0)-1,a.__inserted>0&&(a.__inserted=0),a.__inserted<0?y.dom&&console.warn("removed:",a.localName,"insert/remove count:",a.__inserted):a.leftViewCallback&&a.leftViewCallback()))}function p(a){for(var b=a,c=window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(document)||document;b;){if(b==c)return!0;b=b.parentNode||b.host}}function q(a){if(a.shadowRoot&&!a.shadowRoot.__watched){y.dom&&console.log("watching shadow-root for: ",a.localName);for(var b=a.shadowRoot;b;)r(b),b=b.olderShadowRoot}}function r(a){a.__watched||(v(a),a.__watched=!0)}function s(a){switch(a.localName){case"style":case"script":case"template":case void 0:return!0}}function t(a){if(y.dom){var b=a[0];if(b&&"childList"===b.type&&b.addedNodes&&b.addedNodes){for(var c=b.addedNodes[0];c&&c!==document&&!c.host;)c=c.parentNode;var d=c&&(c.URL||c._URL||c.host&&c.host.localName)||"";d=d.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",a.length,d||"")}a.forEach(function(a){"childList"===a.type&&(D(a.addedNodes,function(a){s(a)||g(a)}),D(a.removedNodes,function(a){s(a)||n(a)}))}),y.dom&&console.groupEnd()}function u(){t(C.takeRecords()),k()}function v(a){C.observe(a,{childList:!0,subtree:!0})}function w(a){v(a)}function x(a){y.dom&&console.group("upgradeDocument: ",(a.URL||a._URL||"").split("/").pop()),g(a),y.dom&&console.groupEnd()}var y=window.logFlags||{},z=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;a.hasPolyfillMutations=z;var A=!1,B=[],C=new MutationObserver(t),D=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.watchShadow=q,a.upgradeAll=g,a.upgradeSubtree=f,a.observeDocument=w,a.upgradeDocument=x,a.takeRecords=u}(window.CustomElements),function(){function a(a){return"link"===a.localName&&a.getAttribute("rel")===b}var b=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none",c={selectors:["link[rel="+b+"]"],map:{link:"parseLink"},parse:function(a){if(!a.__parsed){a.__parsed=!0;var b=a.querySelectorAll(c.selectors);d(b,function(a){c[c.map[a.localName]](a)}),CustomElements.upgradeDocument(a),CustomElements.observeDocument(a)}},parseLink:function(b){a(b)&&this.parseImport(b)},parseImport:function(a){a.content&&c.parse(a.content)}},d=Array.prototype.forEach.call.bind(Array.prototype.forEach);CustomElements.parser=c}(),function(){function a(){CustomElements.parser.parse(document),CustomElements.upgradeDocument(document);var a=window.Platform&&Platform.endOfMicrotask?Platform.endOfMicrotask:setTimeout;a(function(){CustomElements.ready=!0,CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.body.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})}if("function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a){var b=document.createEvent("HTMLEvents");return b.initEvent(a,!0,!0),b}),"complete"===document.readyState)a();else{var b=window.HTMLImports?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(b,a)}}(),function(){function a(a){var b=K.call(a);return J[b]||(J[b]=b.match(L)[1].toLowerCase())}function b(c,d){var e=b[d||a(c)];return e?e(c):c}function c(b){return-1==M.indexOf(a(b))?Array.prototype.slice.call(b,0):[b]}function d(a,b){return(b||N).length?c(a.querySelectorAll(b)):[]}function e(a,b){var c={added:[],removed:[]};b.forEach(function(b){b._mutation=!0;for(var d in c)for(var e=a._records["added"==d?"inserted":"removed"],f=b[d+"Nodes"],g=f.length,h=0;g>h&&-1==c[d].indexOf(f[h]);h++)c[d].push(f[h]),e.forEach(function(a){a(f[h],b)})})}function f(c,d,e){var f=a(e);return"object"==f&&"object"==a(c[d])?S.merge(c[d],e):c[d]=b(e,f),c}function g(a,b,c,d,e){e[b]="function"!=typeof e[b]?d:S.wrap(e[b],S.applyPseudos(c,d,a.pseudos))}function h(a,b,c,d){if(d){var e={};for(var f in c)e[f.split(":")[0]]=f;for(f in b)g(a,e[f.split(":")[0]]||f,f,b[f],c)}else for(var h in b)g(a,h+":__mixin__("+O++ +")",h,b[h],c)}function i(a){return a.mixins.forEach(function(b){var c=S.mixins[b];for(var d in c){var e=c[d],f=a[d];if(f)switch(d){case"accessors":case"prototype":for(var g in e)f[g]?h(a,e[g],f[g],!0):f[g]=e[g];break;default:h(a,e,f,"events"!=d)}else a[d]=e}}),a}function j(a,b){var c,d=b.target;if(S.matchSelector(d,a.value))c=d;else if(S.matchSelector(d,a.value+" *"))for(var e=d.parentNode;!c;)S.matchSelector(e,a.value)&&(c=e),e=e.parentNode;return c?a.listener=a.listener.bind(c):null}function k(a){if(a.type.match("touch"))a.target.__touched__=!0;else if(a.target.__touched__&&a.type.match("mouse"))return delete a.target.__touched__,void 0;return!0}function l(a){var b="over"==a;return{attach:"OverflowEvent"in y?"overflowchanged":[],condition:function(c){return c.flow=a,c.type==a+"flow"||0===c.orient&&c.horizontalOverflow==b||1==c.orient&&c.verticalOverflow==b||2==c.orient&&c.horizontalOverflow==b&&c.verticalOverflow==b}}}function m(a,b,c,d){d?b[a]=c[a]:Object.defineProperty(b,a,{writable:!0,enumerable:!0,value:c[a]})}function n(a,b){var c=Object.getOwnPropertyDescriptor(a,"target");for(var d in b)P[d]||m(d,a,b,c);a.baseEvent=b}function o(a,b){return{value:a.boolean?"":b,method:a.boolean&&!b?"removeAttribute":"setAttribute"}}function p(a,b,c,d){var e=o(b,d);a[e.method](c,e.value)}function q(a,b,c,d,e){for(var f=b.property?[a.xtag[b.property]]:b.selector?S.query(a,b.selector):[],g=f.length;g--;)f[g][e](c,d)}function r(a,b,c){a.__view__&&a.__view__.updateBindingValue(a,b,c)}function s(a,b,c,d,e,f){var g=c.split(":"),h=g[0];if("get"==h)g[0]=b,a.prototype[b].get=S.applyPseudos(g.join(":"),d[c],a.pseudos);else if("set"==h){g[0]=b;var i=a.prototype[b].set=S.applyPseudos(g.join(":"),e?function(a){this.xtag._skipSet=!0,this.xtag._skipAttr||p(this,e,f,a),this.xtag._skipAttr&&e.skip&&delete this.xtag._skipAttr,d[c].call(this,e.boolean?!!a:a),r(this,f,a),delete this.xtag._skipSet}:d[c]?function(a){d[c].call(this,a),r(this,f,a)}:null,a.pseudos);e&&(e.setter=i)}else a.prototype[b][c]=d[c]}function t(a,b){a.prototype[b]={};var c=a.accessors[b],d=c.attribute,e=d&&d.name?d.name.toLowerCase():b;d&&(d.key=b,a.attributes[e]=d);for(var f in c)s(a,b,f,c,d,e);if(d){if(!a.prototype[b].get){var g=(d.boolean?"has":"get")+"Attribute";a.prototype[b].get=function(){return this[g](e)}}a.prototype[b].set||(a.prototype[b].set=function(a){p(this,d,e,a),r(this,e,a)})}}function u(a){R[a]=(R[a]||[]).filter(function(b){return(b.tags=b.tags.filter(function(b){return b!=a&&!S.tags[b]})).length||b.fn()})}function v(a,b,c){a.__tap__||(a.__tap__={click:"mousedown"==c.type},a.__tap__.click?a.addEventListener("click",b.observer):(a.__tap__.scroll=b.observer.bind(a),window.addEventListener("scroll",a.__tap__.scroll,!0),a.addEventListener("touchmove",b.observer),a.addEventListener("touchcancel",b.observer),a.addEventListener("touchend",b.observer))),a.__tap__.click||(a.__tap__.x=c.touches[0].pageX,a.__tap__.y=c.touches[0].pageY)}function w(a,b){a.__tap__&&(a.__tap__.click?a.removeEventListener("click",b.observer):(window.removeEventListener("scroll",a.__tap__.scroll,!0),a.removeEventListener("touchmove",b.observer),a.removeEventListener("touchcancel",b.observer),a.removeEventListener("touchend",b.observer)),delete a.__tap__)}function x(a,b,c){var d=c.changedTouches[0],e=b.gesture.tolerance;return d.pageX<a.__tap__.x+e&&d.pageX>a.__tap__.x-e&&d.pageY<a.__tap__.y+e&&d.pageY>a.__tap__.y-e?!0:void 0}var y=window,z=document,A=function(){},B=function(){return!0},C=/([\w-]+(?:\([^\)]+\))?)/g,D=/(\w*)(?:\(([^\)]*)\))?/,E=/(\d+)/g,F={action:function(a,b){return a.value.match(E).indexOf(String(b.keyCode))>-1==("keypass"==a.name)||null}},G=function(){var a=y.getComputedStyle(z.documentElement,""),b=(Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/)||""===a.OLink&&["","o"])[1];return{dom:"ms"==b?"MS":b,lowercase:b,css:"-"+b+"-",js:"ms"==b?b:b[0].toUpperCase()+b.substr(1)}}(),H=Element.prototype.matchesSelector||Element.prototype[G.lowercase+"MatchesSelector"],I=y.MutationObserver||y[G.js+"MutationObserver"],J={},K=J.toString,L=/\s([a-zA-Z]+)/;b.object=function(a){var c={};for(var d in a)c[d]=b(a[d]);return c},b.array=function(a){for(var c=a.length,d=new Array(c);c--;)d[c]=b(a[c]);return d};var M=["undefined","null","number","boolean","string","function"],N="",O=0,P={};for(var Q in document.createEvent("CustomEvent"))P[Q]=1;var R={},S={tags:{},defaultOptions:{pseudos:[],mixins:[],events:{},methods:{},accessors:{},lifecycle:{},attributes:{},prototype:{xtag:{get:function(){return this.__xtag__?this.__xtag__:this.__xtag__={data:{}}}}}},register:function(a,b){var d;if("string"==typeof a){d=a.toLowerCase();var e=b.prototype;delete b.prototype;var f=S.tags[d]=i(S.merge({},S.defaultOptions,b));for(var g in f.events)f.events[g]=S.parseEvent(g,f.events[g]);for(g in f.lifecycle)f.lifecycle[g.split(":")[0]]=S.applyPseudos(g,f.lifecycle[g],f.pseudos);for(g in f.methods)f.prototype[g.split(":")[0]]={value:S.applyPseudos(g,f.methods[g],f.pseudos),enumerable:!0};for(g in f.accessors)t(f,g);var h=f.lifecycle.created||f.lifecycle.ready;f.prototype.createdCallback={enumerable:!0,value:function(){var a=this;S.addEvents(this,f.events),f.mixins.forEach(function(b){S.mixins[b].events&&S.addEvents(a,S.mixins[b].events)});var b=h?h.apply(this,c(arguments)):null;for(var d in f.attributes){var e=f.attributes[d],g=this.hasAttribute(d);(g||e.boolean)&&(this[e.key]=e.boolean?g:this.getAttribute(d))}return f.pseudos.forEach(function(b){b.onAdd.call(a,b)}),b}},f.lifecycle.inserted&&(f.prototype.enteredViewCallback={value:f.lifecycle.inserted,enumerable:!0}),f.lifecycle.removed&&(f.prototype.leftViewCallback={value:f.lifecycle.removed,enumerable:!0}),f.lifecycle.attributeChanged&&(f.prototype.attributeChangedCallback={value:f.lifecycle.attributeChanged,enumerable:!0});var j=f.prototype.setAttribute||HTMLElement.prototype.setAttribute;f.prototype.setAttribute={writable:!0,enumberable:!0,value:function(a,b){var c=f.attributes[a.toLowerCase()];this.xtag._skipAttr||j.call(this,a,c&&c.boolean?"":b),c&&(c.setter&&!this.xtag._skipSet&&(this.xtag._skipAttr=!0,c.setter.call(this,c.boolean?!0:b)),b=c.skip?c.boolean?this.hasAttribute(a):this.getAttribute(a):b,q(this,c,a,c.boolean?"":b,"setAttribute")),delete this.xtag._skipAttr}};var k=f.prototype.removeAttribute||HTMLElement.prototype.removeAttribute;f.prototype.removeAttribute={writable:!0,enumberable:!0,value:function(a){var b=f.attributes[a.toLowerCase()];this.xtag._skipAttr||k.call(this,a),b&&(b.setter&&!this.xtag._skipSet&&(this.xtag._skipAttr=!0,b.setter.call(this,b.boolean?!1:void 0)),q(this,b,a,void 0,"removeAttribute")),delete this.xtag._skipAttr}};var l=e?e:b["extends"]?Object.create(z.createElement(b["extends"]).constructor).prototype:y.HTMLElement.prototype,m={prototype:Object.create(l,f.prototype)};b["extends"]&&(m["extends"]=b["extends"]);var n=z.register(d,m);return u(d),n}},ready:function(a,b){var d={tags:c(a),fn:b};d.tags.reduce(function(a,b){return S.tags[b]?a:((R[b]=R[b]||[]).push(d),void 0)},!0)&&b()},mixins:{},prefix:G,captureEvents:["focus","blur","scroll","underflow","overflow","overflowchanged","DOMMouseScroll"],customEvents:{overflow:l("over"),underflow:l("under"),animationstart:{attach:[G.dom+"AnimationStart"]},animationend:{attach:[G.dom+"AnimationEnd"]},transitionend:{attach:[G.dom+"TransitionEnd"]},move:{attach:["mousemove","touchmove"],condition:k},enter:{attach:["mouseover","touchenter"],condition:k},leave:{attach:["mouseout","touchleave"],condition:k},scrollwheel:{attach:["DOMMouseScroll","mousewheel"],condition:function(a){return a.delta=a.wheelDelta?a.wheelDelta/40:Math.round(-1*(a.detail/3.5)),!0}},tapstart:{observe:{mousedown:z,touchstart:z},condition:k},tapend:{observe:{mouseup:z,touchend:z},condition:k},tapmove:{attach:["tapstart","dragend","touchcancel"],condition:function(a,b){switch(a.type){case"move":return!0;case"dragover":var c=b.lastDrag||{};return b.lastDrag=a,c.pageX!=a.pageX&&c.pageY!=a.pageY||null;case"tapstart":b.move||(b.current=this,b.move=S.addEvents(this,{move:b.listener,dragover:b.listener}),b.tapend=S.addEvent(z,"tapend",b.listener));break;case"tapend":case"dragend":case"touchcancel":a.touches.length||(b.move&&S.removeEvents(b.current,b.move||{}),b.tapend&&S.removeEvent(z,b.tapend||{}),delete b.lastDrag,delete b.current,delete b.tapend,delete b.move)}}}},pseudos:{__mixin__:{},keypass:F,keyfail:F,delegate:{action:j},within:{action:j,onAdd:function(a){var b=a.source.condition;b&&(a.source.condition=function(c,d){return S.query(this,a.value).filter(function(a){return a==c.target||a.contains?a.contains(c.target):null})[0]?b.call(this,c,d):null})}},preventable:{action:function(a,b){return!b.defaultPrevented}}},clone:b,typeOf:a,toArray:c,wrap:function(a,b){return function(){var d=c(arguments),e=a.apply(this,d);return b.apply(this,d),e}},merge:function(b,c,d){if("string"==a(c))return f(b,c,d);for(var e=1,g=arguments.length;g>e;e++){var h=arguments[e];for(var i in h)f(b,i,h[i])}return b},uid:function(){return Math.random().toString(36).substr(2,10)},query:d,skipTransition:function(a,b){var c=G.js+"TransitionProperty";a.style[c]=a.style.transitionProperty="none";var d=b();return S.requestFrame(function(){S.requestFrame(function(){a.style[c]=a.style.transitionProperty="",d&&S.requestFrame(d)})})},requestFrame:function(){var a=y.requestAnimationFrame||y[G.lowercase+"RequestAnimationFrame"]||function(a){return y.setTimeout(a,20)};return function(b){return a(b)}}(),cancelFrame:function(){var a=y.cancelAnimationFrame||y[G.lowercase+"CancelAnimationFrame"]||y.clearTimeout;return function(b){return a(b)}}(),matchSelector:function(a,b){return H.call(a,b)},set:function(a,b,c){a[b]=c,window.CustomElements&&CustomElements.upgradeAll(a)},innerHTML:function(a,b){S.set(a,"innerHTML",b)},hasClass:function(a,b){return a.className.split(" ").indexOf(b.trim())>-1},addClass:function(a,b){var c=a.className.trim().split(" ");return b.trim().split(" ").forEach(function(a){~c.indexOf(a)||c.push(a)}),a.className=c.join(" ").trim(),a},removeClass:function(a,b){var c=b.trim().split(" ");return a.className=a.className.trim().split(" ").filter(function(a){return a&&!~c.indexOf(a)}).join(" "),a},toggleClass:function(a,b){return S[S.hasClass(a,b)?"removeClass":"addClass"].call(null,a,b)},queryChildren:function(a,b){var d=a.id,e=a.id=d||"x_"+S.uid(),f="#"+e+" > ";b=f+(b+"").replace(",",","+f,"g");var g=a.parentNode.querySelectorAll(b);return d||a.removeAttribute("id"),c(g)},createFragment:function(a){var b=z.createDocumentFragment();if(a){for(var d=b.appendChild(z.createElement("div")),e=c(a.nodeName?arguments:!(d.innerHTML=a)||d.children),f=e.length,g=0;f>g;)b.insertBefore(e[g++],d);b.removeChild(d)}return b},manipulate:function(a,b){var c=a.nextSibling,d=a.parentNode,e=z.createDocumentFragment(),f=b.call(e.appendChild(a),e)||a;c?d.insertBefore(f,c):d.appendChild(f)},applyPseudos:function(a,b,d,e){var f=b,g={};if(a.match(":"))for(var h=a.match(C),i=h.length;--i;)h[i].replace(D,function(b,j,k){if(!S.pseudos[j])throw"pseudo not found: "+j+" "+h;var l=g[i]=Object.create(S.pseudos[j]);l.key=a,l.name=j,l.value=k,l.arguments=(k||"").split(","),l.action=l.action||B,l.source=e;var m=f;f=function(){var b=c(arguments),d={key:a,name:j,value:k,source:e,arguments:l.arguments,listener:m},f=l.action.apply(this,[d].concat(b));return null===f||f===!1?f:d.listener.apply(this,b)},d&&l.onAdd&&(d.nodeName?l.onAdd.call(d,l):d.push(l))});for(var j in g)g[j].onCompiled&&(f=g[j].onCompiled(f,g[j])||f);return f},removePseudos:function(a,b){b.forEach(function(b){b.onRemove&&b.onRemove.call(a,b)})},parseEvent:function(a,b){var d=a.split(":"),e=d.shift(),f=S.customEvents[e],g=S.merge({type:e,stack:A,condition:B,attach:[],_attach:[],pseudos:"",_pseudos:[],onAdd:A,onRemove:A},f||{});g.attach=c(g.base||g.attach),g.chain=e+(g.pseudos.length?":"+g.pseudos:"")+(d.length?":"+d.join(":"):"");var h=g.condition;g.condition=function(a){return a.touches,a.targetTouches,h.apply(this,c(arguments))};var i=S.applyPseudos(g.chain,b,g._pseudos,g);if(g.stack=function(a){a.touches,a.targetTouches;var b=a.detail||{};return b.__stack__?b.__stack__==i?(a.stopPropagation(),a.cancelBubble=!0,i.apply(this,c(arguments))):void 0:i.apply(this,c(arguments))},g.listener=function(a){var b=c(arguments),d=g.condition.apply(this,b.concat([g]));return d?a.type==e?g.stack.apply(this,b):(S.fireEvent(a.target,e,{baseEvent:a,detail:d!==!0&&(d.__stack__=i)?d:{__stack__:i}}),void 0):d},g.attach.forEach(function(a){g._attach.push(S.parseEvent(a,g.listener))}),f&&f.observe&&!f.__observing__){f.observer=function(a){var b=g.condition.apply(this,c(arguments).concat([f]));return b?(S.fireEvent(a.target,e,{baseEvent:a,detail:b!==!0?b:{}}),void 0):b};for(var j in f.observe)S.addEvent(f.observe[j]||document,j,f.observer,!0);f.__observing__=!0}return g},addEvent:function(a,b,c,d){var e="function"==typeof c?S.parseEvent(b,c):c;return e._pseudos.forEach(function(b){b.onAdd.call(a,b)}),e._attach.forEach(function(b){S.addEvent(a,b.type,b)}),e.onAdd.call(a,e,e.listener),a.addEventListener(e.type,e.stack,d||S.captureEvents.indexOf(e.type)>-1),e},addEvents:function(a,b){var c={};for(var d in b)c[d]=S.addEvent(a,d,b[d]);return c},removeEvent:function(a,b,c){c=c||b,c.onRemove.call(a,c,c.listener),S.removePseudos(a,c._pseudos),c._attach.forEach(function(b){S.removeEvent(a,b)}),a.removeEventListener(c.type,c.stack)},removeEvents:function(a,b){for(var c in b)S.removeEvent(a,b[c])},fireEvent:function(a,b,c,d){var e=z.createEvent("CustomEvent");c=c||{},d&&console.warn("fireEvent has been modified"),e.initCustomEvent(b,c.bubbles!==!1,c.cancelable!==!1,c.detail),c.baseEvent&&n(e,c.baseEvent);try{a.dispatchEvent(e)}catch(f){console.warn("This error may have been caused by a change in the fireEvent method",f)}},addObserver:function(a,b,c){a._records||(a._records={inserted:[],removed:[]},I?(a._observer=new I(function(b){e(a,b)}),a._observer.observe(a,{subtree:!0,childList:!0,attributes:!1,characterData:!1})):["Inserted","Removed"].forEach(function(b){a.addEventListener("DOMNode"+b,function(c){c._mutation=!0,a._records[b.toLowerCase()].forEach(function(a){a(c.target,c)})},!1)})),-1==a._records[b].indexOf(c)&&a._records[b].push(c)},removeObserver:function(a,b,c){var d=a._records;d&&c?d[b].splice(d[b].indexOf(c),1):d[b]=[]}},T=!1,U=null;z.addEventListener("mousedown",function(a){T=!0,U=a.target},!0),z.addEventListener("mouseup",function(){T=!1,U=null},!0),z.addEventListener("dragend",function(){T=!1,U=null},!0);var V={touches:{configurable:!0,get:function(){return this.__touches__||(this.identifier=0)||(this.__touches__=T?[this]:[])}},targetTouches:{configurable:!0,get:function(){return this.__targetTouches__||(this.__targetTouches__=T&&this.currentTarget&&(this.currentTarget==U||this.currentTarget.contains&&this.currentTarget.contains(U))?(this.identifier=0)||[this]:[])}},changedTouches:{configurable:!0,get:function(){return this.__changedTouches__||(this.identifier=0)||(this.__changedTouches__=[this])}}};for(Q in V)UIEvent.prototype[Q]=V[Q],Object.defineProperty(UIEvent.prototype,Q,V[Q]);S.customEvents.tap={observe:{mousedown:document,touchstart:document},gesture:{tolerance:8},condition:function(a,b){var c=a.target;switch(a.type){case"touchstart":return c.__tap__&&c.__tap__.click&&w(c,b),v(c,b,a),void 0;case"mousedown":return c.__tap__||v(c,b,a),void 0;case"scroll":case"touchcancel":return w(this,b),void 0;case"touchmove":case"touchend":return this.__tap__&&!x(this,b,a)?(w(this,b),void 0):"touchend"==a.type||null;case"click":return w(this,b),!0}}},y.xtag=S,"function"==typeof define&&define.amd&&define(S),z.addEventListener("WebComponentsReady",function(){S.fireEvent(z.body,"DOMComponentsLoaded")})}(),function(){xtag.register("x-appbar",{lifecycle:{created:function(){var a=xtag.queryChildren(this,"header")[0];a||(a=document.createElement("header"),this.appendChild(a)),this.xtag.data.header=a,this.subheading=this.subheading}},accessors:{heading:{attribute:{},get:function(){return this.xtag.data.header.innerHTML},set:function(a){this.xtag.data.header.innerHTML=a}},subheading:{attribute:{},get:function(){return this.getAttribute("subheading")||""},set:function(a){this.xtag.data.header.setAttribute("subheading",a)}}}})}(),function(){function a(a){var b=new Date(a.valueOf());return b.setHours(0),b.setMinutes(0),b.setSeconds(0),b.setMilliseconds(0),b}function b(a,b){a.appendChild(b)}function c(a){return parseInt(a,10)}function d(a){var b=c(a);return b===a&&!isNaN(b)&&b>=0&&6>=b}function e(a){return a instanceof Date&&!!a.getTime&&!isNaN(a.getTime())}function f(a){return a&&a.isArray?a.isArray():"[object Array]"===Object.prototype.toString.call(a)}function g(a){var b=a.split("."),c=b.shift(),d=document.createElement(c);return d[W]=b.join(" "),d}function h(){var a=document.documentElement,b={left:a.scrollLeft||document.body.scrollLeft||0,top:a.scrollTop||document.body.scrollTop||0,width:a.clientWidth,height:a.clientHeight};return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function i(a){var b=a.getBoundingClientRect(),c=h(),d=c.left,e=c.top;
return{left:b.left+d,right:b.right+d,top:b.top+e,bottom:b.bottom+e,width:b.width,height:b.height}}function j(a,b){xtag.addClass(a,b)}function k(a,b){xtag.removeClass(a,b)}function l(a,b){return xtag.hasClass(a,b)}function m(a){return a.getFullYear()}function n(a){return a.getMonth()}function o(a){return a.getDate()}function p(a){return a.getDay()}function q(a,b){var c=a.toString(),d=new Array(b).join("0");return(d+c).substr(-b)}function r(a){return[q(m(a),4),q(n(a)+1,2),q(o(a),2)].join("-")}function s(b){if(e(b))return b;var c=X.exec(b);return c?a(new Date(c[1],c[2]-1,c[3])):null}function t(b){if(e(b))return b;var c=s(b);if(c)return c;var d=Date.parse(b);return isNaN(d)?null:a(new Date(d))}function u(a){var b;if(f(a))b=a.slice(0);else{if(e(a))return[a];if(!("string"==typeof a&&a.length>0))return null;try{if(b=JSON.parse(a),!f(b))return console.warn("invalid list of ranges",a),null}catch(c){var d=t(a);return d?[d]:(console.warn("unable to parse",a,"as JSON or single date"),null)}}for(var g=0;g<b.length;g++){var h=b[g];if(!e(h))if("string"==typeof h){var i=t(h);if(!i)return console.warn("unable to parse date",h),null;b[g]=i}else{if(!f(h)||2!==h.length)return console.warn("invalid range value: ",h),null;var j=t(h[0]);if(!j)return console.warn("unable to parse start date",h[0],"from range",h),null;var k=t(h[1]);if(!k)return console.warn("unable to parse end date",h[1],"from range",h),null;if(j.valueOf()>k.valueOf())return console.warn("invalid range",h,": start date is after end date"),null;b[g]=[j,k]}}return b}function v(b,c,d,e){return void 0===c&&(c=m(b)),void 0===d&&(d=n(b)),void 0===e&&(e=o(b)),a(new Date(c,d,e))}function w(a,b){return b||(b=(new Date).getFullYear()),new Date(b,a+1,0).getDate()}function x(a,b,c,d){return v(a,m(a)+b,n(a)+c,o(a)+d)}function y(a){var b=a.getDate(),c=w(a.getMonth()+1,a.getFullYear());return b>c&&(b=c),console.log(new Date(a.getFullYear(),a.getMonth()+1,b).toString()),new Date(a.getFullYear(),a.getMonth()+1,b)}function z(a){var b=a.getDate(),c=w(a.getMonth()-1,a.getFullYear());return b>c&&(b=c),new Date(a.getFullYear(),a.getMonth()-1,b)}function A(a,b){b=c(b),d(b)||(b=0);for(var e=0;7>e;e++){if(p(a)===b)return a;a=F(a)}throw"unable to find week start"}function B(a,b){b=c(b),d(b)||(b=6);for(var e=0;7>e;e++){if(p(a)===b)return a;a=E(a)}throw"unable to find week end"}function C(b){return b=new Date(b.valueOf()),b.setDate(1),a(b)}function D(a){return F(x(a,0,1,0))}function E(a){return x(a,0,0,1)}function F(a){return x(a,0,0,-1)}function G(a,b){if(b){b=void 0===b.length?[b]:b;var c=!1;return b.forEach(function(b){2===b.length?H(b[0],b[1],a)&&(c=!0):r(b)===r(a)&&(c=!0)}),c}}function H(a,b,c){return r(a)<=r(c)&&r(c)<=r(b)}function I(a){a.sort(function(a,b){var c=e(a)?a:a[0],d=e(b)?b:b[0];return c.valueOf()-d.valueOf()})}function J(a){var c=g("div.controls"),d=g("span.prev"),e=g("span.next");return d.innerHTML=a.prev,e.innerHTML=a.next,b(c,d),b(c,e),c}function K(a){var b=this;a=a||{},b._span=a.span||1,b._multiple=a.multiple||!1,b._viewDate=b._sanitizeViewDate(a.view,a.chosen),b._chosenRanges=b._sanitizeChosenRanges(a.chosen,a.view),b._firstWeekdayNum=a.firstWeekdayNum||0,b._el=g("div.calendar"),b._labels=R(),b._customRenderFn=null,b._renderRecursionFlag=!1,b.render(!0)}function L(a){a=a.slice(0),I(a);for(var b=[],c=0;c<a.length;c++){var d,f,g,h,i=a[c],j=b.length>0?b[b.length-1]:null;if(e(i)?d=f=i:(d=i[0],f=i[1]),i=G(d,f)?d:[d,f],e(j))g=h=j;else{if(!j){b.push(i);continue}g=j[0],h=j[1]}if(G(d,[j])||G(F(d),[j])){var k=g.valueOf()<d.valueOf()?g:d,l=h.valueOf()>f.valueOf()?h:f,m=G(k,l)?k:[k,l];b[b.length-1]=m}else b.push(i)}return b}function M(a,b){var c,d=b.getAttribute("data-date"),e=t(d);l(b,V)?(a.xtag.dragType=U,c="datetoggleoff"):(a.xtag.dragType=T,c="datetoggleon"),a.xtag.dragStartEl=b,a.xtag.dragAllowTap=!0,a.noToggle||xtag.fireEvent(a,c,{detail:{date:e,iso:d}}),a.setAttribute("active",!0),b.setAttribute("active",!0)}function N(a,b){var c=b.getAttribute("data-date"),d=t(c);b!==a.xtag.dragStartEl&&(a.xtag.dragAllowTap=!1),a.noToggle||(a.xtag.dragType!==T||l(b,V)?a.xtag.dragType===U&&l(b,V)&&xtag.fireEvent(a,"datetoggleoff",{detail:{date:d,iso:c}}):xtag.fireEvent(a,"datetoggleon",{detail:{date:d,iso:c}})),a.xtag.dragType&&b.setAttribute("active",!0)}function O(){for(var a=xtag.query(document,"x-calendar"),b=0;b<a.length;b++){var c=a[b];c.xtag.dragType=null,c.xtag.dragStartEl=null,c.xtag.dragAllowTap=!1,c.removeAttribute("active")}for(var d=xtag.query(document,"x-calendar .day[active]"),e=0;e<d.length;e++)d[e].removeAttribute("active")}function P(a,b,c){return c.left<=a&&a<=c.right&&c.top<=b&&b<=c.bottom}var Q=0,R=function(){return{prev:"←",next:"→",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},S=a(new Date),T="add",U="remove",V="chosen",W="className",X=/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/,Y=K.prototype;Y.makeMonth=function(a){if(!e(a))throw"Invalid view date!";var c=this.firstWeekdayNum,d=this.chosen,f=this.labels,h=n(a),i=A(C(a),c),k=g("div.month"),l=g("div.month-label");l.textContent=f.months[h]+" "+m(a),b(k,l);for(var p=g("div.weekday-labels"),q=0;7>q;q++){var s=(c+q)%7,t=g("span.weekday-label");t.textContent=f.weekdays[s],b(p,t)}b(k,p);var u=g("div.week"),v=i,w=42;for(q=0;w>q;q++){var x=g("span.day");if(x.setAttribute("data-date",r(v)),x.textContent=o(v),n(v)!==h&&j(x,"badmonth"),G(v,d)&&j(x,V),G(v,S)&&j(x,"today"),b(u,x),v=E(v),0===(q+1)%7){b(k,u),u=g("div.week");var y=n(v)>h||n(v)<h&&m(v)>m(i);if(y)break}}return k},Y._sanitizeViewDate=function(a,b){b=void 0===b?this.chosen:b;var c;if(e(a))c=a;else if(e(b))c=b;else if(f(b)&&b.length>0){var d=b[0];c=e(d)?d:d[0]}else c=S;return c},Y._sanitizeChosenRanges=function(a,b){b=void 0===b?this.view:b;var c;c=e(a)?[a]:f(a)?a:null!==a&&void 0!==a&&b?[b]:[];var d=L(c);if(!this.multiple&&d.length>0){var g=d[0];return e(g)?[g]:[g[0]]}return d},Y.addDate=function(a,b){e(a)&&(b?(this.chosen.push(a),this.chosen=this.chosen):this.chosen=[a])},Y.removeDate=function(a){if(e(a))for(var b=this.chosen.slice(0),c=0;c<b.length;c++){var d=b[c];if(G(a,[d])){if(b.splice(c,1),f(d)){var g=d[0],h=d[1],i=F(a),j=E(a);G(i,[d])&&b.push([g,i]),G(j,[d])&&b.push([j,h])}this.chosen=L(b);break}}},Y.hasChosenDate=function(a){return G(a,this._chosenRanges)},Y.hasVisibleDate=function(a,b){var c=b?this.firstVisibleMonth:this.firstVisibleDate,d=b?D(this.lastVisibleMonth):this.lastVisibleDate;return G(a,[[c,d]])},Y.render=function(a){var c,d=this._span;if(a){var e,f=xtag.query(this.el,".day");for(c=0;c<f.length;c++)if(e=f[c],e.hasAttribute("data-date")){var g=e.getAttribute("data-date"),h=s(g);h&&(G(h,this._chosenRanges)?j(e,V):k(e,V),G(h,[S])?j(e,"today"):k(e,"today"))}}else{this.el.innerHTML="";var i=this.firstVisibleMonth;for(c=0;d>c;c++)b(this.el,this.makeMonth(i)),i=x(i,0,1,0)}this._callCustomRenderer()},Y._callCustomRenderer=function(){if(this._customRenderFn){if(this._renderRecursionFlag)throw"Error: customRenderFn causes recursive loop of rendering calendar; make sure your custom rendering function doesn't modify attributes of the x-calendar that would require a re-render!";for(var a=xtag.query(this.el,".day"),b=0;b<a.length;b++){var c=a[b],d=c.getAttribute("data-date"),e=s(d);this._renderRecursionFlag=!0,this._customRenderFn(c,e?e:null,d),this._renderRecursionFlag=!1}}},Object.defineProperties(Y,{el:{get:function(){return this._el}},multiple:{get:function(){return this._multiple},set:function(a){this._multiple=a,this.chosen=this._sanitizeChosenRanges(this.chosen),this.render(!0)}},span:{get:function(){return this._span},set:function(a){var b=c(a);this._span=!isNaN(b)&&b>=0?b:0,this.render(!1)}},view:{attribute:{},get:function(){return this._viewDate},set:function(a){var b=this._sanitizeViewDate(a),c=this._viewDate;this._viewDate=b,this.render(n(c)===n(b)&&m(c)===m(b))}},chosen:{get:function(){return this._chosenRanges},set:function(a){this._chosenRanges=this._sanitizeChosenRanges(a),this.render(!0)}},firstWeekdayNum:{get:function(){return this._firstWeekdayNum},set:function(a){a=c(a),d(a)||(a=0),this._firstWeekdayNum=a,this.render(!1)}},lastWeekdayNum:{get:function(){return(this._firstWeekdayNum+6)%7}},customRenderFn:{get:function(){return this._customRenderFn},set:function(a){this._customRenderFn=a,this.render(!0)}},chosenString:{get:function(){if(this.multiple){for(var a=this.chosen.slice(0),b=0;b<a.length;b++){var c=a[b];a[b]=e(c)?r(c):[r(c[0]),r(c[1])]}return JSON.stringify(a)}return this.chosen.length>0?r(this.chosen[0]):""}},firstVisibleMonth:{get:function(){return C(this.view)}},lastVisibleMonth:{get:function(){return x(this.firstVisibleMonth,0,Math.max(0,this.span-1),0)}},firstVisibleDate:{get:function(){return A(this.firstVisibleMonth,this.firstWeekdayNum)}},lastVisibleDate:{get:function(){return B(D(this.lastVisibleMonth),this.lastWeekdayNum)}},labels:{get:function(){return this._labels},set:function(a){var b=this.labels;for(var c in b)if(c in a){var d=this._labels[c],e=a[c];if(f(d)){if(!f(e)||d.length!==e.length)throw"invalid label given for '"+c+"': expected array of "+d.length+" labels, got "+JSON.stringify(e);e=e.slice(0);for(var g=0;g<e.length;g++)e[g]=e[g].toString?e[g].toString():String(e[g])}else e=String(e);b[c]=e}this.render(!1)}}});var Z=null,$=null;xtag.register("x-calendar",{lifecycle:{created:function(){this.innerHTML="";var a=this.getAttribute("chosen");this.xtag.calObj=new K({span:this.getAttribute("span"),view:t(this.getAttribute("view")),chosen:u(a),multiple:this.hasAttribute("multiple"),firstWeekdayNum:this.getAttribute("first-weekday-num")}),b(this,this.xtag.calObj.el),this.xtag.calControls=null,this.xtag.dragType=null,this.xtag.dragStartEl=null,this.xtag.dragAllowTap=!1},inserted:function(){Z||(Z=xtag.addEvent(document,"mouseup",O)),$||($=xtag.addEvent(document,"touchend",O)),this.render(!1)},removed:function(){0===xtag.query(document,"x-calendar").length&&(Z&&(xtag.removeEvent(document,"mouseup",Z),Z=null),$&&(xtag.removeEvent(document,"touchend",$),$=null))}},events:{"tap:delegate(.next)":function(a){var b=a.currentTarget;b.nextMonth(),xtag.fireEvent(b,"nextmonth")},"tap:delegate(.prev)":function(a){var b=a.currentTarget;b.prevMonth(),xtag.fireEvent(b,"prevmonth")},"tapstart:delegate(.day)":function(a){(a.touches||!a.button||a.button===Q)&&(a.preventDefault(),a.baseEvent&&a.baseEvent.preventDefault(),M(a.currentTarget,this))},touchmove:function(a){if(a.touches&&a.touches.length>0){var b=a.currentTarget;if(b.xtag.dragType)for(var c=a.touches[0],d=xtag.query(b,".day"),e=0;e<d.length;e++){var f=d[e];P(c.pageX,c.pageY,i(f))?N(b,f):f.removeAttribute("active")}}},"mouseover:delegate(.day)":function(a){var b=a.currentTarget,c=this;N(b,c)},"mouseout:delegate(.day)":function(){var a=this;a.removeAttribute("active")},"tapend:delegate(.day)":function(a){var b=a.currentTarget;if(b.xtag.dragAllowTap){var c=this,d=c.getAttribute("data-date"),e=t(d);xtag.fireEvent(b,"datetap",{detail:{date:e,iso:d}})}},datetoggleon:function(a){var b=this;b.toggleDateOn(a.detail.date,b.multiple)},datetoggleoff:function(a){var b=this;b.toggleDateOff(a.detail.date)}},accessors:{controls:{attribute:{"boolean":!0},set:function(a){a&&!this.xtag.calControls&&(this.xtag.calControls=J(this.xtag.calObj.labels),b(this,this.xtag.calControls))}},multiple:{attribute:{"boolean":!0},get:function(){return this.xtag.calObj.multiple},set:function(a){this.xtag.calObj.multiple=a,this.chosen=this.chosen}},span:{attribute:{},get:function(){return this.xtag.calObj.span},set:function(a){this.xtag.calObj.span=a}},view:{attribute:{},get:function(){return this.xtag.calObj.view},set:function(a){var b=t(a);b&&(this.xtag.calObj.view=b)}},chosen:{attribute:{skip:!0},get:function(){var a=this.xtag.calObj.chosen;if(this.multiple)return this.xtag.calObj.chosen;if(a.length>0){var b=a[0];return e(b)?b:b[0]}return null},set:function(a){var b=this.multiple?u(a):t(a);this.xtag.calObj.chosen=b?b:null,this.xtag.calObj.chosenString?this.setAttribute("chosen",this.xtag.calObj.chosenString):this.removeAttribute("chosen")}},firstWeekdayNum:{attribute:{name:"first-weekday-num"},set:function(a){this.xtag.calObj.firstWeekdayNum=a}},noToggle:{attribute:{"boolean":!0,name:"notoggle"},set:function(a){a&&(this.chosen=null)}},firstVisibleMonth:{get:function(){return this.xtag.calObj.firstVisibleMonth}},lastVisibleMonth:{get:function(){return this.xtag.calObj.lastVisibleMonth}},firstVisibleDate:{get:function(){return this.xtag.calObj.firstVisibleDate}},lastVisibleDate:{get:function(){return this.xtag.calObj.lastVisibleDate}},customRenderFn:{get:function(){return this.xtag.calObj.customRenderFn},set:function(a){this.xtag.calObj.customRenderFn=a}},labels:{get:function(){return JSON.parse(JSON.stringify(this.xtag.calObj.labels))},set:function(a){this.xtag.calObj.labels=a;var b=this.xtag.calObj.labels,c=this.querySelector(".controls > .prev");c&&(c.textContent=b.prev);var d=this.querySelector(".controls > .next");d&&(d.textContent=b.next)}}},methods:{render:function(a){this.xtag.calObj.render(a)},prevMonth:function(){var a=this.xtag.calObj;a.view=z(a.view)},nextMonth:function(){var a=this.xtag.calObj;a.view=y(a.view)},toggleDateOn:function(a,b){this.xtag.calObj.addDate(a,b),this.chosen=this.chosen},toggleDateOff:function(a){this.xtag.calObj.removeDate(a),this.chosen=this.chosen},toggleDate:function(a,b){this.xtag.calObj.hasChosenDate(a)?this.toggleDateOff(a):this.toggleDateOn(a,b)},hasVisibleDate:function(a,b){return this.xtag.calObj.hasVisibleDate(a,b)}}})}(),function(){function a(a,b){this._historyStack=[],this.currIndex=-1,this._itemCap=void 0,this.itemCap=b,this._validatorFn=a?a:function(){return!0}}function b(a){var b=window.getComputedStyle(a),c=xtag.prefix.js+"TransitionDuration";return b.transitionDuration?b.transitionDuration:b[c]}function c(a){if("string"!=typeof a)return 0;var b=/^(\d*\.?\d+)(m?s)$/,c=a.toLowerCase().match(b);if(c){var d=c[1],e=c[2],f=parseFloat(d);if(isNaN(f))throw"value error";if("s"===e)return 1e3*f;if("ms"===e)return f;throw"unit error"}return 0}function d(a,b){return(a%b+b)%b}function e(a){return xtag.queryChildren(a,"x-card")}function f(a,b){var c=e(a);return isNaN(parseInt(b,10))||0>b||b>=c.length?null:c[b]}function g(a,b){var c=e(a);return c.indexOf(b)}function h(a,d,f,h,i){a.xtag._selectedCard=f;var j=new Date;a.xtag._lastAnimTimestamp=j;var m=function(){j===a.xtag._lastAnimTimestamp&&(k(a),xtag.fireEvent(a,"shuffleend",{detail:{oldCard:d,newCard:f}}))};if(f===d)return m(),void 0;var n=!1,o=!1,p=!1,q=function(){n&&o&&(e(a).forEach(function(a){a.removeAttribute("selected"),a.removeAttribute("leaving")}),d.setAttribute("leaving",!0),f.setAttribute("selected",!0),a.xtag._selectedCard=f,a.selectedIndex=g(a,f),i&&(d.setAttribute("reverse",!0),f.setAttribute("reverse",!0)),xtag.fireEvent(a,"shufflestart",{detail:{oldCard:d,newCard:f}}))},r=function(){p||n&&o&&s()},s=function(){p=!0;var a=!1,e=!1,g=!1,i=function(b){g||(b.target===d?(a=!0,d.removeEventListener("transitionend",i)):b.target===f&&(e=!0,f.removeEventListener("transitionend",i)),a&&e&&(g=!0,m()))};d.addEventListener("transitionend",i),f.addEventListener("transitionend",i);var j=c(b(d)),k=c(b(f)),n=Math.max(j,k),o=1.15,q="none"===h.toLowerCase()?0:Math.ceil(n*o);0===q?(g=!0,d.removeEventListener("transitionend",i),f.removeEventListener("transitionend",i),d.removeAttribute(l),f.removeAttribute(l),m()):(d.removeAttribute(l),f.removeAttribute(l),window.setTimeout(function(){g||(g=!0,d.removeEventListener("transitionend",i),f.removeEventListener("transitionend",i),m())},q))};xtag.skipTransition(d,function(){return d.setAttribute("card-anim-type",h),d.setAttribute(l,!0),n=!0,q(),r},this),xtag.skipTransition(f,function(){return f.setAttribute("card-anim-type",h),f.setAttribute(l,!0),o=!0,q(),r},this)}function i(a,b,c,d,f){var g=a.xtag._selectedCard;if(g===b){var i={detail:{oldCard:g,newCard:b}};return xtag.fireEvent(a,"shufflestart",i),xtag.fireEvent(a,"shuffleend",i),void 0}k(a),void 0===c&&(console.log("defaulting to none transition"),c="none");var j;switch(d){case"forward":j=!1;break;case"reverse":j=!0;break;default:g||(j=!1);var l=e(a);j=l.indexOf(b)<l.indexOf(g)?!0:!1}b.hasAttribute("transition-override")&&(c=b.getAttribute("transition-override")),f||a.xtag.history.pushState(b),h(a,g,b,c,j)}function j(a,b,c,d){var e=f(a,b);if(!e)throw"no card at index "+b;i(a,e,c,d)}function k(a){if(a.xtag._initialized){var b=e(a),c=a.xtag._selectedCard;c&&c.parentNode===a||(c=b.length>0?a.xtag.history&&a.xtag.history.numStates>0?a.xtag.history.currState:b[0]:null),b.forEach(function(a){a.removeAttribute("leaving"),a.removeAttribute(l),a.removeAttribute("card-anim-type"),a.removeAttribute("reverse"),a!==c?a.removeAttribute("selected"):a.setAttribute("selected",!0)}),a.xtag._selectedCard=c,a.selectedIndex=g(a,c)}}var l="_before-animation",m=a.prototype;m.pushState=function(a){if(this.canRedo&&this._historyStack.splice(this.currIndex+1,this._historyStack.length-(this.currIndex+1)),this._historyStack.push(a),this.currIndex=this._historyStack.length-1,this.sanitizeStack(),"none"!==this._itemCap&&this._historyStack.length>this._itemCap){var b=this._historyStack.length;this._historyStack.splice(0,b-this._itemCap),this.currIndex=this._historyStack.length-1}},m.sanitizeStack=function(){for(var a,b=this._validatorFn,c=0;c<this._historyStack.length;){var d=this._historyStack[c];d!==a&&b(d)?(a=d,c++):(this._historyStack.splice(c,1),c<=this.currIndex&&this.currIndex--)}},m.forwards=function(){this.canRedo&&this.currIndex++,this.sanitizeStack()},m.backwards=function(){this.canUndo&&this.currIndex--,this.sanitizeStack()},Object.defineProperties(m,{DEFAULT_CAP:{value:10},itemCap:{get:function(){return this._itemCap},set:function(a){if(void 0===a)this._itemCap=this.DEFAULT_CAP;else if("none"===a)this._itemCap="none";else{var b=parseInt(a,10);if(isNaN(a)||0>=a)throw"attempted to set invalid item cap: "+a;this._itemCap=b}}},canUndo:{get:function(){return this.currIndex>0}},canRedo:{get:function(){return this.currIndex<this._historyStack.length-1}},numStates:{get:function(){return this._historyStack.length}},currState:{get:function(){var a=this.currIndex;return a>=0&&a<this._historyStack.length?this._historyStack[a]:null}}}),xtag.register("x-deck",{lifecycle:{created:function(){var b=this;b.xtag._initialized=!0;var c=function(a){return a.parentNode===b};b.xtag.history=new a(c,a.DEFAULT_CAP),b.xtag._selectedCard=b.xtag._selectedCard?b.xtag._selectedCard:null,b.xtag._lastAnimTimestamp=null,b.xtag.transitionType="scrollLeft";var d=b.getCardAt(b.getAttribute("selected-index"));d&&(b.xtag._selectedCard=d),k(b);var e=b.xtag._selectedCard;e&&b.xtag.history.pushState(e)}},events:{"show:delegate(x-card)":function(){var a=this;a.show()}},accessors:{transitionType:{attribute:{name:"transition-type"},get:function(){return this.xtag.transitionType},set:function(a){this.xtag.transitionType=a}},selectedIndex:{attribute:{skip:!0,name:"selected-index"},get:function(){return g(this,this.xtag._selectedCard)},set:function(a){this.selectedIndex!==a&&j(this,a,"none"),this.setAttribute("selected-index",a)}},historyCap:{attribute:{name:"history-cap"},get:function(){return this.xtag.history.itemCap},set:function(a){this.xtag.history.itemCap=a}},numCards:{get:function(){return this.getAllCards().length}},currHistorySize:{get:function(){return this.xtag.history.numStates}},currHistoryIndex:{get:function(){return this.xtag.history.currIndex}},cards:{get:function(){return this.getAllCards()}},selectedCard:{get:function(){return this.getSelectedCard()}}},methods:{shuffleTo:function(a,b){var c=f(this,a);if(!c)throw"invalid shuffleTo index "+a;var d=this.xtag.transitionType;j(this,a,d,b)},shuffleNext:function(a){a=a?a:"auto";var b=e(this),c=this.xtag._selectedCard,f=b.indexOf(c);f>-1&&this.shuffleTo(d(f+1,b.length),a)},shufflePrev:function(a){a=a?a:"auto";var b=e(this),c=this.xtag._selectedCard,f=b.indexOf(c);f>-1&&this.shuffleTo(d(f-1,b.length),a)},getAllCards:function(){return e(this)},getSelectedCard:function(){return this.xtag._selectedCard},getCardIndex:function(a){return g(this,a)},getCardAt:function(a){return f(this,a)},historyBack:function(a){var b=this.xtag.history;if(b.canUndo){b.backwards();var c=b.currState;c&&i(this,c,this.transitionType,a,!0)}},historyForward:function(a){var b=this.xtag.history;if(b.canRedo){b.forwards();var c=b.currState;c&&i(this,c,this.transitionType,a,!0)}}}}),xtag.register("x-card",{lifecycle:{inserted:function(){var a=this,b=a.parentNode;b&&"x-deck"===b.tagName.toLowerCase()&&(k(b),a.xtag.parentDeck=b,xtag.fireEvent(b,"cardadd",{detail:{card:a}}))},created:function(){var a=this.parentNode;a&&"x-deck"===a.tagName.toLowerCase()&&(this.xtag.parentDeck=a)},removed:function(){var a=this;if(a.xtag.parentDeck){var b=a.xtag.parentDeck;b.xtag.history.sanitizeStack(),k(b),xtag.fireEvent(b,"cardremove",{detail:{card:a}})}}},accessors:{transitionOverride:{attribute:{name:"transition-override"}}},methods:{show:function(){var a=this.parentNode;a===this.xtag.parentDeck&&a.shuffleTo(a.getCardIndex(this))}}})}(),function(){xtag.register("x-flipbox",{lifecycle:{created:function(){this.firstElementChild&&xtag.skipTransition(this.firstElementChild,function(){}),this.lastElementChild&&xtag.skipTransition(this.lastElementChild,function(){}),this.hasAttribute("direction")||(this.xtag._direction="right")}},events:{"transitionend:delegate(*:first-child)":function(a){var b=a.target,c=b.parentNode;"x-flipbox"===c.nodeName.toLowerCase()&&xtag.fireEvent(c,"flipend")},"show:delegate(*:first-child)":function(a){var b=a.target,c=b.parentNode;"x-flipbox"===c.nodeName.toLowerCase()&&(c.flipped=!1)},"show:delegate(*:last-child)":function(a){var b=a.target,c=b.parentNode;"x-flipbox"===c.nodeName.toLowerCase()&&(c.flipped=!0)}},accessors:{direction:{attribute:{},get:function(){return this.xtag._direction},set:function(a){xtag.skipTransition(this.firstElementChild,function(){this.setAttribute("_anim-direction",a)},this),xtag.skipTransition(this.lastElementChild,function(){this.setAttribute("_anim-direction",a)},this),this.xtag._direction=a}},flipped:{attribute:{"boolean":!0}}},methods:{toggle:function(){this.flipped=!this.flipped},showFront:function(){this.flipped=!1},showBack:function(){this.flipped=!0}}})}(),function(){function a(a){var b=a.firstElementChild;if(!b)return{header:null,section:null,footer:null};var c=b.nextElementSibling;return{header:"HEADER"==b.nodeName?b:null,section:"SECTION"==b.nodeName?b:c&&"SECTION"==c.nodeName?c:null,footer:"FOOTER"==a.lastElementChild.nodeName?a.lastElementChild:null}}function b(a,b){var c=b.__layoutScroll__=b.__layoutScroll__||Object.defineProperty(b,"__layoutScroll__",{value:{last:b.scrollTop}}).__layoutScroll__,d=b.scrollTop,e=a.scrollBuffer;return c.max=c.max||Math.max(d+e,e),c.min=c.min||Math.max(d-e,e),c}function c(a,b){a.setAttribute("content-maximizing",null),b.section&&(b.header&&(b.section.style.marginTop="-"+b.header.getBoundingClientRect().height+"px"),b.footer&&(b.section.style.marginBottom="-"+b.footer.getBoundingClientRect().height+"px"))}function d(a,b){a.removeAttribute("content-maximized"),a.removeAttribute("content-maximizing"),b.section&&(b.section.style.marginTop="",b.section.style.marginBottom="")}function e(e){if(!e.currentTarget.hasAttribute("content-maximizing")){var f=e.target,g=e.currentTarget;if(this.scrollhide&&(f.parentNode==g||xtag.matchSelector(f,g.scrollTarget))){var h=f.scrollTop,i=g.scrollBuffer,j=a(g),k=b(g,f);h>k.last?k.min=Math.max(h-i,i):h<k.last&&(k.max=Math.max(h+i,i)),g.maxcontent||(h>k.max&&!g.hasAttribute("content-maximized")?c(g,j):h<k.min&&d(g,j)),k.last=h}}}xtag.register("x-layout",{lifecycle:{created:function(){}},events:{scroll:e,transitionend:function(b){var c=a(this);!this.hasAttribute("content-maximizing")||b.target!=c.header&&b.target!=c.section&&b.target!=c.footer||(this.setAttribute("content-maximized",null),this.removeAttribute("content-maximizing"))},"tap:delegate(section)":function(b){var e=b.currentTarget;if(e.taphide&&this.parentNode==e){var f=a(e);e.hasAttribute("content-maximizing")||e.hasAttribute("content-maximized")?e.maxcontent||d(e,f):c(e,f)}},"mouseover:delegate(section)":function(b){var d=b.currentTarget;!d.hoverhide||this.parentNode!=d||d.hasAttribute("content-maximized")||d.hasAttribute("content-maximizing")||b.relatedTarget&&!this.contains(b.target)||c(d,a(d))},"mouseout:delegate(section)":function(b){var c=b.currentTarget;!c.hoverhide||this.parentNode!=c||!c.hasAttribute("content-maximized")&&!c.hasAttribute("content-maximizing")||c!=b.relatedTarget&&c.contains(b.relatedTarget)||d(c,a(c))}},accessors:{scrollTarget:{attribute:{name:"scroll-target"}},scrollBuffer:{attribute:{name:"scroll-buffer"},get:function(){return Number(this.getAttribute("scroll-buffer"))||30}},taphide:{attribute:{"boolean":!0}},hoverhide:{attribute:{"boolean":!0}},scrollhide:{attribute:{"boolean":!0}},maxcontent:{attribute:{"boolean":!0},set:function(b){var e=a(this);b?c(this,e):this.hasAttribute("content-maximizing")||d(this,e)}}}})}(),function(){function a(a){var b=xtag.query(a,"x-slides > x-slide[selected]")[0]||0;return[b?xtag.query(a,"x-slides > x-slide").indexOf(b):b,a.firstElementChild.children.length-1]}function b(a,b){var c=xtag.toArray(a.firstElementChild.children);c.forEach(function(a){a.removeAttribute("selected")}),c[b||0].setAttribute("selected",!0);var e="translate"+(a.getAttribute("orientation")||"x")+"("+(b||0)*(-100/c.length)+"%)";a.firstElementChild.style[d]=e,a.firstElementChild.style.transform=e}function c(a){var c=this.firstElementChild;if(c&&c.children.length&&"x-slides"==c.tagName.toLowerCase()){var e=xtag.toArray(c.children),f=100/(e.length||1),g=this.getAttribute("orientation")||"x",h="x"==g?["width","height"]:["height","width"];if(c.style[h[1]]="100%",c.style[h[0]]=100*e.length+"%",c.style[d]="translate"+g+"(0%)",c.style.transform="translate"+g+"(0%)",e.forEach(function(a){a.style[h[0]]=f+"%",a.style[h[1]]="100%"}),a){var i=c.querySelector("[selected]");i&&b(this,e.indexOf(i)||0)}}}var d=xtag.prefix.js+"Transform";xtag.register("x-slidebox",{lifecycle:{created:function(){c()}},events:{transitionend:function(a){a.target==this.firstElementChild&&xtag.fireEvent(this,"slideend")},"show:delegate(x-slide)":function(a){var b=a.target;if("x-slides"===b.parentNode.nodeName.toLowerCase()&&"x-slidebox"===b.parentNode.parentNode.nodeName.toLowerCase()){var c=b.parentNode,d=c.parentNode,e=xtag.query(c,"x-slide");d.slideTo(e.indexOf(b))}}},accessors:{orientation:{get:function(){return this.getAttribute("orientation")},set:function(a){var b=this;xtag.skipTransition(b.firstElementChild,function(){b.setAttribute("orientation",a.toLowerCase()),c.call(b,!0)})}}},methods:{slideTo:function(a){b(this,a)},slideNext:function(){var c=a(this);c[0]++,b(this,c[0]>c[1]?0:c[0])},slidePrevious:function(){var c=a(this);c[0]--,b(this,c[0]<0?c[1]:c[0])}}}),xtag.register("x-slide",{lifecycle:{inserted:function(){var a=this.parentNode.parentNode;"x-slidebox"==a.tagName.toLowerCase()&&c.call(a,!0)},created:function(){if(this.parentNode){var a=this.parentNode.parentNode;"x-slidebox"==a.tagName.toLowerCase()&&c.call(a,!0)}}}})}(),function(){function a(a){return!isNaN(parseFloat(a))}function b(b,c){return b.hasAttribute(c)&&a(b.getAttribute(c))}function c(b,c,d,e){if(e=e?e:Math.round,d=a(d)?d:0,!a(b))throw"invalid value "+b;if(!a(c)||0>=+c)throw"invalid step "+c;return e((b-d)/c)*c+d}function d(a,b,d,e){return b>a?b:a>d?Math.max(b,c(d,e,b,Math.floor)):a}function e(a,b,e){var f=c((b-a)/2+a,e,a);return d(f,a,b,e)}function f(a,b){var c=a.min,d=a.max;return(b-c)/(d-c)}function g(a,b){var c=a.min,d=a.max;return(d-c)*b+c}function h(a,b){b=Math.min(Math.max(0,b),1);var e=g(a,b),f=c(e,a.step,a.min);return d(f,a.min,a.max,a.step)}function i(a,b){var c=a.xtag.polyFillSliderThumb;if(c){var d=a.getBoundingClientRect(),e=c.getBoundingClientRect(),g=f(a,b),h=Math.max(d.width-e.width,0),i=h*g,j=i/d.width;c.style.left=100*j+"%"}}function j(a){i(a,a.value)}function k(a,b){var c=a.xtag.rangeInputEl,d=c.getBoundingClientRect(),e=b-d.left;a.value;var f=h(a,e/d.width);a.value=f,xtag.fireEvent(a,"input"),j(a)}function l(a,b,c){a.xtag.dragInitVal=a.value,k(a,b,c);var d=a.xtag.callbackFns,e=function(a,b){document.body.addEventListener(a,b)};e("mousemove",d.onMouseDragMove),e("touchmove",d.onTouchDragMove),e("mouseup",d.onDragEnd),e("touchend",d.onDragEnd);var f=a.xtag.polyFillSliderThumb;f&&f.setAttribute("active",!0)}function m(a,b,c){k(a,b,c)}function n(a){return{onMouseDragStart:function(b){b.button===p&&(l(a,b.pageX,b.pageY),b.preventDefault())},onTouchDragStart:function(b){var c=b.targetTouches;1===c.length&&(l(a,c[0].pageX,c[0].pageY),b.preventDefault())},onMouseDragMove:function(b){m(a,b.pageX,b.pageY),b.preventDefault()},onTouchDragMove:function(b){var c=b.targetTouches;1===c.length&&(m(a,c[0].pageX,c[0].pageY),b.preventDefault())},onDragEnd:function(b){var c=a.xtag.callbackFns,d=function(a,b){document.body.removeEventListener(a,b)};d("mousemove",c.onMouseDragMove),d("touchmove",c.onTouchDragMove),d("mouseup",c.onDragEnd),d("touchend",c.onDragEnd);var e=a.xtag.polyFillSliderThumb;e&&e.removeAttribute("active"),a.value!==a.xtag.dragInitVal&&xtag.fireEvent(a,"change"),a.xtag.dragInitVal=null,b.preventDefault()},onKeyDown:function(a){var b=a.keyCode;if(b in o){var c=this.value,d=this.min,e=this.max,f=this.step,g=Math.max(0,e-d),h=Math.max(g/10,f);switch(o[b]){case"LEFT_ARROW":case"DOWN_ARROW":this.value=Math.max(c-f,d);break;case"RIGHT_ARROW":case"UP_ARROW":this.value=Math.min(c+f,e);break;case"HOME":this.value=d;break;case"END":this.value=e;break;case"PAGE_DOWN":this.value=Math.max(c-h,d);break;case"PAGE_UP":this.value=Math.min(c+h,e)}this.value!==c&&xtag.fireEvent(this,"change"),a.preventDefault()}}}}var o={33:"PAGE_UP",34:"PAGE_DOWN",35:"END",36:"HOME",37:"LEFT_ARROW",38:"UP_ARROW",39:"RIGHT_ARROW",40:"DOWN_ARROW"},p=0;xtag.register("x-slider",{lifecycle:{created:function(){var a=this;a.xtag.callbackFns=n(a),a.xtag.dragInitVal=null;var c=document.createElement("input");xtag.addClass(c,"input"),c.setAttribute("type","range");var d=b(a,"max")?+a.getAttribute("max"):100,f=b(a,"min")?+a.getAttribute("min"):0,g=b(a,"step")?+a.getAttribute("step"):1;g=g>0?g:1;var h=b(a,"value")?+a.getAttribute("value"):e(f,d,g);c.setAttribute("max",d),c.setAttribute("min",f),c.setAttribute("step",g),c.setAttribute("value",h),a.xtag.rangeInputEl=c,a.appendChild(a.xtag.rangeInputEl),a.xtag.polyFillSliderThumb=null,"range"!==c.type||a.hasAttribute("polyfill")?a.setAttribute("polyfill",!0):a.removeAttribute("polyfill"),j(a)},attributeChanged:function(){j(this)}},events:{"change:delegate(input[type=range])":function(a){a.stopPropagation(),xtag.fireEvent(a.currentTarget,"change")},"input:delegate(input[type=range])":function(a){a.stopPropagation(),xtag.fireEvent(a.currentTarget,"input")},"focus:delegate(input[type=range])":function(a){var b=a.currentTarget;xtag.fireEvent(b,"focus",{},{bubbles:!1})},"blur:delegate(input[type=range])":function(a){var b=a.currentTarget;xtag.fireEvent(b,"blur",{},{bubbles:!1})}},accessors:{polyfill:{attribute:{"boolean":!0},set:function(a){var b=this.xtag.callbackFns;if(a){if(this.setAttribute("tabindex",0),this.xtag.rangeInputEl.setAttribute("tabindex",-1),this.xtag.rangeInputEl.setAttribute("readonly",!0),!this.xtag.polyFillSliderThumb){var c=document.createElement("span");xtag.addClass(c,"slider-thumb"),this.xtag.polyFillSliderThumb=c,this.appendChild(c)}j(this),this.addEventListener("mousedown",b.onMouseDragStart),this.addEventListener("touchstart",b.onTouchDragStart),this.addEventListener("keydown",b.onKeyDown)}else this.removeAttribute("tabindex"),this.xtag.rangeInputEl.removeAttribute("tabindex"),this.xtag.rangeInputEl.removeAttribute("readonly"),this.removeEventListener("mousedown",b.onMouseDragStart),this.removeEventListener("touchstart",b.onTouchDragStart),this.removeEventListener("keydown",b.onKeyDown)}},max:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.getAttribute("max")
}},min:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.getAttribute("min")}},step:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.getAttribute("step")}},name:{attribute:{selector:"input[type=range]"},set:function(a){var b=this.xtag.rangeInputEl;null===a||void 0===a?b.removeAttribute("name"):b.setAttribute("name",a)}},value:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.value},set:function(b){a(b)||(b=e(this.min,this.max,this.step)),b=+b;var f=this.min,g=this.max,h=this.step,i=c(b,h,f),k=d(i,f,g,h);this.xtag.rangeInputEl.value=k,j(this)}},inputElem:{get:function(){return this.xtag.rangeInputEl}}},methods:{}})}(),function(){function a(){var a=document.documentElement,b={left:a.scrollLeft||document.body.scrollLeft||0,top:a.scrollTop||document.body.scrollTop||0,width:a.clientWidth,height:a.clientHeight};return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function b(b){var c=b.getBoundingClientRect(),d=a(),e=d.left,f=d.top;return{left:c.left+e,right:c.right+e,top:c.top+f,bottom:c.bottom+f,width:c.width,height:c.height}}function c(a,b,c){return c.left<=a&&a<=c.right&&c.top<=b&&b<=c.bottom}function d(a){if("x-tabbar"===a.parentNode.nodeName.toLowerCase()){var b=a.targetEvent,c=a.targetSelector?xtag.query(document,a.targetSelector):a.targetElems;c.forEach(function(a){xtag.fireEvent(a,b)})}}xtag.register("x-tabbar",{lifecycle:{created:function(){this.xtag.overallEventToFire="show"}},events:{"tap:delegate(x-tabbar-tab)":function(){var a=xtag.query(this.parentNode,"x-tabbar-tab[selected]");a.length&&a.forEach(function(a){a.removeAttribute("selected")}),this.setAttribute("selected",!0)}},accessors:{tabs:{get:function(){return xtag.queryChildren(this,"x-tabbar-tab")}},targetEvent:{attribute:{name:"target-event"},get:function(){return this.xtag.overallEventToFire},set:function(a){this.xtag.overallEventToFire=a}}},methods:{}}),xtag.register("x-tabbar-tab",{lifecycle:{created:function(){this.xtag.targetSelector=null,this.xtag.overrideTargetElems=null,this.xtag.targetEvent=null}},events:{tap:function(a){var e=a.currentTarget;if(a.changedTouches&&a.changedTouches.length>0){var f=a.changedTouches[0],g=b(e);c(f.pageX,f.pageY,g)&&d(e)}else d(e)}},accessors:{targetSelector:{attribute:{name:"target-selector"},get:function(){return this.xtag.targetSelector},set:function(a){this.xtag.targetSelector=a,a&&(this.xtag.overrideTargetElems=null)}},targetElems:{get:function(){return this.targetSelector?xtag.query(document,this.targetSelector):null!==this.xtag.overrideTargetElems?this.xtag.overrideTargetElems:[]},set:function(a){this.removeAttribute("target-selector"),this.xtag.overrideTargetElems=a}},targetEvent:{attribute:{name:"target-event"},get:function(){if(this.xtag.targetEvent)return this.xtag.targetEvent;if("x-tabbar"===this.parentNode.nodeName.toLowerCase())return this.parentNode.targetEvent;throw"tabbar-tab is missing event to fire"},set:function(a){this.xtag.targetEvent=a}}},methods:{}})}(),function(){function a(a){var b=a.xtag.inputEl.form;b?a.removeAttribute("x-toggle-no-form"):a.setAttribute("x-toggle-no-form",""),a.xtag.scope=a.parentNode?b||document:null}function b(a){var b={},c=a==document?"[x-toggle-no-form]":"";xtag.query(a,"x-toggle[name]"+c).forEach(function(d){var e=d.name;if(e&&!b[e]){var f=xtag.query(a,'x-toggle[name="'+e+'"]'+c),g=f.length>1?"radio":"checkbox";f.forEach(function(a){a.xtag&&a.xtag.inputEl&&(a.type=g)}),b[e]=!0}})}var c=!1;xtag.addEvents(document,{DOMComponentsLoaded:function(){b(document),xtag.toArray(document.forms).forEach(b)},WebComponentsReady:function(){b(document),xtag.toArray(document.forms).forEach(b)},keydown:function(a){c=a.shiftKey},keyup:function(a){c=a.shiftKey},"focus:delegate(x-toggle)":function(){this.setAttribute("focus","")},"blur:delegate(x-toggle)":function(){this.removeAttribute("focus")},"tap:delegate(x-toggle)":function(){if(c&&this.group){var a=this.groupToggles,b=this.xtag.scope.querySelector('x-toggle[group="'+this.group+'"][active]');if(b&&this!=b){var d=this,e=b.checked,f=a.indexOf(this),g=a.indexOf(b),h=Math.min(f,g),i=Math.max(f,g);a.slice(h,i).forEach(function(a){a!=d&&(a.checked=e)})}}},"change:delegate(x-toggle)":function(){var a=this.xtag.scope.querySelector('x-toggle[group="'+this.group+'"][active]');this.checked=c&&a&&this!=a?a.checked:this.xtag.inputEl.checked,this.group&&(this.groupToggles.forEach(function(a){a.active=!1}),this.active=!0)}}),xtag.register("x-toggle",{lifecycle:{created:function(){this.innerHTML='<label class="x-toggle-input-wrap"><input type="checkbox"></input></label><div class="x-toggle-check"></div><div class="x-toggle-content"></div>',this.xtag.inputWrapEl=this.querySelector(".x-toggle-input-wrap"),this.xtag.inputEl=this.xtag.inputWrapEl.querySelector("input"),this.xtag.contentWrapEl=this.querySelector(".x-toggle-content-wrap"),this.xtag.checkEl=this.querySelector(".x-toggle-check"),this.xtag.contentEl=this.querySelector(".x-toggle-content"),this.type="checkbox",a(this);var b=this.getAttribute("name");b&&(this.xtag.inputEl.name=this.getAttribute("name")),this.hasAttribute("checked")&&(this.checked=!0)},inserted:function(){a(this),this.parentNode&&"x-togglegroup"===this.parentNode.nodeName.toLowerCase()&&(this.parentNode.hasAttribute("name")&&(this.name=this.parentNode.getAttribute("name")),this.parentNode.hasAttribute("group")&&(this.group=this.parentNode.getAttribute("group")),this.setAttribute("no-box",!0)),this.name&&b(this.xtag.scope)},removed:function(){b(this.xtag.scope),a(this)}},accessors:{noBox:{attribute:{name:"no-box","boolean":!0},set:function(){}},type:{attribute:{},set:function(a){this.xtag.inputEl.type=a}},label:{attribute:{},get:function(){return this.xtag.contentEl.innerHTML},set:function(a){this.xtag.contentEl.innerHTML=a}},active:{attribute:{"boolean":!0}},group:{attribute:{}},groupToggles:{get:function(){return xtag.query(this.xtag.scope,'x-toggle[group="'+this.group+'"]')}},name:{attribute:{skip:!0},get:function(){return this.getAttribute("name")},set:function(a){null===a?(this.removeAttribute("name"),this.type="checkbox"):this.setAttribute("name",a),this.xtag.inputEl.name=a,b(this.xtag.scope)}},checked:{get:function(){return this.xtag.inputEl.checked},set:function(a){var b=this.name,c="true"===a||a===!0;if(b){var d=this.xtag.scope==document?"[x-toggle-no-form]":"",e='x-toggle[checked][name="'+b+'"]'+d,f=this.xtag.scope.querySelector(e);f&&f.removeAttribute("checked")}this.xtag.inputEl.checked=c,c?this.setAttribute("checked",""):this.removeAttribute("checked")}},value:{attribute:{},get:function(){return this.xtag.inputEl.value},set:function(a){this.xtag.inputEl.value=a}}}})}(),function(){function a(a){return a in G}function b(){var a=document.documentElement,b={left:a.scrollLeft||document.body.scrollLeft||0,top:a.scrollTop||document.body.scrollTop||0,width:a.clientWidth,height:a.clientHeight};return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function c(a){var c=a.getBoundingClientRect(),d=b(),e=d.left,f=d.top;return{left:c.left+e,right:c.right+e,top:c.top+f,bottom:c.bottom+f,width:c.width,height:c.height}}function d(a,b){return b=void 0!==b?b:c(a),{x:a.offsetWidth?b.width/a.offsetWidth:1,y:a.offsetHeight?b.height/a.offsetHeight:1}}function e(a,b){if(a.right<b.left||b.right<a.left||a.bottom<b.top||b.bottom<a.top)return null;var c={left:Math.max(a.left,b.left),top:Math.max(a.top,b.top),right:Math.min(a.right,b.right),bottom:Math.min(a.bottom,b.bottom)};return c.width=c.right-c.left,c.height=c.bottom-c.top,c.width<0||c.height<0?null:c}function f(a,b,c){this.eventType=b,this.listenerFn=c,this.elem=a,this._attachedFn=null}function g(a){this._cachedListener=null,this._tooltips=[];var b=this,c=function(a){b._tooltips.forEach(function(b){b.xtag._skipOuterClick||!b.hasAttribute("visible")||b.ignoreOuterTrigger||n(a.target,b)||B(b),b.xtag._skipOuterClick=!1})},d=this._cachedListener=new f(document,a,c);d.attachListener()}function h(){this.eventStructDict={}}function i(a,b,c){var d=function(b){c&&n(b.target,a.previousElementSibling)&&c.call(a.previousElementSibling,b)};return new f(document.documentElement,b,d)}function j(a,b,c){var d=b+":delegate(x-tooltip+*)",e=function(b){c&&this===a.nextElementSibling&&c.call(this,b)};return new f(document.documentElement,d,e)}function k(a,b,c,d){if(b===H)return i(a,c,d);if(b===I)return j(a,c,d);var e=c+":delegate("+b+")";return new f(document.documentElement,e,function(b){var c=this;n(c,a)||d.call(c,b)})}function l(a,b,c){var d=[],e=function(){var b=this;a.xtag._skipOuterClick=!0,a.hasAttribute("visible")?b===a.xtag.lastTargetElem?B(a):A(a,b):A(a,b)},f=k(a,b,c,e);return d.push(f),d}function m(a,b){for(;a;){if(b(a))return a;a=a.parentNode}return null}function n(a,b){if(b.contains)return b.contains(a);var c=function(a){return a===b};return!!m(a,c)}function o(a){return function(b){var c=this,d=b.relatedTarget||b.toElement;d?n(d,c)||a.call(this,b):a.call(this,b)}}function p(a,b){var c=[];c=b===H?a.previousElementSibling?[a.previousElementSibling]:[]:b===I?a.nextElementSibling?[a.nextElementSibling]:[]:xtag.query(document,b);for(var d=0;d<c.length;){var e=c[d];n(e,a)?c.splice(d,1):d++}return c}function q(a,b){var d=function(a,b,c){return c.left<=a&&a<=c.right&&c.top<=b&&b<=c.bottom},e=c(a),f=c(b),g=function(a,b){return d(a.left,a.top,b)||d(a.right,a.top,b)||d(a.right,a.bottom,b)||d(a.left,a.bottom,b)},h=function(a,b){return a.top<=b.top&&b.bottom<=a.bottom&&b.left<=a.left&&a.right<=b.right};return g(e,f)||g(f,e)||h(e,f)||h(f,e)}function r(a,b,c){var d=c*(Math.PI/180),e=a*Math.sin(d)+b*Math.cos(d),f=a*Math.cos(d)+b*Math.sin(d);return{height:e,width:f}}function s(a,b,c){var d=a;return d=void 0!==b&&null!==b?Math.max(b,d):d,d=void 0!==c&&null!==c?Math.min(c,d):d}function t(a,b,e,f,g){var h,i;if(e===window)h=a,i=b;else{var j=c(e);h=a-j.left,i=b-j.top}var k=c(f);g=g?g:d(f,k);var l=f.clientTop*g.y,m=f.clientLeft*g.x,o=f.scrollTop*g.y,p=f.scrollLeft*g.x,q={left:h-k.left-m,top:i-k.top-l};return!n(document.body,f)&&n(f,document.body)&&(q.top+=o,q.left+=p),q}function u(a,d){d||(d=c(a.offsetParent||a.parentNode));var f=b(),g=f;return a.allowOverflow||(g=e(f,d),g||(g=d)),g}function v(a,b){if(0===b.length)return null;for(var c=u(a),d=c.left,e=c.top,f=c.right,g=c.bottom,h=[],i=[],j=0;j<b.length;j++){var k=b[j],l=k.rect;l.left<d||l.top<e||l.right>f||l.bottom>g?i.push(k):h.push(k)}var m=h.length>0?h:i;return m[0].orient}function w(a){a.setAttribute("_force-display",!0)}function x(a){a.removeAttribute("_force-display")}function y(b,c){b.removeAttribute(K);var d=b.xtag.arrowEl,e=null,f=[];for(var g in G)d.setAttribute(J,G[g]),e=z(b,c,g),e&&(w(b),q(b,c)||f.push({orient:g,rect:e}),x(b));var h=v(b,f);return h||(h="top"),b.setAttribute(K,h),d.setAttribute(J,G[h]),a(h)&&h!==g?z(b,c,h):e}function z(e,f,g,h){if(!e.parentNode)return e.left="",e.top="",null;h=void 0===h?0:h;var i=e.xtag.arrowEl;if(!a(g))return y(e,f);var j=e.offsetParent?e.offsetParent:e.parentNode;h||(e.style.top="",e.style.left="",i.style.top="",i.style.left=""),w(e);var k=b(),l=c(j),o=d(j,l),p=j.clientWidth*o.x,q=j.clientHeight*o.y,v=c(f),A=v.width,B=v.height,C=c(e),D=d(e,C),E=C.width,F=C.height,G=C.width,H=C.height,I=(G-E)/2,J=(H-F)/2,K=i.offsetWidth*D.x,L=i.offsetHeight*D.y,M=45,N=r(K,L,M);K=N.width,L=N.height,"top"===g||"bottom"===g?L/=2:K/=2;var O=u(e,l),P=O.left,Q=O.top,R=O.right-E,S=O.bottom-F,T={left:v.left+(A-E)/2,top:v.top+(B-F)/2},U=T.left,V=T.top;if("top"===g)V=v.top-H-L,S-=L;else if("bottom"===g)V=v.top+B+L,S-=L;else if("left"===g)U=v.left-G-K,R-=K;else{if("right"!==g)throw"invalid orientation "+g;U=v.left+A+K,R-=K}var W=s(U,P,R),X=s(V,Q,S);W+=I,X+=J;var Y,Z,$=function(a){if(!window.getComputedStyle||a===document||a===document.documentElement)return!1;var b;try{b=window.getComputedStyle(a)}catch(c){return!1}return b&&"fixed"===b.position},_=m(f,$);if(_&&!n(e,_))Y=W-k.left,Z=X-k.top,e.setAttribute("_target-fixed",!0);else{var ab=t(W,X,window,j,o);Y=ab.left,Z=ab.top,e.removeAttribute("_target-fixed")}e.style.top=Z+"px",e.style.left=Y+"px";var bb,cb,db,eb,fb;"top"===g||"bottom"===g?(eb=(A-K)/2,fb=v.left-W,bb=E-K,cb=E,db="left"):(eb=(B-L)/2,fb=v.top-X,bb=F-L,cb=F,db="top");var gb=s(eb+fb,0,bb),hb=cb?gb/cb:0;i.style[db]=100*hb+"%";var ib=e.offsetWidth*D.x,jb=e.offsetHeight*D.y,kb=j.clientWidth*o.x,lb=j.clientHeight*o.y;x(e);var mb=2;return mb>h&&(E!==ib||F!==jb||p!==kb||q!==lb)?z(e,f,g,h+1):{left:W,top:X,width:ib,height:jb,right:W+ib,bottom:X+jb}}function A(a,b){b===a&&console.warn("The tooltip's target element is the tooltip itself! Is this intentional?");var c=a.xtag.arrowEl;c.parentNode||console.warn("The inner component DOM of the tooltip appears to be missing. Make sure to edit tooltip contents through the .contentEl property instead ofdirectly on the x-tooltip to avoid clobbering the component's internals.");var d=a.orientation,e=function(){x(a),a.setAttribute("visible",!0),xtag.fireEvent(a,"tooltipshown",{triggerElem:b})};b?(a.xtag.lastTargetElem=b,xtag.skipTransition(a,function(){return z(a,b,d),e})):(a.style.top="",a.style.left="",c.style.top="",c.style.left="",e())}function B(b){a(b.orientation)&&b.removeAttribute(K),b.hasAttribute("visible")&&(w(b),b.xtag._hideTransitionFlag=!0,b.removeAttribute("visible"))}function C(a){var b=a.xtag.cachedListeners;b.forEach(function(a){a.removeListener()}),a.xtag.cachedListeners=[],E.unregisterTooltip(a.triggerStyle,a)}function D(a,b,c){if(a.parentNode){(void 0===b||null===b)&&(b=a.targetSelector),(void 0===c||null===c)&&(c=a.triggerStyle);var d=p(a,b);-1===d.indexOf(a.xtag.lastTargetElem)&&(a.xtag.lastTargetElem=d.length>0?d[0]:null,z(a,a.xtag.lastTargetElem,a.orientation)),C(a);var e;if(c in F){var f=F[c];e=f(a,b)}else e=l(a,b,c),E.registerTooltip(c,a);e.forEach(function(a){a.attachListener()}),a.xtag.cachedListeners=e,B(a)}}var E,F,G={top:"down",bottom:"up",left:"right",right:"left"},H="_previousSibling",I="_nextSibling",J="arrow-direction",K="_auto-orientation";f.prototype.attachListener=function(){this._attachedFn||(this._attachedFn=xtag.addEvent(this.elem,this.eventType,this.listenerFn))},f.prototype.removeListener=function(){this._attachedFn&&(xtag.removeEvent(this.elem,this.eventType,this._attachedFn),this._attachedFn=null)},g.prototype.destroy=function(){this._cachedListener.removeListener(),this._cachedListener=null,this._tooltips=null},g.prototype.containsTooltip=function(a){return-1!==this._tooltips.indexOf(a)},g.prototype.addTooltip=function(a){this.containsTooltip(a)||this._tooltips.push(a)},g.prototype.removeTooltip=function(a){this.containsTooltip(a)&&this._tooltips.splice(this._tooltips.indexOf(a),1)},Object.defineProperties(g.prototype,{numTooltips:{get:function(){return this._tooltips.length}}}),h.prototype.registerTooltip=function(a,b){if(a in this.eventStructDict){var c=this.eventStructDict[a];c.containsTooltip(b)||c.addTooltip(b)}else this.eventStructDict[a]=new g(a),this.eventStructDict[a].addTooltip(b)},h.prototype.unregisterTooltip=function(a,b){if(a in this.eventStructDict&&this.eventStructDict[a].containsTooltip(b)){var c=this.eventStructDict[a];c.removeTooltip(b),0===c.numTooltips&&(c.destroy(),delete this.eventStructDict[a])}},E=new h,F={custom:function(){return[]},hover:function(a,b){var c=[],d=null,e=200,g=function(){d&&window.clearTimeout(d),d=null},h=o(function(b){g();var c=this,d=b.relatedTarget||b.toElement;n(d,a)||A(a,c)}),i=o(function(b){g();var c=b.relatedTarget||b.toElement;n(c,a)||(d=window.setTimeout(function(){"hover"===a.triggerStyle&&B(a)},e))}),j=k(a,b,"enter",h),l=k(a,b,"leave",i);c.push(j),c.push(l);var m=o(function(b){g();var c=b.relatedTarget||b.toElement,d=a.xtag.lastTargetElem;a.hasAttribute("visible")||!d||n(c,d)||A(a,d)}),p=o(function(b){g();var c=b.relatedTarget||b.toElement,f=a.xtag.lastTargetElem;f&&!n(c,f)&&(d=window.setTimeout(function(){"hover"===a.triggerStyle&&B(a)},e))});return c.push(new f(a,"enter",m)),c.push(new f(a,"leave",p)),c}},xtag.register("x-tooltip",{lifecycle:{created:function(){var a=this;a.xtag.contentEl=document.createElement("div"),a.xtag.arrowEl=document.createElement("span"),xtag.addClass(a.xtag.contentEl,"tooltip-content"),xtag.addClass(a.xtag.arrowEl,"tooltip-arrow"),a.xtag.contentEl.innerHTML=a.innerHTML,a.innerHTML="",a.appendChild(a.xtag.contentEl),a.appendChild(a.xtag.arrowEl),a.xtag._orientation="auto",a.xtag._targetSelector=H,a.xtag._triggerStyle="click";var b=p(a,a.xtag._targetSelector);a.xtag.lastTargetElem=b.length>0?b[0]:null,a.xtag.cachedListeners=[],a.xtag._hideTransitionFlag=!1,a.xtag._skipOuterClick=!1},inserted:function(){D(this,this.xtag._targetSelector,this.xtag._triggerStyle)},removed:function(){C(this)}},events:{transitionend:function(a){var b=a.currentTarget;b.xtag._hideTransitionFlag&&!b.hasAttribute("visible")&&(b.xtag._hideTransitionFlag=!1,xtag.fireEvent(b,"tooltiphidden")),x(b)}},accessors:{orientation:{attribute:{},get:function(){return this.xtag._orientation},set:function(b){b=b.toLowerCase();var c=this.querySelector(".tooltip-arrow"),d=null;a(b)?(d=G[b],c.setAttribute(J,d),this.removeAttribute(K)):c.removeAttribute(J),this.xtag._orientation=b,this.refreshPosition()}},triggerStyle:{attribute:{name:"trigger-style"},get:function(){return this.xtag._triggerStyle},set:function(a){D(this,this.targetSelector,a),this.xtag._triggerStyle=a}},targetSelector:{attribute:{name:"target-selector"},get:function(){return this.xtag._targetSelector},set:function(a){p(this,a),D(this,a,this.triggerStyle),this.xtag._targetSelector=a}},ignoreOuterTrigger:{attribute:{"boolean":!0,name:"ignore-outer-trigger"}},ignoreTooltipPointerEvents:{attribute:{"boolean":!0,name:"ignore-tooltip-pointer-events"}},allowOverflow:{attribute:{"boolean":!0,name:"allow-overflow"},set:function(){this.refreshPosition()}},contentEl:{get:function(){return this.xtag.contentEl},set:function(a){var b=this.xtag.contentEl;xtag.addClass(a,"tooltip-content"),this.replaceChild(a,b),this.xtag.contentEl=a,this.refreshPosition()}},presetTriggerStyles:{get:function(){var a=[];for(var b in F)a.push(b);return a}},targetElems:{get:function(){return p(this,this.targetSelector)}}},methods:{refreshPosition:function(){this.xtag.lastTargetElem&&z(this,this.xtag.lastTargetElem,this.orientation)},show:function(){A(this,this.xtag.lastTargetElem)},hide:function(){B(this)},toggle:function(){this.hasAttribute("visible")?this.hide():this.show()}}})}();//pull in data from the URLs listed in URL; <callback> executes on successful fetch.
function assembleData(callback) {
    var i, element, script,
        URL = [ 'http://annikal.triumf.ca:8082/?cmd=jcopy&odb0=Experiment/&odb1=Runinfo/&encoding=json-p-nokeys&callback=fetchODB'];

    for(i=0; i<URL.length; i++){
        //delete last instance of this script so they don't accrue:
        element = document.getElementById('tempScript'+i);
        if(element)
            element.parentNode.removeChild(element);

        //refetch the ith repo:
        script = document.createElement('script');
        script.setAttribute('src', URL[i]);

        script.setAttribute('id', 'tempScript'+i);

        script.onload = function(){
            if(callback){
                callback()
            }
        }

        script.onerror = function(){
            console.log('failed fetch!')
        }

        document.head.appendChild(script);
    }
}

//functions to route data returned by fetchingData nicely:
function fetchODB(returnObj){
    window.currentData.ODB = {};
    window.currentData.ODB.Experiment = returnObj[0];
    window.currentData.ODB.Runinfo = returnObj[1];
    console.log(window.currentData)
}


//tell everybody to refresh their data from the in-memory buffers:
function repopulate(){
    var sidebar = document.getElementById('statusBar');

    //refresh everybody
    sidebar.populateFields();
}//header branding
(function(){  

    xtag.register('x-headBranding', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var wrap = document.createElement('div') 
                ,   logo = document.createElement('img')
                ,   titleWrap = document.createElement('div')
                ,   headline = document.createElement('h1')
                ,   subline = document.createElement('h2')

                wrap.setAttribute('id', 'header');

                logo.setAttribute('id', 'logo');
                logo.setAttribute('width', 92.5);
                logo.setAttribute('height', 111);
                logo.setAttribute('src', 'GRIFFIN_Logo_White_small.gif');

                titleWrap.setAttribute('id', 'title');

                headline.setAttribute('id', 'headline');
                headline.innerHTML = 'GRIFFIN'

                subline.setAttribute('id', 'subline');
                subline.innerHTML = 'TOOLKIT';

                this.appendChild(wrap);
                document.getElementById('header').appendChild(logo);
                document.getElementById('header').appendChild(titleWrap);
                document.getElementById('title').appendChild(headline);
                document.getElementById('title').appendChild(subline);

                this.setup('footerImage', 2, '#444444');
            },
            inserted: function() {},
            removed: function() {},
            attributeChanged: function() {}
        }, 
        events: { 

        },
        accessors: {

        }, 
        methods: {

            'setup': function(){
                //kern title nicely
                var headlineWidth = document.getElementById('headline').offsetWidth,
                    sublineWidth  = document.getElementById('subline').offsetWidth,
                    sublineKern   = (headlineWidth - sublineWidth) / 6;
                document.getElementById('subline').style.letterSpacing = sublineKern;
            }
        }
    });

})();

//footer branding
(function(){  

    xtag.register('x-footBranding', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var wrap = document.createElement('div')
                ,   textWrap = document.createElement('div')
                ,   branding = document.createElement('canvas')
                ,   headline = document.createElement('h3')
                ,   footText = document.createElement('p')
                ,   footTable = document.createElement('table')
                ,   footRow = document.createElement('tr')
                ,   gitLogoCell = document.createElement('td')
                ,   gitLink = document.createElement('a')
                ,   gitLinkPic = document.createElement('img')
                ,   grifLogoCell = document.createElement('td')
                ,   grifLink = document.createElement('a')
                ,   grifLinkPic = document.createElement('img');

                wrap.setAttribute('id', 'footer');
                this.appendChild(wrap);

                textWrap.setAttribute('id', 'textBlock');
                textWrap.setAttribute('class', 'textBlock');
                document.getElementById('footer').appendChild(textWrap);

                branding.setAttribute('id', 'footerImage');
                branding.setAttribute('width', 550);
                branding.setAttribute('height', 300);
                document.getElementById('footer').appendChild(branding);

                headline.setAttribute('id', 'footerHeadline')
                document.getElementById('textBlock').appendChild(headline)
                document.getElementById('footerHeadline').innerHTML = 'Built in Vancouver by the GRIFFIN Collaboration';

                footText.setAttribute('id', 'footerText');
                document.getElementById('textBlock').appendChild(footText);
                document.getElementById('footerText').innerHTML = "Code available on <a href='https://github.com/GRIFFINCollaboration'>Github</a><br>Copyright &#169 2014 GRIFFIN Collaboration<br>All code freely available under MIT license."

                footTable.setAttribute('id', 'footerTable');
                document.getElementById('textBlock').appendChild(footTable);

                footRow.setAttribute('id', 'footerTabRow');
                document.getElementById('footerTable').appendChild(footRow);

                gitLogoCell.setAttribute('id', 'gitLogoCell');
                document.getElementById('footerTabRow').appendChild(gitLogoCell);

                gitLink.setAttribute('id', 'gitLink');
                gitLink.setAttribute('class', 'imgLink');
                gitLink.setAttribute('href', 'https://github.com/GRIFFINCollaboration');
                document.getElementById('gitLogoCell').appendChild(gitLink);

                gitLinkPic.setAttribute('id', 'gitLogo');
                gitLinkPic.setAttribute('width', 72);
                gitLinkPic.setAttribute('height', 72);
                gitLinkPic.setAttribute('src', 'GitHub-Mark-Light-64px.gif');
                document.getElementById('gitLink').appendChild(gitLinkPic);

                grifLogoCell.setAttribute('id', 'grifLogoCell');
                document.getElementById('footerTabRow').appendChild(grifLogoCell);

                grifLink.setAttribute('id', 'grifLink');
                grifLink.setAttribute('class', 'imgLink');
                grifLink.setAttribute('href', 'http://www.triumf.ca/griffin');
                document.getElementById('grifLogoCell').appendChild(grifLink);

                grifLinkPic.setAttribute('id', 'grifLogo');
                grifLinkPic.setAttribute('width', 65);
                grifLinkPic.setAttribute('height', 78);
                grifLinkPic.setAttribute('src', 'GRIFFIN_Logo_White_small.gif');
                document.getElementById('grifLink').appendChild(grifLinkPic);

                this.setup('footerImage', 2, '#444444');
            },
            inserted: function() {},
            removed: function() {},
            attributeChanged: function() {}
        }, 
        events: { 

        },
        accessors: {

        }, 
        methods: {
            //draw table of nuclides branding on <canvasID> with dots of <size> and base <color>
            'setup': function(canvasID, size, color){

                var canvas = document.getElementById(canvasID),
                    context = canvas.getContext('2d'),
                    //table of nuclides, as pulled from NNDC Feb 2014
                    table = {
                    'n': {
                            'iso':1,        //number of isotopes
                            'pDrip':1,      //offset of proton drip line from Hydrogen
                            'stable':[],    //indices of stable isotopes relative to this element's proton drip line
                            'unbound':[]    //indices of unbound 'isotopes' relative to this element's proton drip line
                        },
                        'H': {
                            'iso':7,
                            'pDrip':0,
                            'stable':[0,1],
                            'unbound':[3]
                        },
                        'He': {
                            'iso':8,
                            'pDrip':1,
                            'stable':[0,1],
                            'unbound':[6]
                        },
                        'Li': {
                            'iso':11,
                            'pDrip':0,
                            'stable':[3,4],
                            'unbound':[0,7,10]
                        },
                        'Be': {
                            'iso':12,
                            'pDrip':1,
                            'stable':[4],
                            'unbound':[0]
                        },
                        'B': {
                            'iso':16,
                            'pDrip':1,
                            'stable':[4,5],
                            'unbound':[0,14,15]
                        },
                        'C': {
                            'iso':16,
                            'pDrip':2,
                            'stable':[4,5],
                            'unbound':[15]
                        },
                        'N': {
                            'iso':16,
                            'pDrip':3,
                            'stable':[4,5],
                            'unbound':[0,15]
                        },
                        'O': {
                            'iso':17,
                            'pDrip':4,
                            'stable':[4,5,6],
                            'unbound':[13]
                        },
                        'F': {
                            'iso':18,
                            'pDrip':5,
                            'stable':[5],
                            'unbound':[0,16]
                        },
                        'Ne': {
                            'iso':19,
                            'pDrip':6,
                            'stable':[4,5,6],
                            'unbound':[]
                        },
                        'Na': {
                            'iso':20,
                            'pDrip':7,
                            'stable':[5],
                            'unbound':[]
                        },
                        'Mg': {
                            'iso':22,
                            'pDrip':7,
                            'stable':[5,6,7],
                            'unbound':[]
                        },
                        'Al': {
                            'iso':23,
                            'pDrip':8,
                            'stable':[6],
                            'unbound':[]
                        },
                        'Si': {
                            'iso':24,
                            'pDrip':8,
                            'stable':[6,7,8],
                            'unbound':[23]
                        },
                        'P': {
                            'iso':24,
                            'pDrip':9,
                            'stable':[7],
                            'unbound':[0,23]
                        },
                        'S': {
                            'iso':24,
                            'pDrip':10,
                            'stable':[6,7,8,10],
                            'unbound':[21]
                        },
                        'Cl': {
                            'iso':24,
                            'pDrip':11,
                            'stable':[7,9],
                            'unbound':[0]
                        },
                        'Ar': {
                            'iso':24,
                            'pDrip':12,
                            'stable':[6,8,10],
                            'unbound':[]
                        },
                        'K': {
                            'iso':25,
                            'pDrip':13,
                            'stable':[7,8,9],
                            'unbound':[0]
                        },
                        'Ca': {
                            'iso':25,
                            'pDrip':14,
                            'stable':[6,8,9,10,12,14],
                            'unbound':[]
                        },
                        'Sc': {
                            'iso':26,
                            'pDrip':15,
                            'stable':[9],
                            'unbound':[0,1,2]
                        },
                        'Ti': {
                            'iso':26,
                            'pDrip':16,
                            'stable':[8,9,10,11,12],
                            'unbound':[0]
                        },
                        'V': {
                            'iso':27,
                            'pDrip':17,
                            'stable':[10,11],
                            'unbound':[0,1]
                        },
                        'Cr': {
                            'iso':27,
                            'pDrip':18,
                            'stable':[8,10,11,12],
                            'unbound':[25]
                        },
                        'Mn': {
                            'iso':28,
                            'pDrip':19,
                            'stable':[11],
                            'unbound':[1]
                        },
                        'Fe': {
                            'iso':30,
                            'pDrip':19,
                            'stable':[9,11,12,13],
                            'unbound':[]
                        },
                        'Co': {
                            'iso':30,
                            'pDrip':20,
                            'stable':[12],
                            'unbound':[0,1,2]
                        },
                        'Ni': {
                            'iso':32,
                            'pDrip':20,
                            'stable':[10,12,13,14,16],
                            'unbound':[]
                        },
                        'Cu': {
                            'iso':31,
                            'pDrip':23,
                            'stable':[11,13],
                            'unbound':[0]
                        },
                        'Zn': {
                            'iso':32,
                            'pDrip':24,
                            'stable':[10,12,13,14,16],
                            'unbound':[]
                        },
                        'Ga': {
                            'iso':32,
                            'pDrip':25,
                            'stable':[13,15],
                            'unbound':[0,1,2,3]
                        },
                        'Ge': {
                            'iso':33,
                            'pDrip':26,
                            'stable':[12,14,15,16,18],
                            'unbound':[0,1]
                        },
                        'As': {
                            'iso':33,
                            'pDrip':27,
                            'stable':[15],
                            'unbound':[0,1,2,32]
                        },
                        'Se': {
                            'iso':32,
                            'pDrip':30,
                            'stable':[10,12,13,14,16,18],
                            'unbound':[2,28,29]
                        },
                        'Br': {
                            'iso':32,
                            'pDrip':32,
                            'stable':[12,14],
                            'unbound':[0]
                        },
                        'Kr': {
                            'iso':33,
                            'pDrip':33,
                            'stable':[9,11,13,14,15,17],
                            'unbound':[]
                        },
                        'Rb': {
                            'iso':33,
                            'pDrip':34,
                            'stable':[14,16],
                            'unbound':[0]
                        }

                    },
                    cell = 4*size,
                    //y0 = $('#'+canvasID).height() - cell/2,
                    y0 = document.getElementById(canvasID).offsetHeight - cell/2,
                    i, key;

                //for every element in the table
                for(key in table){
                    //for every isotope of the element
                    for(i=0; i<table[key].iso; i++){
                        //draw a <color> circle for unstable isotopes, a pink circle for stable isotopes, or leave a blank for unbound isotopes:
                        if(table[key].stable.indexOf(i) != -1){
                            context.strokeStyle = '#FF3399';
                            context.fillStyle = '#FF3399';                
                        } else if(table[key].unbound.indexOf(i) != -1){
                            //context.strokeStyle = color;
                            //context.fillStyle = 'rgba(0,0,0,0)';
                            continue;
                        } else{
                           context.strokeStyle = color;
                           context.fillStyle = color;                
                        }

                        context.beginPath();
                        context.arc(cell*table[key].pDrip + cell/2 + i*cell, y0, size, 0, 2*Math.PI);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                    y0 -= cell;
                    if(y0<0) return;
                }
            }


        }
    });

})();//status bar
(function(){  

    xtag.register('x-status', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var exptTitle = document.createElement('h2')
                ,   runDetail = document.createElement('ul')
                ,   runNumber = document.createElement('li')
                ,   startTime = document.createElement('li')
                ,   upTime = document.createElement('li')
                ,   stopTime = document.createElement('li')
                ,   start = document.createElement('button')
                ,   stop = document.createElement('button')
                ,   pause = document.createElement('button')
                ,   resume = document.createElement('button')
                ,   messageList = document.createElement('ul')
                ,   messages = []
                ,   i;

                for(i=0; i<5; i++){
                    messages[i] = document.createElement('li');
                }

                exptTitle.setAttribute('id', 'statusTitle');
                this.appendChild(exptTitle);

                runDetail.setAttribute('id', 'statusRunDetail');
                this.appendChild(runDetail);

                runNumber.setAttribute('id', 'statusRunNumber');
                document.getElementById('statusRunDetail').appendChild(runNumber);

                startTime.setAttribute('id', 'statusStartTime');
                document.getElementById('statusRunDetail').appendChild(startTime);

                upTime.setAttribute('id', 'statusUpTime');
                document.getElementById('statusRunDetail').appendChild(upTime);

                stopTime.setAttribute('id', 'statusStopTime');
                document.getElementById('statusRunDetail').appendChild(stopTime);

                start.setAttribute('id', 'statusStart');
                this.appendChild(start);
                document.getElementById('statusStart').innerHTML = 'Start';

                stop.setAttribute('id', 'statusStop');
                this.appendChild(stop);
                document.getElementById('statusStop').innerHTML = 'Stop';

                pause.setAttribute('id', 'statusPause');
                this.appendChild(pause);
                document.getElementById('statusPause').innerHTML = 'Pause';

                resume.setAttribute('id', 'statusResume');
                this.appendChild(resume);
                document.getElementById('statusResume').innerHTML = 'Resume';

                messageList.setAttribute('id', 'statusMessageList');
                this.appendChild(messageList);

                for(i=0; i<5; i++){
                    messages[i].setAttribute('id', 'statusMessage'+i);
                    document.getElementById('statusMessageList').appendChild(messages[i]);
                }                
                
                //this.populateFields();
                
            },
            inserted: function() {},
            removed: function() {},
            attributeChanged: function() {}
        }, 
        events: { 

        },
        accessors: {

        }, 
        methods: {

            'populateFields': function(){
                var i,
                    date = new Date(),
                    now, uptime, hours, minutes, seconds;

                //check to make sure the requisite buffers exist:
                if(!window.currentData.ODB.Experiment || !window.currentData.ODB.Runinfo) return;

                //data is present if we get this far, stick it in the correct DOM elements:
                document.getElementById('statusTitle').innerHTML = window.currentData.ODB.Experiment.Name;
                document.getElementById('statusRunNumber').innerHTML = 'Run ' + window.currentData.ODB.Runinfo['Run number'];
                document.getElementById('statusStartTime').innerHTML = 'Started ' + window.currentData.ODB.Runinfo['Start time'];
                //calculate uptime:
                now = date.getTime() / 1000;
                uptime = now - parseInt(window.currentData.ODB.Runinfo['Start time binary'], 16);
                hours = Math.floor(uptime / 3600);
                minutes = Math.floor( (uptime%3600)/60 );
                seconds = Math.floor(uptime%60);
                document.getElementById('statusUpTime').innerHTML = 'Uptime ' + hours + ' h, ' + minutes + ' m, ' + seconds +' s'

                /*
                no messages for now - need JSONP support for jmsg
                for(i=0; i<5; i++){
                    document.getElementById('statusMessage'+i).innerHTML = i;
                }
                */
            }
        }
    });

})();
