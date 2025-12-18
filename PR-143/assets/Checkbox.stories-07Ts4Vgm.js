var I=Object.defineProperty;var l=(c,s)=>I(c,"name",{value:s,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{r as b}from"./index-CwbBKW39.js";import{C as a}from"./Checkbox-CHff_QSy.js";import"./Icon-BrO18bYS.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";const W={title:"Data Display/Checkbox",component:a,argTypes:{size:{control:"radio",options:["small","large"],description:"Size variant of the checkbox"},isChecked:{control:"boolean",description:"Controlled checked state"},isDisabled:{control:"boolean",description:"Whether the checkbox is disabled"},isIndeterminate:{control:"boolean",description:"Whether the checkbox is in an indeterminate state"},hasError:{control:"boolean",description:"Whether the checkbox is in an error state"},label:{control:"text",description:"Label text for the checkbox"}},args:{size:"large",isDisabled:!1,isIndeterminate:!1,hasError:!1}},r={args:{label:"Checkbox label"}},i={render:l(c=>{const[s,d]=b.useState(!0),[o,h]=b.useState(!1);return e.jsx(a,{...c,isChecked:o,isIndeterminate:s,label:"Indeterminate → Checked → Unchecked",onChange:l(()=>{s?(d(!1),h(!0)):o?h(!1):d(!0)},"onChange")})},"render")},n={render:l(()=>e.jsxs("div",{style:{display:"flex",gap:"40px"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Large"}),e.jsx(a,{isChecked:!0,label:"Checked",size:"large"}),e.jsx(a,{isDefaultChecked:!1,label:"Unchecked",size:"large"}),e.jsx(a,{isIndeterminate:!0,label:"Indeterminate",size:"large"}),e.jsx(a,{isChecked:!0,isDisabled:!0,label:"Checked disabled",size:"large"}),e.jsx(a,{isDefaultChecked:!1,isDisabled:!0,label:"Unchecked disabled",size:"large"}),e.jsx(a,{hasError:!0,isChecked:!0,label:"Checked error",size:"large"}),e.jsx(a,{hasError:!0,isDefaultChecked:!1,label:"Unchecked error",size:"large"}),e.jsx(a,{hasError:!0,isIndeterminate:!0,label:"Indeterminate error",size:"large"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Small"}),e.jsx(a,{isChecked:!0,label:"Checked",size:"small"}),e.jsx(a,{isDefaultChecked:!1,label:"Unchecked",size:"small"}),e.jsx(a,{isIndeterminate:!0,label:"Indeterminate",size:"small"}),e.jsx(a,{isChecked:!0,isDisabled:!0,label:"Checked disabled",size:"small"}),e.jsx(a,{isDefaultChecked:!1,isDisabled:!0,label:"Unchecked disabled",size:"small"}),e.jsx(a,{hasError:!0,isChecked:!0,label:"Checked error",size:"small"}),e.jsx(a,{hasError:!0,isDefaultChecked:!1,label:"Unchecked error",size:"small"}),e.jsx(a,{hasError:!0,isIndeterminate:!0,label:"Indeterminate error",size:"small"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Without Labels"}),e.jsx(a,{"aria-label":"Large checked",isChecked:!0,size:"large"}),e.jsx(a,{"aria-label":"Large unchecked",isDefaultChecked:!1,size:"large"}),e.jsx(a,{"aria-label":"Small checked",isChecked:!0,size:"small"}),e.jsx(a,{"aria-label":"Small unchecked",isDefaultChecked:!1,size:"small"})]})]}),"render")},t={render:l(()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Label Wrapping Behavior"}),e.jsx("p",{style:{fontSize:"14px",color:"#666",margin:"0 0 10px 0"},children:"We recommend checkbox labels being fewer than three words or 60 characters. If you are tight on space, consider rewording the label. Long labels may wrap to a second line."}),e.jsx(a,{isChecked:!0,label:"Short label"}),e.jsx(a,{isDefaultChecked:!1,label:"This is a moderately long checkbox label"}),e.jsx(a,{isDefaultChecked:!1,label:"Small checkbox with a long label that also wraps",size:"small"})]}),"render")};var k,x,m;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox label'
  }
}`,...(m=(x=r.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var p,C,u;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => {
    const [indeterminate, setIndeterminate] = useState(true);
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} isChecked={checked} isIndeterminate={indeterminate} label='Indeterminate → Checked → Unchecked' onChange={() => {
      if (indeterminate) {
        setIndeterminate(false);
        setChecked(true);
      } else if (checked) {
        setChecked(false);
      } else {
        setIndeterminate(true);
      }
    }} />;
  }
}`,...(u=(C=i.parameters)==null?void 0:C.docs)==null?void 0:u.source}}};var f,g,z;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '40px'
  }}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Large</h3>
        <Checkbox isChecked label='Checked' size='large' />
        <Checkbox isDefaultChecked={false} label='Unchecked' size='large' />
        <Checkbox isIndeterminate label='Indeterminate' size='large' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='large' />
        <Checkbox isDefaultChecked={false} isDisabled label='Unchecked disabled' size='large' />
        <Checkbox hasError isChecked label='Checked error' size='large' />
        <Checkbox hasError isDefaultChecked={false} label='Unchecked error' size='large' />
        <Checkbox hasError isIndeterminate label='Indeterminate error' size='large' />
      </div>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Small</h3>
        <Checkbox isChecked label='Checked' size='small' />
        <Checkbox isDefaultChecked={false} label='Unchecked' size='small' />
        <Checkbox isIndeterminate label='Indeterminate' size='small' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='small' />
        <Checkbox isDefaultChecked={false} isDisabled label='Unchecked disabled' size='small' />
        <Checkbox hasError isChecked label='Checked error' size='small' />
        <Checkbox hasError isDefaultChecked={false} label='Unchecked error' size='small' />
        <Checkbox hasError isIndeterminate label='Indeterminate error' size='small' />
      </div>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Without Labels</h3>
        <Checkbox aria-label='Large checked' isChecked size='large' />
        <Checkbox aria-label='Large unchecked' isDefaultChecked={false} size='large' />
        <Checkbox aria-label='Small checked' isChecked size='small' />
        <Checkbox aria-label='Small unchecked' isDefaultChecked={false} size='small' />
      </div>
    </div>
}`,...(z=(g=n.parameters)==null?void 0:g.docs)==null?void 0:z.source}}};var D,y,j;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <h3 style={{
      margin: '0 0 8px 0'
    }}>Label Wrapping Behavior</h3>
      <p style={{
      fontSize: '14px',
      color: '#666',
      margin: '0 0 10px 0'
    }}>
        We recommend checkbox labels being fewer than three words or 60
        characters. If you are tight on space, consider rewording the label.
        Long labels may wrap to a second line.
      </p>
      <Checkbox isChecked label='Short label' />
      <Checkbox isDefaultChecked={false} label='This is a moderately long checkbox label' />
      <Checkbox isDefaultChecked={false} label='Small checkbox with a long label that also wraps' size='small' />
    </div>
}`,...(j=(y=t.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};const T=["Default","IndeterminateToggle","AllSizesAndStates","LongLabelWrapping"];export{n as AllSizesAndStates,r as Default,i as IndeterminateToggle,t as LongLabelWrapping,T as __namedExportsOrder,W as default};
