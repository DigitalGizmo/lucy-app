<script>
    export let itemInfo;
</script>


<!-- <article class="more-content"> -->
    <h4>More: <a href="/people">How Do We Know?</a> </h4>

      <h2>
          {itemInfo.title}
      </h2>
      <figure>
        <img src="https://placehold.co/600x400"
            alt="placehoder showing 600 x 400"/>
        <figcaption>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</figcaption>
      </figure>
        {@html itemInfo.full_text.html}

  <!-- </article> -->
  <!-- /more-content -->