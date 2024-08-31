const textarea = document.querySelector('textarea');

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset the height
  this.style.height = this.scrollHeight + 'px'; // Set the height to match the content
});


alert("Hello")