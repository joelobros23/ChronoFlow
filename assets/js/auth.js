/* Content for assets/js/auth.js */

async function logout() {
  try {
    const response = await fetch('api/logout.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok) {
      // Clear local storage (or cookies)
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to the index page
      window.location.href = 'index.html';
    } else {
      console.error('Logout failed:', data.message);
      alert('Logout failed: ' + data.message); // Or display the message in a designated error area
    }
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Error during logout: ' + error); // Or display the message in a designated error area
  }
}