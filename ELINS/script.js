// Data Mahasiswa ELINS (14 orang) + link biodata
const students = [
  { name: "Dandi Hartono", nim: "H021231007", photo: "img/dandi.jfif", link: "https://www.instagram.com/dand.i1010/" },
  { name: "Nur Alik Katu", nim: "H021231041", photo: "img/alif.jfif", link: "https://www.instagram.com/4lif.katu/" },
  { name: "Ansar Mubaroq", nim: "H021231043", photo: "img/ansar.jfif", link: "https://www.instagram.com/allkinn_/" },
  { name: "Muh Asnawi", nim: "H021231027", photo: "img/awi.jfif", link: "https://www.instagram.com/_____cawii/" },
  { name: "Sri Wahyuni SM", nim: "H021231053", photo: "img/uni.jfif", link: "https://www.instagram.com/swy31_/" },
  { name: "Juliyati Puspita Sari", nim: "H021231052", photo: "img/02.jpg", link: "biodata/https://www.instagram.com/juliyatipuspita/" },
  { name: "Nur Amalia", nim: "H021231067", photo: "img/02.jpg", link: "https://www.instagram.com/nrmell_1/" },
  { name: "Sheira Abideva", nim: "H021231022", photo: "img/02.jpg", link: "https://www.instagram.com/sheirabidevaaa/" },
  { name: "Ulva Asriani Nur", nim: "H02131037", photo: "img/02.jpg", link: "https://www.instagram.com/ulvaasr/" },
  { name: "Yemima Melanie Surya", nim: "H021231042", photo: "img/02.jpg", link: "https://www.instagram.com/yemimasry/" },
  { name: "Ruth Lebang", nim: "H021231005", photo: "img/02.jpg", link: "https://www.instagram.com/lbngg20/" },
  { name: "Febrinesya Alfa Tandi Lion", nim: "H021231063", photo: "img/02.jpg", link: "https://www.instagram.com/febrinesyaalfha/" },
  { name: "Taskiyatunnaps", nim: "H021231055", photo: "img/02.jpg", link: "https://www.instagram.com/lucia_hxe/" },
  { name: "Miswanja Batu Padang", nim: "H021231004", photo: "img/02.jpg", link: "https://www.instagram.com/mijaa__nn/" }
];

// Render galeri
const gallery = document.getElementById("gallery");
gallery.innerHTML = students.map((s, i) => `
  <div class="card">
    <img src="${s.photo}" alt="${s.name}" onclick="openModal(${i})">
    <div class="info">
      <div class="name">${s.name}</div>
      <div class="nim">${s.nim}</div>
    </div>
  </div>
`).join("");

// Modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const caption = document.getElementById("caption");
const linkBtn = document.getElementById("linkBtn"); // tombol biodata

function openModal(index) {
  const student = students[index];
  modal.style.display = "block";
  modalImg.src = student.photo;
  caption.innerText = `${student.name} (${student.nim})`;
  linkBtn.href = student.link; // arahkan tombol ke biodata
}

document.getElementById("closeModal").onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

let currentIndex = 0; // simpan index foto aktif

function openModal(index) {
  currentIndex = index;
  const student = students[index];
  modal.style.display = "block";
  modalImg.src = student.photo;
  caption.innerText = `${student.name} (${student.nim})`;
  linkBtn.href = student.link;
}

// Tombol Next
document.getElementById("nextBtn").onclick = function() {
  currentIndex = (currentIndex + 1) % students.length;
  openModal(currentIndex);
};

// Tombol Prev
document.getElementById("prevBtn").onclick = function() {
  currentIndex = (currentIndex - 1 + students.length) % students.length;
  openModal(currentIndex);
};

// Keyboard navigation
document.addEventListener("keydown", function(event) {
  if (modal.style.display === "block") {
    if (event.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % students.length;
      openModal(currentIndex);
    }
    if (event.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + students.length) % students.length;
      openModal(currentIndex);
    }
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  }
});
let zoomLevel = 1;

function applyZoom() {
  modalImg.style.transform = `scale(${zoomLevel})`;
}

// Zoom In
document.getElementById("zoomIn").onclick = function() {
  zoomLevel += 0.2;
  applyZoom();
};

// Zoom Out
document.getElementById("zoomOut").onclick = function() {
  if (zoomLevel > 0.4) { // jangan sampai hilang
    zoomLevel -= 0.2;
    applyZoom();
  }
};

// Reset Zoom
document.getElementById("resetZoom").onclick = function() {
  zoomLevel = 1;
  applyZoom();
};

// Reset zoom setiap kali modal dibuka
function openModal(index) {
  currentIndex = index;
  const student = students[index];
  modal.style.display = "block";
  modalImg.src = student.photo;
  caption.innerText = `${student.name} (${student.nim})`;
  linkBtn.href = student.link;
  zoomLevel = 1;
  applyZoom();
}
