<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '@/components/Admin/AdminPostForm';

  export default {
    layout: 'admin',
    components: {
      AdminPostForm,
    },
    data() {
      return {
        loadedPost: {
          author: "Neverovsky",
          title: "Default post",
          content: "Default post content",
          thumbnailLink: "https://images.idgesg.net/images/article/2018/07/code_coding_javascript_laptop_by_clement_h_cc0_via_unsplash_1200x800-100763703-large.jpg"
        }
      }
    }
  }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }
  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>