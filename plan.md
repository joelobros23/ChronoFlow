# Project Plan: ChronoFlow

**Description:** A social networking platform where users can share moments, thoughts, and experiences organized chronologically, allowing for a dynamic timeline-based interaction with past and present events.


## Development Goals

- [ ] Design the database schema (db_schema) to handle users, posts, friendships, comments, and likes.
- [ ] Create a database connection file (api/config.php) to interact with the database.
- [ ] Implement user registration (register.html, api/register.php, assets/js/auth.js) and login (index.html, api/login.php, assets/js/auth.js) functionality.
- [ ] Implement user logout functionality (api/logout.php, assets/js/auth.js).
- [ ] Build the home page (home.html) to display posts from the user and their friends, including create post functionality (api/create_post.php, api/get_posts.php, assets/js/main.js).
- [ ] Implement a user profile page (profile.html) to display user information and their posts (api/get_user.php, assets/js/profile.js).
- [ ] Create a settings page (settings.html) to allow users to update their profile information, including bio and profile picture (api/update_profile.php, assets/js/settings.js).
- [ ] Develop a friend request system (friends.html, api/friend_request.php, api/accept_friend.php, api/reject_friend.php, api/get_friends.php, api/get_friend_requests.php, assets/js/friends.js).
- [ ] Implement commenting functionality on posts (api/add_comment.php, api/get_comments.php, assets/js/main.js).
- [ ] Implement liking and unliking functionality on posts (api/like_post.php, api/unlike_post.php, assets/js/main.js).
- [ ] Style all pages using Tailwind CSS (assets/css/style.css).
- [ ] Ensure responsive design for different screen sizes.
- [ ] Implement basic input validation and error handling on both the client-side (JavaScript) and server-side (PHP).
- [ ] Secure user passwords using password hashing (bcrypt).
- [ ] Implement session management to maintain user login status.
