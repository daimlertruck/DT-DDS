var Be=Object.defineProperty;var a=(e,t)=>Be(e,"name",{value:t,configurable:!0});import{o as Me}from"./rolldown-runtime-CzYk_CEw.js";import{t as Pe}from"./react-HNhQAnN4.js";import{o as se,t as v,u as le}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as de}from"./src-Cgsrikn0.js";import{t as Ae}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as X}from"./Tooltip-CV1x-ycZ.js";import"./src-CIbK0PmT.js";import{t as ue}from"./Typography-BVFm109i.js";import{t as Re}from"./hexToRgba-D41tBJLG.js";import{i as Ne,n as W}from"./core-DtZ76Qs_.js";import"./tooltip-B7p4pHEA.js";import"./src-DTbYyZKr.js";import"./typography-D38L8NZ6.js";import{t as ce}from"./IconButton-DPHwvLfO.js";import"./icon-button-DUNOTLRV.js";var i=Me(Pe());se();var Ve=v.div`
  ${({theme:e,isOpen:t})=>t?`
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: ${Re(e.palette.surface.dark,.2)};
      z-index: 9;
      overflow: hidden;
    `:"display: none;"}
`,l=Ae(),pe=a(({isOpen:e,onBackdropClick:t,children:r,dataTestId:n})=>{const o=(0,i.useCallback)(s=>{s.target===s.currentTarget&&t&&t()},[t]);return e?(0,l.jsx)(Ve,{"data-testid":n??"sidebar-backdrop",isOpen:e,onClick:o,children:r}):null},"SidebarBackdrop");pe.displayName="Sidebar.Backdrop";var Fe=v.hr`
  ${({theme:e})=>`
    height: 1px;
    margin: ${e.spacing.spacing_0};
    border: none;
    background-color: ${e.palette.border.default};
  `}
`,fe=a(({dataTestId:e,style:t,...r})=>(0,l.jsx)(Fe,{"data-testid":e??"sidebar-divider",style:t,...r}),"SidebarDividerBase");fe.displayName="Sidebar.Divider";var He=W(fe),qe="left",Oe="right",M="all 0.2s ease-in-out",K=v.section`
  ${({theme:e,variant:t,isSidebarCollapsed:r,firstItemHasIcon:n})=>`
      display: ${r&&!n?"none":"flex"};
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
        height: 64px;
        justify-content: center;
        overflow: hidden;

        @media (min-width: ${e.breakpoints.mq3}px) {
          height: 72px;
        }
      `}
    `}
