const params = new URLSearchParams(window.location.search);
const firstname = params.get("firstname");
const lastname = params.get("lastname");
const email = params.get("email");
const mobile = params.get("mobile");
const organization = params.get("organization");
const timestamp = new Date().toLocaleString();
document.getElementById("info").innerHTML = `
      <p><span>First Name:</span> ${firstname}</p>
      <p><span>Last Name:</span> ${lastname}</p>
      <p><span>Email:</span> ${email}</p>
      <p><span>Mobile:</span> ${mobile}</p>
      <p><span>Organization:</span> ${organization}</p>
      <p><span>Submission Time:</span> ${timestamp}</p>
    `;
// Open/close modal functions
function openModal(id) {
  document.getElementById(id).showModal();
}
function closeModal(id) {
  document.getElementById(id).close();
}
