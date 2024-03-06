function displayBackground(data) {
    fetch('https://php-noise.com/noise.php?hex=${hex}&json')
      .then((response) => response.json())
      .then((data) => {
        document.body.style.backgroundImage = `url('${data.uri}')`;
    });
}
  
displayBackground();