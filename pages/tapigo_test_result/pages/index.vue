<template>
    <div>
        <div class="justify-center">
            <h1>Test result</h1>
        </div>
        <PostList v-if="posts" :posts="posts" />
    </div>
</template>

<script>
    import PostList from '~/components/PostList.vue';

    export default {
        components: {
            PostList,
        },
        computed: {
            posts() {
                return this.$store.state.posts;
            },
        },
        async asyncData({ store }) {
            await store.dispatch('fetchPosts');
        },
    };
</script>

<style scoped>
    div {
        user-select: none;
    }
    h1 {
        font-size: 40px;
        color: black;
    }
    .justify-center {
        display: flex;
        justify-content: center;
    }
</style>
