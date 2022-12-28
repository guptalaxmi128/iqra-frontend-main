import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POST_URL = 'http://localhost:5000/api/master/add-articles';

const initialState = {
    article: [],
    state: 'idle',
    error: null
};

export const addArticle = createAsyncThunk('article/addArticle', async (articleInfo) => {
    const response = await axios.post(POST_URL, articleInfo);
    return response.data;
});

const article = createSlice({
    name: 'article',
    initialState,
    reducers: {
        articlePosted(state, action) {
            state.article.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addArticle.pending, (state) => {
                state.state = 'loading';
            }
            )
            .addCase(addArticle.fulfilled, (state, action) => {
                state.state = 'succeeded';
                state.article.push(action.payload);
            }
            )
            .addCase(addArticle.rejected, (state, action) => {
                state.state = 'failed';
                state.error = action.error.message;
            }
            );
    }
});

export const { articlePosted } = article.actions;

export default article.reducer;

// export const {addArticle, getArticle} = article.actions;
