var $=Object.defineProperty;var n=(t,e)=>$(t,"name",{value:e,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as a}from"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";import"./index-yxbjx5Gc.js";import"./index-DV-VXEUn.js";import{d as j}from"./debounce-DVt643yU.js";import{I as g}from"./Icon-BrO18bYS.js";import{T as S}from"./Typography-BDc1BtFV.js";import{f as s}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const w=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
`,I=s.button`
  ${({theme:t})=>`
    background-color: transparent;
    color: ${t.palette.primary.default};
    border: none;
    cursor: pointer;
  `}
`,m=s.button`
  ${({theme:t,disabled:e})=>`
    display: flex;
    justify-content: center;
    background-color: ${t.palette.surface.contrast};
    border: none;
    border-radius: 3px;
    cursor: ${e?"default":"pointer"};
  `}
`,v=s.input`
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
`,l=n(({children:t,dataTestId:e})=>o.jsx(w,{"data-testid":e??"pagination-wrapper",children:t}),"Pagination");l.Content=({totalPages:t,onClick:e})=>o.jsxs(S,{fontStyles:"bodyXsRegular",children:["of"," ",o.jsx(I,{"data-testid":"pagination-last-page",onClick:e,title:"Go to last page",children:t})]});l.NextItem=({onClick:t,disabled:e})=>o.jsx(m,{"data-testid":"pagination-next-item",disabled:e,onClick:t,title:"Go to next page",children:o.jsx(g,{code:"arrow_forward_ios",size:"small"})});l.PreviousItem=({onClick:t,disabled:e})=>o.jsx(m,{"data-testid":"pagination-previous-item",disabled:e,onClick:t,title:"Go to previous page",children:o.jsx(g,{code:"arrow_back_ios",size:"small"})});const N=n(({totalPages:t,onHandleKeyDown:e,value:i,onChange:u})=>{const[r,c]=a.useState(1),[b,f]=a.useState(!1),x=a.useMemo(()=>j(p=>p(),500),[]);a.useEffect(()=>{i!==void 0&&c(i)},[i]),a.useEffect(()=>{r&&r<=t&&x(()=>{u(r)})},[x,r,u,t]);const y=n(p=>{const d=Number(p.target.value);c(d),d>t||d===0?f(!0):f(!1)},"handleChange");return o.jsx(v,{"data-testid":"pagination-input",hasError:b,onChange:y,onKeyDown:e,value:r})},"PaginationInput");export{l as P,N as a};
