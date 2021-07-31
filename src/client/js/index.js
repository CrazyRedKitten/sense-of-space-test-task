// https://stackoverflow.com/questions/5587973/javascript-upload-file

import generateScene from './scene';

const imageInput = document.getElementById('image-file');

imageInput.addEventListener('input', uploadFile);

/**
 * TODO: Add descrtiption
 */
function uploadFile() {
  const image = imageInput.files[0];

  const formData = new FormData();

  const sceneCanvas = document.getElementById('scene');

  formData.append('photo', image);

  try {
    fetch('http://localhost:3000/api/image', {method: 'POST', body: formData})
        .then((res) => res.text())
        .then((data) => {
          const image = new Image();
          image.src = `data:image/png;base64,${data}`;
          const imageForm = document.getElementById('imageForm');
          // Remove form elements on success
          imageForm.remove();
          // Generate 3D scene with processed image
          generateScene({canvas: sceneCanvas, image: image.src});
        });
  } catch (error) {
    console.error(error);
  }
}
