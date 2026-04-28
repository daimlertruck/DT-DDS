var V=Object.defineProperty;var r=(e,t)=>V(e,"name",{value:t,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as p}from"./index-CwbBKW39.js";import{S as j}from"./Select-BQJgTbqd.js";import{F as u,P as X,I as Y,a as Z,b as ee,c as te,N as se,d as c,T as w,e as ae}from"./PaginationNavButton-D1jTY8TE.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./Icon-9dVURh2l.js";import"./IconButton-D1lKSM55.js";import"./LabelField-BrIM5Qam.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Cf7F2iyz.js";import"./Tooltip-B8qeeokA.js";import"./index-rvPLeA2G.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-BM_XYAif.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./Dropdown-Dea5rQks.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-OV7xbgPl.js";const re=r((e,t)=>({pages:Array.from({length:Math.max(t-e+1,0)},(s,i)=>e+i),shouldRenderFirstPage:!1,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!1}),"getCompactPageNumbers"),ie=r((e,t,s)=>e<=t+1?{pages:[t,t+1,t+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e<=s-3?{pages:[e-1,e,e+1],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:{pages:[s-2,s-1,s],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getForwardPageNumbers"),ne=r((e,t,s)=>e<=t+2?{pages:[t,t+1,t+2],shouldRenderFirstPage:!1,shouldRenderLastPage:!0,shouldRenderLeftEllipsis:!1,shouldRenderRightEllipsis:!0}:e>=s-1?{pages:[s-2,s-1,s],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1}:{pages:[e-1,e,e+1],shouldRenderFirstPage:!0,shouldRenderLastPage:!1,shouldRenderLeftEllipsis:!0,shouldRenderRightEllipsis:!1},"getBackwardPageNumbers"),oe=r((e,t,s="FORWARD")=>{const i=u,l=Math.max(Math.min(e,t),i);return t<=i+4?re(i,t):s==="BACKWARD"?ne(l,i,t):ie(l,i,t)},"getPageNumbers"),x=r((e,t,s)=>a.jsx(ae,{$isActive:t,"aria-current":t?"page":!1,"aria-label":`Go to page ${e}`,"data-testid":t?"pagination-current-page":`pagination-page-${e}`,onClick:r(()=>s(e),"onClick"),title:`Go to page ${e}`,children:e},e),"renderPage"),_=r(({currentPage:e,totalPages:t,totalItems:s,itemsPerPage:i=10,onPageChange:l,onItemsPerPageChange:o,showItemsPerPage:d=!1,showItemsInfo:L=!0,itemsPerPageOptions:G=ee,dataTestId:k})=>{const g=t,E=p.useRef(e),O=e<E.current?"BACKWARD":"FORWARD";p.useEffect(()=>{(e<2||e>g-1)&&(E.current=e)},[e,g]);const R=e===g,I=e===u,{pages:B,shouldRenderFirstPage:M,shouldRenderLastPage:$,shouldRenderLeftEllipsis:K,shouldRenderRightEllipsis:q}=oe(e,g,O),z=(e-u)*i,H=Math.max(0,(s??0)-z),J=Math.min(i,H),Q=d||L&&s!==void 0,m=p.useCallback(n=>{n!==e&&n>=u&&n<=g&&l(n)},[e,g,l]),U=p.useCallback(n=>{o==null||o(Number(n))},[o]);return a.jsxs(X,{"data-testid":k??"pagination",children:[Q?a.jsxs(Y,{children:[d?a.jsx(Z,{children:a.jsx(j,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:U,placeholder:"Items per page",scale:"compact",value:i.toString(),children:G.map((n,S)=>a.jsxs(j.Option,{index:S,value:n.toString(),children:[n," per page"]},n))})}):null,L&&s!==void 0?a.jsxs(te,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:J})," of"," ",a.jsx("strong",{children:s})," entries"]}):null]}):null,a.jsxs(se,{children:[a.jsx(c,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:I,onClick:m,targetPage:u,testId:"pagination-first-page",tooltipLabel:"First page"}),a.jsx(c,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:I,onClick:m,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),M?x(u,I,m):null,K?a.jsx(w,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-left"):null,B.map(n=>x(n,n===e,m)),q?a.jsx(w,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-right"):null,$?x(g,R,m):null,a.jsx(c,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:R,onClick:m,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),a.jsx(c,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:R,onClick:m,targetPage:t,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination"),b=r(e=>{const[t,s]=p.useState(e.currentPage||1),[i,l]=p.useState(e.itemsPerPage);return p.useEffect(()=>{l(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(_,{...e,currentPage:t,itemsPerPage:i,onItemsPerPageChange:r(o=>{var d;l(o),s(1),(d=e.onItemsPerPageChange)==null||d.call(e,o)},"onItemsPerPageChange"),onPageChange:r(o=>{var d;s(o),(d=e.onPageChange)==null||d.call(e,o)},"onPageChange")})})},"PaginationWrapper"),De={title:"Data Display/Pagination",component:_,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},h={render:r(e=>a.jsx(b,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},P={render:r(e=>a.jsx(b,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},f={render:r(e=>a.jsx(b,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var F,C,v;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(v=(C=h.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var y,D,W;P.parameters={...P.parameters,docs:{...(y=P.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(W=(D=P.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var A,N,T;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(T=(N=f.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};const We=["Default","WithItemsPerPage","FewPages"];export{h as Default,f as FewPages,P as WithItemsPerPage,We as __namedExportsOrder,De as default};
