

//splits name into array to get first letters of each word, for use with avatar
export const getNameInitials = (name) => {
  const splitName = name.toUpperCase().split(" ");
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0]
  } else {
    return splitName[0][0]
  }


}


export const convertToArray = (val => {
  if (val) {
    return Object.keys(val).map(roomId => {
      return { ...val[roomId], id: roomId }
    });
  } else {
    return []
  }
})