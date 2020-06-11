<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted"/>
    </section>
  </div>
</template>


<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['check-auth','auth'],
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(post) {
      this.$store
          .dispatch('addPost', post)
          .then(() => {
            this.$router.push("/admin");
          });
    }
  }
}
</script>
