import React, { useState,useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite'
import { useUser } from '../../context/user.context'
import { useModalState } from '../../misc/custom-hooks'
import { db, storage } from '../../misc/firebase'
import UserAvatar from './UserAvatar'

//list of inputs I want to use, as default for upload window
const fileInputTypes = ".jpg,.jpeg,.png"

//list of input types to check against file type when saving image 
//since you can get around the default file types.
//Don't want no funny business.
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg']
const isValid = (file) => {
  return acceptedFileTypes.includes(file.type)
}

const getUserUpdates = async (userId,keytoUpdate,value,db) => {
  const updates = {};

  updates[`/users/${userId}/${keytoUpdate}`] = value

  const getMessages = db.ref('/messages').orderByChild('author/uid').equalTo(userId).once("value");
  const getRooms = db.ref('/rooms').orderByChild('lastMessage/author/uid').equalTo(userId).once('value');

  const [messagesSnapshot,roomsSnapshot] = await Promise.all([getMessages, getRooms]);

  messagesSnapshot.forEach(m => {
    updates[`messages/${m.key}/author/${keytoUpdate}`] = value
  })


  roomsSnapshot.forEach(r => {
    updates[`rooms/${r.key}/lastMessage/author/${keytoUpdate}`] = value
  })

  return updates
}





const AvatarUploadButton = () => {

  //from custom hooks
  const { open, close, isOpen } = useModalState();

  const [image, setImage] = useState(null)
  
  //from userContext
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
      
      const blob = await getBlob(canvas);




      const avatarFileRef = storage.ref(`/user/${user.uid}`).child('avatar')


      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age= ${3600 * 24 * 3}`
      });

      const downloadURL = await uploadAvatarResult.ref.getDownloadURL()
      const updates = await getUserUpdates(user.uid,'avatar',downloadURL,db)
      await db.ref().update(updates);
      // const userAvatarRef = db.ref(`/users/${user.uid}`).child('avatar');
      // userAvatarRef.set(downloadURL);

      setLoading(false)
      Alert.success("avatar updloaded!",2500);


    } catch (err) {

      setLoading(false)
      Alert.error(err.message,2500)

    }


  }

  //converts canvas object to blob for saving in firebase storage
  const getBlob = (canvas) => {
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
