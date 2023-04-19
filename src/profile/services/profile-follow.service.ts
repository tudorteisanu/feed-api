import {Injectable} from '@nestjs/common';
import {UserService} from '@/user/user.service';
import {User} from '@/user/entities/user.entity';
import {ClsService} from 'nestjs-cls';

@Injectable()
export class ProfileFollowService {
  constructor(private userService: UserService, private cls: ClsService) {}

  async follow(username: string) {
    const user = await this.userService.findOne({
      where: {username},
      relations: {
        followers: true,
      },
    });
    const follower = new User();
    const currentUser = this.cls.get('user');
    follower.username = currentUser.username;
    user.followers.push(follower);
    await this.userService.save(user);
    return {};
  }

  async unfollow(username: string) {
    const user = await this.userService.findOne({
      where: {username},
      relations: {
        followers: true,
      },
    });
    const currentUser = this.cls.get('user');
    user.followers = user.followers.filter(
      (follower) => follower.username !== currentUser.username,
    );
    await this.userService.save(user);
    return {};
  }
}
