import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks'

const fileInputTypes = ".jpg,.jpeg,.png"
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg']
const isValid = (file) => {
  return acceptedFileTypes.includes(file.type)
}


const AvatarUploadButton = () => {

  const { open, close, isOpen } = useModalState();
  const [image,setImage] = useState(null)

  const handleFileInputChange = (e) => {
    
    const files = e.target.files;

    if (files.length === 1) {
      
      const file = files[0]

      if (isValid(file)) {
        
        setImage(file)
        open();

      } else {
        Alert.warning(`Wrong file type: ${file.type}`)
      }

    }

  }

  return (
    <div className="mt-3 center">
      <div className="avatar-upload">
        
        <label htmlFor="avatar-file" >Select new avatar</label>
        <input accept={fileInputTypes} id="avatar-file" type="file" onChange={handleFileInputChange} />
        
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Upload new Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {image &&
              <div className="flex-center">
                <AvatarEditor
                  image={image}
                  width={200}
                  height={200}
                  border={10}
                  color={[0, 0, 0, 0.7]} // RGBA
                  scale={1.2}
                  borderRadius={100}
                  rotate={0}
                />
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload Avatar
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  )
}

export default AvatarUploadButton
