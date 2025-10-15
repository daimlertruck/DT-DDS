import{j as f}from"./jsx-runtime-CB_V9I5Y.js";import{r as l}from"./index-CTjT7uj6.js";import"./index-BV8q0bTk.js";import"./index-DCFTA1-v.js";import"./index-XjDa9cP3.js";import{c as F,d as B}from"./z-index-CLLOsryR.js";import{f as m}from"./emotion-styled.browser.esm-DBghOYGd.js";const I={columnsLength:0,setColumnsLength:()=>null,fixedColumnCount:0,fixedEndColumnCount:0,fixedColumns:[],setFixedColumns:()=>null,fixedEndColumns:[],setFixedEndColumns:()=>null,showBoxShadow:[],setShowBoxShadow:()=>null,isColumnsFixed:!1},L=l.createContext(I),v=({children:t,fixedColumnCount:o,fixedEndColumnCount:s,isColumnsFixed:r})=>{const n=l.useRef([]),e=l.useRef([]),d=l.useRef(0),a=l.useRef([]),x={get columnsLength(){return d.current},setColumnsLength:i=>{d.current=i},fixedColumnCount:o,fixedEndColumnCount:s,isColumnsFixed:r,get fixedColumns(){return n.current},setFixedColumns:i=>{n.current=i},get fixedEndColumns(){return e.current},setFixedEndColumns:i=>{e.current=i},get showBoxShadow(){return a.current},setShowBoxShadow:i=>{a.current=i}};return f.jsx(L.Provider,{value:x,children:t})},C=()=>{const t=l.useContext(L);if(!t)throw new Error("Table compound components cannot be rendered outside the Table component");return t},H=m.thead`
  ${({theme:t,hasFixedHeader:o})=>`
    display: table-header-group;
    ${o&&`
        position: sticky;
        top: 0;
        background-color: ${t.palette.surface.contrast};
        z-index: ${F};
        box-shadow: ${t.shadows.xs};
      `}
