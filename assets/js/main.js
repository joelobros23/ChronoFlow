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

    // Attach event listeners to comment buttons and load comments on page load
    document.querySelectorAll('.post').forEach(post => {
        const postId = post.getAttribute('data-post-id');
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
    });
});