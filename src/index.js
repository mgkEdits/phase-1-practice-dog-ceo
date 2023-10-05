
  document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById('dog-image-container');
    const dogBreedsList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Function to fetch and display images
    function fetchImages() {
      fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
          data.message.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            dogImageContainer.appendChild(img);
          });
        })
        .catch(error => console.error("Error fetching images:", error));
    }

    // Function to fetch and display dog breeds
    function fetchBreeds() {
      fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
          const breeds = Object.keys(data.message);
          breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            dogBreedsList.appendChild(li);

            // Add click event listener to change font color on click
            li.addEventListener('click', () => {
              li.style.color = getRandomColor(); // Change font color
            });
          });
        })
        .catch(error => console.error("Error fetching breeds:", error));
    }

    // Function to get a random color for li elements
    function getRandomColor() {
        const colors = ['red', 'blue', 'green', 'yellow'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    // Function to filter breeds by selected letter
    function filterBreedsByLetter() {
      const selectedLetter = breedDropdown.value;
      const breedListItems = dogBreedsList.getElementsByTagName('li');

      for (const li of breedListItems) {
        const breedName = li.textContent;

        if (breedName.startsWith(selectedLetter)) {
          li.style.display = 'list-item';
        } else {
          li.style.display = 'none';
        }
      }
    }

    // Fetch images and breeds on page load
    fetchImages();
    fetchBreeds();

    // Add event listener for dropdown change
    breedDropdown.addEventListener('change', filterBreedsByLetter);
  });