`}
`,N=({style:t,dataTestId:o,children:s,hasFixedHeader:r=!1})=>{const{setColumnsLength:n}=C();return l.Children.map(s,e=>{var d;l.isValidElement(e)&&n(((d=e.props.children)==null?void 0:d.length)??0)}),f.jsx(H,{"data-testid":o??"table-head",hasFixedHeader:r,style:t,children:s})},O=m.th`
  ${({theme:t,textAlign:o,showBoxShadow:s=!1,fixed:r=!1,fixedEnd:n=!1,fixedPosition:e=0})=>`
    text-align: ${o};
    color: ${t.palette.content.dark};
    padding: 0 ${t.spacing.spacing_50} ${t.spacing.spacing_50};
    ${t.fontStyles.buttonSm};

    ${(r||n)&&`
        left: ${r?`${e}px`:"unset"};
        right: ${n?`${e}px`:"unset"};
        position: sticky;
        z-index: ${F};
        background: ${t.palette.content.contrast};
        box-shadow: ${s?`${n?"-1px":"1px"} 0 0 0 ${t.palette.border.light}`:"unset"};
      `}
  `}
`,P=({children:t,style:o,dataTestId:s,textAlign:r="left",...n})=>{const{fixedColumns:e,fixedEndColumns:d,showBoxShadow:a}=C(),c=Number(n["data-column-index"]),u=Number(n["data-fixed-position"]),h=e.indexOf(c),b=d.indexOf(c);let x={};return(e!=null&&e.length||d!=null&&d.length)&&(x={fixed:h!==-1,fixedEnd:b!==-1,showBoxShadow:a.includes(c),fixedPosition:u}),f.jsx(O,{"data-testid":s??"table-column-header",style:o,textAlign:r,...x,...n,children:t})},j=m.tbody`
  ${({theme:t})=>`
    display: table-header-group;
    
    tr:hover td {
      background-color: ${t.palette.surface.light};
    }
  `}
`,W=({children:t,style:o,dataTestId:s})=>f.jsx(j,{"data-testid":s??"table-body",style:o,children:t}),k=(t,o,s,r)=>{const n=new IntersectionObserver(([{isIntersecting:e}])=>{r((o>0||s>0)&&!e)},{threshold:1});return t.current&&n.observe(t.current),n},D=(t,o)=>l.Children.map(t,(s,r)=>l.isValidElement(s)?o(s,r):s),A=t=>[...t.children].map(s=>s.clientWidth),M=(t,o)=>o.slice(0,t).reduce((n,e)=>n+e,0),U=(t,o)=>o.slice(t+1).reduce((n,e)=>n+e,0),V=m.tr`
  ${({theme:t,selectableRow:o})=>`
    display: table-row;
    border-radius: ${t.radius.radius_0};
    box-shadow: ${t.shadows.none};
    padding: ${t.spacing.spacing_0};
    width: 100%;
    background-color: ${t.palette.surface.contrast};
    cursor: ${o?"pointer":"auto"};
  `}
`,z=0,X=1,Z=({children:t,dataTestId:o,style:s,onClick:r})=>{const n=!!r,{columnsLength:e,setFixedColumns:d,setFixedEndColumns:a,fixedColumnCount:c,fixedEndColumnCount:u,isColumnsFixed:h,setShowBoxShadow:b}=C(),x=l.useRef(null);let i=t;if(h&&x.current){const y=[],E=[],$=[],T=A(x.current);i=D(t,(w,p)=>{let S=0;const R=p<c,_=p>=e-u;return R&&(S=M(p,T),y.push(p),$[z]=p),_&&(S=U(p,T),E.unshift(p),$[X]=$[1]??p),R||_?l.cloneElement(w,{...w.props,"data-column-index":p,"data-fixed-position":S}):w}),d(y),a(E),b($)}return f.jsx(V,{ref:x,...r&&{onClick:r},"data-testid":o??"table-row",selectableRow:n,style:s,children:i})},G=110,K=m.td`
  ${({theme:t,columnWidth:o,textAlign:s,showBoxShadow:r=!1,fixed:n=!1,fixedEnd:e=!1,fixedPosition:d=0})=>`
    display: table-cell;
    min-width: ${G}px;
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

    ${o?`
        width: ${o};
        max-width: ${o};
      `:""}

    ${(n||e)&&`
        left: ${n?`${d}px`:"unset"};
        right: ${e?`${d}px`:"unset"};
        position: sticky;
        z-index: ${B};
        background: ${t.palette.content.contrast};
        box-shadow: ${r?`${e?"-1px":"1px"} 0 0 0 ${t.palette.border.light}`:"unset"};
      `}
  `}
`,Y=({children:t,columnWidth:o,style:s,dataTestId:r,textAlign:n="left",...e})=>{const{fixedColumns:d,fixedEndColumns:a,showBoxShadow:c}=C(),u=Number(e["data-column-index"]),h=Number(e["data-fixed-position"]),b=d.indexOf(u),x=a.indexOf(u);let i={};return(d!=null&&d.length||a!=null&&a.length)&&(i={fixed:b!==-1,fixedEnd:x!==-1,showBoxShadow:c.includes(u),fixedPosition:h}),f.jsx(K,{columnWidth:o,"data-testid":r??"table-data-cell",style:s,textAlign:n,...i,...e,children:t})},q=m.table`
  ${({isFixed:t})=>`
    table-layout: ${t?"fixed":"auto"};
    width: 100%;
    border-spacing: 0;
  `}
`,g=({children:t,dataTestId:o,style:s,isFixed:r=!1,fixedColumnCount:n=0,fixedEndColumnCount:e=0})=>{const d=l.useRef(null),[a,c]=l.useState(!1);return l.useEffect(()=>{const u=k(d,n,e,c);return()=>u.disconnect()},[n,e]),f.jsx(v,{fixedColumnCount:n,fixedEndColumnCount:e,isColumnsFixed:a,children:f.jsx(q,{"data-testid":o??"table",isFixed:r,ref:d,style:s,children:t})})};g.Head=N;g.ColumnHeader=P;g.Body=W;g.Row=Z;g.DataCell=Y;export{g as T};
