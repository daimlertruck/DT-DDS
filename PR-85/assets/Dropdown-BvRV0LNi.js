import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import{T as m}from"./Typography-DHEP7O00.js";import{f as v,d as M}from"./emotion-styled.browser.esm-DBghOYGd.js";import{r as l}from"./index-CTjT7uj6.js";import{B}from"./index-CWvrgZ1b.js";import{I as O}from"./Icon-DG6KDu5A.js";import{I as P}from"./IconButton-C_mszqXk.js";import"./index-D9dZuxfj.js";import"./index-BMOsMRi9.js";import"./index-XjDa9cP3.js";import{b as T}from"./z-index-CLLOsryR.js";import{u as z}from"./useClickOutside-CvVYzr-_.js";const A=v.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-top: 4px;
`,F=({dataTestId:t,isDisabled:e=!1,hasError:n=!1,children:r=""})=>{const s=e?"content.light":"content.medium";return o.jsx(A,{"data-testid":t??"dropdown-text",children:o.jsx(m,{color:n?"error.default":s,element:"span",fontStyles:"bodySmRegular",children:r})})},h={state:{text:"",value:""},isOpen:!1,setState:()=>null,setIsOpen:()=>null},_=l.createContext(h),N=({children:t,defaultValue:e,name:n})=>{const[r,s]=l.useState(e??h.state),[i,c]=l.useState(h.isOpen);return l.useEffect(()=>e&&s(e),[e]),o.jsx(_.Provider,{value:{state:r,setState:s,isOpen:i,setIsOpen:c,name:n},children:t})},C=()=>{const t=l.useContext(_);if(!t)throw new Error("Dropdown compound components cannot be rendered outside the Dropdown component");return t},U=v.li`
  ${({theme:t,disabled:e,isSelected:n})=>`
    ${t.fontStyles[n?"bodyMdBold":"bodyMdRegular"]};
    color: ${t.palette.content.default};
    list-style: none;
    padding: ${t.spacing.spacing_30} ${t.spacing.spacing_50};
    text-overflow: ellipsis;
    overflow-x: hidden;

    &:hover {
      background: ${e?t.palette.surface.light:t.palette.primary.light};
      cursor: ${e?"not-allowed":"pointer"};
    }

    ${e&&`
        color: ${t.palette.content.light};
        background: ${t.palette.surface.light};
      `}
  `}
`,L=({dataTestId:t,option:e,children:n,style:r,isDisabled:s,onClick:i})=>{const{state:c,setState:f,setIsOpen:g,name:y}=C(),b=t??`dropdown-option-${e.value}`,p={text:e.text??e.value,value:e.value},u=x=>{s||(g(!1),f(p),i&&i(e.value,y,x))};return o.jsx(U,{"data-testid":b,disabled:s,isSelected:c.value===e.value,onClick:u,role:"option",style:r,children:n},e.value)},W=v.ul`
  ${({theme:t})=>`
    background: ${t.palette.surface.contrast};
    border: 1px solid ${t.palette.border.default};
    border-radius: ${t.shape.dropdown};
    width: 100%;
    padding:${t.spacing.spacing_50} ${t.spacing.spacing_0};
    margin: ${t.spacing.spacing_20} ${t.spacing.spacing_0};
    position: absolute;
    right: 0;
    z-index: ${T};
    max-height: 180px;
    overflow: auto;
  `}
`,k=({children:t,dataTestId:e,style:n})=>o.jsx(W,{"data-testid":`${e?e+"-":""}menu`,style:n,children:t}),X=(t,e)=>({default:e.palette.surface.default,contrast:e.palette.surface.contrast,light:e.palette.surface.light})[t],Z=v.button`
  ${({theme:t,hasBorder:e=!0,hasError:n=!1,isOpen:r=!1,variant:s="outlined",fill:i="default"})=>{const c=t.palette.border.medium,f=t.palette.content.dark,g=t.palette.error.default;return`
      background: ${t.palette.surface.contrast};
      padding: ${t.spacing.spacing_30} ${e?t.spacing.spacing_50:"0"};
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      width: 100%;
      height: 53px;
      cursor: pointer;
      outline: none;

      background-color: ${X(i,t)};

      border-width: ${s==="outlined"?"1px":"0 0 1px"};
      border-color: ${r?f:c};
      border-style: solid;

      &:focus, &:hover {
        border-color: ${n?g:f};
      }

      ${n&&`border-color: ${g}`};
      ${!e&&"border: none"};

      &:disabled {
        pointer-events: none;
      }
    `}}
`,q=({children:t,label:e,style:n,dataTestId:r="dropdown-select",isDisabled:s=!1,isRequired:i,hasBorder:c=!0,hasError:f=!1,hasDeselect:g=!1,variant:y="outlined",fill:b="default"})=>{const{state:p,setState:u,isOpen:x,setIsOpen:I}=C(),S=M(),D=l.Children.count(t)===1,$=s||D,j=$?S.palette.content.light:S.palette.content.default,E=a=>{a.preventDefault(),I(d=>!d)},R=a=>{a.stopPropagation(),u({text:"",value:""})};return l.useEffect(()=>{l.Children.toArray(t).find(d=>d.props.option.value===p.value)||u({text:"",value:""})},[t,u,p.value]),l.useEffect(()=>{if(D){const a=l.Children.map(t,d=>d&&d.props.option);if(a&&a[0]){const d={text:a[0].text??a[0].value,value:a[0].value};u(d)}}},[D,u,t]),o.jsxs(o.Fragment,{children:[o.jsxs(Z,{"data-testid":r,disabled:$,fill:b,hasBorder:c,hasError:f,isOpen:x,onClick:E,style:n,variant:y,children:[o.jsxs("div",{style:{overflow:"hidden"},children:[o.jsxs(m,{color:$?"content.light":"content.default",fontStyles:"bodySmRegular",children:[e,i?o.jsx(m,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null]}),o.jsx(m,{color:$?"content.light":"content.default",fontStyles:"bodyMdRegular",style:{textOverflow:"ellipsis",overflow:"hidden"},children:p.value?p.text:"Select an option"})]}),o.jsxs(B,{style:{flexDirection:"row",gap:"0.5rem"},children:[g&&p.value?o.jsx(P,{onClick:R,children:o.jsx(O,{code:"close",color:j,dataTestId:"deselect-value",size:"s"})}):null,o.jsx(O,{code:x?"expand_less":"expand_more",color:j,size:"l"})]})]}),x?o.jsx(k,{dataTestId:r,children:t}):null]})},G=({children:t,style:e,dataTestId:n})=>{const{setIsOpen:r}=C(),s=l.useRef(null);return z({ref:s,handler:()=>r(!1)}),o.jsx("div",{"data-testid":n,ref:s,style:e,children:t})},H=v.div`
  ${({theme:t,style:e})=>`
    margin: ${t.spacing.spacing_0};
    display: inline-block;
    position: relative;
    width: 100%;
    ${e}
  `}
`,w=({children:t,defaultValue:e,style:n,name:r,dataTestId:s="dropdown"})=>o.jsx(N,{defaultValue:e,name:r,children:o.jsx(H,{"data-testid":s,role:"menu",style:n,children:t})});w.Container=G;w.Detail=F;w.Select=q;w.Option=L;w.Menu=k;export{w as D};
