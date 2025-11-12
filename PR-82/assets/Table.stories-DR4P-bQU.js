import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import"./index-CTjT7uj6.js";import"./AccordionBody.styled-DeLC8Jsp.js";import"./Icon-DG6KDu5A.js";import{A as y}from"./Avatar-AJEk3-zz.js";import{a as f,A as v}from"./Avatar.styled-CMw3s-uw.js";import"./Backdrop-BuVfmJE0.js";import"./index-CWvrgZ1b.js";import"./Breadcrumb-BP0MEV9t.js";import"./index-D9dZuxfj.js";import"./index-DvtQgY-l.js";import"./index-XjDa9cP3.js";import"./Divider.styled-tVZRGFzw.js";import"./Drawer-BQkb-Qsf.js";import"./EmptyState-5OUKrF6q.js";import"./Typography-DHEP7O00.js";import"./LabelField-x8FAhJm0.js";import"./Message-Ch_TJlTk.js";import"./Spinner-C7-RPGlb.js";import"./Tabs-DhhuAZVC.js";import{T as b}from"./Tag-BbsOa-X8.js";import"./index-YjzhnqnF.js";import"./Button.styled-BhGEnxfn.js";import{T as s}from"./Tooltip-BobBXHj8.js";import"./Checkbox-DtiS2S4C.js";import{I as A}from"./IconButton-C_mszqXk.js";import"./TextField.styled-Dy6mViiV.js";import{T as t}from"./Table-BLtcJ7Ad.js";import"./ProgressBar.styled-C08Gdo4X.js";import"./Select-B_wzz23G.js";import"./Step-Bbeyp5h7.js";import"./Radio.styled-ZkpEjroR.js";import"./Modal-CiC34IQn.js";import"./Card-CP8_Kl2b.js";import"./SegmentedControl-Dfb77mSL.js";import"./Dropdown-CK2XNOgm.js";import"./Toggle.styled-CkybMFiB.js";import"./TextArea.styled-DaEzWfco.js";import"./Form-yWV8SK7Z.js";import"./Pagination-BAoGVeiy.js";import"./constants-BUjojGf9.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./z-index-CLLOsryR.js";import"./useMedia-bxl5YFrZ.js";import"./useDebounceResize-CC3O81vf.js";import"./debounce-BF4Cdv7I.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-CObEW0Pa.js";import"./Close-BgpoXZkN.js";import"./Portal-DUP4U3GD.js";import"./useClickOutside-CvVYzr-_.js";const g=n=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:e.jsx("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),D=n=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:e.jsx("path",{d:"M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"})}),i=["Name","Email","Role","Status","Phone","Department","Location","Actions"],w=[["John Doe","john@example.com","Developer","green","+123456789","Engineering","New York",""],["Jane Smith","jane@example.com","Designer","yellow","+987654321","Design","San Francisco",""],["Alice Johnson","alice@example.com","Manager","grey","+135792468","Management","Los Angeles",""],["Bob Brown","bob@example.com","Engineer","green","+246813579","Engineering","Chicago",""]],T={Name:"200px",Status:"120px",Actions:"fit-content"},S=n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(y,{size:v.Small,title:n,type:f.Primary}),n]}),I=n=>{const r={green:"success",yellow:"warning",grey:"secondary"}[n]||"secondary";return e.jsx(b,{border:"rounded",color:r,size:"small",children:{green:"ACTIVE",yellow:"PENDING",grey:"DEACTIVATED"}[n]})},j=(n,r)=>{const o=i[n];return{Name:S(r),Status:I(r),Actions:E()}[o]??r},E=()=>e.jsx(A,{children:e.jsx(D,{})}),He={title:"Data Display/Table",component:t,render:({isFixed:n,hasFixedHeader:r})=>e.jsx("div",{style:{...r&&{height:"200px",overflow:"auto"}},children:e.jsxs(t,{isFixed:n,children:[e.jsx(t.Head,{hasFixedHeader:r,children:e.jsx(t.Row,{children:i.map(o=>e.jsx(t.ColumnHeader,{dataTestId:"test",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[o,o==="Status"&&e.jsxs(s,{children:[e.jsx(g,{height:16,width:16}),e.jsx(s.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${o}`))})}),e.jsx(t.Body,{children:w.map(o=>e.jsx(t.Row,{children:o.map((m,d)=>e.jsx(t.DataCell,{columnWidth:T[i[d]],children:j(d,m)},`column-${i[d]}-${m}`))},o.toString()))})]})})},l={args:{isFixed:!1,hasFixedHeader:!1}},H=1,B=2,a={title:"Table",component:t,render:()=>e.jsx("div",{style:{width:"500px",overflow:"auto"},children:e.jsxs(t,{fixedColumnCount:H,fixedEndColumnCount:B,children:[e.jsx(t.Head,{children:e.jsx(t.Row,{children:i.map(n=>e.jsx(t.ColumnHeader,{dataTestId:"test",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[n,n==="Status"&&e.jsxs(s,{children:[e.jsx(g,{height:16,width:16}),e.jsx(s.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${n}`))})}),e.jsx(t.Body,{children:w.map(n=>e.jsx(t.Row,{children:n.map((r,o)=>e.jsx(t.DataCell,{columnWidth:T[i[o]],style:{...i[o]==="Actions"&&{minWidth:"65px"}},children:j(o,r)},`column-${i[o]}-${r}`))},n.toString()))})]})})};var c,p,h;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isFixed: false,
    hasFixedHeader: false
  }
}`,...(h=(p=l.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var u,x,C;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  title: 'Table',
  component: Table,
  render: () => <div style={{
    width: '500px',
    overflow: 'auto'
  }}>
      <Table fixedColumnCount={fixedColumnCount} fixedEndColumnCount={fixedEndColumnCount}>
        <Table.Head>
          <Table.Row>
            {columns.map((column: string) => <Table.ColumnHeader dataTestId='test' key={\`column-header-\${column}\`}>
                <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
                  {column}
                  {column === 'Status' && <Tooltip>
                      <InfoOutlineIcon height={16} width={16} />
                      <Tooltip.Content>
                        Pending: Yellow | Active: Green | Deactivated: Grey
                      </Tooltip.Content>
                    </Tooltip>}
                </div>
              </Table.ColumnHeader>)}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row: string[]) => <Table.Row key={row.toString()}>
              {row.map((content: string, i: number) => <Table.DataCell columnWidth={columnSizes[columns[i]]} key={\`column-\${columns[i]}-\${content}\`} style={{
            ...(columns[i] === 'Actions' && {
              minWidth: '65px'
            })
          }}>
                  {renderContent(i, content)}
                </Table.DataCell>)}
            </Table.Row>)}
        </Table.Body>
      </Table>
    </div>
}`,...(C=(x=a.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};const Be=["Default","TableWithPinnedColumns"];export{l as Default,a as TableWithPinnedColumns,Be as __namedExportsOrder,He as default};
