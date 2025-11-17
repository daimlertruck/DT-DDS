import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{T as r,O as a}from"./Tooltip-CzU9_8jZ.js";import{T as c}from"./Typography-CxOo5OZe.js";import{s as n}from"./emotion-styled.browser.esm-BMKZqQy6.js";const d=t=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"})}),p=n.form`
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
`,m=n.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`,f=n.div`
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
`,h=t=>t.preventDefault(),g=({children:t,dataTestId:i,style:o,onSubmit:s=h})=>{const l=i??"test-form";return e.jsx(p,{"data-testid":l,onSubmit:s,style:o,children:t})};g.Group=({children:t,isDisabled:i,title:o,tooltip:s})=>e.jsxs(x,{children:[o?e.jsxs(m,{children:[e.jsx(c,{color:"primary.default",fontStyles:"h6",style:{textTransform:"uppercase"},children:o}),s?e.jsxs(r,{children:[e.jsx(d,{height:"16",width:"16"}),e.jsx(r.Content,{direction:a.Right,style:{maxWidth:250},children:s})]}):null]}):null,e.jsx(f,{disabled:i,children:t})]});export{g as F};
