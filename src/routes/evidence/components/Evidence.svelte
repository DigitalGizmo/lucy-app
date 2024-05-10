<script>
    export let itemInfo;
</script>


<!-- <article class="more-content">, or 
     <section class="wrapper detail"> -->
  <!-- <h4>More: <a href="/evidence">How Do We Know?</a></h4> -->

  <h2>{itemInfo.title}</h2>
  <dl class="evidence-info">
    <dt>Date:</dt>
    <dd>
      { itemInfo.is_circa ? 'circa ' : ''}
      { itemInfo.year ? itemInfo.year : 'date needed'}
      { itemInfo.end_year ? " - " + itemInfo.end_year : ''}
    </dd>
    <dt>Item Type:</dt>
    <dd>{ itemInfo.item_type}</dd>
  </dl>

  <figure>
    <img 
      src="https://lucy-proto.deerfield-ma.org/assets/evidence/images/fullpics/{itemInfo.slug}.jpg"
      alt="{itemInfo.title}"
    >
    <figcaption>{itemInfo.caption}</figcaption>
  </figure>

  <div class="about">
    <h3>About</h3>
    {@html itemInfo.full_text.html}
    
    {#if itemInfo.transcript}
      <h3>Transcript</h3>
      {@html itemInfo.transcript}
    {/if}

  </div>

  <!-- / more-content or wrapper detail -->