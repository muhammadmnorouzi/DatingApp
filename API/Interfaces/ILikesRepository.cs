using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
        Task<AppUser> GetUserWithLikes(int userId);
    }
}