var V=Object.defineProperty;var r=(e,t)=>V(e,"name",{value:t,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as m}from"./index-CwbBKW39.js";import{S as j}from"./Select-Bf3eLcgr.js";import{F as p,P as X,I as Y,a as Z,b as ee,c as te,N as se,d as u,T as w,e as ae}from"./PaginationNavButton-Ch7yWkdC.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./Icon-9dVURh2l.js";import"./IconButton-a7wLVv3Y.js";import"./LabelField-BrIM5Qam.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Cf7F2iyz.js";import"./Tooltip-DytQ_FPx.js";import"./index-BB3RDxQf.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-2OyBN-rf.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./Dropdown-DfbGLQxu.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-1WqW39vQ.js";const re=r((e,t)=>({pages:Array.from({length:Math.max(t-e+1,0)},(s,n)=>e+n),shouldRenderFirstPage:!1,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!1}),"getCompactPageNumbers"),ne=r((e,t,s)=>e<=t+1?{pages:[t,t+1,t+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e<=s-3?{pages:[e-1,e,e+1],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:{pages:[s-2,s-1,s],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getForwardPageNumbers"),ie=r((e,t,s)=>e<=t+2?{pages:[t,t+1,t+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e>=s-1?{pages:[s-2,s-1,s],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1}:{pages:[e-1,e,e+1],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getBackwardPageNumbers"),oe=r((e,t,s="FORWARD")=>{const n=p,l=Math.max(Math.min(e,t),n);return t<=n+4?re(n,t):s==="BACKWARD"?ie(l,n,t):ne(l,n,t)},"getPageNumbers"),I=r((e,t,s)=>a.jsx(ae,{$isActive:t,"aria-current":t?"page":!1,"aria-label":`Go to page ${e}`,"data-testid":t?"pagination-current-page":`pagination-page-${e}`,onClick:r(()=>s(e),"onClick"),title:`Go to page ${e}`,children:e},e),"renderPage"),T=r(({currentPage:e,totalPages:t,totalItems:s,itemsPerPage:n=10,onPageChange:l,onItemsPerPageChange:o,showItemsPerPage:g=!1,showItemsInfo:b=!0,itemsPerPageOptions:G=ee,dataTestId:k})=>{const L=t,E=m.useRef(e),O=e<E.current?"BACKWARD":"FORWARD";m.useEffect(()=>{E.current=e},[e]);const f=e===L,R=e===p,{pages:B,shouldRenderFirstPage:M,shouldRenderLastPage:$,shouldRenderLeftEllipsis:K,shouldRenderRightEllipsis:q}=oe(e,t,O),z=(e-p)*n,H=Math.max(0,(s??0)-z),J=Math.min(n,H),Q=g||b&&s!==void 0,d=m.useCallback(i=>{i!==e&&i>=p&&i<=t&&l(i)},[e,t,l]),U=m.useCallback(i=>{o==null||o(Number(i))},[o]);return a.jsxs(X,{"data-testid":k??"pagination",children:[Q?a.jsxs(Y,{children:[g?a.jsx(Z,{children:a.jsx(j,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:U,placeholder:"Items per page",scale:"compact",value:n.toString(),children:G.map((i,S)=>a.jsxs(j.Option,{index:S,value:i.toString(),children:[i," per page"]},i))})}):null,b&&s!==void 0?a.jsxs(te,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:J})," of"," ",a.jsx("strong",{children:s})," entries"]}):null]}):null,a.jsxs(se,{children:[a.jsx(u,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:R,onClick:d,targetPage:p,testId:"pagination-first-page",tooltipLabel:"First page"}),a.jsx(u,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:R,onClick:d,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),M?I(p,R,d):null,K?a.jsx(w,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-left"):null,B.map(i=>I(i,i===e,d)),q?a.jsx(w,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-right"):null,$?I(L,f,d):null,a.jsx(u,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:f,onClick:d,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),a.jsx(u,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:f,onClick:d,targetPage:t,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination"),x=r(e=>{const[t,s]=m.useState(e.currentPage||1),[n,l]=m.useState(e.itemsPerPage);return m.useEffect(()=>{l(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(T,{...e,currentPage:t,itemsPerPage:n,onItemsPerPageChange:r(o=>{var g;l(o),s(1),(g=e.onItemsPerPageChange)==null||g.call(e,o)},"onItemsPerPageChange"),onPageChange:r(o=>{var g;s(o),(g=e.onPageChange)==null||g.call(e,o)},"onPageChange")})})},"PaginationWrapper"),De={title:"Data Display/Pagination",component:T,parameters:{docs:{source:{code:`
          const [currentPage, setCurrentPage] = useState(1);
          const [itemsPerPage, setItemsPerPage] = useState(10);

          return (
            <Pagination
              totalPages={10}
              totalItems={100}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              onItemsPerPageChange={(items) => {
                setItemsPerPage(items);
                setCurrentPage(1);
              }}
            />
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},c={render:r(e=>a.jsx(x,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},P={render:r(e=>a.jsx(x,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},h={render:r(e=>a.jsx(x,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var C,F,v;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(v=(F=c.parameters)==null?void 0:F.docs)==null?void 0:v.source}}};var y,D,W;P.parameters={...P.parameters,docs:{...(y=P.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(W=(D=P.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var A,N,_;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(_=(N=h.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};const We=["Default","WithItemsPerPage","FewPages"];export{c as Default,h as FewPages,P as WithItemsPerPage,We as __namedExportsOrder,De as default};
