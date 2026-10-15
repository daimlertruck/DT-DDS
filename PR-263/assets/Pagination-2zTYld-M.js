var re=Object.defineProperty;var n=(e,a)=>re(e,"name",{value:a,configurable:!0});import{n as p}from"./rolldown-runtime-CzYk_CEw.js";import{t as oe}from"./react-HNhQAnN4.js";import{i as le,n as l,r as de,t as pe}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as ce}from"./src-DHrISQ1l.js";import{t as C}from"./jsx-runtime-Br4tQxt1.js";import{t as ge}from"./icon-Cd5k6Y-r.js";import{t as $}from"./Tooltip-0M9Tfmio.js";import{t as me}from"./tooltip-D-6XAdV8.js";import{n as E,t as ue}from"./src-DFQgDGTT.js";function F(){return(F=p((()=>{ue()})))()}n(F,"init_select");var W;function v(){return(v=p((()=>{W=[10,20,50,100]})))()}n(v,"init_constants");var k,_,T,S,x,y,N,b;function q(){return(q=p((()=>{de(),pe(),v(),k=l.div`
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
`,_=l.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media screen and (min-width: ${({theme:e})=>e.breakpoints.mq3}px) {
    width: auto;
    flex-shrink: 0;
  }
`,T=l.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`,S=l.button`
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
`,x=l("button",{shouldForwardProp:n(e=>le(e)&&!e.startsWith("$"),"shouldForwardProp")})`
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
`,y=l.span`
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
`,N=l.div`
  ${({theme:e})=>`
    label:empty {
      display: none;
    }

    @media screen and (min-width: ${e.breakpoints.mq3}px) {
      min-width: 200px;
    }
  `}
`,b=l.span`
  ${({theme:e})=>`
    ${e.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`;try{k.displayName="PaginationStyled",k.__docgenInfo={description:"",displayName:"PaginationStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{_.displayName="InfoWrapperStyled",_.__docgenInfo={description:"",displayName:"InfoWrapperStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{T.displayName="NavigationWrapperStyled",T.__docgenInfo={description:"",displayName:"NavigationWrapperStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{S.displayName="PaginationButtonStyled",S.__docgenInfo={description:"",displayName:"PaginationButtonStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{x.displayName="PaginationPageButtonStyled",x.__docgenInfo={description:"",displayName:"PaginationPageButtonStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/types.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/types.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},$isActive:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",name:"PaginationPageButtonStyledProps"}],description:"",name:"$isActive",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",name:"PaginationPageButtonStyledProps"},required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}try{y.displayName="TruncationTextStyled",y.__docgenInfo={description:"",displayName:"TruncationTextStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{N.displayName="ItemsPerPageWrapperStyled",N.__docgenInfo={description:"",displayName:"ItemsPerPageWrapperStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{b.displayName="ItemsInfoTextStyled",b.__docgenInfo={description:"",displayName:"ItemsInfoTextStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}})))()}n(q,"init_Pagination_styled");var u,d;function A(){return(A=p((()=>{ge(),me(),q(),u=C(),d=n(({ariaLabel:e,tooltipLabel:a,icon:t,targetPage:r,isDisabled:o,testId:D,onClick:h})=>{const m=(0,u.jsx)(S,{"aria-label":e,"data-testid":D,disabled:o,onClick:n(()=>h(r),"onClick"),children:(0,u.jsx)(ce,{code:t,size:"small"})});return o?m:(0,u.jsxs)($,{children:[m,(0,u.jsx)($.Content,{background:"full",direction:"top",children:a})]})},"PaginationNavButton"),d.displayName="PaginationNavButton";try{d.displayName="PaginationNavButton",d.__docgenInfo={description:"",displayName:"PaginationNavButton",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/components/PaginationNavButton/PaginationNavButton.tsx",methods:[],props:{ariaLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"ariaLabel",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"string"}},tooltipLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"tooltipLabel",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"string"}},icon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"icon",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:'"function" | "label" | "photo" | "style" | "light" | "key" | "title" | "tooltip" | "description" | "warning" | "error" | "translate" | "security" | "height" | "width" | "done" | ... 3462 more ... | "zoom_out_map"'}},targetPage:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"targetPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"number"}},isDisabled:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"boolean"}},testId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"testId",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"string"}},onClick:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"}],description:"",name:"onClick",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationNavButtonProps"},required:!0,tags:{},type:{name:"(page: number) => void"}}},tags:{}}}catch{}})))()}n(A,"init_PaginationNavButton");function G(){return(G=p((()=>{A()})))()}n(G,"init_PaginationNavButton$1");function M(){return(M=p((()=>{G()})))()}n(M,"init_components");var V,w,j,O;function z(){return(z=p((()=>{v(),V=n((e,a)=>({pages:Array.from({length:Math.max(a-e+1,0)},(t,r)=>e+r),shouldRenderFirstPage:!1,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!1}),"getCompactPageNumbers"),w=n((e,a,t)=>e<=a+1?{pages:[a,a+1,a+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e<=t-3?{pages:[e-1,e,e+1],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:{pages:[t-2,t-1,t],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getForwardPageNumbers"),j=n((e,a,t)=>e<=a+2?{pages:[a,a+1,a+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e>=t-1?{pages:[t-2,t-1,t],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1}:{pages:[e-1,e,e+1],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getBackwardPageNumbers"),O=n((e,a,t="FORWARD")=>{const o=Math.max(Math.min(e,a),1);return a<=5?V(1,a):t==="BACKWARD"?j(o,1,a):w(o,1,a)},"getPageNumbers")})))()}n(z,"init_getPageNumbers");var f,i,P,L;function fe(){return(fe=p((()=>{f=oe(),F(),M(),v(),q(),z(),i=C(),P=n((e,a,t)=>(0,i.jsx)(x,{$isActive:a,"aria-current":a?"page":!1,"aria-label":`Go to page ${e}`,"data-testid":a?"pagination-current-page":`pagination-page-${e}`,onClick:n(()=>t(e),"onClick"),title:`Go to page ${e}`,children:e},e),"renderPage"),L=n(({currentPage:e,totalPages:a,totalItems:t,itemsPerPage:r=10,onPageChange:o,onItemsPerPageChange:D,showItemsPerPage:h=!1,showItemsInfo:m=!0,itemsPerPageOptions:K=W,dataTestId:X})=>{const c=a,B=(0,f.useRef)(e),H=e<B.current?"BACKWARD":"FORWARD";(0,f.useEffect)(()=>{(e<2||e>c-1)&&(B.current=e)},[e,c]);const I=e===c,R=e===1,{pages:J,shouldRenderFirstPage:Q,shouldRenderLastPage:U,shouldRenderLeftEllipsis:Y,shouldRenderRightEllipsis:Z}=O(e,c,H),ee=(e-1)*r,ae=Math.max(0,(t??0)-ee),te=Math.min(r,ae),ne=h||m&&t!==void 0,g=(0,f.useCallback)(s=>{s!==e&&s>=1&&s<=c&&o(s)},[e,c,o]),ie=(0,f.useCallback)(s=>{D?.(Number(s))},[D]);return(0,i.jsxs)(k,{"data-testid":X??"pagination",children:[ne?(0,i.jsxs)(_,{children:[h?(0,i.jsx)(N,{children:(0,i.jsx)(E,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:ie,placeholder:"Items per page",scale:"compact",value:r.toString(),children:K.map((s,se)=>(0,i.jsxs)(E.Option,{index:se,value:s.toString(),children:[s," per page"]},s))})}):null,m&&t!==void 0?(0,i.jsxs)(b,{"data-testid":"pagination-items-info",children:["Showing ",(0,i.jsx)("strong",{children:te})," of"," ",(0,i.jsx)("strong",{children:t})," entries"]}):null]}):null,(0,i.jsxs)(T,{children:[(0,i.jsx)(d,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:R,onClick:g,targetPage:1,testId:"pagination-first-page",tooltipLabel:"First page"}),(0,i.jsx)(d,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:R,onClick:g,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),Q?P(1,R,g):null,Y?(0,i.jsx)(y,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-left"):null,J.map(s=>P(s,s===e,g)),Z?(0,i.jsx)(y,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-right"):null,U?P(c,I,g):null,(0,i.jsx)(d,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:I,onClick:g,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),(0,i.jsx)(d,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:I,onClick:g,targetPage:a,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination");try{L.displayName="Pagination",L.__docgenInfo={description:"",displayName:"Pagination",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/pagination/src/Pagination.tsx",methods:[],props:{currentPage:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"currentPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!0,tags:{},type:{name:"number"}},totalPages:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"totalPages",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!0,tags:{},type:{name:"number"}},totalItems:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"totalItems",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"number | undefined"}},itemsPerPage:{defaultValue:{value:"10"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"itemsPerPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"number | undefined"}},onPageChange:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"onPageChange",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!0,tags:{},type:{name:"(page: number) => void"}},onItemsPerPageChange:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"onItemsPerPageChange",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"((itemsPerPage: number) => void) | undefined"}},showItemsPerPage:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"showItemsPerPage",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},showItemsInfo:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"showItemsInfo",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},itemsPerPageOptions:{defaultValue:{value:"[10, 20, 50, 100]"},declarations:[{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"}],description:"",name:"itemsPerPageOptions",parent:{fileName:"DT-DDS/packages/react-packages/pagination/src/types/index.ts",name:"PaginationProps"},required:!1,tags:{},type:{name:"number[] | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}n(fe,"init_Pagination");export{fe as n,F as r,L as t};
