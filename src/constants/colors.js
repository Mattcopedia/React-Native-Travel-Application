const colors = {
  purple: '#403572',
  blue: '#4681A3',
  white: '#FFFFFF',
  black: '#173147',
  grey: '#8B97A8',
  lightGrey: '#E7E7E7',
  midGrey: '#707070',
  red: '#FF3726',
  lightRed: '#FFF4F4',
};

export default colors;






// useEffect(() => {

//   firestore()
//       .collection('Notes')
//       .where('userId', '==', user?.uid)
//       .get()
//       .then(querySnapshot => {
//           const newNotes = [];

//           querySnapshot.forEach(documentSnapshot => {
//               const { note, title } = documentSnapshot.data()
//               newNotes.unshift({ note, title, uid: documentSnapshot.id, });
//           });

//           setNotes(newNotes);
//       });

//   dispatch(setToUpdate());
// }, []);



// // const filteredNotes = notes?.filter(note => note.uid === route.params.item?.uid)
// // console.log("filtered Notes", filteredNotes)
// // console.log("filtered Notes", filteredNotes[0].title)