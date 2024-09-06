/* const textarea = document.querySelector('textarea');

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset the height
  this.style.height = this.scrollHeight + 'px'; // Set the height to match the content
}); */



document.addEventListener('DOMContentLoaded', function () {
    const textareas = document.querySelectorAll('.auto-grow');

    textareas.forEach(textarea => {
        // This sets the height dynamically based on content
        textarea.style.height = 'auto'; 
        textarea.style.height = (textarea.scrollHeight) + 'px'; // Adjust height based on scrollHeight

        // Optional: Make sure the textarea resizes if the content is edited.
        textarea.addEventListener('input', function () {
            textarea.style.height = 'auto'; // Reset the height to calculate scrollHeight properly
            textarea.style.height = (textarea.scrollHeight) + 'px'; // Adjust height again
        });
    });
});
