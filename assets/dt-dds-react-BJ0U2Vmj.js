var B=Object.defineProperty;var a=(e,t)=>B(e,"name",{value:t,configurable:!0});import{o as L}from"./rolldown-runtime-CzYk_CEw.js";import{t as I}from"./react-HNhQAnN4.js";import{t as g}from"./emotion-styled.browser.esm-BD_8_ENF.js";import"./src-D--srvRj.js";import{t as j}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import"./src-CIbK0PmT.js";import"./core-DtZ76Qs_.js";import"./tooltip-B7p4pHEA.js";import"./src-DTbYyZKr.js";import"./hooks-CZqRd1yP.js";import"./box-DLdZVqFP.js";import"./Breadcrumb-158-gBp3.js";import"./Divider-BNneXQtF.js";import"./typography-D38L8NZ6.js";import"./src-CViAu0Af.js";import"./icon-button-DUNOTLRV.js";import"./link-BNvsi0If.js";import"./label-field-Qt53KtQ_.js";import"./Message-DWGZuRPk.js";import"./src-DOZlIpA1.js";import"./hooks-DO3VEhx-.js";import"./Tag-BzMQZhYZ.js";import"./src-C4swBsVr.js";import"./button-CfcM87f0.js";import"./src-C-DW4k1j.js";import"./text-field-BZkbmVl4.js";import"./ProgressBar-CN_Czlmn.js";import"./dropdown-DlybGrqT.js";import"./Pagination-U-_9wb5V.js";import"./src-Dqvxz6ct.js";import"./src-Z3EUlJ9V.js";import"./src-KPi5Pf_h.js";import"./SegmentedControl-EEVAh9CO.js";import"./Toggle-CG4Ypcww.js";import"./src-CIlMuiLg.js";import"./TextArea-Kl-DJnzM.js";import"./src-B0-2d9BL.js";import"./app-header-DCPaIoZ1.js";var d=L(I()),k=g.thead`
  ${({theme:e,hasFixedHeader:t})=>`
    display: table-header-group;
    ${t&&`
        position: sticky;
        top: 0;
        background-color: ${e.palette.surface.contrast};
        z-index: 2;
        box-shadow: ${e.shadows.xs};
      `}
