<template>
  <div class="d-flex justify-center">
    <v-container class="mx-10">
      <v-row>
        <v-col cols="12" class="pt-0">
          <v-card class="mt-2 mx-2 base-card">
            <v-card-text>
              <div class="d-flex">
                <v-text-field
                  v-model="searchText"
                  class="rounded-lg"
                  append-icon="mdi-magnify"
                  outlined dense hide-details clearable
                />
                <v-btn 
                  v-if="isAdmin" 
                  height="38" width="38"
                  class="ml-2 px-0 py-2 rounded-lg elevation-0 primary" color='primary' 
                  title="Сгенерировать посты"
                  @click="generetePosts">
                  <v-icon size="20">mdi-view-grid-plus</v-icon>
                </v-btn>
                <v-btn 
                  v-if="isAdmin" 
                  height="38" width="38"
                  class="ml-2 px-0 py-2 rounded-lg elevation-0 primary" color='primary' 
                  title="Добавить пост"
                  @click="createNewPost">
                  <v-icon size="20">mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" class="pt-0 ml-0 mb-2">
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
  }
}
</script>

<style scoped>
</style>
