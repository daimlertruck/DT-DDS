import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import{I as x}from"./Icon-DG6KDu5A.js";import{T as u}from"./Tooltip-C7hPAyRc.js";import{r as c}from"./index-CTjT7uj6.js";import{f as g}from"./emotion-styled.browser.esm-DBghOYGd.js";const $={selectedValue:void 0,showLabel:!0,onChange:()=>null,setSelectedValue:()=>null},b=c.createContext($),f=()=>{const t=c.useContext(b);if(!t)throw new Error("useSegmentedControlContext must be used within a SegmentedControlProvider");return t},S=({children:t,selectedValue:e,showLabel:n,onChange:r})=>{const[s,l]=c.useState(e);c.useEffect(()=>{l(e)},[e]);const i=a=>{r(a),l(a)};return o.jsx(b.Provider,{value:{selectedValue:s,setSelectedValue:i,showLabel:n,onChange:r},children:t})},C=g.button`
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
`,m=({label:t,iconCode:e,value:n,disabled:r})=>{const{setSelectedValue:s,showLabel:l,selectedValue:i}=f(),a=i===n,d=l||!e,p=o.jsxs(C,{"aria-label":t,"aria-pressed":a?"true":"false",disabled:r,onClick:()=>s(n),showLabel:d,type:"button",children:[e?o.jsx(x,{code:e,size:"s"}):null,d?t:null]});return d?p:o.jsxs(u,{children:[p,o.jsx(u.Content,{children:t})]})},y=g.div`
  ${({theme:t})=>`
    display: inline-flex;
    align-items: center;
    padding: ${t.spacing.spacing_20};
    border: 1px solid ${t.palette.border.default};
    border-radius: ${t.shape.segmentedControl};
  `}
`,j=({dataTestId:t,children:e,showLabel:n=!1,selectedValue:r,onChangeControl:s=()=>null,...l})=>o.jsx(S,{onChange:s,selectedValue:r,showLabel:n,children:o.jsx(y,{"data-testid":t,role:"group",...l,children:e})});j.Option=m;export{j as S};
