document.querySelector('button').addEventListener('click',getDonor)

function getDonor () {
  let donor = document.querySelector('input').value
  
  const apiKey = 'OpPN4fPN4PaqT3k11MdDLF7q44pqj8OEHqgnqKj7';  // Replace with your FEC API key
  const donorName = donor;
  const encodedName = encodeURIComponent(donorName);  // Encode the contributor's name
  const url = `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${apiKey}&contributor_name=${encodedName}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.results[0]);
      document.querySelector('#name').innerText = data.results[0].contributor_name
      document.querySelector('#committee').innerText = data.results[0].committee_name
      document.querySelector('#amount').innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.results[0].contribution_receipt_amount);
      document.querySelector('#date').innerText = data.results[0].contribution_receipt_date
      document.querySelector('#city').innerText = data.results[0].contributor_city
      document.querySelector('#state').innerText = data.results[0].contributor_state
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  
}