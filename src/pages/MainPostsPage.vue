<template>
  <div class="d-flex justify-center">
    <v-container class="mx-10">
      <v-row>
        <v-col cols="8 pt-0">
          <div ref="postsList" class="mt-2 px-2 pb-2 overflow-auto">
            <v-card class="hover-card" :class="index ? 'mt-2' : 'mt-0'" v-for="(post,index) in filteredPosts" :key="index">
              <v-card-title>{{post.title}}</v-card-title> 
              <v-card-text>
                <div class="text--primary">{{post.shortText}}</div>

                <div class="d-flex justify-space-between mt-10">
                  <router-link :to="`/post/read/${post.id}`" style="text-decoration: none; color: inherit;">
                    <v-btn text rounded-lg color="primary">Читать далее</v-btn>
                  </router-link>
                  <div v-if="isAdmin">
                    <v-btn icon small @click="edit(post)">
                      <v-icon dark> mdi-pencil-outline</v-icon>
                    </v-btn>
                      
                    <v-btn class="ml-1" icon small @click="deletePost(index)">
                      <v-icon dark> mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>          
                </div>

                <div class="mt-1">
                  <span>Комментарии: {{post.comments.length}}</span>
                </div>
              </v-card-text> 
            </v-card>

            <v-card class="rounded-lg elevation-1" v-if="!filteredPosts.length && posts.length">
              <v-card-text class="d-flex justify-center">
                <span>Ничего не найдено</span>
              </v-card-text>
            </v-card>

            <v-card class="rounded-lg elevation-1" v-if="!posts.length">
              <v-card-text class="d-flex justify-center">
                  <video height="350" width="350" autoplay muted loop>
                    <source src="@/assets/noposts.webm" type="video/webm">
                  </video>
                  <h1>Жду...</h1>
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <v-col cols="4" class="pt-0">
          <v-card class="mt-2" outlined>
            <v-card-title>Действия</v-card-title>
            <v-card-text>
              <div>
                <v-text-field
                  v-model="searchText"
                  class="rounded-lg"
                  append-icon="mdi-magnify"
                  outlined dense hide-details clearable
                />
              </div>
              <div class="mt-4" v-if="isAdmin">
                <v-btn class="px-3 rounded-lg elevation-0" color='primary' @click="generetePosts">
                  <span class="btn-text">Сгенерировать посты</span>
                </v-btn>
                <v-btn class="ml-2 px-3 rounded-lg elevation-0" color='primary' @click="createNewPost">
                  <v-icon dark size="20">mdi-plus</v-icon>
                  <span class="ml-2 btn-text">Добавить пост</span>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <AddEditPostDialog 
        :dialog="dialog"
        :editablePost="editablePost"
        @closeDialog="closeDialog"
        @addPost="addPost"
        @editPost="editPost"
      />
    </v-container>
  </div>
</template>

<script>
import AddEditPostDialog from '@/components/Dialogs/AddEditPostDialog.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'MainPostsPage',

  components: {
    AddEditPostDialog,
  },
  
  mounted(){
    document.title = 'MiniBlog - Статьи';

    this.downloadFromLocalStorage()

    this.onResize()
    window.addEventListener("resize", this.onResize)
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize)
  },
  
  data() {
    return{
      dialog: false,
      editablePost: null,
      posts: [],
      searchText: ''
    }
  },

  computed: {
    ...mapGetters('user', ['isAdmin']),

    filteredPosts() {
      return this.searchText 
              ? this.posts.filter(el => el.title.toLowerCase().includes(this.searchText.toLowerCase()))
              : this.posts
    }
  },

  methods: {
    generetePosts() {
      const comments = [{name:"Александр", text: "Просто чудо чудесное"},
                        {name:"Еще Александр", text: "Великолепный пост"}]

      this.posts = [{id:1, title:"Заголовок 1", shortText:"Короткий текст", text:"Полный текст",  comments: comments},
                    {id:2, title:"Заголовок 2", shortText:"Короткий текст", text:"Полный текст", comments: []},
                    {id:3, title:"Заголовок 3", shortText:"Короткий текст", text:"Полный текст", comments: []}]

      this.updateLocalStorage()
    },

    createNewPost() {
      this.dialog = true
    },

    edit(post) {
      this.editablePost = post
      this.dialog = true
    },

    editPost(post) {
      this.posts.splice(this.posts.findIndex(el => el.id === post.id),1,post)
      this.updateLocalStorage()
    },

    addPost(post) {
      this.posts.push(post)
      this.updateLocalStorage()
    },

    deletePost(id) {
      this.posts.splice(id,1)
      this.updateLocalStorage()
    },

    updateLocalStorage(){
      localStorage.setItem('posts', JSON.stringify(this.posts));
    },

    downloadFromLocalStorage() {
      this.posts = JSON.parse(localStorage.getItem("posts")) || []
    },

    closeDialog() {
      this.editablePost = null
      this.dialog = false
    },

    onResize() {
      if (this.$refs?.postsList) {
        const otherElementheight = 100
        this.$refs.postsList.style.height = window.innerHeight - otherElementheight + 'px';
      }
    }
  }
}
</script>

<style scoped>
</style>
