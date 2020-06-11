
<template>
  <nuxt-link :to="postLink" class="post-preview">
    <article>
        <div
          class="post-thumbnail"
          :style="{ backgroundImage: 'url('+ thumbnail +')'}">
        </div>
      <h1>{{ title }}</h1>
      <div class="post-details">
        <div> Last updated on {{ updatedDate }}</div>
        <div>Written by {{ author }}</div>
      </div>

      <P>{{ previewText }}</P>
        </article>
  </nuxt-link>
</template>


<script>
export default {
  name: 'PostPreview',
  props: {

    id: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      required: true
    },

    previewText: {
      type: String,
      required: true
    },
    updatedDate: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: false
    },

    thumbnail: {
      type: String,
      required: true
    }
  },
  computed: {
    postLink() {
      return this.isAdmin ? '/admin/'+this.id : '/posts/'+ this.id
    }
  }
}
</script>


<style scoped>

@media (min-width: 850px) {
  .post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    width: 90%;
  }
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}
</style>

