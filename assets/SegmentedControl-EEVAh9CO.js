var f=Object.defineProperty;var o=(t,e)=>f(t,"name",{value:e,configurable:!0});import{o as x}from"./rolldown-runtime-CzYk_CEw.js";import{t as m}from"./react-HNhQAnN4.js";import{t as b}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as S}from"./src-Cgsrikn0.js";import{t as C}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as g}from"./Tooltip-CV1x-ycZ.js";import"./tooltip-B7p4pHEA.js";var d=x(m()),r=C(),$=(0,d.createContext)({selectedValue:void 0,showLabel:!0,onChange:o(()=>null,"onChange"),setSelectedValue:o(()=>null,"setSelectedValue")}),v=o(()=>{const t=(0,d.useContext)($);if(!t)throw new Error("useSegmentedControlContext must be used within a SegmentedControlProvider");return t},"useSegmentedControlContext"),_=o(({children:t,selectedValue:e,showLabel:n,onChange:a})=>{const[s,l]=(0,d.useState)(e);(0,d.useEffect)(()=>{l(e)},[e]);const c=o(i=>{a(i),l(i)},"handleChangeValue");return(0,r.jsx)($.Provider,{value:{selectedValue:s,setSelectedValue:c,showLabel:n,onChange:a},children:t})},"SegmentedControlProvider"),y=b.button`
  ${({theme:t,showLabel:e})=>`
    ${t.fontStyles.bodyMdRegular};

    display: flex;
    align-items: center;
    gap: ${t.spacing.spacing_20};
    cursor: pointer;
    background-color: ${t.palette.surface.contrast};
    color: ${t.palette.content.default};
    border: none;
    border-radius: ${t.shape.button};
    padding: ${t.spacing.spacing_20} ${t.spacing[e?"spacing_40":"spacing_20"]};

    &:not(:disabled):hover {
      background-color: ${t.palette.primary.light};
      color: ${t.palette.content.default};

      i {
        color: ${t.palette.content.dark};
      }
    }

    &:not(:disabled)[aria-pressed="true"] {
      background-color: ${t.palette.primary.default};
      color: ${t.palette.content.contrast};

      i {
        color: ${t.palette.content.contrast};
      }
    }

    &:disabled {
        color: ${t.palette.content.light};
        cursor: not-allowed;

        i {
          color: ${t.palette.content.light};
        }
    }

  `}
`,j=o(({label:t,iconCode:e,value:n,disabled:a})=>{const{setSelectedValue:s,showLabel:l,selectedValue:c}=v(),i=c===n,p=l||!e,u=(0,r.jsxs)(y,{"aria-label":t,"aria-pressed":i?"true":"false",disabled:a,onClick:o(()=>s(n),"onClick"),showLabel:p,type:"button",children:[e?(0,r.jsx)(S,{code:e,size:"small"}):null,p?t:null]});return p?u:(0,r.jsxs)(g,{children:[u,(0,r.jsx)(g.Content,{children:t})]})},"SegmentedControlOption"),w=b.div`
  ${({theme:t})=>`
    display: inline-flex;
    align-items: center;
    padding: ${t.spacing.spacing_20};
    border: 1px solid ${t.palette.border.default};
    border-radius: ${t.shape.segmentedControl};
  `}
`,V=o(({dataTestId:t,children:e,showLabel:n=!1,selectedValue:a,onChangeControl:s=o(()=>null,"onChangeControl"),...l})=>(0,r.jsx)(_,{onChange:s,selectedValue:a,showLabel:n,children:(0,r.jsx)(w,{"data-testid":t,role:"group",...l,children:e})}),"SegmentedControl");V.Option=j;export{V as t};
