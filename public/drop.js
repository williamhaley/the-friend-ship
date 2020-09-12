// https://jsfiddle.net/oL2akhtz/

const drop = new Vue({
  el: '#drop-zone',

  data: {
    isActive: false,

    sharedState: store.state,
  },

  methods: {
    dropHandler: async function (event) {
      event.preventDefault();
      this.isActive = false;

      const data = await handleFile(event);

      store.setImage(data);
    },

    dragEnter: function (event) {
      this.isActive = true;
      if (true) {  // Test that the item being dragged is a valid one
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();
      }
    },

    dragOver: function (event) {
      if (true) {  // Test that the item being dragged is a valid one
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();
      }
    },

    dragLeave: function (event) {
      this.isActive = false;
    },
  }
});

window.addEventListener('dragenter', () => {
  drop.isActive = true;
});

const handleFile = (event) => {
  if (event.dataTransfer.items) {
    return useDataTransferItemListAPI(event);
  } else {
    return useDataTransferAPI(event);
  }
};

const useDataTransferItemListAPI = async (event) => {
  // Only handle a single file for now.
  if (event.dataTransfer.items.length !== 1) {
    return null;
  }

  // Use DataTransferItemList interface to access the file(s)
  for (let i = 0; i < event.dataTransfer.items.length; i++) {
    // If dropped items aren't files, reject them
    if (event.dataTransfer.items[i].kind === 'file') {
      const file = event.dataTransfer.items[i].getAsFile();

      try {
        data = await toBase64(file);
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  }

  return null;
};

const useDataTransferAPI = async (event) => {
  // Only handle a single file for now.
  if (event.dataTransfer.files.length !== 1) {
    return null;
  }

  // Use DataTransfer interface to access the file(s)
  for (let i = 0; i < event.dataTransfer.files.length; i++) {
    const file = event.dataTransfer.files[i].name;

    try {
      data = await toBase64(file);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  return null;
};

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
