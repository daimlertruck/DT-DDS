var $=Object.defineProperty;var o=(t,e)=>$(t,"name",{value:e,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{I as f}from"./Icon-BWIy_dZb.js";import{T as g}from"./Tooltip-DCdlXixe.js";import{r as i}from"./index-CwbBKW39.js";import{f as b}from"./emotion-styled.browser.esm-CIRWz9XU.js";const S={selectedValue:void 0,showLabel:!0,onChange:o(()=>null,"onChange"),setSelectedValue:o(()=>null,"setSelectedValue")},x=i.createContext(S),C=o(()=>{const t=i.useContext(x);if(!t)throw new Error("useSegmentedControlContext must be used within a SegmentedControlProvider");return t},"useSegmentedControlContext"),m=o(({children:t,selectedValue:e,showLabel:r,onChange:l})=>{const[a,s]=i.useState(e);i.useEffect(()=>{s(e)},[e]);const d=o(c=>{l(c),s(c)},"handleChangeValue");return n.jsx(x.Provider,{value:{selectedValue:a,setSelectedValue:d,showLabel:r,onChange:l},children:t})},"SegmentedControlProvider"),y=b.button`
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
`,j=o(({label:t,iconCode:e,value:r,disabled:l})=>{const{setSelectedValue:a,showLabel:s,selectedValue:d}=C(),c=d===r,p=s||!e,u=n.jsxs(y,{"aria-label":t,"aria-pressed":c?"true":"false",disabled:l,onClick:o(()=>a(r),"onClick"),showLabel:p,type:"button",children:[e?n.jsx(f,{code:e,size:"small"}):null,p?t:null]});return p?u:n.jsxs(g,{children:[u,n.jsx(g.Content,{children:t})]})},"SegmentedControlOption"),V=b.div`
  ${({theme:t})=>`
    display: inline-flex;
    align-items: center;
    padding: ${t.spacing.spacing_20};
    border: 1px solid ${t.palette.border.default};
    border-radius: ${t.shape.segmentedControl};
  `}
`,w=o(({dataTestId:t,children:e,showLabel:r=!1,selectedValue:l,onChangeControl:a=o(()=>null,"onChangeControl"),...s})=>n.jsx(m,{onChange:a,selectedValue:l,showLabel:r,children:n.jsx(V,{"data-testid":t,role:"group",...s,children:e})}),"SegmentedControl");w.Option=j;export{w as S};