`,me=(0,i.createContext)(null),We=a(({value:e,children:t})=>(0,l.jsx)(me.Provider,{value:e,children:t}),"SidebarContextProvider"),k=a(()=>{const e=(0,i.useContext)(me);if(!e)throw new Error("Sidebar compound components must be used within Sidebar");return e},"useSidebarContext"),A=(0,i.createContext)(null),Ke=a(()=>(0,i.useContext)(A)?.variant??"default","useSectionContext"),ye=(0,i.createContext)(null),Ue=a(()=>(0,i.useContext)(ye)?.isNested??!1,"useSubListContext"),Je=a((e,t)=>e||t?250:70,"calculateSidebarWidth"),ze=a((e,t)=>e?t?0:-250:0,"calculateSidebarPosition"),_=a(e=>(0,i.isValidElement)(e)?e.type?.displayName==="SidebarItem"||typeof e.type=="function"&&e.type.name==="SidebarItem":!1,"isSidebarItemElement"),he=a(e=>(0,i.isValidElement)(e)?e.type?.displayName==="SidebarSubList"||typeof e.type=="function"&&e.type.name==="SidebarSubList":!1,"isSidebarSubList"),Ge=a(e=>{const t=[];return(0,i.isValidElement)(e)?_(e)?(t.push(e),t):e.type===i.Fragment&&e.props?.children?(i.Children.toArray(e.props.children).forEach(r=>{(0,i.isValidElement)(r)&&_(r)&&t.push(r)}),t):(e.props?.children&&i.Children.toArray(e.props.children).forEach(r=>{(0,i.isValidElement)(r)&&_(r)&&t.push(r)}),t):t},"findDirectSidebarItems"),U=a(e=>{if(!(0,i.isValidElement)(e))return!1;const t=e.type;return t?.displayName==="Icon"||t?.displayName==="IconButton"||t?.displayName==="Sidebar.Toggle"||typeof e.type=="function"&&(e.type.name==="Icon"||e.type.name==="IconButton"||e.type.name==="SidebarToggle")||typeof e.type=="string"&&e.type==="i"},"isIconElement"),Qe=a(e=>(0,i.isValidElement)(e)?e.type?.displayName==="Sidebar.Toggle"||typeof e.type=="function"&&e.type.name==="SidebarToggle":!1,"isSidebarToggleElement"),H=a((e,t=[])=>{if(!(0,i.isValidElement)(e))return t;if(U(e))return t.push(e),t;if(he(e)||_(e))return t;if(e.type===i.Fragment&&e.props?.children)return i.Children.toArray(e.props.children).forEach(n=>H(n,t)),t;const r=e.props?.children;return r!=null&&i.Children.toArray(r).forEach(n=>H(n,t)),t},"extractIconsFromNode"),be=a(e=>{const t=[];return i.Children.toArray(e).forEach(r=>{H(r,t)}),t},"extractIconsFromChildren"),Xe=a(e=>be(e).length>0,"hasIconInChildren"),J=a(e=>i.Children.toArray(e).some(t=>Ge(t).some(r=>{if((0,i.isValidElement)(r)){const n=r.props.children||[];return Xe(n)}return!1})),"hasFirstItemIcon"),q=a(()=>typeof window>"u"?"":window.location.pathname,"getCurrentPath"),Ye=a(e=>{try{return new URL(e,typeof window<"u"?window.location.origin:"http://localhost").pathname}catch{return e.startsWith("/")?e:`/${e}`}},"getHrefPath"),Y=a((e,t)=>{if(!e)return!1;const r=t??q(),n=Ye(e);return n?r===n:!1},"isCurrentUrl"),D=a(e=>(0,i.isValidElement)(e)?e.type==="a"||"href"in(e.props||{}):!1,"isLinkElement"),ge=a(e=>(0,i.isValidElement)(e)?he(e)?!0:e.type===i.Fragment&&e.props.children?i.Children.toArray(e.props.children).some(ge):!1:!1,"findSubListInChildren"),ve=a(e=>i.Children.toArray(e).flatMap(t=>(0,i.isValidElement)(t)&&t.type===i.Fragment&&t.props.children?ve(t.props.children):[t]),"flattenChildren"),Ze=a(e=>ve(e).reduce((t,r)=>(ge(r)?t.subList.push(r):t.otherChildren.push(r),t),{subList:[],otherChildren:[]}),"partitionChildren"),xe=a((e,t,r)=>(0,i.isValidElement)(e)?_(e)?r(e.props.href,t):e.props?.children?i.Children.toArray(e.props.children).some(n=>xe(n,t,r)):!1:!1,"containsActiveSidebarItem"),Z=a(e=>e instanceof HTMLElement?!!e.closest("a"):!1,"isLinkTarget"),ee=v.li`
  margin: 0;
  padding: 0;
  list-style: none;
`,te=v.div`
  ${({theme:e,isActive:t,isSidebarCollapsed:r,isInteractive:n=!0,isNested:o=!1,sectionVariant:s})=>{const u=o?`${e.spacing.spacing_30} ${e.spacing.spacing_80}`:`${e.spacing.spacing_30} ${e.spacing.spacing_60}`,c=`${r?"auto":e.spacing.spacing_30}`,p=`${r?"center":"space-between"}`;return`
      cursor: ${n?"pointer":"default"};
      display: flex;
      align-items: center;
      padding: ${u};
      padding-right: ${c};
      color: ${t?e.palette.accent.default:e.palette.content.default};
      justify-content: ${p};

      &[role="button"] {
        justify-content: ${p};
      }

      ${s==="default"&&`
        transition: all 0.2s ease-in-out;

        &:hover,
        &:focus-visible,
        &:active {
          background-color: ${e.palette.accent.light};
        }
      `}
    `}}
