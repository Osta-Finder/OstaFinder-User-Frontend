export const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'picture_as_pdf';
  if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
  if (['doc', 'docx'].includes(ext)) return 'description';
  return 'attachment';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const isValidFileType = (file, acceptedTypes) => {
  return acceptedTypes.includes(file.type);
};

export const isValidFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateFile = (file, acceptedTypes, maxSize) => {
  const errors = [];

  if (!isValidFileType(file, acceptedTypes)) {
    errors.push('نوع الملف غير مدعوم');
  }

  if (!isValidFileSize(file, maxSize)) {
    errors.push(`حجم الملف يجب أن لا يتجاوز ${formatFileSize(maxSize)}`);
  }

  return errors;
};
