/* eslint-disable indent */
// TODO: Solve eslint and prettier formatting conflict
// https://stackoverflow.com/questions/5587973/javascript-upload-file

import generateScene from './scene';

const imageInput = document.getElementById('image-file');

imageInput.addEventListener('input', uploadFile);

/**
 * TODO: Add docs
 */
function uploadFile() {
  const image = imageInput.files[0];

  const formData = new FormData();

  formData.append('photo', image);

  try {
    fetch('http://localhost:3000/api/image', {method: 'POST', body: formData})
      .then((res) => res.text())
      .then((data) => {
        const imagePlaceholder = document.getElementById('imagePlaceholder');
        const image = new Image();
        image.src = `data:image/png;base64,${data}`;
        // Append image to the DOM
        imagePlaceholder.appendChild(image);
        // console.log(image)
      });
  } catch (error) {
    console.error(error);
  }
}

generateScene();
