var u=Object.defineProperty;var t=(e,i)=>u(e,"name",{value:i,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{I as g}from"./IconButton-BxQ2uS0G.js";import{f as x}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{O as c,a as d,T as n}from"./Tooltip-C0FBs99i.js";import"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";import"./index-BxfZPU2_.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-BOa1L1D0.js";import"./z-index-BB_IPOEl.js";import"./index-DV-VXEUn.js";const f=t(e=>o.jsxs("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:[o.jsxs("g",{clipPath:"url(#clip0_287_3834)",children:[o.jsx("path",{d:"M8 9H16V19H8V9Z",fill:"currentColor",opacity:"0.3"}),o.jsx("path",{d:"M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z",fill:"currentColor"})]}),o.jsx("defs",{children:o.jsx("clipPath",{id:"clip0_287_3834",children:o.jsx("rect",{fill:"white",height:"24",width:"24"})})})]}),"DeleteIcon"),j=x.div`
  text-align: center;
  margin-top: 100px;
`,v={component:n,title:"Data Display/Tooltip",argTypes:{background:{options:d,control:{type:"radio"}},direction:{options:c,control:{type:"select"}},children:{table:{disable:!0}}},render:t(({children:e,hideDelay:i,background:p,direction:m,message:h})=>o.jsx(j,{children:o.jsxs(n,{hideDelay:i,children:[e,o.jsx(n.Content,{background:p,direction:m,children:h})]})}),"render")},r={args:{hideDelay:0,children:o.jsx(g,{color:"error",dataTestId:"delete-id-button-",isDisabled:!1,onClick:t(()=>console.log("log"),"onClick"),children:o.jsx(f,{})}),direction:c.Top,background:d.Full,message:"Delete"}};var l,s,a;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    hideDelay: 0,
    children: <IconButton color='error' dataTestId='delete-id-button-' isDisabled={false} onClick={() => console.log('log')}>
        <DeleteIcon />
      </IconButton>,
    direction: OTooltipDirection.Top,
    background: OTooltipBackground.Full,
    message: 'Delete'
  }
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const M=["Default"];export{r as Default,M as __namedExportsOrder,v as default};
