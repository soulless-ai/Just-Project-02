<template>
  <div>
    <div class="post-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <img :src="post.image" alt="Post Image" class="post-image" />
        <div class="post-content">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-description">{{ post.description }}</p>
          <div @click="showPostDetails(post)" class="read-more">Подробнее...</div>

          <div @click="showPostForm(post)" class="add-comment">Добавить отзыв...</div>
        </div>
      </div>
    </div>

    <div v-if="selectedPost" class="post-details">
      <div @click="hidePostDetails" class="close-details">X</div>
      <img :src="selectedPost.image" alt="Post Image" class="post-image" />
      <h2 class="post-title">{{ selectedPost.title }}</h2>
      <p class="post-description">{{ selectedPost.description }}</p>
      <p class="post-date">Опубликовано: {{ selectedPost.date }}</p>
      
      <!-- Кнопка для добавления отзыва к посту -->
      <div @click="showPostForm(selectedPost)" class="add-comment">Добавить отзыв...</div>

      <div v-for="comment in selectedPost.comments" :key="comment.id" class="comment">
        <p>{{ comment.text }}</p>
        <div>
          <textarea v-model="newReply[comment.id]" placeholder="Ответить на отзыв"></textarea>
          <!-- Кнопка для добавления вложенного отзыва -->
          <button @click="addReply(comment)">Ответить</button>
        </div>
        <div v-for="reply in comment.replies" :key="reply.id" class="reply">
          <p>{{ reply.text }}</p>
        </div>
      </div>
    </div>

    <!-- Форма для добавления отзыва -->
    <div v-if="addingComment" class="post-comment">
      <div @click="hidePostForm" class="close-details">X</div>
      <input v-model="newComment" class="post-comment-input" />
      <button @click="addComment" class="post-comment-button">Добавить отзыв</button>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
          posts: {
            type: Array,
            required: true,
          },
        },
        data() {
          return {
            selectedPost: null,
            addingComment: false,
            newComment: "",
            newReply: "",
          };
        },
        methods: {
          showPostDetails(post) {
            this.selectedPost = { ...post, comments: [] };
          },
          hidePostDetails() {
            this.selectedPost = null;
          },
          showPostForm(post) {
            this.addingComment = true;
            this.selectedPost = post;
          },

          hidePostForm() {
            this.addingComment = false;
            this.selectedPost = null;
          },

          addComment() {
            if (this.newComment.trim() !== "") {
              this.selectedPost.comments.push({
                id: Date.now(),
                text: this.newComment.trim(),
                replies: [],
              });
              this.newComment = "";
            }
            this.hidePostForm();
          },

          addReply(comment) {
            const replyText = this.newReply[comment.id];
            if (replyText && replyText.trim() !== "") {
              comment.replies.push({
                id: Date.now(),
                text: replyText.trim(),
              });
              this.newReply[comment.id] = ""; // Clear the reply input
            }
          },
        },
      };
</script>

<style scoped>
    .post-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
      grid-gap: 20px;
      margin: 40px;
    }

    .post-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease-in-out;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    .post-card:hover {
      transform: scale(1.02);
    }

    .post-image {
      max-width: 100%;
      height: auto;
      border-bottom: 1px solid #ddd;
    }

    .post-content {
      padding: 1rem;
    }

    .post-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .post-description {
      color: #555;
    }

    .read-more, .add-comment {
      color: #005091;
      text-decoration: underline;
      cursor: pointer;
    }

    .post-details, .post-comment {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .close-details {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #fff;
      margin: 0px;
      font-size: 26px;
      padding: 7px 28px;
      background-color: rgb(83, 21, 21);
    }
    .close-details:hover {
      background-color: brown;
    }

    .post-comment-input, .post-comment-button {
      background-color: black;
      color: white;
      padding: 6px 8px;
      margin: 12px;
    }
    .post-comment-button {
      background-color: black;
      color: white;
      padding: 8px 14px;
      margin: 14px;
    }
    .adding-comment .post-comment {
      display: block;
      margin-top: 20px;
    }
</style>