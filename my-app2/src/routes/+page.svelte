<script>
	import Webcam from "./Webcam.svelte";

    let test = 123;

    function increment() {
        test++;
    }
</script>

<div>
    <h1>Hello World {test}</h1>
    <Webcam/>
</div>