var c=Object.defineProperty;var r=(t,o)=>c(t,"name",{value:o,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{I as d}from"./Icon-9dVURh2l.js";import{T as l,O as p}from"./Tooltip-BAyLv02p.js";import{T as m}from"./Typography-Dk4smw7A.js";import{f as n}from"./emotion-styled.browser.esm-CIRWz9XU.js";const f=n.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${({theme:t})=>t.spacing.spacing_60};
`,x=n.div`
  ${({theme:t})=>`
    row-gap: ${t.spacing.spacing_50};
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${t.palette.content.default};
  `}
`,y=n.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`,u=n.div`
  ${({theme:t,disabled:o})=>`
    display: flex;
    gap: ${t.spacing.spacing_50};
    justify-content: stretch;
    align-items: start;
    flex-direction: column;

    @media only screen and (min-width: ${t.breakpoints.mq3}px) {
      flex-direction: row;
    }

    ${o&&`
        opacity: 0.5;
        pointer-events: none;
      `}
  `}
`,g=r(t=>t.preventDefault(),"DEFAULT_ON_SUBMIT"),h=r(({children:t,dataTestId:o,style:i,onSubmit:s=g})=>{const a=o??"test-form";return e.jsx(f,{"data-testid":a,onSubmit:s,style:i,children:t})},"Form");h.Group=({children:t,isDisabled:o,title:i,tooltip:s})=>e.jsxs(x,{children:[i?e.jsxs(y,{children:[e.jsx(m,{color:"primary.default",fontStyles:"h6",style:{textTransform:"uppercase"},children:i}),s?e.jsxs(l,{children:[e.jsx(d,{code:"info",size:"small"}),e.jsx(l.Content,{direction:p.Right,style:{maxWidth:250},children:s})]}):null]}):null,e.jsx(u,{disabled:o,children:t})]});export{h as F};
