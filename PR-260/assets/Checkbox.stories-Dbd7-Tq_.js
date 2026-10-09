var m=Object.defineProperty;var s=(n,r)=>m(n,"name",{value:r,configurable:!0});import{o as x}from"./rolldown-runtime-CzYk_CEw.js";import{t as u}from"./react-HNhQAnN4.js";import{t as g}from"./jsx-runtime-Br4tQxt1.js";import{t as a}from"./Checkbox-fa6pmW7g.js";var k=x(u()),e=g(),y={title:"Data Display/Checkbox",component:a,argTypes:{size:{control:"radio",options:["small","large"],description:"Size variant of the checkbox"},isChecked:{control:"boolean",description:"Controlled checked state"},isDisabled:{control:"boolean",description:"Whether the checkbox is disabled"},isIndeterminate:{control:"boolean",description:"Whether the checkbox is in an indeterminate state"},hasError:{control:"boolean",description:"Whether the checkbox is in an error state"},label:{control:"text",description:"Label text for the checkbox"}},args:{size:"large",isDisabled:!1,isIndeterminate:!1,hasError:!1,isChecked:!1}},c={args:{label:"Checkbox label"},render:s(n=>{const r=s(()=>{const[l,t]=(0,k.useState)(n.isChecked);return(0,e.jsx)(a,{...n,isChecked:l,onChange:s(i=>t(i.target.checked),"onChange")})},"CheckboxWrapper");return(0,e.jsx)(r,{})},"render"),parameters:{docs:{source:{code:`
          const [checked, setChecked] = useState(false);

          return (
            <Checkbox
              label="Checkbox label"
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          );`,language:"tsx"}}}},d={render:s(n=>{const r=s(()=>{const[l,t]=(0,k.useState)(!0),[i,b]=(0,k.useState)(!1),C=s(()=>{l?(t(!1),b(!0)):i?b(!1):t(!0)},"handleChange");return(0,e.jsx)(a,{...n,isChecked:i,isIndeterminate:l,label:"Indeterminate → Checked → Unchecked",onChange:C})},"CheckboxWrapper");return(0,e.jsx)(r,{})},"render"),parameters:{docs:{source:{code:`
          const [indeterminate, setIndeterminate] = useState(true);
          const [checked, setChecked] = useState(false);

          const handleChange = () => {
            if (indeterminate) {
              setIndeterminate(false);
              setChecked(true);
            } else if (checked) {
              setChecked(false);
            } else {
              setIndeterminate(true);
            }
          };

          return (
            <Checkbox
              isChecked={checked}
              isIndeterminate={indeterminate}
              label="Indeterminate → Checked → Unchecked"
              onChange={handleChange}
            />
          );`,language:"tsx"}}}},h={render:s(()=>(0,e.jsxs)("div",{style:{display:"flex",gap:"40px"},children:[(0,e.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[(0,e.jsx)("h3",{style:{margin:"0 0 8px 0"},children:"Large"}),(0,e.jsx)(a,{isChecked:!0,label:"Checked",size:"large"}),(0,e.jsx)(a,{isChecked:!1,label:"Unchecked",size:"large"}),(0,e.jsx)(a,{isIndeterminate:!0,label:"Indeterminate",size:"large"}),(0,e.jsx)(a,{isChecked:!0,isDisabled:!0,label:"Checked disabled",size:"large"}),(0,e.jsx)(a,{isChecked:!1,isDisabled:!0,label:"Unchecked disabled",size:"large"}),(0,e.jsx)(a,{hasError:!0,isChecked:!0,label:"Checked error",size:"large"}),(0,e.jsx)(a,{hasError:!0,isChecked:!1,label:"Unchecked error",size:"large"}),(0,e.jsx)(a,{hasError:!0,isIndeterminate:!0,label:"Indeterminate error",size:"large"})]}),(0,e.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[(0,e.jsx)("h3",{style:{margin:"0 0 8px 0"},children:"Small"}),(0,e.jsx)(a,{isChecked:!0,label:"Checked",size:"small"}),(0,e.jsx)(a,{isChecked:!1,label:"Unchecked",size:"small"}),(0,e.jsx)(a,{isIndeterminate:!0,label:"Indeterminate",size:"small"}),(0,e.jsx)(a,{isChecked:!0,isDisabled:!0,label:"Checked disabled",size:"small"}),(0,e.jsx)(a,{isChecked:!1,isDisabled:!0,label:"Unchecked disabled",size:"small"}),(0,e.jsx)(a,{hasError:!0,isChecked:!0,label:"Checked error",size:"small"}),(0,e.jsx)(a,{hasError:!0,isChecked:!1,label:"Unchecked error",size:"small"}),(0,e.jsx)(a,{hasError:!0,isIndeterminate:!0,label:"Indeterminate error",size:"small"})]}),(0,e.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[(0,e.jsx)("h3",{style:{margin:"0 0 8px 0"},children:"Without Labels"}),(0,e.jsx)(a,{"aria-label":"Large checked",isChecked:!0,size:"large"}),(0,e.jsx)(a,{"aria-label":"Large unchecked",isChecked:!1,size:"large"}),(0,e.jsx)(a,{"aria-label":"Small checked",isChecked:!0,size:"small"}),(0,e.jsx)(a,{"aria-label":"Small unchecked",isChecked:!1,size:"small"})]})]}),"render")},o={render:s(()=>(0,e.jsxs)("div",{style:{width:300,display:"flex",flexDirection:"column",gap:"16px"},children:[(0,e.jsx)(a,{isChecked:!0,label:"This is a moderately long checkbox label that wraps in two lines"}),(0,e.jsx)(a,{isChecked:!0,label:"Small checkbox with a long label that also wraps in two lines",size:"small"})]}),"render")};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox label'
  },
  render: args => {
    const CheckboxWrapper = () => {
      const [checked, setChecked] = useState(args.isChecked);
      return <Checkbox {...args} isChecked={checked} onChange={e => setChecked(e.target.checked)} />;
    };
    return <CheckboxWrapper />;
  },
  parameters: {
    docs: {
      source: {
        code: \`
          const [checked, setChecked] = useState(false);

          return (
            <Checkbox
              label="Checkbox label"
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          );\`,
        language: 'tsx'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => {
    const CheckboxWrapper = () => {
      const [indeterminate, setIndeterminate] = useState(true);
      const [checked, setChecked] = useState(false);
      const handleChange = () => {
        if (indeterminate) {
          setIndeterminate(false);
          setChecked(true);
        } else if (checked) {
          setChecked(false);
        } else {
          setIndeterminate(true);
        }
      };
      return <Checkbox {...args} isChecked={checked} isIndeterminate={indeterminate} label='Indeterminate → Checked → Unchecked' onChange={handleChange} />;
    };
    return <CheckboxWrapper />;
  },
  parameters: {
    docs: {
      source: {
        code: \`
          const [indeterminate, setIndeterminate] = useState(true);
          const [checked, setChecked] = useState(false);

          const handleChange = () => {
            if (indeterminate) {
              setIndeterminate(false);
              setChecked(true);
            } else if (checked) {
              setChecked(false);
            } else {
              setIndeterminate(true);
            }
          };

          return (
            <Checkbox
              isChecked={checked}
              isIndeterminate={indeterminate}
              label="Indeterminate → Checked → Unchecked"
              onChange={handleChange}
            />
          );\`,
        language: 'tsx'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
        <Checkbox isChecked={false} label='Unchecked' size='large' />
        <Checkbox isIndeterminate label='Indeterminate' size='large' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='large' />
        <Checkbox isChecked={false} isDisabled label='Unchecked disabled' size='large' />
        <Checkbox hasError isChecked label='Checked error' size='large' />
        <Checkbox hasError isChecked={false} label='Unchecked error' size='large' />
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
        <Checkbox isChecked={false} label='Unchecked' size='small' />
        <Checkbox isIndeterminate label='Indeterminate' size='small' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='small' />
        <Checkbox isChecked={false} isDisabled label='Unchecked disabled' size='small' />
        <Checkbox hasError isChecked label='Checked error' size='small' />
        <Checkbox hasError isChecked={false} label='Unchecked error' size='small' />
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
        <Checkbox aria-label='Large unchecked' isChecked={false} size='large' />
        <Checkbox aria-label='Small checked' isChecked size='small' />
        <Checkbox aria-label='Small unchecked' isChecked={false} size='small' />
      </div>
    </div>
}`,...h.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Checkbox isChecked label='This is a moderately long checkbox label that wraps in two lines' />
      <Checkbox isChecked label='Small checkbox with a long label that also wraps in two lines' size='small' />
    </div>
}`,...o.parameters?.docs?.source}}};var S=["Default","IndeterminateToggle","AllSizesAndStates","LongLabelWrapping"];export{h as AllSizesAndStates,c as Default,d as IndeterminateToggle,o as LongLabelWrapping,S as __namedExportsOrder,y as default};
