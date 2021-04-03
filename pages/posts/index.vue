<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
          {
            id: "1",
            title: "First title",
            previewText: "Text of first post here",
            thumbnail: "https://educationboon.com/wp-content/uploads/2019/09/bajavascripthack_shutterstock_720388555.jpg"
          },
          {
            id: "2",
            title: "Second title",
            previewText: "Text of second post here",
            thumbnail: "https://educationboon.com/wp-content/uploads/2019/09/bajavascripthack_shutterstock_720388555.jpg"
          }
        ]
      })
    }, 1500)
  }
}
</script>

<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>