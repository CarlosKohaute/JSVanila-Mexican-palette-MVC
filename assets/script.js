const baseURL = 'http://localhost:3000/palettes';

async function findAllPalettes() {
  const response = await fetch(`${baseURL}/find-palettes`);

  const palettes = await response.json();

  palettes.forEach(function (palette) {
    document.querySelector('#paletteList').insertAdjacentHTML(
      'beforeend',
      `
      <div class="paletteListItem" id ="paletteListItem_${palette.id}">
          <div>
            <div class="paletteListItem_flavor">${palette.flavor}</div>
            <div class="paletteListItem_price">R$ ${palette.price}</div>
            <div class="paletteListItem_description">${palette.description}  </div>
            <div class="paletteListItem_actions Actions">
            <button class="Actions_edit btn" onclick="openModal('${palette.id}')">Editar</button>
            <button class="Actions_delete btn" onclick="openModalDelete('${palette.id}')">Apagar</button>
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
  <div class="paletteCardItem" id ="paletteListItem_${palette.id}">
  <div>
    <div class="paletteCardItem_flavor">${palette.flavor}</div>
    <div class="paletteCardItem_price">R$ ${palette.price}</div>
    <div class="paletteCardItem_description">${palette.description}  </div>

    <div class="paletteListItem_actions Actions">
    <button class="Actions_edit btn" onclick="openModal(${palette._id})">Editar</button>
    <button class="Actions_delete btn" openModalDelete(${palette.id})">Apagar</button>
    </div>
</div>
<img class="paletteCardItem_photo"
src="${palette.photo}"
alt="${palette.flavor}"
/>
</div>`;
}
findAllPalettes();

async function openModal(id = null) {
  if (id != null) {
    document.querySelector('#tittle-header-modal').innerText =
      'Atualizar uma Paleta';

    document.querySelector('#button-form-modal').innerText = 'Atualizar';

    const response = await fetch(`${baseURL}/find-palettes/${id}`);
    const palette = await response.json();

    document.querySelector('#flavor').value = palette.flavor;
    document.querySelector('#price').value = palette.price;
    document.querySelector('#description').value = palette.description;
    document.querySelector('#photo').value = palette.photo;
    document.querySelector('#id').value = palette.id;
  } else {
    document.querySelector('#tittle-header-modal').innerText =
      'Cadastrar uma Paleta';
    document.querySelector('#button-form-modal').innerText = 'Cadastrar';
  }
  document.querySelector('#overlay').style.display = 'flex';
}

function closeModal() {
  document.querySelector('.modal-overlay').style.display = 'none';

  document.querySelector('#flavor').value = '';
  document.querySelector('#price').value = 0;
  document.querySelector('#description').value = '';
  document.querySelector('#photo').value = '';
}

async function registerPalette() {
  const id = document.querySelector('#id').value;
  const flavor = document.querySelector('#flavor').value;
  const price = document.querySelector('#price').value;
  const description = document.querySelector('#description').value;
  const photo = document.querySelector('#photo').value;

  const palette = {
    id,
    flavor,
    price,
    description,
    photo,
  };

  const editionModeAtivated = id > 0;

  const endpoint =
    baseURL + (editionModeAtivated ? `/update/${id}` : `/create`);

  const response = await fetch(endpoint, {
    method: editionModeAtivated ? 'put' : 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    node: 'cors',
    body: JSON.stringify(palette),
  });
  const newPalette = await response.json();

  const html = `
<div class="paletteCardItem" id ="paletteListItem_${palette.id}">
<div>
  <div class="paletteCardItem_flavor">${newPalette.flavor}</div>
  <div class="paletteCardItem_price">R$ ${newPalette.price}</div>
  <div class="paletteCardItem_description">${newPalette.description}  </div>

  <div class="paletteListItem_actions Actions">
  <button class="Actions_edit btn" onclick="openModal(${palette._id})">Editar</button>
  <button class="Actions_delete btn" openModalDelete(${palette.id})">Apagar</button>
  </div>
</div>
<img class="paletteCardItem_photo"
src="${newPalette.photo}"
alt="${newPalette.flavor}"
/>
</div>`;

  if (editionModeAtivated) {
    document.querySelector(`#paletteListItem_${id}`).outerHTML = html;
  } else {
    document
      .querySelector('#paletteList')
      .insertAdjacentHTML('beforeend', html);
  }
  closeModal();
  location. reload()
}

function openModalDelete(id) {
  document.querySelector('#overlay-delete').style.display = 'flex';

  const btnYes = document.querySelector('.btn_delete_yes');

  btnYes.addEventListener('click', function () {
    deletePalette(id);
  });
}

function closeModalDelete() {
  document.querySelector('#overlay-delete').style.display = 'none';
}

async function deletePalette(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  const result = await response.json();
  alert(result.message);

  document.getElementById('paletteList').innerHTML = '';

  closeModalDelete();
  findAllPalettes();
}
