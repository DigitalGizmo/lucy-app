<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.scroll-y {
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
}

.scroll-x {
  overflow-y: hidden;
  overflow-x: auto;
  width: auto;
  min-width: 100%;
  min-height: 100%;
}

.content-container {
  min-width: 100%;
  min-height: 100%;
  background: linear-gradient(to bottom right, #8930fd, #49ccf9, #FFC800, #FF02F0);
  background-size: 100%;
  display: inline-block;
}
.test-row {
  display: flex;
  height: 1000px;
}
.test-row * {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  font-size: 18px;
  border: 1px solid #333;
  margin: 10px;
}
</style>

<div class="scroll-y">
  <div class="scroll-x">
    <div class="content-container">


      <div class="test-row">
        <div>Out of Africa</div>
        <div>Sold</div>
        <div>Strange</div>
        <div>Wells</div>
        <div>Church</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
      </div>


    </div>
  </div>
</div>
