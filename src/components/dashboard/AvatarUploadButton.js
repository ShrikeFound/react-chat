import { queryAllByAttribute } from '@testing-library/dom'
import React, { useState,useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite'
import { useUser } from '../../context/user.context'
import { useModalState } from '../../misc/custom-hooks'
import { db, storage } from '../../misc/firebase'
import UserAvatar from './UserAvatar'

const fileInputTypes = ".jpg,.jpeg,.png"
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg']
const isValid = (file) => {
  return acceptedFileTypes.includes(file.type)
}


const AvatarUploadButton = () => {

  const { open, close, isOpen } = useModalState();
  const [image, setImage] = useState(null)
  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const avatarRef = useRef();


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

  const handleUploadClick = async () => {
    const canvas = avatarRef.current.getImageScaledToCanvas();

    setLoading(true)
    try {
      
      const blob = await getBlog(canvas);

      const avatarFileRef = storage.ref(`/user/${user.uid}`).child('avatar')


      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age= ${3600 * 24 * 3}`
      });

      const downloadURL = await uploadAvatarResult.ref.getDownloadURL()


      const userAvatarRef = db.ref(`/users/${user.uid}`).child('avatar');
      userAvatarRef.set(downloadURL);

      setLoading(false)
      Alert.success("avatar updloaded!",4000);


    } catch (err) {

      setLoading(false)
      Alert.error(err.message,4000)

    }


  }

  const getBlog = (canvas) => {
    return new Promise((resolve,reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('canvas processing error'))
        }
      })
    });
  }


  return (
    <div className="mt-3 center">

      <UserAvatar
        src={user.avatar}
        name={user.name}
        className="avatar-large img-fullsize"
      />

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
                ref={avatarRef}
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
            <Button disabled={loading} block appearance="ghost" onClick={handleUploadClick}>
              Upload Avatar
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  )
}

export default AvatarUploadButton
