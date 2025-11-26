var c=Object.defineProperty;var s=(t,i)=>c(t,"name",{value:i,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{T as l,O as d}from"./Tooltip-B_gpWeST.js";import{T as p}from"./Typography-CEwLj33J.js";import{f as r}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const x=s(t=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"})}),"Info"),m=r.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${({theme:t})=>t.spacing.spacing_60};
`,f=r.div`
  ${({theme:t})=>`
    row-gap: ${t.spacing.spacing_50};
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${t.palette.content.default};
  `}
`,h=r.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`,g=r.div`
  ${({theme:t,disabled:i})=>`
    display: flex;
    gap: ${t.spacing.spacing_50};
    justify-content: stretch;
    align-items: start;
    flex-direction: column;

    @media only screen and (min-width: ${t.breakpoints.mq3}px) {
      flex-direction: row;
    }

    ${i&&`
        opacity: 0.5;
        pointer-events: none;
      `}
  `}
`,u=s(t=>t.preventDefault(),"DEFAULT_ON_SUBMIT"),y=s(({children:t,dataTestId:i,style:o,onSubmit:n=u})=>{const a=i??"test-form";return e.jsx(m,{"data-testid":a,onSubmit:n,style:o,children:t})},"Form");y.Group=({children:t,isDisabled:i,title:o,tooltip:n})=>e.jsxs(f,{children:[o?e.jsxs(h,{children:[e.jsx(p,{color:"primary.default",fontStyles:"h6",style:{textTransform:"uppercase"},children:o}),n?e.jsxs(l,{children:[e.jsx(x,{height:"16",width:"16"}),e.jsx(l.Content,{direction:d.Right,style:{maxWidth:250},children:n})]}):null]}):null,e.jsx(g,{disabled:i,children:t})]});export{y as F};
