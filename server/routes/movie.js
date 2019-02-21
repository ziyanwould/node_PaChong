import mongoose from 'mongoose'
import {
  Controller,
  Get,
  Required,
} from '../decorator/router'
import { getAllMovies, getSingleMovie, getRelativeMovies } from '../service/movie'

@Controller('/movies')
export default class MovieRouter {
  @Get('/all')
  async getMovieList (ctx, next) {
    const type = ctx.query.type
    const year = ctx.query.year
    const movies = await getAllMovies(type, year)

    ctx.body = {
      data: movies,
      success: true
    }
  }

  @Get('/detail/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getSingleMovie(id)
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