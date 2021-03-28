
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useUser } from '../../context/user.context'
import { db } from '../../misc/firebase';
import AvatarUploadButton from './AvatarUploadButton';
import EditableInput from './EditableInput';

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


const Dashboard = ({onSignOut}) => {

  const { user } = useUser();

  const onSave = async (saveData) => {
    // const userNameRef = db.ref(`/users/${user.uid}`).child('name')
  
    try {
      // await userNameRef.set(saveData)

      const updates = await getUserUpdates(user.uid,'name',saveData,db)

      await db.ref().update(updates);

      Alert.success('Nickname saved!',2500);
    } catch (error) {
      Alert.error(error,2500)
    }

  
  }

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>
        Dashboard
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>{user.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initValue={user.name}
          onSave={onSave}
          label = {<h6 className="mb-2">NickName</h6>}
          
        />

        <AvatarUploadButton/>

      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" className="mb-3" onClick={onSignOut}>Sign Out</Button>
      </Drawer.Footer>
    </>
  )
}

export default Dashboard
