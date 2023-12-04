import { sanityFetch } from "@/apis";
import { client } from "@/apis/client";
import {
    allArticlesQuery,
    articleQuery,
    paginatedArticleByCategoryQuery,
    paginatedArticleQuery
} from "@/apis/groq";

export async function getAllArticles(){
    return sanityFetch(client, {
    query: allArticlesQuery,
    params:{},
    tags: articleQueryKeys.all,
  })
}

export async function getArticles(id:string){
    return sanityFetch(client, {
    query: articleQuery,
    params:{
        id
    },
    tags: articleQueryKeys.all,
  })
}

export async function getPaginatedArticles(lastId:string){
    return sanityFetch(client, {
    query: paginatedArticleQuery,
    params:{
        lastId
    },
    tags: articleQueryKeys.all,
  })
}

export async function getPaginatedArticlesByCategoryId(categoryId:string, lastId:string ){
    return sanityFetch(client, {
    query: paginatedArticleByCategoryQuery,
    params:{
        categoryId,
        lastId
    },
    tags: articleQueryKeys.all,
  })
}

const articleQueryKeys =  {
    all: ['articles'],
}