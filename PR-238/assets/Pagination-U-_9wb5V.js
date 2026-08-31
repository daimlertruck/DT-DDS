var G=Object.defineProperty;var n=(e,t)=>G(e,"name",{value:t,configurable:!0});import{o as M}from"./rolldown-runtime-CzYk_CEw.js";import{t as T}from"./react-HNhQAnN4.js";import{n as W,t as r}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as q}from"./src-Cgsrikn0.js";import{t as O}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as v}from"./Tooltip-CV1x-ycZ.js";import"./tooltip-B7p4pHEA.js";import{t as y}from"./src-C-DW4k1j.js";var g=M(T()),P=[10,20,50,100],K=r.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  gap: 12px;

  @media screen and (min-width: ${({theme:e})=>e.breakpoints.mq3}px) {
    flex-direction: row;
    justify-content: center;

    &:has(> *:nth-of-type(2)) {
      justify-content: space-between;
    }
  }
`,z=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media screen and (min-width: ${({theme:e})=>e.breakpoints.mq3}px) {
    width: auto;
    flex-shrink: 0;
  }
`,V=r.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`,X=r.button`
  ${({theme:e})=>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    position: relative;
    background-color: transparent; 
    color: ${e.palette.content.default};
    cursor: pointer;

    &:disabled {
      i {
        color: ${e.palette.content.light};
      }
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: ${e.palette.informative.light};
    }

    &:focus-visible {
      outline: 2px solid ${e.palette.primary.default};
      outline-offset: 1px;
    }
  `}
`,H=r("button",{shouldForwardProp:n(e=>W(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  ${({theme:e,$isActive:t})=>`
    ${e.fontStyles.bodyXsBold};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    background-color: transparent; 
    color: ${e.palette.content.default};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${e.palette.primary.default};
      outline-offset: 1px;
      transition: none;
    }

    &:hover {
      background-color: ${e.palette.informative.light};
    }

    ${t&&`
        background-color: ${e.palette.primary.default};
        color: ${e.palette.content.contrast};
        cursor: default;

        &:hover {
          background-color: ${e.palette.primary.default};
        }
      `}
  `}
`,$=r.span`
  ${({theme:e})=>`
    ${e.fontStyles.bodyMdRegular};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: ${e.palette.content.default};
    user-select: none;
  `}
`,J=r.div`
  ${({theme:e})=>`
    label:empty {
      display: none;
    }

    @media screen and (min-width: ${e.breakpoints.mq3}px) {
      min-width: 200px;
    }
  `}
`,Q=r.span`
  ${({theme:e})=>`
    ${e.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`,s=O(),c=n(({ariaLabel:e,tooltipLabel:t,icon:i,targetPage:l,isDisabled:o,testId:f,onClick:h})=>{const u=(0,s.jsx)(X,{"aria-label":e,"data-testid":f,disabled:o,onClick:n(()=>h(l),"onClick"),children:(0,s.jsx)(q,{code:i,size:"small"})});return o?u:(0,s.jsxs)(v,{children:[u,(0,s.jsx)(v.Content,{background:"full",direction:"top",children:t})]})},"PaginationNavButton");c.displayName="PaginationNavButton";var U=n((e,t)=>({pages:Array.from({length:Math.max(t-e+1,0)},(i,l)=>e+l),shouldRenderFirstPage:!1,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!1}),"getCompactPageNumbers"),Y=n((e,t,i)=>e<=t+1?{pages:[t,t+1,t+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e<=i-3?{pages:[e-1,e,e+1],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:{pages:[i-2,i-1,i],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getForwardPageNumbers"),Z=n((e,t,i)=>e<=t+2?{pages:[t,t+1,t+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e>=i-1?{pages:[i-2,i-1,i],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1}:{pages:[e-1,e,e+1],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getBackwardPageNumbers"),ee=n((e,t,i="FORWARD")=>{const o=Math.max(Math.min(e,t),1);return t<=5?U(1,t):i==="BACKWARD"?Z(o,1,t):Y(o,1,t)},"getPageNumbers"),R=n((e,t,i)=>(0,s.jsx)(H,{$isActive:t,"aria-current":t?"page":!1,"aria-label":`Go to page ${e}`,"data-testid":t?"pagination-current-page":`pagination-page-${e}`,onClick:n(()=>i(e),"onClick"),title:`Go to page ${e}`,children:e},e),"renderPage"),ue=n(({currentPage:e,totalPages:t,totalItems:i,itemsPerPage:l=10,onPageChange:o,onItemsPerPageChange:f,showItemsPerPage:h=!1,showItemsInfo:u=!0,itemsPerPageOptions:j=P,dataTestId:L})=>{const d=t,b=(0,g.useRef)(e),k=e<b.current?"BACKWARD":"FORWARD";(0,g.useEffect)(()=>{(e<2||e>d-1)&&(b.current=e)},[e,d]);const x=e===d,m=e===1,{pages:E,shouldRenderFirstPage:S,shouldRenderLastPage:w,shouldRenderLeftEllipsis:_,shouldRenderRightEllipsis:F}=ee(e,d,k),C=(e-1)*l,A=Math.max(0,(i??0)-C),N=Math.min(l,A),I=h||u&&i!==void 0,p=(0,g.useCallback)(a=>{a!==e&&a>=1&&a<=d&&o(a)},[e,d,o]),B=(0,g.useCallback)(a=>{f?.(Number(a))},[f]);return(0,s.jsxs)(K,{"data-testid":L??"pagination",children:[I?(0,s.jsxs)(z,{children:[h?(0,s.jsx)(J,{children:(0,s.jsx)(y,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:B,placeholder:"Items per page",scale:"compact",value:l.toString(),children:j.map((a,D)=>(0,s.jsxs)(y.Option,{index:D,value:a.toString(),children:[a," per page"]},a))})}):null,u&&i!==void 0?(0,s.jsxs)(Q,{"data-testid":"pagination-items-info",children:["Showing ",(0,s.jsx)("strong",{children:N})," of"," ",(0,s.jsx)("strong",{children:i})," entries"]}):null]}):null,(0,s.jsxs)(V,{children:[(0,s.jsx)(c,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:m,onClick:p,targetPage:1,testId:"pagination-first-page",tooltipLabel:"First page"}),(0,s.jsx)(c,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:m,onClick:p,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),S?R(1,m,p):null,_?(0,s.jsx)($,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-left"):null,E.map(a=>R(a,a===e,p)),F?(0,s.jsx)($,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-right"):null,w?R(d,x,p):null,(0,s.jsx)(c,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:x,onClick:p,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),(0,s.jsx)(c,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:x,onClick:p,targetPage:t,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination");export{ue as t};
