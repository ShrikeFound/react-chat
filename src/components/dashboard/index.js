
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useUser } from '../../context/user.context'
import { db } from '../../misc/firebase';
import EditableInput from './EditableInput';

const Dashboard = ({onSignOut}) => {

  const { user } = useUser();

  const onSave = async (saveData) => {
    const userNameRef = db.ref(`/users/${user.uid}`).child('name')
  
    try {
      await userNameRef.set(saveData)
      Alert.success('Nickname saved!',4000);
    } catch (error) {
      Alert.error(error,4000)
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
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" className="mb-3" onClick={onSignOut}>Sign Out</Button>
      </Drawer.Footer>
    </>
  )
}

export default Dashboard
