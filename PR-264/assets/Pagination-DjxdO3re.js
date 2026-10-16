var re=Object.defineProperty;var n=(e,a)=>re(e,"name",{value:a,configurable:!0});import{n as c}from"./rolldown-runtime-CzYk_CEw.js";import{t as oe}from"./react-HNhQAnN4.js";import{i as le,n as l,r as pe,t as ce}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as de}from"./src-CQysuBx9.js";import{t as L}from"./jsx-runtime-Br4tQxt1.js";import{t as ge}from"./icon-DzQ0uhXD.js";import{t as v}from"./Tooltip-BHH6gQjB.js";import{t as ue}from"./tooltip-CvrcS29q.js";import{n as T,t as me}from"./src-BylBWEH7.js";function j(){return(j=c((()=>{me()})))()}n(j,"init_select");var I;function h(){return(h=c((()=>{I=[10,20,50,100]})))()}n(h,"init_constants");var w,q,E,V,C,N,F,A;function S(){return(S=c((()=>{pe(),ce(),h(),w=l.div`
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
`,q=l.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media screen and (min-width: ${({theme:e})=>e.breakpoints.mq3}px) {
    width: auto;
    flex-shrink: 0;
  }
`,E=l.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`,V=l.button`
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
`,C=l("button",{shouldForwardProp:n(e=>le(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  ${({theme:e,$isActive:a})=>`
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

    ${a&&`
        background-color: ${e.palette.primary.default};
        color: ${e.palette.content.contrast};
        cursor: default;

        &:hover {
          background-color: ${e.palette.primary.default};
        }
      `}
  `}
`,N=l.span`
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
`,F=l.div`
  ${({theme:e})=>`
    label:empty {
      display: none;
    }

    @media screen and (min-width: ${e.breakpoints.mq3}px) {
      min-width: 200px;
    }
  `}
`,A=l.span`
  ${({theme:e})=>`
    ${e.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`})))()}n(S,"init_Pagination_styled");var m,p;function G(){return(G=c((()=>{ge(),ue(),S(),m=L(),p=n(({ariaLabel:e,tooltipLabel:a,icon:t,targetPage:r,isDisabled:o,testId:D,onClick:P})=>{const u=(0,m.jsx)(V,{"aria-label":e,"data-testid":D,disabled:o,onClick:n(()=>P(r),"onClick"),children:(0,m.jsx)(de,{code:t,size:"small"})});return o?u:(0,m.jsxs)(v,{children:[u,(0,m.jsx)(v.Content,{background:"full",direction:"top",children:a})]})},"PaginationNavButton"),p.displayName="PaginationNavButton";try{p.displayName="PaginationNavButton",p.__docgenInfo={description:"",displayName:"PaginationNavButton",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/components/PaginationNavButton/PaginationNavButton.tsx",methods:[],props:{ariaLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"ariaLabel",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"string"}},tooltipLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"tooltipLabel",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"string"}},icon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"icon",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:'"function" | "label" | "article" | "code" | "details" | "html" | "iframe" | "input" | "link" | "map" | "menu" | "output" | "search" | "select" | "source" | "style" | "table" | "title" | ... 3460 more ... | "zoom_out_map"'}},targetPage:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"targetPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"number"}},isDisabled:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"boolean"}},testId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"testId",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"string"}},onClick:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"onClick",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"(page: number) => void"}}},tags:{}}}catch{}})))()}n(G,"init_PaginationNavButton");function M(){return(M=c((()=>{G()})))()}n(M,"init_PaginationNavButton$1");function W(){return(W=c((()=>{M()})))()}n(W,"init_components");var R,$,B,O;function z(){return(z=c((()=>{h(),R=n((e,a)=>({pages:Array.from({length:Math.max(a-e+1,0)},(t,r)=>e+r),shouldRenderFirstPage:!1,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!1}),"getCompactPageNumbers"),$=n((e,a,t)=>e<=a+1?{pages:[a,a+1,a+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e<=t-3?{pages:[e-1,e,e+1],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:{pages:[t-2,t-1,t],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getForwardPageNumbers"),B=n((e,a,t)=>e<=a+2?{pages:[a,a+1,a+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e>=t-1?{pages:[t-2,t-1,t],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1}:{pages:[e-1,e,e+1],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getBackwardPageNumbers"),O=n((e,a,t="FORWARD")=>{const o=Math.max(Math.min(e,a),1);return a<=5?R(1,a):t==="BACKWARD"?B(o,1,a):$(o,1,a)},"getPageNumbers")})))()}n(z,"init_getPageNumbers");var f,i,k,b;function fe(){return(fe=c((()=>{f=oe(),j(),W(),h(),S(),z(),i=L(),k=n((e,a,t)=>(0,i.jsx)(C,{$isActive:a,"aria-current":a?"page":!1,"aria-label":`Go to page ${e}`,"data-testid":a?"pagination-current-page":`pagination-page-${e}`,onClick:n(()=>t(e),"onClick"),title:`Go to page ${e}`,children:e},e),"renderPage"),b=n(({currentPage:e,totalPages:a,totalItems:t,itemsPerPage:r=10,onPageChange:o,onItemsPerPageChange:D,showItemsPerPage:P=!1,showItemsInfo:u=!0,itemsPerPageOptions:K=I,dataTestId:X})=>{const d=a,_=(0,f.useRef)(e),H=e<_.current?"BACKWARD":"FORWARD";(0,f.useEffect)(()=>{(e<2||e>d-1)&&(_.current=e)},[e,d]);const y=e===d,x=e===1,{pages:J,shouldRenderFirstPage:Q,shouldRenderLastPage:U,shouldRenderLeftEllipsis:Y,shouldRenderRightEllipsis:Z}=O(e,d,H),ee=(e-1)*r,ae=Math.max(0,(t??0)-ee),te=Math.min(r,ae),ne=P||u&&t!==void 0,g=(0,f.useCallback)(s=>{s!==e&&s>=1&&s<=d&&o(s)},[e,d,o]),ie=(0,f.useCallback)(s=>{D?.(Number(s))},[D]);return(0,i.jsxs)(w,{"data-testid":X??"pagination",children:[ne?(0,i.jsxs)(q,{children:[P?(0,i.jsx)(F,{children:(0,i.jsx)(T,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:ie,placeholder:"Items per page",scale:"compact",value:r.toString(),children:K.map((s,se)=>(0,i.jsxs)(T.Option,{index:se,value:s.toString(),children:[s," per page"]},s))})}):null,u&&t!==void 0?(0,i.jsxs)(A,{"data-testid":"pagination-items-info",children:["Showing ",(0,i.jsx)("strong",{children:te})," of"," ",(0,i.jsx)("strong",{children:t})," entries"]}):null]}):null,(0,i.jsxs)(E,{children:[(0,i.jsx)(p,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:x,onClick:g,targetPage:1,testId:"pagination-first-page",tooltipLabel:"First page"}),(0,i.jsx)(p,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:x,onClick:g,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),Q?k(1,x,g):null,Y?(0,i.jsx)(N,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-left"):null,J.map(s=>k(s,s===e,g)),Z?(0,i.jsx)(N,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-right"):null,U?k(d,y,g):null,(0,i.jsx)(p,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:y,onClick:g,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),(0,i.jsx)(p,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:y,onClick:g,targetPage:a,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination");try{b.displayName="Pagination",b.__docgenInfo={description:"",displayName:"Pagination",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.tsx",methods:[],props:{currentPage:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"currentPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!0,tags:{},type:{name:"number"}},totalPages:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"totalPages",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!0,tags:{},type:{name:"number"}},totalItems:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"totalItems",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"number | undefined"}},itemsPerPage:{defaultValue:{value:"10"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"itemsPerPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"number | undefined"}},onPageChange:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"onPageChange",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!0,tags:{},type:{name:"(page: number) => void"}},onItemsPerPageChange:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"onItemsPerPageChange",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"((itemsPerPage: number) => void) | undefined"}},showItemsPerPage:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"showItemsPerPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},showItemsInfo:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"showItemsInfo",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},itemsPerPageOptions:{defaultValue:{value:"[10, 20, 50, 100]"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"itemsPerPageOptions",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"number[] | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}n(fe,"init_Pagination");export{fe as n,j as r,b as t};
