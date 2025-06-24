<script>
  import DotsImage from './DotsImage.svelte';
  export let src = '';
  const isValidPixel = (rgba) => rgba.a > 50;
</script>

<DotsImage
  {src}
  color="#fff8"
  width={400}
  height={400}
  dotSize={4}
  gap={1}
  float={false}
  {isValidPixel}
/>
