// Crear comentarios
let db = firebase.firestore();
function addComment() {
  let comment = document.getElementById('messageArea').value;
  if (comment === '') {
    alert('Ingresa tu mensaje');
  } else {
    db.collection('comments').add({
      textComment: comment,
    })
      .then(function(docRef) {
        console.log('Texto escrito con ID: ', docRef.id);
        document.getElementById('messageArea').value = '';
      })
      .catch(function(error) {
        console.error('Error al agregar documento: ', error);
      });
  };
}

// Mostrar los comentarios
let container = document.getElementById('comentarios');
db.collection('comments').onSnapshot((querySnapshot) => {
  container.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().textComment}`);
    container.innerHTML += `
      <div class="col-12" id="divContainer">
      <p>${doc.data().textComment}</p>
      <i type="button" class="fa fa-trash" aria-hidden="true" onclick="deleteComment('${doc.id}')"></i>
      </div>
      `;
  });
});

// Borrar comentario
function deleteComment(id) {
  let removeComment = confirm('¿Segur@ quieres borrar tu comentario?');
  if (removeComment === true) {
    db.collection('comments').doc(id).delete().then(function() {
      console.log('Comentario eliminado');
    }).catch(function(error) {
      console.error('Error al eliminar ', error);
    });
  }
}
