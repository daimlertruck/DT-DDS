var Re=Object.defineProperty;var a=(e,t)=>Re(e,"name",{value:t,configurable:!0});import{j as l}from"./jsx-runtime-Cgz2XvFB.js";import{r as i}from"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";import"./index-Cy0sAfys.js";import"./index-DV-VXEUn.js";import{u as He}from"./useMedia-CRgJMRRc.js";import{f as S,d as le}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{h as Pe}from"./hexToRgba-CWpEuk8w.js";import{B as Fe}from"./z-index-C44GOntP.js";import{w as U}from"./responsive-3D9bZchw.js";import{T as de}from"./Typography-BDc1BtFV.js";import{T as z}from"./Tooltip-BBLtvRB9.js";import{I as ce}from"./Icon-BrO18bYS.js";import{I as ue}from"./IconButton-BxQ2uS0G.js";const Me=S.div`
  ${({theme:e,isOpen:t})=>t?`
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: ${Pe(e.palette.surface.dark,.2)};
      z-index: ${Fe};
      overflow: hidden;
    `:"display: none;"}
`,fe=a(({isOpen:e,onBackdropClick:t,children:n,dataTestId:r})=>{const s=i.useCallback(d=>{d.target===d.currentTarget&&t&&t()},[t]),o=i.useCallback(d=>{d.key==="Escape"&&t&&t()},[t]);return e?l.jsx(Me,{"data-testid":r??"sidebar-backdrop",isOpen:e,onClick:s,onKeyDown:o,role:"button",tabIndex:0,children:n}):null},"SidebarBackdrop");fe.displayName="Sidebar.Backdrop";const Ne=S.hr`
  ${({theme:e})=>`
    height: 1px;
    margin: ${e.spacing.spacing_0};
    border: none;
    background-color: ${e.palette.border.default};
  `}
`,pe=a(({dataTestId:e,style:t,...n})=>l.jsx(Ne,{"data-testid":e??"sidebar-divider",style:t,...n}),"SidebarDividerBase");pe.displayName="Sidebar.Divider";const Ve=U(pe),he=250,Oe=170,We=70,Ke=64,Ue=72,me=0,Z=0,Ge="left",Xe="right",qe=50,Je=200,T="all 0.2s ease-in-out",G=S.section`
  ${({theme:e,variant:t,isSidebarCollapsed:n,firstItemHasIcon:r})=>`
      display: ${n&&!r?"none":"flex"};
      flex-direction: column;
      margin: 0;
      padding: ${e.spacing.spacing_50} ${e.spacing.spacing_0};
      
      ul {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      ${t==="header"&&`
        height: ${Ke}px;
        justify-content: center;
        overflow: hidden;

        @media (min-width: ${e.breakpoints.mq3}px) {
          height: ${Ue}px;
        }
      `}
    `}
`,ye=i.createContext(null),Ye=a(({value:e,children:t})=>l.jsx(ye.Provider,{value:e,children:t}),"SidebarContextProvider"),D=a(()=>{const e=i.useContext(ye);if(!e)throw new Error("Sidebar compound components must be used within Sidebar");return e},"useSidebarContext"),F=i.createContext(null),ze=a(()=>{const e=i.useContext(F);return(e==null?void 0:e.variant)??"default"},"useSectionContext"),be=i.createContext(null),Ze=a(()=>{const e=i.useContext(be);return(e==null?void 0:e.isNested)??!1},"useSubListContext"),Qe=a((e,t)=>e||t?he:We,"calculateSidebarWidth"),et=a((e,t)=>e?t?Z:-he:Z,"calculateSidebarPosition"),B=a(e=>{if(!i.isValidElement(e))return!1;const t=e.type;return(t==null?void 0:t.displayName)==="SidebarItem"||typeof e.type=="function"&&e.type.name==="SidebarItem"},"isSidebarItemElement"),ge=a(e=>{if(!i.isValidElement(e))return!1;const t=e.type;return(t==null?void 0:t.displayName)==="SidebarSubList"||typeof e.type=="function"&&e.type.name==="SidebarSubList"},"isSidebarSubList"),tt=a(e=>{var n,r;const t=[];return i.isValidElement(e)?B(e)?(t.push(e),t):e.type===i.Fragment&&((n=e.props)!=null&&n.children)?(i.Children.toArray(e.props.children).forEach(o=>{i.isValidElement(o)&&B(o)&&t.push(o)}),t):((r=e.props)!=null&&r.children&&i.Children.toArray(e.props.children).forEach(o=>{i.isValidElement(o)&&B(o)&&t.push(o)}),t):t},"findDirectSidebarItems"),X=a(e=>{if(!i.isValidElement(e))return!1;const t=e.type;return(t==null?void 0:t.displayName)==="Icon"||(t==null?void 0:t.displayName)==="IconButton"||(t==null?void 0:t.displayName)==="SidebarToggle"||typeof e.type=="function"&&(e.type.name==="Icon"||e.type.name==="IconButton"||e.type.name==="SidebarToggle")||typeof e.type=="string"&&e.type==="i"},"isIconElement"),nt=a(e=>{if(!i.isValidElement(e))return!1;const t=e.type;return(t==null?void 0:t.displayName)==="SidebarToggle"||typeof e.type=="function"&&e.type.name==="SidebarToggle"},"isSidebarToggleElement"),O=a((e,t=[])=>{var r,s;if(!i.isValidElement(e))return t;if(X(e))return t.push(e),t;if(ge(e)||B(e))return t;if(e.type===i.Fragment&&((r=e.props)!=null&&r.children))return i.Children.toArray(e.props.children).forEach(d=>O(d,t)),t;const n=(s=e.props)==null?void 0:s.children;return n!=null&&i.Children.toArray(n).forEach(d=>O(d,t)),t},"extractIconsFromNode"),xe=a(e=>{const t=[];return i.Children.toArray(e).forEach(r=>{O(r,t)}),t},"extractIconsFromChildren"),rt=a(e=>xe(e).length>0,"hasIconInChildren"),q=a(e=>i.Children.toArray(e).some(n=>tt(n).some(s=>{if(i.isValidElement(s)){const o=s.props.children||[];return rt(o)}return!1})),"hasFirstItemIcon"),W=a(()=>typeof window>"u"?"":window.location.pathname,"getCurrentPath"),it=a(e=>{try{return new URL(e,typeof window<"u"?window.location.origin:"http://localhost").pathname}catch{return e.startsWith("/")?e:`/${e}`}},"getHrefPath"),Q=a((e,t)=>{if(!e)return!1;const n=t??W(),r=it(e);return r?n===r:!1},"isCurrentUrl"),R=a(e=>i.isValidElement(e)?e.type==="a"||"href"in(e.props||{}):!1,"isLinkElement"),Se=a(e=>i.isValidElement(e)?ge(e)?!0:e.type===i.Fragment&&e.props.children?i.Children.toArray(e.props.children).some(Se):!1:!1,"findSubListInChildren"),Ce=a(e=>i.Children.toArray(e).flatMap(t=>i.isValidElement(t)&&t.type===i.Fragment&&t.props.children?Ce(t.props.children):[t]),"flattenChildren"),ot=a(e=>Ce(e).reduce((n,r)=>(Se(r)?n.subList.push(r):n.otherChildren.push(r),n),{subList:[],otherChildren:[]}),"partitionChildren"),Ie=a((e,t,n)=>{var r;return i.isValidElement(e)?B(e)?n(e.props.href,t):(r=e.props)!=null&&r.children?i.Children.toArray(e.props.children).some(s=>Ie(s,t,n)):!1:!1},"containsActiveSidebarItem"),ee=a(e=>e instanceof HTMLElement?!!e.closest("a"):!1,"isLinkTarget"),te=S.li`
  margin: 0;
  padding: 0;
  list-style: none;
`,ne=S.div`
  ${({theme:e,isActive:t,isSidebarCollapsed:n,isInteractive:r=!0,isNested:s=!1,sectionVariant:o})=>{const d=s?`${e.spacing.spacing_30} ${e.spacing.spacing_80}`:`${e.spacing.spacing_30} ${e.spacing.spacing_60}`,c=`${n?"auto":e.spacing.spacing_30}`,u=`${n?"center":"space-between"}`;return`
      cursor: ${r?"pointer":"default"};
      display: flex;
      align-items: center;
      padding: ${d};
      padding-right: ${c};
      color: ${t?e.palette.accent.default:e.palette.content.default};
      justify-content: ${u};

      &[role="button"] {
        justify-content: ${u};
      }

      ${o==="default"&&`
        transition: ${T};

        &:hover,
        &:focus-visible,
        &:active {
          background-color: ${e.palette.accent.light};
        }
      `}
    `}}
`,st=S.div`
  ${({isExpanded:e,isSidebarJustExpanded:t})=>{const n=t&&e;return`
      display: grid;
      grid-template-rows: ${e?"1fr":"0fr"};
      transition: ${T};
      overflow: hidden;

      & > * {
        min-height: 0;
        opacity: ${n?"0":e?"1":"0"};
        visibility: ${n?"hidden":e?"visible":"hidden"};
        ${n?`
          transition: none;
          animation: fadeInDelayed 0s ease-in-out 0s forwards;
          @keyframes fadeInDelayed {
            from {
              opacity: 0;
              visibility: hidden;
            }
            to {
              opacity: 1;
              visibility: visible;
            }
          }
        `:`
          transition: ${T};
        `}
      }
    `}}
`,re=a(({theme:e,isActive:t,isSidebarCollapsed:n,sectionVariant:r})=>`
  display: flex;
  align-items: center;
  width: ${n?"auto":"100%"};
  gap: ${e.spacing.spacing_40};
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: ${T};

  ${r==="header"?`
        justify-content: space-between;
        flex-direction: row-reverse;

        &:has(> :only-child:not(button)) {
          flex-direction: row;
        }

        svg,
        img {
          max-height: 24px;
          width: auto;
        }
      `:""}
  ${n?`
        justify-content: center;
        padding: ${e.spacing.spacing_10};
      `:""}

  > i:first-of-type {
    opacity: 1;
    visibility: visible;
    color: ${t?e.palette.accent.default:e.palette.content.dark};

    transition: ${T};
  }

  &:hover,
  &:focus-visible,
  &:active,
  &:hover > i:first-of-type {
    color: ${e.palette.accent.default};
  }
`,"defaultSidebarItemLinkStyles"),H=S(de)`
  ${({theme:e,isActive:t,isSidebarCollapsed:n,isDynamicLink:r,isNested:s,sectionVariant:o})=>r?`
      > a,
      > *[href] {
        ${re({theme:e,isActive:t,isSidebarCollapsed:n,sectionVariant:o})}
      }
    `:re({theme:e,isActive:t,isSidebarCollapsed:n,sectionVariant:o})}
`,at=S.span`
  ${({isSidebarCollapsed:e})=>`
    max-width: ${Oe}px;
    opacity: ${e?"0":"1"};
    visibility: ${e?"hidden":"visible"};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`,ie=a(e=>{const t=e.find(n=>typeof n=="string");if(t)return t;for(const n of e){if(nt(n))return"Expand sidebar";if(i.isValidElement(n)&&n.props.children){const s=i.Children.toArray(n.props.children).find(o=>typeof o=="string");if(s)return s}}},"extractTextContent"),N=a(e=>{const t=i.Children.toArray(e),n=t.findIndex(X);if(n===-1)return{firstIcon:null,textContent:t};const r=t[n],s=[...t.slice(0,n),...t.slice(n+1)];return{firstIcon:r,textContent:s}},"partitionIconAndContent"),V=a((e,t)=>e.length>0?l.jsx(at,{isSidebarCollapsed:t,children:e}):null,"wrapTextContent"),oe=a((e,t)=>t?l.jsxs(z,{children:[e,l.jsx(z.Content,{background:"full",direction:"right",children:t})]}):e,"wrapWithTooltip"),we=a((e,t,n,r)=>({isActive:e,isSidebarCollapsed:t,isNested:n,sectionVariant:r}),"createLinkWrapperProps"),K=a((e,t,n,r,s)=>({href:e,isActive:t,isSidebarCollapsed:n,isNested:r,sectionVariant:s}),"createLinkStyledProps"),lt=a((e,t,n,r,s,o)=>{const d=i.Children.toArray(e);if(d.some(R)){const g=d.find(R);if(!g||!i.isValidElement(g))return null;const h=g.props.children;if(h==null)return null;const y=xe(h);if(y.length===0)return null;const k=i.cloneElement(g,{},y),I=ie(i.Children.toArray(h)),w=n?"accent.default":"content.dark",j=n&&!s?"bodyLgBold":"bodyLgRegular",L=l.jsx(H,{color:w,element:"span",fontStyles:j,isDynamicLink:!0,...we(n,r,s,o),children:k});return oe(L,I)}const u=d.filter(X);if(u.length===0)return null;const x=ie(d),f=t?"a":"span",b=n?"accent.default":"content.dark",p=n&&!s?"bodyLgBold":"bodyLgRegular",v=l.jsx(H,{color:b,element:f,fontStyles:p,isDynamicLink:!1,...K(t,n,r,s,o),children:u});return oe(v,x)},"renderCollapsed"),dt=a((e,t,n,r,s,o)=>{const d=i.Children.toArray(e),c=d.some(R),u=n?"accent.default":"content.dark",f=n&&!s?"bodyLgBold":o==="footer"?"bodyLgBold":"bodyLgRegular";if(c){const h=d.find(R);if(!h||!i.isValidElement(h)){const{firstIcon:C,textContent:_}=N(e),A=V(_,r),P=t?"a":"span";return l.jsxs(H,{color:u,element:P,fontStyles:f,isDynamicLink:!1,...K(t,n,r,s,o),children:[C,A]})}const y=d.filter(C=>!R(C)),k=i.Children.toArray(h.props.children),{firstIcon:I,textContent:w}=N(k),j=V(w,r),L=l.jsxs(l.Fragment,{children:[I,j]}),M=i.cloneElement(h,{},L);return l.jsxs(H,{color:u,element:"span",fontStyles:f,isDynamicLink:!0,...we(n,r,s,o),children:[M,y]})}const{firstIcon:b,textContent:p}=N(e),v=V(p,r),g=t?"a":"span";return l.jsxs(H,{color:u,element:g,fontStyles:f,isDynamicLink:!1,...K(t,n,r,s,o),children:[b,v]})},"renderExpanded"),se=a((e,t,n,r,s,o)=>r?lt(e,t,n,r,s,o):dt(e,t,n,r,s,o),"renderContent"),Ee=a(({title:e,children:t,dataTestId:n,style:r,...s})=>{const o=le(),{isExpanded:d,isMobile:c}=D(),u=!c&&!d,x=e&&!u,f=i.useMemo(()=>q(t),[t]);return l.jsx(F.Provider,{value:{variant:"default"},children:l.jsxs(G,{as:"nav","data-testid":n??"sidebar-section",firstItemHasIcon:f,isSidebarCollapsed:u,style:r,variant:"default",...s,children:[x?l.jsx(de,{color:"content.dark",element:"h2",fontStyles:"bodySmBold",style:{padding:`${o.spacing.spacing_50} ${o.spacing.spacing_60}`,whiteSpace:"nowrap",overflow:"hidden",textTransform:"uppercase"},children:e}):null,l.jsx("ul",{children:t})]})})},"SidebarSection");Ee.displayName="Sidebar.Section";const $e=a(({children:e,dataTestId:t,style:n,...r})=>{const{isExpanded:s,isMobile:o}=D(),d=!o&&!s,c=i.useMemo(()=>q(e),[e]);return l.jsx(F.Provider,{value:{variant:"header"},children:l.jsx(G,{as:"header","data-testid":t??"sidebar-header",firstItemHasIcon:c,isSidebarCollapsed:d,style:n,variant:"header",...r,children:l.jsx("ul",{children:e})})})},"SidebarHeaderBase");$e.displayName="Sidebar.Header";const ct=U($e),ve=a(({children:e,dataTestId:t,style:n,...r})=>{const{isExpanded:s,isMobile:o}=D(),d=!o&&!s,c=i.useMemo(()=>q(e),[e]);return l.jsx(F.Provider,{value:{variant:"footer"},children:l.jsx(G,{as:"footer","data-testid":t??"sidebar-footer",firstItemHasIcon:c,isSidebarCollapsed:d,style:n,variant:"footer",...r,children:l.jsx("ul",{children:e})})})},"SidebarFooterBase");ve.displayName="Sidebar.Footer";const ut=U(ve),ft=a(()=>{const[e,t]=i.useState(()=>W());return i.useEffect(()=>{if(typeof window>"u")return;const n=a(()=>{t(W())},"handleLocationChange");return window.addEventListener("popstate",n),window.addEventListener("hashchange",n),()=>{window.removeEventListener("popstate",n),window.removeEventListener("hashchange",n)}},[]),e},"useLocationPath"),pt=a((e,t,n,r)=>!e&&t&&!!n&&r!==n,"shouldTriggerAutoExpand"),ht=a(({controlledExpanded:e,defaultExpanded:t,onToggle:n,shouldAutoExpand:r,autoExpandKey:s})=>{const o=e!==void 0,[d,c]=i.useState(()=>t),u=i.useRef(r?s:null);i.useEffect(()=>{const b=pt(o,r,s,u.current);if(!r){u.current=null;return}b&&(c(!0),u.current=s)},[s,o,r]);const x=o?e:d,f=i.useCallback(()=>{const b=!x;o||c(b),n==null||n(b)},[x,o,n]);return{expanded:!!x,toggle:f}},"useDisclosureState"),ke=a(({href:e,defaultExpanded:t=!1,expanded:n,onToggle:r,children:s,dataTestId:o,style:d,...c})=>{const{isExpanded:u,isMobile:x}=D(),f=ze(),b=Ze(),p=!x&&!u,[v,g]=i.useState(!1),h=i.useRef(p);i.useEffect(()=>{if(h.current&&!p){g(!0);const m=setTimeout(()=>{g(!1)},1e3);return()=>clearTimeout(m)}h.current=p},[p]);const{subList:y,otherChildren:k}=i.useMemo(()=>ot(s),[s]),I=ft(),w=i.useMemo(()=>Q(e,I),[e,I]),j=i.useMemo(()=>y.length?y.some(m=>Ie(m,I,Q)):!1,[y,I]),L=w&&y.length>0||j,M=L?[e??"",I,String(j)].join("|"):null,{expanded:C,toggle:_}=ht({controlledExpanded:n,defaultExpanded:t||L,onToggle:r,shouldAutoExpand:L,autoExpandKey:M}),A=i.useId(),P=i.useId(),E=y.length>0&&!p,_e=a(m=>{ee(m.target)||(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),_())},"handleKeyDown"),Te=a(m=>{ee(m.target)||_()},"handleHeaderClick"),Ae=a(m=>{m.stopPropagation(),_()},"handleToggleButtonClick"),Be=a(m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),m.stopPropagation(),_())},"handleToggleButtonKeyDown");if(y.length>0){const m=C?"keyboard_arrow_up":"keyboard_arrow_down",Y=se(k,e,w,p,b,f);return p&&!Y?null:l.jsxs(te,{as:"li","data-testid":o??"sidebar-item",style:d,...c,children:[l.jsxs(ne,{"aria-controls":E?A:void 0,"aria-expanded":E?C:void 0,id:`header-${P}`,isActive:w,isInteractive:E,isNested:b,isSidebarCollapsed:p,onClick:E?Te:void 0,onKeyDown:E?_e:void 0,role:E?"button":void 0,sectionVariant:f,tabIndex:E?0:void 0,children:[Y,E?l.jsx(ue,{"aria-controls":A,"aria-expanded":C,"aria-label":C?"Collapse submenu":"Expand submenu",onClick:Ae,onKeyDown:Be,style:{display:"flex",width:p?"auto":"100%",height:"auto",justifyContent:"flex-end",whiteSpace:"nowrap"},children:l.jsx(ce,{code:m})}):null]}),E?l.jsx(st,{"aria-hidden":!C,"aria-labelledby":P,id:A,isExpanded:C,isSidebarJustExpanded:v,children:l.jsx("div",{children:y})}):null]})}const J=se(s,e,w,p,b,f);return p&&!J?null:l.jsx(te,{as:"li","data-testid":o??"sidebar-item",style:d,...c,children:l.jsx(ne,{isActive:w,isInteractive:!1,isNested:b,isSidebarCollapsed:p,sectionVariant:f,children:J})})},"SidebarItem");ke.displayName="SidebarItem";const mt=S.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`,Le=a(({children:e,dataTestId:t,style:n,...r})=>(D(),l.jsx(be.Provider,{value:{isNested:!0},children:l.jsx(mt,{as:"ul","data-testid":t??"sidebar-sub-list",style:n,...r,children:e})})),"SidebarSubList");Le.displayName="SidebarSubList";const yt=S.div`
  ${({theme:e,isSidebarCollapsed:t})=>`
      position: relative;
      display: block;
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: overlay;
      scrollbar-width: ${t?"none":"thin"};
      scrollbar-color: ${e.palette.border.default} transparent;
    `}
`,De=a(({children:e,dataTestId:t,style:n,...r})=>{const{isExpanded:s,isMobile:o}=D(),d=!o&&!s;return l.jsx(yt,{"data-testid":t??"sidebar-content",isSidebarCollapsed:d,style:n,...r,children:e})},"SidebarContent");De.displayName="Sidebar.Content";const bt=S(ue)`
  ${({isSidebarCollapsed:e})=>`
    display: flex;
    align-items: center;
    justify-content: center;

    > i {
      transform: ${e?"rotate(180deg)":""};
    }
  `}
`,je=a(({onClick:e})=>{const{isExpanded:t,isMobile:n,onToggle:r}=D(),s=!n&&!t,o=e??r;return l.jsx(bt,{"aria-label":"Toggle",isSidebarCollapsed:s,onClick:o,children:l.jsx(ce,{code:"menu_open"})})},"SidebarToggle");je.displayName="Sidebar.Toggle";const ae=S.aside`
  ${({theme:e,isExpanded:t,isMobile:n,offsetTop:r,placement:s})=>{const o=n?me:r,d=Qe(n,t),c=et(n,t),u=T;return`
      position: fixed;
      display: flex;
      flex-direction: column;
      height: calc(100% - ${o}px);
      width: ${d}px;
      background-color: ${e.palette.surface.contrast};
      overflow: hidden;
      top: ${r}px;
      transition: ${u};
      ${s}: ${c}px;

      ${s==="right"?`border-left: 1px solid ${e.palette.border.default};`:`border-right: 1px solid ${e.palette.border.default};`}
    `}}
`,$=a(({dataTestId:e,offsetTop:t=0,children:n,ariaLabel:r,style:s,isExpanded:o,placement:d=Ge,onToggle:c,...u})=>{const x=le(),f=He(`(max-width: ${x.breakpoints.mq3}px)`),[b,p]=i.useState(!1),[v,g]=i.useState(!f&&o),h=i.useRef(null);i.useEffect(()=>{if(h.current!==null&&(window.clearTimeout(h.current),h.current=null),!f){p(!1),g(o);return}return o?(p(!0),h.current=window.setTimeout(()=>{g(!0)},qe)):(g(!1),h.current=window.setTimeout(()=>{p(!1)},Je)),()=>{h.current!==null&&window.clearTimeout(h.current)}},[o,f]);const y=i.useCallback(()=>{c==null||c(!o)},[c,o]),k=i.useMemo(()=>({isExpanded:o,isMobile:f,onToggle:y}),[o,f,y]);return l.jsx(Ye,{value:k,children:f?l.jsx(fe,{dataTestId:"mobile-backdrop",isOpen:b,onBackdropClick:y,children:l.jsx(ae,{"aria-label":r,"data-testid":e,isExpanded:v,isMobile:f,offsetTop:me,placement:Xe,style:s,...u,children:n})}):l.jsx(ae,{"aria-label":r,"data-testid":e,isExpanded:o,isMobile:f,offsetTop:t,placement:d,style:s,...u,children:n})})},"Sidebar");$.Content=De;$.Divider=Ve;$.Section=Ee;$.Item=ke;$.SubList=Le;$.Header=ct;$.Footer=ut;$.Toggle=je;export{$ as S,he as a,We as b};
