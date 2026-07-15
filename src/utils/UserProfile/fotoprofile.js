export const handleFotoProfilChange = (e, setFormData) => {
  const file = e.target.files[0];
  
  
  if (!file) return;

 
  if (!file.type.startsWith("image/")) {
    alert("File harus berupa gambar (PNG/JPEG)!");
    return;
  }

  
  const reader = new FileReader();
  reader.onloadend = () => {
   
    setFormData((prev) => ({ 
      ...prev, 
      fotoProfil: reader.result 
    }));
  };
  reader.readAsDataURL(file);
};