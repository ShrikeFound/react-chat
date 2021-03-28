import React from 'react'
import { Container, Grid, Panel,Row,Col, Button ,Icon, Alert} from 'rsuite'
import { auth, db } from '../misc/firebase'
import firebase from 'firebase/app';
import fireside_icon from '../images/fireside_icon.svg'

const SignIn = () => {

  const handleSignIn = async () => {


    try {
      const {additionalUserInfo,user} = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      
      if (additionalUserInfo.isNewUser) {
        await db.ref(`/users/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        })
      }


      Alert.success("Signed in",2500)
    } catch(err) {
      Alert.error(err.message,2500)
    }

  }


  return (
    <Container>
      <Grid className="mt-c">
        <Row>
          <Col className="center" mdOffset={6} xs={24} md={12}>
            <Panel >
              <div className="grid-center">
                <h2>Fireside Chat</h2>
                <p>Welcome! Sit by the fire and stay a while.</p>
                <img alt="fireside logo, a campfire" className="small-image" src={fireside_icon}/>
              </div>

              <div className="mt-3">
                <Button block style={{backgroundColor: "#F15A24", color:"white"}} onClick = {handleSignIn}>
                <Icon icon="google"/> Continue with Google
              </Button>
              </div>






            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  )
}

export default SignIn
