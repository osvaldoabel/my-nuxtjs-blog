<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['check-auth','auth'],
  components: {
    AdminPostForm
  },

  asyncData(context) {

    const link = `/posts/${context.params.postId}.json`;

     return context.$axios.$get(link)
        .then(data => {
          return {
            loadedPost: {...data, id: context.params.id}
          }
        })
        .catch(e => console.log(context.error(e)))
  },

  methods: {
    onSubmitted(edittedPost) {
      this.$store.dispatch('editPost', edittedPost)
                .then(() => {
                  this.$router.push('/admin')
                });

      // const link = `${base_link+this.$route.params.postId}.json`
      // axios.put(link, edittedPost)
      // .then(res => this.$router.push('/admin'))
      // .catch(e => console.log(context.error(e)))
    }
  }

  // computed: {

  // }

  // data() {
  //   return {
  //     loadedPost: {
  //       author: 'Osvaldo Abel',
  //       title: 'My google First Post',
  //       content: 'How to be a Google software engineer',
  //       thumbnailLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnJJeiYo25f6KeCwt8LHHU0nDNu93fn4u_0ancwIc8yoejAf9y&s'
  //     }
  //   }
  // }
}
</script>
