<template>
    <div class="d-flex justify-center">
    <v-container>
        
        <v-row>
            <v-btn
                color='primary'
                class="ml-3"
                @click="$router.go(-1)"
                >
                Назад
            </v-btn>
        </v-row>

        <v-row>
            <v-col cols=12>
                <v-card
                    elevation="1">
                    <v-card-title>
                        <h1>{{post.title}}</h1>
                    </v-card-title> 

                    <v-card-text>
                        {{post.text}}
                    </v-card-text>
                </v-card> 
            </v-col>
        </v-row>

         <v-row>
            <v-col cols=12>
                <v-card elevation="1">
                    <v-card-text>
                        <v-row>
                            <v-col cols=11>
                                <v-text-field
                                    v-model="comment.name"
                                    label="Имя комментатора">
                                    </v-text-field>
                                <v-text-field
                                    v-model="comment.text"
                                    label="Комментарий">
                                    </v-text-field>
                            </v-col>

                            <v-col cols=1>
                                <div class="d-flex justify-end">
                                    <v-btn
                                        fab
                                        dark
                                        color="indigo"
                                        @click="addComment"
                                        >
                                        <v-icon dark>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card> 
            </v-col>
        </v-row>

        <v-row  
            v-for="(comment,index) in post.comments"
            :key="index">
        
            <v-col cols="12">
                <v-card>
                    <v-card-title>{{comment.name}}</v-card-title> 
                    <v-card-text class="d-flex justify-space-between">
                        <h3>{{comment.text}}</h3>

                        <v-btn
                                fab
                                small
                                @click="deleteComment(index)"
                                >
                                <v-icon dark>
                                    mdi-delete
                                </v-icon>
                        </v-btn>
                    </v-card-text> 
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    name: 'ReadPostPage',

    mounted(){
        this.downloadFromLocalStorage()
        this.FindSelectedPost()
    },
    
    data() {
        return{
            comment: {
                name: null,
                text: null
            },
            post: [],
            posts: []
        }
    },

    computed: {
        id() {
            return this.$route.params.id;
        }
    },

    methods: {
        addComment() {
            this.post.comments.push(this.comment) 
            this.comment = {
                name: null,
                text: null
            }
            this.updateLocalStorage()
        },

        deleteComment(id) {
            this.post.comments.splice(id,1)
            this.updateLocalStorage()
        },

        FindSelectedPost() {
            this.post = this.posts.find(el => el.id == this.id)
        },

        updateLocalStorage(){
            localStorage.setItem('posts', JSON.stringify(this.posts));
        },
        
        downloadFromLocalStorage() {
            this.posts = JSON.parse(localStorage.getItem("posts"))
        },
    }
}
</script>

<style scoped>

</style>
