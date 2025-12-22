var I=Object.defineProperty;var l=(t,e)=>I(t,"name",{value:e,configurable:!0});import{j as h}from"./jsx-runtime-Cgz2XvFB.js";import{r as a}from"./index-CwbBKW39.js";import{f as g}from"./emotion-styled.browser.esm-CIRWz9XU.js";import"./typography-B3nKKPHm.js";import"./index-C5d2CB0P.js";import"./index-DV-VXEUn.js";import{c as L,d as v}from"./z-index-C44GOntP.js";const H=g.thead`
  ${({theme:t,hasFixedHeader:e})=>`
    display: table-header-group;
    ${e&&`
        position: sticky;
        top: 0;
        background-color: ${t.palette.surface.contrast};
        z-index: ${L};
        box-shadow: ${t.shadows.xs};
      `}
`}
`,N={columnsLength:0,setColumnsLength:l(()=>null,"setColumnsLength"),fixedColumnCount:0,fixedEndColumnCount:0,fixedColumns:[],setFixedColumns:l(()=>null,"setFixedColumns"),fixedEndColumns:[],setFixedEndColumns:l(()=>null,"setFixedEndColumns"),showBoxShadow:[],setShowBoxShadow:l(()=>null,"setShowBoxShadow"),isColumnsFixed:!1},B=a.createContext(N),O=l(({children:t,fixedColumnCount:e,fixedEndColumnCount:s,isColumnsFixed:r})=>{const n=a.useRef([]),o=a.useRef([]),d=a.useRef(0),i=a.useRef([]),p={get columnsLength(){return d.current},setColumnsLength:l(c=>{d.current=c},"setColumnsLength"),fixedColumnCount:e,fixedEndColumnCount:s,isColumnsFixed:r,get fixedColumns(){return n.current},setFixedColumns:l(c=>{n.current=c},"setFixedColumns"),get fixedEndColumns(){return o.current},setFixedEndColumns:l(c=>{o.current=c},"setFixedEndColumns"),get showBoxShadow(){return i.current},setShowBoxShadow:l(c=>{i.current=c},"setShowBoxShadow")};return h.jsx(B.Provider,{value:p,children:t})},"TableContextProvider"),w=l(()=>{const t=a.useContext(B);if(!t)throw new Error("Table compound components cannot be rendered outside the Table component");return t},"useTableContext"),P=l(({style:t,dataTestId:e,children:s,hasFixedHeader:r=!1})=>{const{setColumnsLength:n}=w();return a.Children.map(s,o=>{var d;a.isValidElement(o)&&n(((d=o.props.children)==null?void 0:d.length)??0)}),h.jsx(H,{"data-testid":e??"table-head",hasFixedHeader:r,style:t,children:s})},"TableHead"),j=g.th`
  ${({theme:t,textAlign:e,showBoxShadow:s=!1,fixed:r=!1,fixedEnd:n=!1,fixedPosition:o=0})=>`
    text-align: ${e};
    color: ${t.palette.content.dark};
    padding: 0 ${t.spacing.spacing_50} ${t.spacing.spacing_50};
    ${t.fontStyles.buttonSm};

    ${(r||n)&&`
        left: ${r?`${o}px`:"unset"};
        right: ${n?`${o}px`:"unset"};
        position: sticky;
        z-index: ${L};
        background: ${t.palette.content.contrast};
        box-shadow: ${s?`${n?"-1px":"1px"} 0 0 0 ${t.palette.border.light}`:"unset"};
      `}
  `}
`,W=l(({children:t,style:e,dataTestId:s,textAlign:r="left",...n})=>{const{fixedColumns:o,fixedEndColumns:d,showBoxShadow:i}=w(),u=Number(n["data-column-index"]),x=Number(n["data-fixed-position"]),b=o.indexOf(u),m=d.indexOf(u);let p={};return(o!=null&&o.length||d!=null&&d.length)&&(p={fixed:b!==-1,fixedEnd:m!==-1,showBoxShadow:i.includes(u),fixedPosition:x}),h.jsx(j,{"data-testid":s??"table-column-header",style:e,textAlign:r,...p,...n,children:t})},"TableColumnHeader"),k=g.tbody`
  ${({theme:t})=>`
    display: table-header-group;
    
    tr:hover td {
      background-color: ${t.palette.surface.light};
    }
  `}
`,D=l(({children:t,style:e,dataTestId:s})=>h.jsx(k,{"data-testid":s??"table-body",style:e,children:t}),"TableBody"),A=g.tr`
  ${({theme:t,selectableRow:e})=>`
    display: table-row;
    border-radius: ${t.radius.radius_0};
    box-shadow: ${t.shadows.none};
    padding: ${t.spacing.spacing_0};
    width: 100%;
    background-color: ${t.palette.surface.contrast};
    cursor: ${e?"pointer":"auto"};
  `}
`,M=l((t,e,s,r)=>{const n=new IntersectionObserver(([{isIntersecting:o}])=>{r((e>0||s>0)&&!o)},{threshold:1});return t.current&&n.observe(t.current),n},"observeShouldColumnsBeFixed"),U=l((t,e)=>a.Children.map(t,(s,r)=>a.isValidElement(s)?e(s,r):s),"mapValidChildren"),V=l(t=>[...t.children].map(s=>s.clientWidth),"getColumnsWidths"),z=l((t,e)=>e.slice(0,t).reduce((n,o)=>n+o,0),"getFixedColumnPosition"),X=l((t,e)=>e.slice(t+1).reduce((n,o)=>n+o,0),"getFixedEndColumnPosition"),Z=0,G=1,K=l(({children:t,dataTestId:e,style:s,onClick:r})=>{const n=!!r,{columnsLength:o,setFixedColumns:d,setFixedEndColumns:i,fixedColumnCount:u,fixedEndColumnCount:x,isColumnsFixed:b,setShowBoxShadow:m}=w(),p=a.useRef(null);let c=t;if(b&&p.current){const E=[],T=[],C=[],R=V(p.current);c=U(t,(S,f)=>{let y=0;const _=f<u,F=f>=o-x;return _&&(y=z(f,R),E.push(f),C[Z]=f),F&&(y=X(f,R),T.unshift(f),C[G]=C[1]??f),_||F?a.cloneElement(S,{...S.props,"data-column-index":f,"data-fixed-position":y}):S}),d(E),i(T),m(C)}return h.jsx(A,{ref:p,...r&&{onClick:r},"data-testid":e??"table-row",selectableRow:n,style:s,children:c})},"TableRow"),Y=110,q=g.td`
  ${({theme:t,columnWidth:e,textAlign:s,showBoxShadow:r=!1,fixed:n=!1,fixedEnd:o=!1,fixedPosition:d=0})=>`
    display: table-cell;
    min-width: ${Y}px;
    word-break: break-word;
    border-top: 1px solid ${t.palette.border.light};
    padding: ${t.spacing.spacing_50};
    text-align: ${s};
    color: ${t.palette.content.default};
    ${t.fontStyles.bodyMdRegular};

    &:first-of-type {
      padding-top: ${t.spacing.spacing_50};
      border-bottom: none;
    }

    ${e?`
        width: ${e};
        max-width: ${e};
      `:""}

    ${(n||o)&&`
        left: ${n?`${d}px`:"unset"};
        right: ${o?`${d}px`:"unset"};
        position: sticky;
        z-index: ${v};
        background: ${t.palette.content.contrast};
        box-shadow: ${r?`${o?"-1px":"1px"} 0 0 0 ${t.palette.border.light}`:"unset"};
      `}
  `}
`,J=l(({children:t,columnWidth:e,style:s,dataTestId:r,textAlign:n="left",...o})=>{const{fixedColumns:d,fixedEndColumns:i,showBoxShadow:u}=w(),x=Number(o["data-column-index"]),b=Number(o["data-fixed-position"]),m=d.indexOf(x),p=i.indexOf(x);let c={};return(d!=null&&d.length||i!=null&&i.length)&&(c={fixed:m!==-1,fixedEnd:p!==-1,showBoxShadow:u.includes(x),fixedPosition:b}),h.jsx(q,{columnWidth:e,"data-testid":r??"table-data-cell",style:s,textAlign:n,...c,...o,children:t})},"TableDataCell"),Q=g.table`
  ${({isFixed:t})=>`
    table-layout: ${t?"fixed":"auto"};
    width: 100%;
    border-spacing: 0;
  `}
`,$=l(({children:t,dataTestId:e,style:s,isFixed:r=!1,fixedColumnCount:n=0,fixedEndColumnCount:o=0})=>{const d=a.useRef(null),[i,u]=a.useState(!1);return a.useEffect(()=>{const x=M(d,n,o,u);return()=>x.disconnect()},[n,o]),h.jsx(O,{fixedColumnCount:n,fixedEndColumnCount:o,isColumnsFixed:i,children:h.jsx(Q,{"data-testid":e??"table",isFixed:r,ref:d,style:s,children:t})})},"Table");$.Head=P;$.ColumnHeader=W;$.Body=D;$.Row=K;$.DataCell=J;export{$ as T};
