import{j as o}from"./jsx-runtime-DMAvRu52.js";import"./index-9H7ywJDo.js";import"./index-DCrStp1_.js";import{r as a}from"./index-Dl6G-zuu.js";import{d as y}from"./debounce-BF4Cdv7I.js";import{I as x}from"./Icon-BZQueZez.js";import{T as $}from"./Typography-BuyRqL-z.js";import{n}from"./emotion-styled.browser.esm-DpDeK1WQ.js";const j=n.div`
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
    ${t.fontStyles.pXSmall};
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
`,d=({children:t,dataTestId:e})=>o.jsx(j,{"data-testid":e??"pagination-wrapper",children:t});d.Content=({totalPages:t,onClick:e})=>o.jsxs($,{fontStyles:"pXSmall",children:["of"," ",o.jsx(S,{"data-testid":"pagination-last-page",onClick:e,title:"Go to last page",children:t})]});d.NextItem=({onClick:t,disabled:e})=>o.jsx(g,{"data-testid":"pagination-next-item",disabled:e,onClick:t,title:"Go to next page",children:o.jsx(x,{code:"arrow_forward_ios",size:"s"})});d.PreviousItem=({onClick:t,disabled:e})=>o.jsx(g,{"data-testid":"pagination-previous-item",disabled:e,onClick:t,title:"Go to previous page",children:o.jsx(x,{code:"arrow_back_ios",size:"s"})});const z=({totalPages:t,onHandleKeyDown:e,value:s,onChange:l})=>{const[r,u]=a.useState(1),[m,c]=a.useState(!1),f=a.useMemo(()=>y(i=>i(),500),[]);a.useEffect(()=>{s!==void 0&&u(s)},[s]),a.useEffect(()=>{r&&r<=t&&f(()=>{l(r)})},[f,r,l,t]);const b=i=>{const p=Number(i.target.value);u(p),p>t||p===0?c(!0):c(!1)};return o.jsx(w,{"data-testid":"pagination-input",hasError:m,onChange:b,onKeyDown:e,value:r})};export{d as P,z as a};
