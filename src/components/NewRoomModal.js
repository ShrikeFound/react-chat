import React, { useRef, useState } from 'react'
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from 'rsuite'
import { useModalState } from '../misc/custom-hooks'
import firebase from 'firebase/app'
import { db } from '../misc/firebase'
  const initialFormValues = {
      name: '',
      description: ''
    }


const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Fireside name is required.'),
  description: StringType().isRequired('Fireside description is required.')

  })


const NewRoomModal = () => {

  const { open, close, isOpen } = useModalState();
  
  const [formValue, setFormValue] = useState(initialFormValues);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();


  //        ===TODO===   useCallback here 
  const onFormChange = (value) => {
    //rSuite onchange gives value; no need to get event target!
    setFormValue(value)
  }


  const handleSubmit = async () => {
    
    if (!formRef.current.check()) {
      return
    }

    setLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }


    try {
      
      const result = await db.ref('rooms').push(newRoomData);


      setLoading(false);
      Alert.info(`${formValue.name}`,4000)
      setFormValue(initialFormValues);
      close();
      
      console.log(result.key)


    } catch(error) {
      setLoading(false);
      Alert.error(error.message,4000)
    }





  }

  
  
  return (
    <div className="mt-1">
      <Button block color="grey" onClick={open}>
        <Icon icon="fire" /> New Fireside
      </Button>


      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title className="center">Create a Fireside</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={formRef} fluid onChange={onFormChange} formValue={formValue} model={model}>
            <FormGroup>
              <ControlLabel>
                Fireside Name
              </ControlLabel>
              <FormControl name="name" placeholder="new room name"/>
            </FormGroup>

            <FormGroup>
              <ControlLabel>
                Description
              </ControlLabel>
              <FormControl componentClass="textarea" rows={5} name="description" placeholder="Description for the room..."/>
            </FormGroup>


          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button block color="green" onClick={handleSubmit} disabled={loading}>Create new Fireside</Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}

export default NewRoomModal
