import axios from 'axios';

export const state = () => ({
  posts: [],
  selectedPost: null,
});

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setSelectedPost(state, post) {
    state.selectedPost = { ...post, comments: [] };
  },
  clearSelectedPost(state) {
    state.selectedPost = null;
  },
  addComment(state, comment) {
    state.selectedPost.comments.push(comment);
  },
  addReply(state, { commentId, reply }) {
    const comment = state.selectedPost.comments.find(c => c.id === commentId);
    if (comment) {
      comment.replies.push(reply);
    }
  },
};

export const actions = {
  async fetchPosts({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/posts.json');
      commit('setPosts', response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  },
  async addComment({ commit, state }, commentText) {
    const newComment = {
      id: Date.now(),
      text: commentText.trim(),
      replies: [],
    };
    commit('addComment', newComment);

    // Assuming you have an API endpoint to save comments
    try {
      await axios.post(`http://localhost:3000/posts/${state.selectedPost.id}/comments`, newComment);
    } catch (error) {
      console.error('Error saving comment:', error.message);
    }
  },
  async addReply({ commit, state }, { commentId, replyText }) {
    const reply = {
      id: Date.now(),
      text: replyText.trim(),
    };
    commit('addReply', { commentId, reply });

    // Assuming you have an API endpoint to save replies
    try {
      await axios.post(`http://localhost:3000/posts/${state.selectedPost.id}/comments/${commentId}/replies`, reply);
    } catch (error) {
      console.error('Error saving reply:', error.message);
    }
  },
};