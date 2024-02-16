<script>
    export let itemInfo;
</script>


<!-- <article class="more-content">, or 
      <section class="wrapper detail"> -->
  <h4>More: <a href="/people">Topics and Ideas</a></h4>

  <h2>
      {itemInfo.title}
  </h2>

  {@html itemInfo.full_text.html}

  <!-- / more-content or wrapper detail -->