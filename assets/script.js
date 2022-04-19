const baseURL = 'http://localhost:3000/palettes';

async function findAllPalettes() {
  const response = await fetch(`${baseURL}/find-palettes`);

  const palettes = await response.json();

  palettes.forEach(function (palette) {
    document.querySelector('#paletteList').insertAdjacentHTML(
      'beforeend',
      `
      <div class="paletteListItem">
          <div>
            <div class="paletteListItem_flavor">${palette.flavor}</div>
            <div class="paletteListItem_price">R$ ${palette.price}</div>
            <div class="paletteListItem_description">${palette.description}  </div>
            <div class="paletteListItem_actions Actions">
            <button class="Actions_edit btn">Editar</button>
            <button class="Actions_delete btn">Apagar</button>
            </div>
      </div>
      <img class="paletteListItem_photo"
        src="${palette.photo}"
        alt="${palette.flavor}"
      />


    </div>
      `,
    );
  });
}

async function findByIdPalettes() {
  const id = document.querySelector('#idPalette').value;
  const response = await fetch(`${baseURL}/find-palettes/${id}`);
  const palette = await response.json();

  const chosedpaletteDiv = document.querySelector('#chosedpalette');

  chosedpaletteDiv.innerHTML = `
  <div class="paletteCardItem">
  <div>
    <div class="paletteCardItem_flavor">${palette.flavor}</div>
    <div class="paletteCardItem_price">R$ ${palette.price}</div>
    <div class="paletteCardItem_description">${palette.description}  </div>
</div>
<img class="paletteCardItem_photo"
src="${palette.photo}"
alt="${palette.flavor}"
/>
</div>`;
}
findAllPalettes();

function openModalRegister() {
  document.querySelector('.modal-overlay').style.display = 'flex';
}

function closeModalRegister() {
  document.querySelector('.modal-overlay').style.display = 'none';

  document.querySelector('#flavor').value = '';
  document.querySelector('#price').value = 0;
  document.querySelector('#description').value = '';
  document.querySelector('#photo').value = '';
}

async function registerPalette() {
  const flavor = document.querySelector('#flavor').value;
  const price = document.querySelector('#price').value;
  const description = document.querySelector('#description').value;
  const photo = document.querySelector('#photo').value;

  const palette = {
    flavor,
    price,
    description,
    photo,
  };

  const response = await fetch(`${baseURL}/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    node: 'cors',
    body: JSON.stringify(palette),
  });
  const newPalette = await response.json();

  const html = `
<div class="paletteCardItem">
<div>
  <div class="paletteCardItem_flavor">${newPalette.flavor}</div>
  <div class="paletteCardItem_price">R$ ${newPalette.price}</div>
  <div class="paletteCardItem_description">${newPalette.description}  </div>
</div>
<img class="paletteCardItem_photo"
src="${newPalette.photo}"
alt="${newPalette.flavor}"
/>
</div>`;
  document.querySelector('#paletteList').insertAdjacentHTML('beforeend', html);

  closeModalRegister();
}
