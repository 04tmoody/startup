function displayBackground(data) {
  fetch('https://php-noise.com/noise.php?hex=${hex}&json')
    .then((response) => response.json())
    .then((data) => {
      const img = new Image();
      img.onload = () => {
        document.body.style.backgroundImage = `url('${data.uri}')`;
      };
      img.onerror = () => {
        console.error("Error loading image:", data.uri);
      };
      img.src = data.uri;
    });
}

displayBackground();