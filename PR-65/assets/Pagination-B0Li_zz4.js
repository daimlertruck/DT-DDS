import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import"./index-BV8q0bTk.js";import"./index-BXF0tG5y.js";import"./index-XjDa9cP3.js";import{r as a}from"./index-CTjT7uj6.js";import{d as y}from"./debounce-BF4Cdv7I.js";import{I as x}from"./Icon-DG6KDu5A.js";import{T as $}from"./Typography-DOQ44quZ.js";import{f as n}from"./emotion-styled.browser.esm-DBghOYGd.js";const j=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
`,S=n.button`
  ${({theme:t})=>`
    background-color: transparent;
    color: ${t.palette.primary.default};
    border: none;
    cursor: pointer;
  `}
`,g=n.button`
  ${({theme:t,disabled:e})=>`
    display: flex;
    justify-content: center;
    background-color: ${t.palette.surface.contrast};
    border: none;
    border-radius: 3px;
    cursor: ${e?"default":"pointer"};
  `}
`,w=n.input`
  ${({theme:t,hasError:e})=>`
    ${t.fontStyles.bodyMdRegularXSmall};
    text-align: center;
    padding: 6px 8px;
    margin: 0px;
    width: 50px;
    height: 32px;
    background-color: ${t.palette.surface.contrast};
    color: ${t.palette.content.default};
    border: ${e?`2px solid ${t.palette.error.default}`:`1px solid ${t.palette.border.default}`};
    border-radius: 3px;

    &:focus {
       ${!e&&`border-bottom: 2px solid ${t.palette.primary.default}`};
    }
  `}
`,d=({children:t,dataTestId:e})=>o.jsx(j,{"data-testid":e??"pagination-wrapper",children:t});d.Content=({totalPages:t,onClick:e})=>o.jsxs($,{fontStyles:"bodyXsRegular",children:["of"," ",o.jsx(S,{"data-testid":"pagination-last-page",onClick:e,title:"Go to last page",children:t})]});d.NextItem=({onClick:t,disabled:e})=>o.jsx(g,{"data-testid":"pagination-next-item",disabled:e,onClick:t,title:"Go to next page",children:o.jsx(x,{code:"arrow_forward_ios",size:"s"})});d.PreviousItem=({onClick:t,disabled:e})=>o.jsx(g,{"data-testid":"pagination-previous-item",disabled:e,onClick:t,title:"Go to previous page",children:o.jsx(x,{code:"arrow_back_ios",size:"s"})});const z=({totalPages:t,onHandleKeyDown:e,value:s,onChange:l})=>{const[r,u]=a.useState(1),[m,c]=a.useState(!1),f=a.useMemo(()=>y(i=>i(),500),[]);a.useEffect(()=>{s!==void 0&&u(s)},[s]),a.useEffect(()=>{r&&r<=t&&f(()=>{l(r)})},[f,r,l,t]);const b=i=>{const p=Number(i.target.value);u(p),p>t||p===0?c(!0):c(!1)};return o.jsx(w,{"data-testid":"pagination-input",hasError:m,onChange:b,onKeyDown:e,value:r})};export{d as P,z as a};
