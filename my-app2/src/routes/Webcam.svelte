<script>
    /**
	 * @type {HTMLVideoElement | null}
	 */
    let videoSource = null;
    let loading = false;
    const obtenerVideoCamara = async () => {
        const button = document.getElementById("clickButton");
      try {
        loading = true;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        // @ts-ignore
        videoSource.srcObject = stream;
        // @ts-ignore
        videoSource.play();
        loading = false;
        if (button) {
            button.style.display = 'none';
        }
      } catch (error) {
        console.log(error);
      }
    };

    const tomarCaptura = () => {
    if (videoSource) {
      const canvas = document.createElement('canvas');
      canvas.width = videoSource.videoWidth;
      canvas.height = videoSource.videoHeight;

      const ctx = canvas.getContext('2d');
      // @ts-ignore
      ctx.drawImage(videoSource, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a Blob
      canvas.toBlob((blob) => {
        // Create a download link
        const link = document.createElement('a');
        // @ts-ignore
        link.href = URL.createObjectURL(blob);
        link.download = 'screenshot.png';

        // Append the link to the document and trigger a click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      }, 'image/png');
    }
  };
  </script>
  
  <div>
    {#if loading}
      <h1>Loading</h1>
    {/if}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video bind:this={videoSource} />
    <button on:click={obtenerVideoCamara} id="clickButton">Show Camera</button>
    <button on:click={tomarCaptura}>Take Screenshot</button>
  </div>
  