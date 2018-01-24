<template>
  <div class="card card-rule">
    <div class="card-body">
      <h2 class="card-title">The rule is simple:</h2>
      <ol>
        <li>Tebak the <span class="text-success">correct</span> answer</li>
        <li>Don't tebak the <span class="text-danger">wrong</span> answer</li>
        <li>Get the <span class="text-primary">highest score</span></li>
      </ol>
      <p>Can you tebak them all?</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-rule {
  text-align: left;
  font-size: 18px;
  border: none;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background: #f1f2f6;

  *:not(:last-child) {
    margin-bottom: 16px;
  }

  *:last-child {
    margin-bottom: 0;
  }

  ol {
    line-height: 1.6;
    padding-left: 20px;
    margin-bottom: 0;
    font-size: 16px;
  }

  li {
    padding-left: 5px;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

.card-title {
  font-size: 24px;
}
</style>