`,et=v.div`
  ${({isExpanded:e,isSidebarJustExpanded:t})=>{const r=t&&e;return`
      display: grid;
      grid-template-rows: ${e?"1fr":"0fr"};
      transition: ${M};
      overflow: hidden;

      & > * {
        min-height: 0;
        opacity: ${r?"0":e?"1":"0"};
        visibility: ${r?"hidden":e?"visible":"hidden"};
        ${r?`
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
          transition: ${M};
        `}
      }
    `}}
`,re=a(({theme:e,isActive:t,isSidebarCollapsed:r,sectionVariant:n})=>`
  display: flex;
  align-items: center;
  width: ${r?"auto":"100%"};
  gap: ${e.spacing.spacing_40};
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: ${M};

  ${n==="header"?`
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
  ${r?`
        justify-content: center;
        padding: ${e.spacing.spacing_10};
      `:""}

  > i:first-of-type {
    opacity: 1;
    visibility: visible;
    color: ${t?e.palette.accent.default:e.palette.content.dark};

    transition: ${M};
  }

  &:hover,
  &:focus-visible,
  &:active,
  &:hover > i:first-of-type {
    color: ${e.palette.accent.default};
  }
`,"defaultSidebarItemLinkStyles"),B=v(ue)`
  ${({theme:e,isActive:t,isSidebarCollapsed:r,isDynamicLink:n,isNested:o,sectionVariant:s})=>n?`
      > a,
      > *[href] {
        ${re({theme:e,isActive:t,isSidebarCollapsed:r,isNested:o,sectionVariant:s})}
      }
    `:re({theme:e,isActive:t,isSidebarCollapsed:r,isNested:o,sectionVariant:s})}
`,tt=v.span`
  ${({isSidebarCollapsed:e})=>`
    max-width: 170px;
    opacity: ${e?"0":"1"};
    visibility: ${e?"hidden":"visible"};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`,ne=a(e=>{const t=e.find(r=>typeof r=="string");if(t)return t;for(const r of e){if(Qe(r))return"Expand sidebar";if((0,i.isValidElement)(r)&&r.props.children){const n=i.Children.toArray(r.props.children).find(o=>typeof o=="string");if(n)return n}}},"extractTextContent"),V=a(e=>{const t=i.Children.toArray(e),r=t.findIndex(U);return r===-1?{firstIcon:null,textContent:t}:{firstIcon:t[r],textContent:[...t.slice(0,r),...t.slice(r+1)]}},"partitionIconAndContent"),F=a((e,t)=>e.length>0?(0,l.jsx)(tt,{isSidebarCollapsed:t,children:e}):null,"wrapTextContent"),ie=a((e,t)=>t?(0,l.jsxs)(X,{children:[e,(0,l.jsx)(X.Content,{background:"full",direction:"right",children:t})]}):e,"wrapWithTooltip"),Se=a((e,t,r,n)=>({isActive:e,isSidebarCollapsed:t,isNested:r,sectionVariant:n}),"createLinkWrapperProps"),O=a((e,t,r,n,o)=>({href:e,isActive:t,isSidebarCollapsed:r,isNested:n,sectionVariant:o,...e&&t&&{"aria-current":"page"}}),"createLinkStyledProps"),rt=a((e,t,r,n,o,s)=>{const u=i.Children.toArray(e);if(u.some(D)){const d=u.find(D);if(!d||!(0,i.isValidElement)(d))return null;const y=d.props.children;if(y==null)return null;const f=be(y);if(f.length===0)return null;const x=(0,i.cloneElement)(d,r?{"aria-current":"page"}:{},f),S=ne(i.Children.toArray(y)),b=(0,l.jsx)(B,{color:r?"accent.default":"content.dark",element:"span",fontStyles:r&&!o?"bodyLgBold":"bodyLgRegular",isDynamicLink:!0,...Se(r,n,o,s),children:x});return ie(b,S)}const c=u.filter(U);if(c.length===0)return null;const p=ne(u),h=(0,l.jsx)(B,{color:r?"accent.default":"content.dark",element:t?"a":"span",fontStyles:r&&!o?"bodyLgBold":"bodyLgRegular",isDynamicLink:!1,...O(t,r,n,o,s),children:c});return ie(h,p)},"renderCollapsed"),nt=a((e,t,r,n,o,s)=>{const u=i.Children.toArray(e),c=u.some(D),p=r?"accent.default":"content.dark",h=r&&!o||s==="footer"?"bodyLgBold":"bodyLgRegular";if(c){const x=u.find(D);if(!x||!(0,i.isValidElement)(x)){const{firstIcon:E,textContent:T}=V(e),R=F(T,n);return(0,l.jsxs)(B,{color:p,element:t?"a":"span",fontStyles:h,isDynamicLink:!1,...O(t,r,n,o,s),children:[E,R]})}const S=u.filter(E=>!D(E)),b=i.Children.toArray(x.props.children),{firstIcon:g,textContent:j}=V(b),w=F(j,n),C=(0,i.cloneElement)(x,r?{"aria-current":"page"}:{},(0,l.jsxs)(l.Fragment,{children:[g,w]}));return(0,l.jsxs)(B,{color:p,element:"span",fontStyles:h,isDynamicLink:!0,...Se(r,n,o,s),children:[C,S]})}const{firstIcon:d,textContent:y}=V(e),f=F(y,n);return(0,l.jsxs)(B,{color:p,element:t?"a":"span",fontStyles:h,isDynamicLink:!1,...O(t,r,n,o,s),children:[d,f]})},"renderExpanded"),ae=a((e,t,r,n,o,s)=>n?rt(e,t,r,n,o,s):nt(e,t,r,n,o,s),"renderContent"),we=a(({title:e,children:t,dataTestId:r,style:n,...o})=>{const s=le(),{isExpanded:u,isMobile:c}=k(),p=!c&&!u,h=e&&!p,d=(0,i.useMemo)(()=>J(t),[t]);return(0,l.jsx)(A.Provider,{value:{variant:"default"},children:(0,l.jsxs)(K,{as:"nav","data-testid":r??"sidebar-section",firstItemHasIcon:d,isSidebarCollapsed:p,style:n,variant:"default",...o,children:[h?(0,l.jsx)(ue,{color:"content.dark",element:"h2",fontStyles:"bodySmBold",style:{padding:`${s.spacing.spacing_50} ${s.spacing.spacing_60}`,whiteSpace:"nowrap",overflow:"hidden",textTransform:"uppercase"},children:e}):null,(0,l.jsx)("ul",{children:t})]})})},"SidebarSection");we.displayName="Sidebar.Section";var Ce=a(({children:e,dataTestId:t,style:r,...n})=>{const{isExpanded:o,isMobile:s}=k(),u=!s&&!o,c=(0,i.useMemo)(()=>J(e),[e]);return(0,l.jsx)(A.Provider,{value:{variant:"header"},children:(0,l.jsx)(K,{as:"header","data-testid":t??"sidebar-header",firstItemHasIcon:c,isSidebarCollapsed:u,style:r,variant:"header",...n,children:(0,l.jsx)("ul",{children:e})})})},"SidebarHeaderBase");Ce.displayName="Sidebar.Header";var it=W(Ce),$e=a(({children:e,dataTestId:t,style:r,...n})=>{const{isExpanded:o,isMobile:s}=k(),u=!s&&!o,c=(0,i.useMemo)(()=>J(e),[e]);return(0,l.jsx)(A.Provider,{value:{variant:"footer"},children:(0,l.jsx)(K,{as:"footer","data-testid":t??"sidebar-footer",firstItemHasIcon:c,isSidebarCollapsed:u,style:r,variant:"footer",...n,children:(0,l.jsx)("ul",{children:e})})})},"SidebarFooterBase");$e.displayName="Sidebar.Footer";var at=W($e),Tt=a((e={})=>{const{isExpanded:t=!1}=e,[r,n]=(0,i.useState)(t);return{isExpanded:r,setIsExpanded:n,toggleSidebar:(0,i.useCallback)(()=>{n(o=>!o)},[])}},"useSidebar"),ot=a(()=>{const[e,t]=(0,i.useState)(()=>q());return(0,i.useEffect)(()=>{if(typeof window>"u")return;const r=a(()=>{t(q())},"handleLocationChange");return window.addEventListener("popstate",r),window.addEventListener("hashchange",r),()=>{window.removeEventListener("popstate",r),window.removeEventListener("hashchange",r)}},[]),e},"useLocationPath"),st=a((e,t,r,n)=>!e&&t&&!!r&&n!==r,"shouldTriggerAutoExpand"),lt=a(({controlledExpanded:e,defaultExpanded:t,onToggle:r,shouldAutoExpand:n,autoExpandKey:o})=>{const s=e!==void 0,[u,c]=(0,i.useState)(()=>t),p=(0,i.useRef)(n?o:null);(0,i.useEffect)(()=>{const y=st(s,n,o,p.current);if(!n){p.current=null;return}y&&(c(!0),p.current=o)},[o,s,n]);const h=s?e:u,d=(0,i.useCallback)(()=>{const y=!h;s||c(y),r?.(y)},[h,s,r]);return{expanded:!!h,toggle:d}},"useDisclosureState"),Ie=a(({href:e,defaultExpanded:t=!1,expanded:r,onToggle:n,children:o,dataTestId:s,style:u,...c})=>{const{isExpanded:p,isMobile:h}=k(),d=Ke(),y=Ue(),f=!h&&!p,[x,S]=(0,i.useState)(!1),b=(0,i.useRef)(f);(0,i.useEffect)(()=>{if(b.current&&!f){S(!0);const m=setTimeout(()=>{S(!1)},1e3);return()=>clearTimeout(m)}b.current=f},[f]);const{subList:g,otherChildren:j}=(0,i.useMemo)(()=>Ze(o),[o]),w=ot(),C=(0,i.useMemo)(()=>Y(e,w),[e,w]),E=(0,i.useMemo)(()=>g.length?g.some(m=>xe(m,w,Y)):!1,[g,w]),T=C&&g.length>0||E,R=T?[e??"",w,String(E)].join("|"):null,{expanded:L,toggle:P}=lt({controlledExpanded:r,defaultExpanded:t||T,onToggle:n,shouldAutoExpand:T,autoExpandKey:R}),N=(0,i.useId)(),z=(0,i.useId)(),$=g.length>0&&!f,je=a(m=>{Z(m.target)||(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),P())},"handleKeyDown"),Te=a(m=>{Z(m.target)||P()},"handleHeaderClick"),_e=a(m=>{m.stopPropagation(),P()},"handleToggleButtonClick"),De=a(m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),m.stopPropagation(),P())},"handleToggleButtonKeyDown");if(g.length>0){const m=L?"keyboard_arrow_up":"keyboard_arrow_down",Q=ae(j,e,C,f,y,d);return f&&!Q?null:(0,l.jsxs)(ee,{as:"li","data-testid":s??"sidebar-item",style:u,...c,children:[(0,l.jsxs)(te,{"aria-controls":$?N:void 0,"aria-expanded":$?L:void 0,id:`header-${z}`,isActive:C,isInteractive:$,isNested:y,isSidebarCollapsed:f,onClick:$?Te:void 0,onKeyDown:$?je:void 0,role:$?"button":void 0,sectionVariant:d,tabIndex:$?0:void 0,children:[Q,$?(0,l.jsx)(ce,{"aria-controls":N,"aria-expanded":L,"aria-label":L?"Collapse submenu":"Expand submenu",onClick:_e,onKeyDown:De,style:{display:"flex",width:f?"auto":"100%",height:"auto",justifyContent:"flex-end",whiteSpace:"nowrap"},children:(0,l.jsx)(de,{code:m})}):null]}),$?(0,l.jsx)(et,{"aria-hidden":!L,"aria-labelledby":z,id:N,isExpanded:L,isSidebarJustExpanded:x,children:(0,l.jsx)("div",{children:g})}):null]})}const G=ae(o,e,C,f,y,d);return f&&!G?null:(0,l.jsx)(ee,{as:"li","data-testid":s??"sidebar-item",style:u,...c,children:(0,l.jsx)(te,{isActive:C,isInteractive:!1,isNested:y,isSidebarCollapsed:f,sectionVariant:d,children:G})})},"SidebarItem");Ie.displayName="SidebarItem";var dt=v.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`,ke=a(({children:e,dataTestId:t,style:r,...n})=>(k(),(0,l.jsx)(ye.Provider,{value:{isNested:!0},children:(0,l.jsx)(dt,{as:"ul","data-testid":t??"sidebar-sub-list",style:r,...n,children:e})})),"SidebarSubList");ke.displayName="SidebarSubList";var ut=v.div`
  ${({theme:e,isSidebarCollapsed:t})=>`
      position: relative;
      display: block;
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: overlay;
      scrollbar-width: ${t?"none":"thin"};
      scrollbar-color: ${e.palette.border.default} transparent;
    `}
`,Ee=a(({children:e,dataTestId:t,style:r,...n})=>{const{isExpanded:o,isMobile:s}=k();return(0,l.jsx)(ut,{"data-testid":t??"sidebar-content",isSidebarCollapsed:!s&&!o,style:r,...n,children:e})},"SidebarContent");Ee.displayName="Sidebar.Content";var ct=v(ce)`
  ${({isSidebarCollapsed:e})=>`
    display: flex;
    align-items: center;
    justify-content: center;

    > i {
      transform: ${e?"rotate(180deg)":""};
    }
  `}
`,Le=a(({onClick:e})=>{const{isExpanded:t,isMobile:r,onToggle:n}=k(),o=!r&&!t;return(0,l.jsx)(ct,{"aria-expanded":!o,"aria-label":"Toggle sidebar navigation",isSidebarCollapsed:o,onClick:e??n,children:(0,l.jsx)(de,{code:"menu_open"})})},"SidebarToggle");Le.displayName="Sidebar.Toggle";var oe=v.aside`
  ${({theme:e,isExpanded:t,isMobile:r,offsetTop:n,placement:o})=>{const s=r?0:n,u=Je(r,t),c=ze(r,t),p=M;return`
      position: fixed;
      display: flex;
      flex-direction: column;
      height: calc(100% - ${s}px);
      width: ${u}px;
      background-color: ${e.palette.surface.contrast};
      overflow: hidden;
      top: ${n}px;
      transition: ${p};
      ${o}: ${c}px;

      ${o==="right"?`border-left: 1px solid ${e.palette.border.default};`:`border-right: 1px solid ${e.palette.border.default};`}
    `}}
`;se();var I=a(({dataTestId:e,offsetTop:t=0,children:r,ariaLabel:n,style:o,isExpanded:s,placement:u=qe,onToggle:c,...p})=>{const h=le(),d=Ne(`(max-width: ${h.breakpoints.mq3}px)`),[y,f]=(0,i.useState)(!1),[x,S]=(0,i.useState)(!d&&s),b=(0,i.useRef)(null);(0,i.useEffect)(()=>{if(b.current!==null&&(window.clearTimeout(b.current),b.current=null),!d){f(!1),S(s);return}return s?(f(!0),b.current=window.setTimeout(()=>{S(!0)},50)):(S(!1),b.current=window.setTimeout(()=>{f(!1)},200)),()=>{b.current!==null&&window.clearTimeout(b.current)}},[s,d]),(0,i.useEffect)(()=>{if(!d||!s)return;const w=a(C=>{C.key==="Escape"&&c?.(!1)},"handleEscapeKey");return document.addEventListener("keydown",w),()=>document.removeEventListener("keydown",w)},[d,s,c]);const g=(0,i.useCallback)(()=>{c?.(!s)},[c,s]),j=(0,i.useMemo)(()=>({isExpanded:s,isMobile:d,onToggle:g}),[s,d,g]);return(0,l.jsx)(We,{value:j,children:d?(0,l.jsx)(pe,{dataTestId:"mobile-backdrop",isOpen:y,onBackdropClick:g,children:(0,l.jsx)(oe,{"aria-label":n,"data-testid":e,isExpanded:x,isMobile:d,offsetTop:0,placement:Oe,style:o,...p,children:r})}):(0,l.jsx)(oe,{"aria-label":n,"data-testid":e,isExpanded:s,isMobile:d,offsetTop:t,placement:u,style:o,...p,children:r})})},"Sidebar");I.Content=Ee;I.Divider=He;I.Section=we;I.Item=Ie;I.SubList=ke;I.Header=it;I.Footer=at;I.Toggle=Le;export{Tt as n,I as t};
