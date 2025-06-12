document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and display comments for a given post
    function loadComments(postId) {
        fetch(`api/get_comments.php?post_id=${postId}`)
            .then(response => response.json())
            .then(comments => {
                const commentsContainer = document.getElementById(`comments-container-${postId}`);
                if (commentsContainer) {
                    commentsContainer.innerHTML = ''; // Clear existing comments
                    if (comments && comments.length > 0) {
                        comments.forEach(comment => {
                            const commentDiv = document.createElement('div');
                            commentDiv.classList.add('comment');
                            commentDiv.innerHTML = `
                                <p><strong>${comment.username}:</strong> ${comment.content}</p>
                            `;
                            commentsContainer.appendChild(commentDiv);
                        });
                    } else {
                        commentsContainer.innerHTML = '<p>No comments yet.</p>';
                    }
                } else {
                    console.error(`Comments container not found for post ID: ${postId}`);
                }
            })
            .catch(error => console.error('Error fetching comments:', error));
    }

    // Function to handle submitting a new comment
    function submitComment(postId) {
        const commentInput = document.getElementById(`comment-input-${postId}`);
        const commentText = commentInput.value.trim();

        if (commentText !== '') {
            fetch('api/add_comment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `post_id=${postId}&content=${encodeURIComponent(commentText)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    commentInput.value = ''; // Clear input field
                    loadComments(postId); // Reload comments
                } else {
                    alert('Failed to add comment: ' + data.message);
                }
            })
            .catch(error => console.error('Error adding comment:', error));
        }
    }

    // Function to handle liking a post
    function likePost(postId) {
        fetch('api/like_post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `post_id=${postId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const likeButton = document.getElementById(`like-button-${postId}`);
                if (likeButton) {
                    likeButton.textContent = 'Unlike';
                    likeButton.onclick = function() { unlikePost(postId); };
                    // Update like count if present
                    const likeCountElement = document.getElementById(`like-count-${postId}`);
                    if (likeCountElement) {
                        likeCountElement.textContent = data.like_count + ' Likes';
                    }
                }
            } else {
                alert('Failed to like post: ' + data.message);
            }
        })
        .catch(error => console.error('Error liking post:', error));
    }

    // Function to handle unliking a post
    function unlikePost(postId) {
        fetch('api/unlike_post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `post_id=${postId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const likeButton = document.getElementById(`like-button-${postId}`);
                if (likeButton) {
                    likeButton.textContent = 'Like';
                    likeButton.onclick = function() { likePost(postId); };
                    // Update like count if present
                    const likeCountElement = document.getElementById(`like-count-${postId}`);
                    if (likeCountElement) {
                        likeCountElement.textContent = data.like_count + ' Likes';
                    }
                }
            } else {
                alert('Failed to unlike post: ' + data.message);
            }
        })
        .catch(error => console.error('Error unliking post:', error));
    }

    // Attach event listeners to comment buttons, like buttons and load comments on page load
    document.querySelectorAll('.post').forEach(post => {
        const postId = post.getAttribute('data-post-id');

        //Comment Functionality
        const commentButton = document.getElementById(`comment-button-${postId}`);
        if (commentButton) {
             commentButton.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default form submission
                submitComment(postId);
            });
        } else {
            console.error(`Comment button not found for post ID: ${postId}`);
        }
        loadComments(postId); // Load comments for each post when the page loads
        
        // Like Functionality
        const likeButton = document.getElementById(`like-button-${postId}`);
        if (likeButton) {
            likeButton.addEventListener('click', function(event) {
                event.preventDefault();
                if (likeButton.textContent === 'Like') {
                    likePost(postId);
                } else {
                    unlikePost(postId);
                }
            });
        } else {
            console.error(`Like button not found for post ID: ${postId}`);
        }
    });
});