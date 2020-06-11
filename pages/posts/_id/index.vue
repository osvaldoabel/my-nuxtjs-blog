<template>
  <div class="single-post-page">
    <section class="post">


      <h1>{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div> Last updated on {{ loadedPost.updatedDate | date }}</div>
        <div>Written by {{ loadedPost.author }}</div>
      </div>

      <P>{{ loadedPost.content }}</P>
    </section>

    <section class="post-feedback">
      <p>Let me know about  the post, send me a mail at <a href="mailto:osvaldoabel@gmail.com">osvaldoabel@gmail.com</a> </p>
    </section>

  </div>
</template>

<script>
// import axios from 'axios'

export default {
  asyncData(context) {
    // const link = process.env.baseUrl + `/posts/${context.params.id}.json`
    const link = `/posts/${context.params.id}.json`
    return context.app.$axios.$get(link)
        .then(data => {
          return {
            loadedPost: data
          }
        })
        .catch(e => console.log(context.error(e)))
  },
  head: {
    title: "blo post - kanguanda f"
  },
  conputed: {
    loadedPost() {
      return this.$store.getters.loadedPost
    }
  }
}

</script>
<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
