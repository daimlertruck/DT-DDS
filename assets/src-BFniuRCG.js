var l=Object.defineProperty;var s=(r,e)=>l(r,"name",{value:e,configurable:!0});import{t as n}from"./emotion-styled.browser.esm-YTZgSpOx.js";import{t as p}from"./src-DQoSsMZn.js";import{t as d}from"./jsx-runtime-CPdzY0Ku.js";import"./icon-DhOkWClN.js";import{r as c,t as a}from"./Tooltip-C-JSQzch.js";import{t as m}from"./Typography-CS3NCxJQ.js";import"./tooltip-BtQECjo8.js";import"./typography-D_Go94-A.js";var x=n.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${({theme:r})=>r.spacing.spacing_60};
`,f=n.div`
  ${({theme:r})=>`
    row-gap: ${r.spacing.spacing_50};
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${r.palette.content.default};
  `}
`,u=n.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`,y=n.div`
  ${({theme:r,disabled:e})=>`
    display: flex;
    gap: ${r.spacing.spacing_50};
    justify-content: stretch;
    align-items: start;
    flex-direction: column;

    @media only screen and (min-width: ${r.breakpoints.mq3}px) {
      flex-direction: row;
    }

    ${e&&`
        opacity: 0.5;
        pointer-events: none;
      `}
  `}
`,t=d(),g=s(r=>r.preventDefault(),"DEFAULT_ON_SUBMIT"),v=s(({children:r,dataTestId:e,style:i,onSubmit:o=g})=>(0,t.jsx)(x,{"data-testid":e??"test-form",onSubmit:o,style:i,children:r}),"Form");v.Group=({children:r,isDisabled:e,title:i,tooltip:o})=>(0,t.jsxs)(f,{children:[i?(0,t.jsxs)(u,{children:[(0,t.jsx)(m,{color:"primary.default",fontStyles:"h6",style:{textTransform:"uppercase"},children:i}),o?(0,t.jsxs)(a,{children:[(0,t.jsx)(p,{code:"info",size:"small"}),(0,t.jsx)(a.Content,{direction:c.Right,style:{maxWidth:250},children:o})]}):null]}):null,(0,t.jsx)(y,{disabled:e,children:r})]});export{v as t};
