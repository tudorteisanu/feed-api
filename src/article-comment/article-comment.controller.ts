import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import {ArticleCommentService} from './article-comment.service';
import {CreateArticleCommentDto} from './dto/create-article-comment.dto';
import {GROUP_ARTICLE_COMMENTS} from '@/article-comment/consts';
import {GROUP_USER_PROFILE} from '@/user/consts';

@Controller('articles/:slug')
export class ArticleCommentController {
  constructor(private readonly articlesCommentService: ArticleCommentService) {}

  @Get('comments')
  @SerializeOptions({
    groups: [GROUP_ARTICLE_COMMENTS, GROUP_USER_PROFILE],
  })
  getArticleComments(@Param('slug') slug: string) {
    return this.articlesCommentService.getArticleComments(slug);
  }

  @Post('comments')
  @SerializeOptions({
    groups: [GROUP_ARTICLE_COMMENTS, GROUP_USER_PROFILE],
  })
  createArticleComments(
    @Param('slug') slug: string,
    @Body() body: CreateArticleCommentDto,
  ) {
    return this.articlesCommentService.create(slug, body);
  }

  @Delete('comments/:id')
  @SerializeOptions({
    groups: [GROUP_ARTICLE_COMMENTS, GROUP_USER_PROFILE],
  })
  deleteArticleComments(@Param('slug') slug: string, @Param(':id') id: number) {
    return this.articlesCommentService.remove(slug, id);
  }
}
