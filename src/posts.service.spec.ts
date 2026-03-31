import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();

      expect(result).toHaveLength(posts.length);
      expect(result.map((p) => p.text)).toEqual(posts.map((p) => p.text));
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });

      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    it('should return correct posts when only skip is provided', () => {
      const result = postsService.findMany({ skip: 2 });

      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return correct posts when only limit is provided', () => {
      const result = postsService.findMany({ limit: 2 });

      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
    });

    it('should return empty array when skip exceeds total posts count', () => {
      const result = postsService.findMany({ skip: 10 });

      expect(result).toEqual([]);
    });

    it('should return empty array when limit is 0', () => {
      const result = postsService.findMany({ limit: 0 });

      expect(result).toEqual([]);
    });
  });
});