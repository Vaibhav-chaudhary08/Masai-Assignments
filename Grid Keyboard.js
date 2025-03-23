const investors = [
    { name: "Vijay Shekhar Sharma", title: "FCEO Paytm", imageUrl: "https://www.masaischool.com/our-investors/Vijay_Shekhar_Sharma_019a0feb89.webp" },
    { name: "Kunal Shah", title: "CRED", imageUrl: "https://www.masaischool.com/our-investors/Kunal_Shah_92a3fba8c9.webp" },
];

const grid = document.querySelector('.grid');

investors.forEach(investor => {
    const item = document.createElement('div');
    item.classList.add('grid-item');
    item.innerHTML = `
        <img src="${investor.imageUrl}" alt="${investor.name}">
        <h3>${investor.name}</h3>
        <p>${investor.title}</p>
    `;
    grid.appendChild(item);
});