`}
`,f=j(),H={columnsLength:0,setColumnsLength:a(()=>null,"setColumnsLength"),fixedColumnCount:0,fixedEndColumnCount:0,fixedColumns:[],setFixedColumns:a(()=>null,"setFixedColumns"),fixedEndColumns:[],setFixedEndColumns:a(()=>null,"setFixedEndColumns"),showBoxShadow:[],setShowBoxShadow:a(()=>null,"setShowBoxShadow"),isColumnsFixed:!1},T=(0,d.createContext)(H),O=a(({children:e,fixedColumnCount:t,fixedEndColumnCount:o,isColumnsFixed:r})=>{const s=(0,d.useRef)([]),n=(0,d.useRef)([]),i=(0,d.useRef)(0),u=(0,d.useRef)([]),m={get columnsLength(){return i.current},setColumnsLength:a(l=>{i.current=l},"setColumnsLength"),fixedColumnCount:t,fixedEndColumnCount:o,isColumnsFixed:r,get fixedColumns(){return s.current},setFixedColumns:a(l=>{s.current=l},"setFixedColumns"),get fixedEndColumns(){return n.current},setFixedEndColumns:a(l=>{n.current=l},"setFixedEndColumns"),get showBoxShadow(){return u.current},setShowBoxShadow:a(l=>{u.current=l},"setShowBoxShadow")};return(0,f.jsx)(T.Provider,{value:m,children:e})},"TableContextProvider"),w=a(()=>{const e=(0,d.useContext)(T);if(!e)throw new Error("Table compound components cannot be rendered outside the Table component");return e},"useTableContext"),P=a(({style:e,dataTestId:t,children:o,hasFixedHeader:r=!1})=>{const{setColumnsLength:s}=w();return d.Children.map(o,n=>{(0,d.isValidElement)(n)&&s(n.props.children?.length??0)}),(0,f.jsx)(k,{"data-testid":t??"table-head",hasFixedHeader:r,style:e,children:o})},"TableHead"),N=g.th`
  ${({theme:e,textAlign:t,showBoxShadow:o=!1,fixed:r=!1,fixedEnd:s=!1,fixedPosition:n=0})=>`
    text-align: ${t};
    color: ${e.palette.content.dark};
    padding: 0 ${e.spacing.spacing_50} ${e.spacing.spacing_50};
    ${e.fontStyles.buttonSm};

    ${(r||s)&&`
        left: ${r?`${n}px`:"unset"};
        right: ${s?`${n}px`:"unset"};
        position: sticky;
        z-index: 2;
        background: ${e.palette.content.contrast};
        box-shadow: ${o?`${s?"-1px":"1px"} 0 0 0 ${e.palette.border.light}`:"unset"};
      `}
  `}
`,D=a(({children:e,style:t,dataTestId:o,textAlign:r="left",...s})=>{const{fixedColumns:n,fixedEndColumns:i,showBoxShadow:u}=w(),c=Number(s["data-column-index"]),p=Number(s["data-fixed-position"]),b=n.indexOf(c),h=i.indexOf(c);let m={};return(n?.length||i?.length)&&(m={fixed:b!==-1,fixedEnd:h!==-1,showBoxShadow:u.includes(c),fixedPosition:p}),(0,f.jsx)(N,{"data-testid":o??"table-column-header",style:t,textAlign:r,...m,...s,children:e})},"TableColumnHeader"),V=g.tbody`
  ${({theme:e})=>`
    display: table-header-group;
    
    tr:hover td {
      background-color: ${e.palette.surface.light};
    }
  `}
`,A=a(({children:e,style:t,dataTestId:o})=>(0,f.jsx)(V,{"data-testid":o??"table-body",style:t,children:e}),"TableBody"),M=g.tr`
  ${({theme:e,selectableRow:t})=>`
    display: table-row;
    border-radius: ${e.radius.radius_0};
    box-shadow: ${e.shadows.none};
    padding: ${e.spacing.spacing_0};
    width: 100%;
    background-color: ${e.palette.surface.contrast};
    cursor: ${t?"pointer":"auto"};
  `}
`,U=a((e,t,o,r)=>{const s=new IntersectionObserver(([{isIntersecting:n}])=>{r((t>0||o>0)&&!n)},{threshold:1});return e.current&&s.observe(e.current),s},"observeShouldColumnsBeFixed"),z=a((e,t)=>d.Children.map(e,(o,r)=>(0,d.isValidElement)(o)?t(o,r):o),"mapValidChildren"),W=a(e=>[...e.children].map(t=>t.clientWidth),"getColumnsWidths"),q=a((e,t)=>t.slice(0,e).reduce((o,r)=>o+r,0),"getFixedColumnPosition"),G=a((e,t)=>t.slice(e+1).reduce((o,r)=>o+r,0),"getFixedEndColumnPosition"),J=0,K=1,Q=a(({children:e,dataTestId:t,style:o,onClick:r})=>{const s=!!r,{columnsLength:n,setFixedColumns:i,setFixedEndColumns:u,fixedColumnCount:c,fixedEndColumnCount:p,isColumnsFixed:b,setShowBoxShadow:h}=w(),m=(0,d.useRef)(null);let l=e;if(b&&m.current){const y=[],E=[],$=[],F=W(m.current);l=z(e,(v,x)=>{let S=0;const _=x<c,R=x>=n-p;return _&&(S=q(x,F),y.push(x),$[J]=x),R&&(S=G(x,F),E.unshift(x),$[K]=$[1]??x),_||R?(0,d.cloneElement)(v,{...v.props,"data-column-index":x,"data-fixed-position":S}):v}),i(y),u(E),h($)}return(0,f.jsx)(M,{ref:m,...r&&{onClick:r},"data-testid":t??"table-row",selectableRow:s,style:o,children:l})},"TableRow"),X=g.td`
  ${({theme:e,columnWidth:t,textAlign:o,showBoxShadow:r=!1,fixed:s=!1,fixedEnd:n=!1,fixedPosition:i=0})=>`
    display: table-cell;
    min-width: 110px;
    word-break: break-word;
    border-top: 1px solid ${e.palette.border.light};
    padding: ${e.spacing.spacing_50};
    text-align: ${o};
    color: ${e.palette.content.default};
    ${e.fontStyles.bodyMdRegular};

    &:first-of-type {
      padding-top: ${e.spacing.spacing_50};
      border-bottom: none;
    }

    ${t?`
        width: ${t};
        max-width: ${t};
      `:""}

    ${(s||n)&&`
        left: ${s?`${i}px`:"unset"};
        right: ${n?`${i}px`:"unset"};
        position: sticky;
        z-index: 1;
        background: ${e.palette.content.contrast};
        box-shadow: ${r?`${n?"-1px":"1px"} 0 0 0 ${e.palette.border.light}`:"unset"};
      `}
  `}
`,Y=a(({children:e,columnWidth:t,style:o,dataTestId:r,textAlign:s="left",...n})=>{const{fixedColumns:i,fixedEndColumns:u,showBoxShadow:c}=w(),p=Number(n["data-column-index"]),b=Number(n["data-fixed-position"]),h=i.indexOf(p),m=u.indexOf(p);let l={};return(i?.length||u?.length)&&(l={fixed:h!==-1,fixedEnd:m!==-1,showBoxShadow:c.includes(p),fixedPosition:b}),(0,f.jsx)(X,{columnWidth:t,"data-testid":r??"table-data-cell",style:o,textAlign:s,...l,...n,children:e})},"TableDataCell"),Z=g.table`
  ${({isFixed:e})=>`
    table-layout: ${e?"fixed":"auto"};
    width: 100%;
    border-spacing: 0;
  `}
`,C=a(({children:e,dataTestId:t,style:o,isFixed:r=!1,fixedColumnCount:s=0,fixedEndColumnCount:n=0})=>{const i=(0,d.useRef)(null),[u,c]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{const p=U(i,s,n,c);return()=>p.disconnect()},[s,n]),(0,f.jsx)(O,{fixedColumnCount:s,fixedEndColumnCount:n,isColumnsFixed:u,children:(0,f.jsx)(Z,{"data-testid":t??"table",isFixed:r,ref:i,style:o,children:e})})},"Table");C.Head=P;C.ColumnHeader=D;C.Body=A;C.Row=Q;C.DataCell=Y;export{C as t};
