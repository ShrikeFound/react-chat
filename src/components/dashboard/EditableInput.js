import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

const EditableInput = ({initValue,onSave,label = null,name, placeholder = "Write your value.",emptyMessage="Please don't save an empty space.",...inputProps}) => {
  
  const [input, setInput] = useState(initValue);
  const [editable, setEditable] = useState(false);
  const onInputChange = useCallback((value) => {
    setInput(value);
  },[])

  const handleEditButtonClick = useCallback(() => {
    setEditable(previous => !previous);
    setInput(initValue);

  },[initValue])


  const handleSaveButtonClick = async () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      Alert.info(emptyMessage, 4000);
      return
    }


    if (trimmed !== initValue) {
      await onSave(trimmed);
    }


    setEditable(false)

  }

  return (
    <div>
      {label}
      <InputGroup>
      <Input
        {...inputProps} placeholder={placeholder} onChange={onInputChange} value={input} disabled={!editable}
        />
        <InputGroup.Button  onClick={handleEditButtonClick}>
          <Icon icon={editable ? 'close' : 'edit2'}/>
        </InputGroup.Button>
        {editable && 
        <InputGroup.Button  onClick={handleSaveButtonClick}>
          <Icon icon="check"/>
        </InputGroup.Button>
        
        }
      </InputGroup>
    </div>
  )
}

export default EditableInput
