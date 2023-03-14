<template>
    <div class="d-flex justify-center">
    <v-container>

        <v-row>
            <v-btn
                color='primary'
                class="ml-3"
                @click="generetePosts">
                Сгенерировать посты
            </v-btn>

            <v-btn
                color='primary'
                class="ml-1"
                @click="createNewPost">
                + Добавить пост
            </v-btn>
        </v-row>

        <v-row  
            v-for="(post,index) in posts"
            :key="index"
            >
            
            <v-col cols="12">
                <v-card>
                    <v-card-title>{{post.title}}</v-card-title> 
                    <v-card-text>
                        <h2>{{post.shorttext}}</h2>

                        <div class="d-flex justify-space-between mt-10">
                            <router-link 
                                        style="text-decoration: none; color: inherit;"
                                        :to="`/post/read/${post.id}`"
                                        >
                                        <v-btn>Читать далее</v-btn>
                                    </router-link>
                            
                            <div>
                                <v-btn
                                    fab
                                    small
                                    @click="edit(post)"
                                    >
                                    <v-icon dark>
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                
                                <v-btn
                                    fab
                                    small
                                    class="ml-1"
                                    @click="deletePost(index)"
                                    >
                                    <v-icon dark>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </div>          
                        </div>

                        <div class="mt-1">
                            <span>Комментарии: {{post.comments.length}}</span>
                        </div>
                       </v-card-text> 
                </v-card>
            </v-col>
        </v-row>

        <v-row v-if="!posts.length">
            <v-col cols=12>
                <v-card>
                    <v-card-text class="d-flex justify-center">
                        <video
                            height="350"
                            width="350"
                            autoplay
                            loop>

                            <source src="@/assets/noposts.webm"
                            type="video/webm">
                        </video>
                        <h1>Жду...</h1>
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

export default {
    name: 'MainPostsPage',

    components: {
        AddEditPostDialog,
    },
    
    mounted(){
       this.downloadFromLocalStorage()
    },
    
    data() {
        return{
            dialog: false,
            editablePost: null,
            posts: []
        }
    },

    computed: {
    },

    methods: {
        generetePosts() {
            this.posts = [{id:1, title:"Заголовок 1", shorttext:"Короткий текст", text:"Полный текст", comments: [
                {name:"Александр", text: "Просто чудо чудесное"},
                {name:"Еще Александр", text: "Великолепный пост"}
            ]},
                         {id:2, title:"Заголовок 2", shorttext:"Короткий текст", text:"Полный текст", comments: []},
                         {id:3, title:"Заголовок 3", shorttext:"Короткий текст", text:"Полный текст", comments: []}]
            
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
            this.posts = JSON.parse(localStorage.getItem("posts"))
        },

        closeDialog() {
            this.dialog = false
        }
    }
}
</script>

<style scoped>

</style>
