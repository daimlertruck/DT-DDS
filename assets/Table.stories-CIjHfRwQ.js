var f=Object.defineProperty;var i=(n,o)=>f(n,"name",{value:o,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import"./index-CwbBKW39.js";import"./AccordionBody.styled-xqIYdNs4.js";import"./Icon-BWIy_dZb.js";import{A as v}from"./Avatar-L_tm2jUW.js";import"./Backdrop-CyE7aOBR.js";import"./index-DTgA8jos.js";import"./Breadcrumb-DnoM7Avt.js";import"./typography-B3nKKPHm.js";import"./index-RDUg2fsu.js";import"./index-DV-VXEUn.js";import"./Divider.styled-hPwEEf02.js";import"./Drawer-XfI4XDVC.js";import"./EmptyState-DKDpKQqU.js";import"./Typography-Dk4smw7A.js";import"./LabelField-nCy-PARe.js";import"./Message-CezVQ8bC.js";import"./Spinner-sAug7C4e.js";import"./Tabs-DdWIpHXt.js";import{T as b}from"./Tag-CoHVHLeS.js";import"./index-t9IE9_zF.js";import"./Button.styled-CSiC2f7q.js";import{T as m}from"./Tooltip-CZhszMJk.js";import"./Checkbox-AntSCaL3.js";import"./TextField-D3V1CvzW.js";import{T as t}from"./Table-qc3WozZK.js";import"./ProgressBar.styled-C_RVz8SA.js";import"./Select-D8W52Iv_.js";import"./Stepper-CaDd9Nb5.js";import"./Radio.styled-C5m6NUsu.js";import"./Modal-BaSPM3d1.js";import"./Card-cwOLFo_E.js";import"./SegmentedControl-YzSUHpFj.js";import"./Dropdown-BivKLxwF.js";import"./Toggle.styled-BufAp-yF.js";import"./DatePicker.styled-Cpn05-1S.js";import"./TextArea.styled-B9N8J0xG.js";import"./Form-Csrj6MVk.js";import"./PaginationNavButton-C1vdHqYR.js";import{I as D}from"./IconButton-DqfnmDe3.js";import"./Link-DCz4wiqU.js";import"./Sidebar-DBYKW4mk.js";import"./index-C6Abx4p5.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./Avatar.styled-ieLONhHq.js";import"./hexToRgba-CWpEuk8w.js";import"./z-index-C44GOntP.js";import"./useMedia-CRgJMRRc.js";import"./useDebounceResize-Cr2hW69D.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-Brb_Y-7C.js";import"./index-Xf3VWcnb.js";import"./useClickOutside-Cp2kQToC.js";const l=["Name","Email","Role","Status","Phone","Department","Location","Actions"],w=[["John Doe","john@example.com","Developer","green","+123456789","Engineering","New York",""],["Jane Smith","jane@example.com","Designer","yellow","+987654321","Design","San Francisco",""],["Alice Johnson","alice@example.com","Manager","grey","+135792468","Management","Los Angeles",""],["Bob Brown","bob@example.com","Engineer","green","+246813579","Engineering","Chicago",""]],T=i(n=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:e.jsx("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),"InfoOutline"),A=i(n=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:e.jsx("path",{d:"M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"})}),"MoreVertical"),j={Name:"200px",Status:"120px",Actions:"fit-content"},S=i(n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(v,{size:"small",title:n}),n]}),"renderAvatarWithTitle"),I=i(n=>{const o={green:"success",yellow:"warning",grey:"secondary"}[n]||"secondary";return e.jsx(b,{border:"rounded",color:o,size:"small",children:{green:"ACTIVE",yellow:"PENDING",grey:"DEACTIVATED"}[n]})},"renderTag"),y=i((n,o)=>{const r=l[n];return{Name:S(o),Status:I(o),Actions:E()}[r]??o},"renderContent"),E=i(()=>e.jsx(D,{children:e.jsx(A,{})}),"renderActionsButton"),Re={title:"Data Display/Table",component:t,render:i(({isFixed:n,hasFixedHeader:o})=>e.jsx("div",{style:{...o&&{height:"200px",overflow:"auto"}},children:e.jsxs(t,{isFixed:n,children:[e.jsx(t.Head,{hasFixedHeader:o,children:e.jsx(t.Row,{children:l.map(r=>e.jsx(t.ColumnHeader,{dataTestId:"test",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[r,r==="Status"&&e.jsxs(m,{children:[e.jsx(T,{height:16,width:16}),e.jsx(m.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${r}`))})}),e.jsx(t.Body,{children:w.map(r=>e.jsx(t.Row,{children:r.map((d,c)=>e.jsx(t.DataCell,{columnWidth:j[l[c]],children:y(c,d)},`column-${l[c]}-${d}`))},r.toString()))})]})}),"render")},s={args:{isFixed:!1,hasFixedHeader:!1}},H=1,B=2,a={title:"Table",component:t,render:i(()=>e.jsx("div",{style:{width:"500px",overflow:"auto"},children:e.jsxs(t,{fixedColumnCount:H,fixedEndColumnCount:B,children:[e.jsx(t.Head,{children:e.jsx(t.Row,{children:l.map(n=>e.jsx(t.ColumnHeader,{dataTestId:"test",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[n,n==="Status"&&e.jsxs(m,{children:[e.jsx(T,{height:16,width:16}),e.jsx(m.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${n}`))})}),e.jsx(t.Body,{children:w.map(n=>e.jsx(t.Row,{children:n.map((o,r)=>e.jsx(t.DataCell,{columnWidth:j[l[r]],style:{...l[r]==="Actions"&&{minWidth:"65px"}},children:y(r,o)},`column-${l[r]}-${o}`))},n.toString()))})]})}),"render")};var p,h,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    isFixed: false,
    hasFixedHeader: false
  }
}`,...(u=(h=s.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var x,C,g;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
                      <InfoOutline height={16} width={16} />
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
}`,...(g=(C=a.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};const $e=["Default","TableWithPinnedColumns"];export{s as Default,a as TableWithPinnedColumns,$e as __namedExportsOrder,Re as default};
