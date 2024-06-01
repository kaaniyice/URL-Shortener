
document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const longUrl = document.getElementById('longUrl').value;
  
    const response = await fetch ('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl })
    })
    const result = await response.json();

    document.getElementById('result').classList.remove("hidden");
   
    if (response.ok) {
      console.log(result.shortUrl)
      document.getElementById('resultUrl').href = `${window.location.origin}/${result.shortUrl}`;
      document.getElementById('resultUrl').textContent = `${window.location.origin}/${result.shortUrl}`;
    } else {
      document.getElementById('resultUrl').textContent = `Hata: ${result.error}`;
    }
  });