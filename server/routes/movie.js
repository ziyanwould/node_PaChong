const {
    getAllMovies,
    getMovieDetail,
    getRelativeMovies
} = require('../service/movie')
const {
    controller,
    get,
    post,
    put
} = require('../lib/decorator')

@controller('/api/v0/movies')
export class moviesController {
    @get('/')
    async getMovies(ctx, next) {
        const { type, year } = ctx.query
        const movies = await getAllMovies(type, year)
        ctx.body = {
            movies
        }
    }



    @get('/:id')
    async getMovieDetail(ctx, next) {

        const id = ctx.params.id
        const movie = await getMovieDetail(id)
        const relativeMovies = await getRelativeMovies(movie)
        ctx.body = {
            data: {
                movie,
                relativeMovies
            },
            success: true
        }

    }
}
//router 可以使用中间件  用use  或者在里出入
//暴露出接口